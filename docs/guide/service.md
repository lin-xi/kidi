# service 服务

### 创建 service

使用 decoration 方式创建

```
import { app, model, service } from "kidi";

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
```

非 decoration 方式创建

```
import { app, model, service } from "kidi";

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
service.create("user", UserService, "userModel")

class UserService2 {
    constructor(user) {
        this.service = user;
    }
    find2(data) {
        return this.service.find(data);
    }
}
service.create("user2", UserService2, "user")
```

### 依赖注入

创建服务时，可以注入 model 或其他服务，注入的实例会作为参数传入到服务的构造函数之中
