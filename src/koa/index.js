import path from "path";
import factory from "./koa.js";
import context from "./core/context";
import ServerContext from "./core/serverContext";
import { middleware, plugin } from "./core/use";
import GuardMiddleware from "./core/GuardMiddleware";
import PipeMiddleware from "./core/PipeMiddleware";
import ExceptionMiddleware from "./core/ExceptionMiddleware.js";
import Exception from "./core/Exception.js";

export default class KoaApplication {
  constructor(option) {
    this.engine = factory(option);
  }

  //注册模块
  regist(controller) {
    let className = controller.name;
    let serverContext = new ServerContext(this.engine.app);
    if (context.routers[className]) {
      process.nextTick(() => {
        let { router } = this.engine;
        //注册带路由中间件, 注册Interceptor
        this._regitstMiddleware(serverContext, context, className, router);
        //注册路由
        this._regitstRouter(context, className, router);
      });
      return serverContext;
    } else {
      throw new Exception(
        400,
        "Controller regist failed! Please make sure you have a deceoration @Controller on the Controller"
      );
    }
  }

  //全局注册
  use() {
    // use("interceptor", InterceptionMiddleware);
    middleware(this.engine, ...arguments);
  }

  plugin(pluginClass) {
    // plugin("kidi-mysql")
    plugin(this.engine, pluginClass);
  }

  //注册带路由中间件, 注册Interceptor
  _regitstMiddleware(serverContext, context, className, router) {
    let routeData = context.routers[className];
    let mids = [];
    //exception
    let instance = new ExceptionMiddleware(serverContext);
    mids.push([instance.use, instance]);

    //middleware
    let allMiddlewares = []
      .concat(serverContext.middlewares)
      .concat(context.middlewares[className] || []);
    if (allMiddlewares.length > 0) {
      let fns = allMiddlewares.map((classFn) => {
        let instance = new classFn();
        if (instance.use && typeof instance.use === "function") {
          return [instance.use, instance];
        } else {
          throw new Exception(
            400,
            `Middleware class [${classFn.name}] must contains a 'use' function.`
          );
        }
      });
      mids = mids.concat(fns);
    }
    //guard
    let allguards = []
      .concat(context.guards[className] || [])
      .concat(serverContext.guards);
    if (allguards.length > 0) {
      let instance = new GuardMiddleware(allguards);
      mids.push([instance.use, instance]);
    }
    //interceptor
    let allInterceptors = []
      .concat(context.interceptors[className] || [])
      .concat(serverContext.interceptors);
    if (allInterceptors.length > 0) {
      let fns = allInterceptors.map((classFn) => {
        let instance = new classFn();
        if (instance.intercept && typeof instance.intercept === "function") {
          return [instance.intercept, instance];
        } else {
          throw new Exception(
            400,
            `Interceptor class [${classFn.name}] must contains a 'intercept' function.`
          );
        }
      });
      mids = mids.concat(fns);
    }
    //pipe
    let allPipes = []
      .concat(context.pipes[className] || [])
      .concat(serverContext.pipes);
    if (allPipes.length > 0) {
      let instance = new PipeMiddleware(allPipes);
      mids.push([instance.use, instance]);
    }
    router.use(routeData.rootPath, mids);
  }

  //注册路由
  _regitstRouter(context, className, router) {
    let routeData = context.routers[className];
    Object.keys(routeData.route).forEach((item) => {
      let info = routeData.route[item];
      let fullPath = path.join(routeData.rootPath, item);
      let proxyFn = function (req, res) {
        //router触发
        info.fn.apply(this, [req, res]);
      };
      if (info.method === "GET") {
        router.get(fullPath, proxyFn);
      } else if (info.method === "POST") {
        router.post(fullPath, proxyFn);
      } else if (info.method === "DELETE") {
        router.post(fullPath, proxyFn);
      }
    });
  }

  async listen(port, ip) {
    await this.engine.app.run(port, ip);
  }
}
