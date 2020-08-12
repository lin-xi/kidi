# model

## 方法

| 方法名称 | 参数                                 | 返回值 |
| -------- | :----------------------------------- | :----- |
| create   | name: model 名称<br> columns: 列定义 | Model  |

#### create(name, columns)

**示例**

```
import { app, model } from "kidi";

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
```
