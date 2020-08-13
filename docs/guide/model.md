# model 模型

model 集成了 typeORM，详情文档可参考<a href="https://typeorm.io/" target="_blank">typeORM</a>

## 创建 model

**create(name, options)**

| 参数名称 |  类型  | 描述                                                                                    |
| -------- | :----: | :-------------------------------------------------------------------------------------- |
| name     | string | model 名称                                                                              |
| options  | object | 配置参数<br> columns: 列定义<br> checks: 列定义<br> indices: 列定义<br> uniques: 列定义 |

返回值 Model 类实例

```
import { app, model } from "kidi";

let testModel = model.create("testModel", {
  columns: {
      id: {
          primary: true,
          type: "int",
          generated: "increment"
      },
      firstName: {
          type: String,
          length: 30
      },
      lastName: {
          type: String,
          length: 50,
          nullable: false
      },
      age: {
          type: Number,
          nullable: false
      }
  },
  checks: [
      { expression: `"firstName" <> 'John' AND "lastName" <> 'Doe'` },
      { expression: `"age" > 18` }
  ],
  indices: [
      {
          name: "IDX_TEST",
          unique: true,
          columns: [
              "firstName",
              "lastName"
          ]
      }
  ],
  uniques: [
      {
          name: "UNIQUE_TEST",
          columns: [
              "firstName",
              "lastName"
          ]
      }
  ]
});
```

### Model 类

| 方法名称            | 描述                 | 默认  |
| ------------------- | :------------------- | ----- |
| add(obj)            | 添加                 | 无    |
| remove(obj)         | 删除实例             | false |
| delete(where)       | 按条件删除           | 无    |
| merge(old, data)    | 更新                 | 无    |
| update(where, data) | 更新                 | true  |
| count(where)        | 查询个数             | true  |
| find(where)         | 查询结果             | true  |
| findAndCount(where) | 查询结果并返回个数   | true  |
| findOne(where)      | 查询并返回命中的一个 | true  |

创建 model

```
import { app, model } from "kidi";

let userModel = model.create("userModel", {
  id: {
    type: Number,
    primary: true,
    generated: "increment",
  },
  name: {
    type: String,
  }, //资源配置
});
```

**add(obj)**

```
let ins = await userModel.add({ name: "kidi22" });
console.log(ins);
```

**remove(obj)**

```
let user = await userModel.findOne({ name: "kidi22" });
await userModel.remove(user);
```

**delete(where)**

```
userModel.delete({ name: "kidi22" });
```

**merge(old, data)**

```
let user = await userModel.findOne({ name: "kidi44" });
await userModel.merge(user, { name: "kidi55" });
```

**update(where, data)**

```
await userModel.update({ name: "kidi44" }, { name: "kidi55" });
```

**count(where)**

```
let count = await userModel.count({ name: "kidi33" });
console.log(count);
```

**find(where)**

```
let list = await userModel.find();
console.log(list);
```

**findAndCount(where)**

```
let [list, length] = await userModel.findAndCount({ name: "kidi33" });
console.log(list, length);
```

**findOne(where)**

```
let user = await userModel.findOne({ name: "kidi33" });
console.log(user);
```
