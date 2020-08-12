# service

## 方法

| 方法名称 | 参数                                                   | 返回值 |
| -------- | :----------------------------------------------------- | :----- |
| create   | name: service 名称<br> Clas: 类<br>injection: 依赖注入 | 无     |

#### create(name, columns)

**示例**

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
