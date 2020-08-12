# service

## 创建 service

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

## 依赖注入
