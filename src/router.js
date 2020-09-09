import Router from "koa-router";
import Response from "./response.js";

export default class Route {
  constructor(app) {
    this.app = app;
    this.router = new Router();
    this.services = app.services.services;
  }

  get(path, middleware) {
    this.router.get(path, (ctx, next) => {
      let res = new Response(this.app, ctx);
      return middleware.apply(this.router, [ctx, res, next, this.services]);
    });
    this._registerRouter();
    this.log("GET", path);
    return this;
  }
  post(path, middleware) {
    this.router.post(path, (ctx, next) => {
      let res = new Response(this.app, ctx);
      ctx.body = ctx.request.body;
      return middleware.apply(this.router, [ctx, res, next, this.services]);
    });
    this._registerRouter();
    this.log("POST", path);
    return this;
  }
  put(path, middleware) {
    this.router.put(path, (ctx, next) => {
      let res = new Response(this.app, ctx);
      ctx.body = ctx.request.body;
      return middleware.apply(this.router, [ctx, res, next, this.services]);
    });
    this._registerRouter();
    this.log("PUT", path);
    return this;
  }
  patch(path, middleware) {
    this.router.patch(path, (ctx, next) => {
      let res = new Response(this.app, ctx);
      ctx.body = ctx.request.body;
      return middleware.apply(this.router, [ctx, res, next, this.services]);
    });
    this._registerRouter();
    this.log("PATCH", path);
    return this;
  }
  delete(path, middleware) {
    this.router.delete(path, (ctx, next) => {
      let res = new Response(this.app, ctx);
      ctx.body = ctx.request.body;
      return middleware.apply(this.router, [ctx, res, next, this.services]);
    });
    this._registerRouter();
    this.log("DELETE", path);
    return this;
  }
  all(path, middleware) {
    this.router.all(path, (ctx, next) => {
      let res = new Response(this.app, ctx);
      ctx.body = ctx.request.body;
      return middleware.apply(this.router, [ctx, res, next, this.services]);
    });
    this._registerRouter();
    this.log("ALL", path);
    return this;
  }
  use(pattern, middleware) {
    this.router.use(pattern, (ctx, next) => {
      let res = new Response(this.app, ctx);
      return middleware.apply(this.router, [ctx, res, next, this.services]);
    });
    this._registerRouter();
    return this;
  }
  param(path, middleware) {
    this.router.param(path, middleware);
    this._registerRouter();
    return this;
  }

  prefix(pattern) {
    this.router.prefix(pattern);
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

  log(...args) {
    if (this.app && this.app.config && this.app.config.debug) {
      console.log("💡 ", ...args);
    }
  }
}
