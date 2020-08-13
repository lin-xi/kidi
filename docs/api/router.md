# router

### 方法

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

#### get(path, middleware)

```
router.get("/test/get", (ctx, res, next) => {
  res.json({ result: "get" });
});
```

#### post(path, middleware)

```
router.post("/test/post", (ctx, res, next) => {
  res.json({ result: "post" });
});
```

#### put(path, middleware)

```
router.put("/test/put", (ctx, res, next) => {
  res.json({ result: "put" });
});
```

#### patch(path, middleware)

```
router.patch("/test/patch", (ctx, res, next) => {
  res.json({ result: "patch" });
});
```

#### delete(path, middleware)

```
router.delete("/test/get", (ctx, res, next) => {
  res.json({ result: "delete" });
});
```

#### all(path, middleware)

```
router.all("/test/all", (ctx, res, next) => {
  res.json({ result: "all" });
});
```

#### use(path, middleware)

```
router.use("/test/use", (ctx, res, next) => {
  ctx.query.hello = "world";
  next();
});
```

#### param(path, middleware)

```
router.param("page", (page, ctx, next) => {
  if (/\n+/.test(page)) {
    return (ctx.status = 404);
  }
  return next();
})
```

#### prefix(path, middleware)

```
router.get("/test/get", (ctx, res, next) => {
  res.json({ result: "get" });
});
```

#### redirect(sourcePath, disPath, statusCode)

```
router.redirect("/test/redirect_get", "/test/get", 301);
```
