# router 路由

路由的使用的 express 基本相同

```
router.get("/test/get", (ctx, res, next) => {
  res.json({ result: "get" });
});
```

| 方法名称 |       参数       | 返回值 |
| -------- | :--------------: | :----- |
| get      | path, middleware | 无     |
| post     | path, middleware | 无     |
| put      | path, middleware | 无     |
| patch    | path, middleware | 无     |
| delete   | path, middleware | 无     |
| all      | path, middleware | 无     |
| use      | path, middleware | 无     |
| param    | path, middleware | 无     |
| prefix   | path, middleware | 无     |
| redirect | path, middleware | 无     |

### Service 注入

路由里可以接受 service 的实例

```
import {router} from "kidi";
router.get('/add', (req, res, next, services) => {
    let projectService = services.project;
    // do something with service
    res.json({data: {message: "hello, world"}})
})

```
