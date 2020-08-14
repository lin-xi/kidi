# 快速入门

### 目录结构

```
.
├── routers
│   └── project.js
├── models
│   └── project.js
├── services
│   └── project.js
├── server.config.js
└── server.js
```

### 模型

project.js

```
import {model} from "kidi";

model.create("projectModel", {
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: "increment",
        },
        name: {
            type: String,
        }
    }
});

```

### 服务

project.js
(decoration style)

```
import {service} from "kidi";

@service('project', 'projectModel')
// service name: project, inject: projectModel
class PorjectService {
    constructor(projectModel) {
        this.model = projectModel
    }
    add() {
        console.log("model add");
    }
}
```

or

```
import {service} from "kidi";

class PorjectService {
    constructor(projectModel) {
        this.model = projectModel
    }
    add() {
        console.log("model add");
    }
}
service.create('project', PorjectService, 'projectModel');
```

### 路由

project.js

```
import {router} from "kidi";
router.get('/add', (req, res, next, services) => {
    let projectService = services.project;
    // do something with service
    res.json({data: {message: "hello, world"}})
})

```

### 启动应用

```
import {app} from "kidi";
app.run(3000);
```

### 应用配置

add a server.config.json file in the root directory
`sqlite` configuration

```
{
    "staticPath": "/public",
    "uploadPath": "test/upload",
    "database": {
        "type": "sqlite",
        "database": "/data/something.db",
        "logging": true
        "synchronize": true,
    }
}
```

or

```
app.run(3000, {
    "staticPath": "test/static",
    "uploadPath": "test/upload",
    "database": {
       "type": "sqlite",
        "database": "/data/something.db",
        "logging": true
        "synchronize": true,
    }
});
```
