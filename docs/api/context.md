# 上下文(Context)

Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。 这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。

_每个_ 请求都将创建一个 Context，并在中间件中作为接收器引用，或者 ctx 标识符，如以下代码片段所示：

```
app.use(async ctx => {
    ctx; // 这是 Context
    ctx.request; // 这是 koa Request
    ctx.response; // 这是 koa Response
});
```

为方便起见许多上下文的访问器和方法直接委托给它们的 ctx.request 或 ctx.response ，不然的话它们是相同的。 例如 ctx.type 和 ctx.length 委托给 response 对象，ctx.path 和 ctx.method 委托给 request。

## API

Context 具体方法和访问器.

**ctx.req**

Node 的 request 对象.

**ctx.res**

Node 的 response 对象.

绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：

res.statusCode
res.writeHead()
res.write()
res.end()
ctx.request
koa 的 Request 对象.

**ctx.response**

koa 的 Response 对象.

**ctx.state**

推荐的命名空间，用于通过中间件传递信息和你的前端视图。

ctx.state.user = await User.find(id);
ctx.app
应用程序实例引用

**ctx.app.emit**

Koa 应用扩展了内部 EventEmitter。ctx.app.emit 发出一个类型由第一个参数定义的事件。对于每个事件，您可以连接 "listeners"，这是在发出事件时调用的函数。有关更多信息，请参阅错误处理文档。

**ctx.cookies.get(name, [options])**

通过 options 获取 cookie name:

signed 所请求的 cookie 应该被签名
koa 使用 cookies 模块，其中只需传递参数。

**ctx.cookies.set(name, value, [options])**

通过 options 设置 cookie name 的 value :

maxAge: 一个数字, 表示从 Date.now() 得到的毫秒数.
expires: 一个 Date 对象, 表示 cookie 的到期日期 (默认情况下在会话结束时过期).
path: 一个字符串, 表示 cookie 的路径 (默认是/).
domain: 一个字符串, 指示 cookie 的域 (无默认值).
secure: 一个布尔值, 表示 cookie 是否仅通过 HTTPS 发送 (HTTP 下默认为 false, HTTPS 下默认为 true). 阅读有关此参数的更多信息.
httpOnly: 一个布尔值, 表示 cookie 是否仅通过 HTTP(S) 发送，, 且不提供给客户端 JavaScript (默认为 true).
sameSite: 一个布尔值或字符串, 表示该 cookie 是否为 "相同站点" cookie (默认为 false). 可以设置为 'strict', 'lax', 'none', 或 true (映射为 'strict').
signed: 一个布尔值, 表示是否要对 cookie 进行签名 (默认为 false). 如果为 true, 则还会发送另一个后缀为 .sig 的同名 cookie, 使用一个 27-byte url-safe base64 SHA1 值来表示针对第一个 Keygrip 键的 cookie-name=cookie-value 的哈希值. 此签名密钥用于检测下次接收 cookie 时的篡改.
overwrite: 一个布尔值, 表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（无论路径或域）是否在设置此 Cookie 时从 Set-Cookie 消息头中过滤掉.
koa 使用传递简单参数的 cookies 模块。

**ctx.throw([status], [msg], [properties])**

用来抛出一个包含 .status 属性错误的帮助方法，其默认值为 500。这样 Koa 就可以做出适当地响应。

允许以下组合：

```
ctx.throw(400);
ctx.throw(400, 'name required');
ctx.throw(400, 'name required', { user: user });

```

例如 ctx.throw(400, 'name required') 等效于:

```
const err = new Error('name required');
err.status = 400;
err.expose = true;
throw err;

```

请注意，这些是用户级错误，并用 err.expose 标记，这意味着消息适用于客户端响应，这通常不是错误消息的内容，因为您不想泄漏故障详细信息。

你可以根据需要将 properties 对象传递到错误中，对于装载上传给请求者的机器友好的错误是有用的。这用于修饰其人机友好型错误并向上游的请求者报告非常有用。

**ctx.throw(401, 'access_denied', { user: user });**

koa 使用 http-errors 来创建错误。status 只应作为第一个参数传递。

**ctx.assert(value, [status], [msg], [properties])**

当 !value 时抛出一个类似 .throw 错误的帮助方法。这与 node 的 assert() 方法类似.

**ctx.assert(ctx.state.user, 401, 'User not found. Please login!');**

koa 使用 http-assert 作为断言。

**ctx.respond**

为了绕过 Koa 的内置 response 处理，你可以显式设置 ctx.respond = false;。 如果您想要写入原始的 res 对象而不是让 Koa 处理你的 response，请使用此参数。

请注意，Koa _不_ 支持使用此功能。这可能会破坏 Koa 中间件和 Koa 本身的预期功能。使用这个属性被认为是一个 hack，只是便于那些希望在 Koa 中使用传统的 fn(req, res) 功能和中间件的人。
