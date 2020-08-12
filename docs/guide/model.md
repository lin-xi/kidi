# model

## 创建 model

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

## 列定义

## Model 类
