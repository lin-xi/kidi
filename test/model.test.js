import fetch from "node-fetch";
import { app, router, model, service } from "../lib/index.js";

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

let testModel = model.create("testModel", {
  id: {
    type: Number,
    primary: true,
    generated: true,
  },
  name: {
    type: String,
  }, //资源配置
});

// model--------------------------
describe("model", () => {
  test("test model", () => {
    expect(testModel).not.toBe(undefined);
  });

  test("test model:append record", () => {
    setTimeout(async () => {
      let ins = await userModel.add({ name: "kidi22" });
      expect(ins.name).toBe("kidi22");
    }, 1000);
  });

  test("test model:find record", () => {
    setTimeout(async () => {
      await userModel.add({ name: "kidi33" });
      const list = await userModel.find({ name: "kidi33" });
      expect(list.length).toBe(1);
    }, 1000);
  });

  test("test model:findOne record", () => {
    setTimeout(async () => {
      await userModel.add({ name: "kidi33" });
      let ins = await userModel.findOne({ name: "kidi33" });
      expect(ins.name).toBe("kidi33");
    }, 1000);
  });

  test("test model:findAndCount record", () => {
    setTimeout(async () => {
      await userModel.add({ name: "kidi33" });
      let [ins, count] = await userModel.findAndCount({ name: "kidi33" });
      expect(ins.name).toBe("kidi33");
      expect(count).toBe(1);
    }, 1000);
  });

  test("test model:count record", () => {
    setTimeout(async () => {
      await userModel.add({ name: "kidi33" });
      let count = await userModel.count({ name: "kidi33" });
      expect(count).toBe(1);
    }, 1000);
  });

  test("test router:merge record", async () => {
    setTimeout(async () => {
      await userModel.add({ name: "kidi44" });
      let user = await userModel.findOne({ name: "kidi44" });
      let newIns = await userModel.merge(user, { name: "kidi55" });
      expect(newIns.name).toBe("kidi55");
    }, 1000);
  });

  test("test router:update record", async () => {
    setTimeout(async () => {
      await userModel.add({ name: "kidi44" });
      let newIns = await userModel.update(
        { name: "kidi44" },
        { name: "kidi55" }
      );
      expect(newIns.name).toBe("kidi55");
    }, 1000);
  });

  test("test router:delete record", async () => {
    setTimeout(async () => {
      let user = await userModel.delete({ name: "kidi44" });
      let count = await userModel.count({ name: "kidi44" });
      expect(count).toBe(0);
    }, 1000);
  });

  test("test router:remove record", async () => {
    setTimeout(async () => {
      await userModel.add({ name: "kidi66" });
      let user = await userModel.findOne({ name: "kidi66" });
      await userModel.remove(user);
    }, 1000);
  });
});
