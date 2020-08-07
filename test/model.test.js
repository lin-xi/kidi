import fetch from "node-fetch";
import { app, router, model, service } from "../lib/index.js";

app.run(4000, {
  staticPath: "test/static",
  uploadPath: "test/upload",
  database: {
    type: "sqlite",
    database: "test/data/test.db",
    logging: true,
  },
});

let userModel = model.create("userModel", {
  id: {
    type: Number,
    primary: true,
    generated: true,
  },
  name: {
    type: String,
  }, //资源配置
});

@service("user", "userModel")
class UserService {
  constructor(userModel) {
    this.model = userModel;
  }
  async add(user) {
    return this.model.add(user);
  }
  async update(where, data) {
    return this.model.update(where, data);
  }
  async del(where) {
    return this.model.remove(where);
  }
  async find(where) {
    return this.model.find(where);
  }
}

// model--------------------------
describe("model", () => {
  test("test model", () => {
    let testUser = model.create("test_user", {
      id: {
        type: Number,
        primary: true,
        generated: true,
      },
      name: {
        type: String,
      }, //资源配置
    });
    expect(testUser).not.toBe(undefined);
  });

  test("test model:append record", async () => {
    let ins = await userModel.add({ name: "kidi22" });
    expect(ins.dataValues.name).toBe("kidi22");
  });

  test("test model:find record", async () => {
    await userModel.add({ name: "kidi33" });
    let list = await userModel.find({ name: "kidi33" });
    expect(list.length).toBeGreaterThan(0);
  });

  test("test model:findOne record", async () => {
    await userModel.add({ name: "kidi33" });
    let ins = await userModel.findOne({ name: "kidi33" });
    expect(ins.name).toBe("kidi33");
  });

  test("test model:findAndCount record", async () => {
    await userModel.add({ name: "kidi33" });
    let [ins, count] = await userModel.findAndCount({ name: "kidi33" });
    expect(ins.name).toBe("kidi33");
    expect(count).toBe(1);
  });

  test("test model:count record", async () => {
    await userModel.add({ name: "kidi33" });
    let count = await userModel.count({ name: "kidi33" });
    expect(count).toBe(1);
  });

  test("test router:merge record", async () => {
    await userModel.add({ name: "kidi44" });
    let user = await userModel.findOne({ name: "kidi44" });
    let newIns = await userModel.merge(user, { name: "kidi55" });
    expect(newIns.name).toBe("kidi55");
  });

  test("test router:update record", async () => {
    await userModel.add({ name: "kidi44" });
    let newIns = await userModel.update({ name: "kidi44" }, { name: "kidi55" });
    expect(newIns.name).toBe("kidi55");
  });

  test("test router:delete record", async () => {
    let user = await userModel.delete({ name: "kidi44" });
    let count = await userModel.count({ name: "kidi44" });
    expect(count).toBe(0);
  });

  test("test router:remove record", async () => {
    await userModel.add({ name: "kidi66" });
    let user = await userModel.findOne({ name: "kidi66" });
    await userModel.remove(user);
  });
});
