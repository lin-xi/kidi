import fetch from "node-fetch";
import { app, router, model, service } from "../src/index.js";

app.run(6000, {
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

// inject model
@service("user", "userModel")
class UserService {
  constructor(userModel) {
    this.model = userModel;
  }
  add(user) {
    return this.model.add(user);
  }
  find(data) {
    return this.model.find({ where: data });
  }
}

// inject service
@service("user2", "user")
class UserService2 {
  constructor(user) {
    this.service = user;
  }
  find2(data) {
    return this.service.find(data);
  }
}

router.get("/test/service", async (ctx, res, next, services) => {
  let user = services.user;
  let user2 = services.user2;
  let record = await user.add({ name: "kidi-service-new" });

  let records = await user2.find2({ name: "kidi-service-new" });
  if (records.length > 0) {
    res.json({ result: records[0].name });
  } else {
    res.json({ result: "none" });
  }
});

function pending() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// service--------------------------
describe("service", () => {
  beforeEach(async () => {
    await pending();
  });

  test("test service: di", async () => {
    let result = await fetch("http://localhost:6000/test/service").then((res) =>
      res.json()
    );
    expect(result.result).toBe("kidi-service-new");
  });

  test("test service: di error", async () => {
    class Test {
      constructor(hello) {
        console.log(hello);
      }
    }
    try {
      service.create("user3", Test, "hello");
    } catch (err) {
      expect(err.message).toBe("hello 依赖注入失败");
    }
  });
});
