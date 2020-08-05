import fetch from 'node-fetch';
import Sequelize from 'sequelize';
import {app, router, model, service} from '../lib/index.js';

app.run(3000, {
    "staticPath": "test/static",
    "uploadPath": "test/upload",
    "database": {
        "type": "sqlite",
        "config": {
            "path": "test/data/test.db"
        }
    }
});

app.on('error', err => {
    app.context.trace(err);
});

router.get("/test/get", (ctx, res, next) => {
    res.json({result: 'get'});
})
router.post("/test/post", (ctx, res, next) => {
    res.json({result: 'post'});
})
router.post("/test/postdata", (ctx, res, next) => {
    res.json({result: ctx.request.body});
})
router.put("/test/put", (ctx, res, next) => {
    res.json({result: 'put'});
})
router.delete("/test/delete", (ctx, res, next) => {
    res.json({result: 'delete'});
})
router.patch("/test/patch", (ctx, res, next) => {
    res.json({result: 'patch'});
})
router.all("/test/all", (ctx, res, next) => {
    res.json({result: 'all'});
})
router.use("/test/use", (ctx, res, next) => {
    ctx.query.hello = "world";
    next();
})
router.get("/test/use", (ctx, res, next) => {
    res.json({result: ctx.query.hello});
})
router.get("/test/res_status", (ctx, res, next) => {
    res.status(404);
})
router.get("/test/get_cookie", (ctx, res, next) => {
    res.type("application/json");
    res.json({result: ctx.cookies.get('name')});
})
router.get("/test/set_cookie", (ctx, res, next) => {
    res.cookie("sessionid", "d9w29skuw32k9duao2l02j3j7d8apkl");
    res.append("sessionid", "d9w29skuw32k9duao2l02j3j7d8apkl");
    res.set("sessionid", "d9w29skuw32k9duao2l02j3j7d8apkl");
    console.log(res.get("sessionid"));
    res.json({result: "d9w29skuw32k9duao2l02j3j7d8apkl"});
})
router.param("page", (page, ctx, next) => {
    if(/\n+/.test(page)) {
        return ctx.status = 404;
    }
    return next()
}).get("/test/param/:page", (ctx, res, next) => {
    res.json({result: ctx.params.page});
})
router.get("/test/dynamic_param/:id", (ctx, res, next) => {
    res.json({result: ctx.params.id});
})
router.post("/test/form", (ctx, res, next) => {
    res.json({result: ctx.request.body});
})
router.post("/test/formdata", (ctx, res, next) => {
    res.json({result: ctx.request.body});
})
router.redirect("/test/redirect_get", "/test/get", 301);

router.get("/test/redirect", (ctx, res, next) => {
    res.redirect("http://localhost:3000/test/get", 301);
});

router.get("/test/jsonp", (ctx, res, next) => {
    let callback = ctx.query.callback || 'nothing';
    res.jsonp(callback, {
        result: "jsonp"
    });
})

// app--------------------------

describe("app--------", ()=> {
    test('test serve static files', async () => {
        let result = await fetch("http://localhost:3000/file.txt").then(res => res.text());
        expect(result).toBe('hello');
    });
});

// router--------------------------
describe("router", ()=> {
    test('test router:get', async () => {
        let result = await fetch("http://localhost:3000/test/get").then(res => res.json());
        expect(result.result).toBe('get');
    });
    
    test('test router:post', async () => {
        let result = await fetch("http://localhost:3000/test/post", { method: 'POST'}).then(res => res.json());
        expect(result.result).toBe('post');
    });

    test('test router:put', async () => {
        let result = await fetch("http://localhost:3000/test/put", { method: 'PUT'}).then(res => res.json());
        expect(result.result).toBe('put');
    });

    test('test router:delete', async () => {
        let result = await fetch("http://localhost:3000/test/delete", { method: 'DELETE'}).then(res => res.json());
        expect(result.result).toBe('delete');
    });

    test('test router:patch', async () => {
        let result = await fetch("http://localhost:3000/test/patch", { method: 'PATCH'}).then(res => res.json());
        expect(result.result).toBe('patch');
    });

    test('test router:all', async () => {
        let result = await fetch("http://localhost:3000/test/all").then(res => res.json());
        expect(result.result).toBe('all');
    });

    test('test router:use', async () => {
        let result = await fetch("http://localhost:3000/test/use").then(res => res.json());
        expect(result.result).toBe('world');
    });

    test('test router:param', async () => {
        let result = await fetch("http://localhost:3000/test/param/8").then(res => res.json());
        expect(result.result).toBe("8");

        result = await fetch("http://localhost:3000/test/param/hello", { method: 'PATCH'}).then(res => res.text());
        expect(result.result).toBe(undefined);
    });

    test('test router:dynamic param', async () => {
        let result = await fetch("http://localhost:3000/test/dynamic_param/138").then(res => res.json());
        expect(result.result).toBe('138');
    });

    test('test post: application/json', async () => {
        let result = await fetch("http://localhost:3000/test/postdata", { 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({"hello": "world"})
        }).then(res => {
            return res.json();
        });
        expect(result.result).toMatchObject({"hello": "world"});
    });

    test('test post: form-urlencoded', async () => {
        let result = await fetch("http://localhost:3000/test/form", {
            method:"POST",
            headers:{
    		  "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "hello=kidi"
        }).then(res => res.json());
        expect(result.result).toMatchObject({"hello": "kidi"});
    });

    test('test upload: formdata', async () => {
        let formdata = new FormData();
        formdata.append("hello", "kidi")
        let result = await fetch("http://localhost:3000/test/formdata", {
            method:"POST",
            headers:{
    		  "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "hello=kidi"
        }).then(res => res.json());
        expect(result.result).toMatchObject({"hello": "kidi"});
    });

    test('test res:status', async () => {
        let result = await fetch("http://localhost:3000/test/res_status");
        expect(result.status).toBe(404);
    });

    test('test cookie:set', async () => {
        let result = await fetch("http://localhost:3000/test/set_cookie");
        expect(result.headers.get("set-cookie")).toBe("sessionid=d9w29skuw32k9duao2l02j3j7d8apkl; path=/; httponly");
    });

    test('test cookie:get', async () => {
        let result = await fetch("http://localhost:3000/test/get_cookie", { 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
                "Cookie": "name=kidi"
            }
        }).then(res => res.json());
        expect(result.result).toBe("kidi");
    });

    test('test res:redirect_get', async () => {
        let result = await fetch("http://localhost:3000/test/redirect_get").then(res => res.json());
        expect(result.result).toBe('get');
    });

    test('test res:redirect', async () => {
        let result = await fetch("http://localhost:3000/test/redirect").then(res => res.json());
        expect(result.result).toBe('get');
    });

    test('test res:jsonp', async () => {
        let result = await fetch("http://localhost:3000/test/jsonp?callback=kidi").then(res => res.text());
        expect(result).toBe(";kidi({\"result\":\"jsonp\"})");
    });

    test('test router:prefix', async () => {
        router.prefix("/kidi")
        let result = await fetch("http://localhost:3000/kidi/test/get").then(res => res.json());
        expect(result.result).toBe('get');
        router.prefix("/")
    });

});