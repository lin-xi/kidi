# app

app 对象实 koa 实例，详细参考 <a href="https://koa.bootcss.com/">koa 的 app</a>

### 方法

| 方法名称 |        参数        | 返回值 |
| -------- | :----------------: | :----- |
| run      | config: 服务器配置 | 无     |

### 配置选项

```
{
  staticPath: "test/static",
  uploadPath: "test/upload",
  database: {
    type: "sqlite",
    database: "test/data/test.db",
    logging: true,
    synchronize: true,
  },
}
```

| 参数名称   |  类型  | 描述         |
| ---------- | :----: | :----------- |
| staticPath | String | 静态目录地址 |
| uploadPath | String | 文件上传目录 |
| database   | Object | 数据库配置   |

#### 数据库配置

| 参数名称 |            描述            | 备注                                |
| -------- | :------------------------: | :---------------------------------- |
| type     |         数据库类型         | 无                                  |
| url      |         数据库 url         | postgres://test:test@localhost/test |
| host     |         服务器地址         | 无                                  |
| port     |           端口号           | 无                                  |
| username |           用户名           | 无                                  |
| password |            密码            | 无                                  |
| database | 数据库文件地址或数据库名称 | 无                                  |
