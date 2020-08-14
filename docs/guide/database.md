# 数据库配置

kidi 内部已经集成了 sqlite，mysql，postgres 开箱即可使用

| 参数名称 |            描述            | 备注                                |
| -------- | :------------------------: | :---------------------------------- |
| type     |         数据库类型         | 无                                  |
| url      |         数据库 url         | postgres://test:test@localhost/test |
| host     |         服务器地址         | 无                                  |
| port     |           端口号           | 无                                  |
| username |           用户名           | 无                                  |
| password |            密码            | 无                                  |
| database | 数据库名称或数据库文件地址 | 无                                  |

### mysql 连接

```
{
    ...
    database: {
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        user: "test",
        password: "test",
        database: "test",
        logging: true
    },
    ...
}
```

或者

```
{
    ...
    database: {
        type: "mysql",
        url:
        "mysql://user:password@host/database",
        logging: true
    },
    ...
}
```

### sqlite 连接

```
{
    ...
    "database": {
        "type": "sqlite",
        "database": "/data/something.db",
        "logging": true
        "synchronize": true,
    }
    ...
}
```

### postgres 连接

```
{
    ...
    database: {
        type: "postgres",
        url:
        "postgres://user:password@host/database",
        logging: true
    },
    ...
}
```
