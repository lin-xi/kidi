import Router from "koa-router";
import Response from "./response.js";

export default class Route {
    constructor(app) {
        this.app = app;
        this.router = new Router();
        
        this.services = app.services.services;
    }
    
    get(path, middleware) {
        this.router.get(path, async (ctx, next) => {
            let res = new Response(this.app, ctx);
            await middleware.apply(this.router, [ctx, res, next, this.services])
        });
        this._registerRouter();
        return this;
    }
    post(path, middleware) {
        this.router.post(path, async (ctx, next) => {
            let res = new Response(this.app, ctx);
            await middleware.apply(this.router, [ctx, res, next, this.services])
        })
        this._registerRouter();
        return this;
    }
    put(path, middleware) {
        this.router.put(path, async (ctx, next) => {
            let res = new Response(this.app, ctx);
            await middleware.apply(this.router, [ctx, res, next, this.services])
        })
        this._registerRouter();
        return this;
    }
    patch(path, middleware) {
        this.router.patch(path, async (ctx, next) => {
            let res = new Response(this.app, ctx);
            await middleware.apply(this.router, [ctx, res, next, this.services])
        })
        this._registerRouter();
        return this;
    }
    delete(path, middleware) {
        this.router.delete(path, async (ctx, next) => {
            let res = new Response(this.app, ctx);
            await middleware.apply(this.router, [ctx, res, next, this.services])
        })
        this._registerRouter();
        return this;
    }
    all(path, middleware) {
        this.router.all(path, async (ctx, next) => {
            let res = new Response(this.app, ctx);
            await middleware.apply(this.router, [ctx, res, next, this.services])
        })
        this._registerRouter();
        return this;
    }
    use(pattern, middleware) {
        this.router.use(pattern, async (ctx, next) => {
            let res = new Response(this.app, ctx);
            await middleware.apply(this.router, [ctx, res, next, this.services])
        })
        this._registerRouter();
        return this;
    }
    param(path, middleware) {
        this.router.param(path, middleware);
        this._registerRouter();
        return this;
    }
    
    prefix(pattern) {
        this.router.prefix(pattern)
        this._registerRouter();
        return this;
    }

    redirect(source, destination, code) {
        this.router.redirect(source, destination, code);
        this._registerRouter();
        return this;
    }

    _registerRouter() {
        this.app.use(this.router.routes(), this.router.allowedMethods());
    }
}
    