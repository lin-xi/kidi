import fetch from "node-fetch";
import { app, router, model, service } from "../src/index.js";

let userModel = model.create("userModel", {
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: "increment",
    },
    name: {
      type: String,
    }, //资源配置
  },
});

let testModel = model.create("testModel", {
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: "increment",
    },
    name: {
      type: String,
    }, //资源配置
  },
});

app.run(4000, {
  staticPath: "test/static",
  uploadPath: "test/upload",
  database: {
    type: "sqlite",
    database: "test/data/test.db",
    logging: true,
    synchronize: true,
  },
});

function pending() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// model--------------------------
describe("model", () => {
  beforeEach(async () => {
    await pending();
  });

  test("test model", () => {
    expect(testModel).not.toBe(undefined);
  });

  test("test model:append record", async () => {
    let ins = await userModel.add({ name: "kidi22" });
    expect(ins.name).toBe("kidi22");
  });

  test("test model:find record", async () => {
    await userModel.add({ name: "kidi33" });
    const list = await userModel.find({ name: "kidi33" });
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
    console.log("findAndCount>>>>", ins);
    expect(ins[0].name).toBe("kidi33");
    expect(count).toBeGreaterThan(0);
  });

  test("test model:count record", async () => {
    await userModel.add({ name: "kidi33" });
    let count = await userModel.count({ name: "kidi33" });
    expect(count).toBeGreaterThan(0);
  });

  test("test router:merge record", async () => {
    await userModel.add({ name: "kidi44" });
    let user = await userModel.findOne({ name: "kidi44" });
    await userModel.merge(user, { name: "kidi55" });
    user = await userModel.findOne({ name: "kidi55" });
    expect(user.name).toBe("kidi55");
  });

  test("test router:update record", async () => {
    await userModel.add({ name: "kidi44" });
    await userModel.update({ name: "kidi44" }, { name: "kidi55" });
    let user = await userModel.findOne({ name: "kidi55" });
    expect(user.name).toBe("kidi55");
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
