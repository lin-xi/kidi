# 响应（Response）

### 方法

| 方法名称   | 参数                          | 返回值 |
| ---------- | :---------------------------- | :----- |
| status     | code 状态码                   | 无     |
| json       | data 数据                     | 无     |
| jsonp      | callback: 回调<br> data: 数据 | 无     |
| type       | type 文档类型                 | 无     |
| attachment | filename 文件路径             | 无     |
| append     | field<br>val                  | 无     |
| cookie     | name<br>value<br>options      | 无     |
| redirect   | url:地址<br>code:状态码       | 无     |

#### status(code)

```
router.get("/test/res_status", (ctx, res, next) => {
  res.status(404);
});
```

#### json(data)

```
router.post("/test/post", (ctx, res, next) => {
  res.json({ result: "post" });
});
```

#### jsonp(callback, data)

```
router.get("/test/jsonp", (ctx, res, next) => {
  let callback = ctx.query.callback || "nothing";
  res.jsonp(callback, {
    result: "jsonp",
  });
});
```

#### append(field, val)

```
router.get("/test/set_cookie", (ctx, res, next) => {
  res.append("sessionid", "d9w29skuw32k9duao2l02j3j7d8apkl");
  res.json({ result: "d9w29skuw32k9duao2l02j3j7d8apkl" });
});
```

#### cookie(name, value, options)

```
router.get("/test/set_cookie", (ctx, res, next) => {
  res.cookie("sessionid", "d9w29skuw32k9duao2l02j3j7d8apkl");
  res.json({ result: "d9w29skuw32k9duao2l02j3j7d8apkl" });
});
```

#### redirect(url, alt)

```
router.get("/test/redirect", (ctx, res, next) => {
  res.redirect("http://localhost:3000/test/get", 301);
});
```
