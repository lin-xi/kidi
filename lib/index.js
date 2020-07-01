import fs from "fs";
import Koa from "koa";
import path from "path";
import zlib from "zlib";
import etag from "koa-etag";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import staticRoot from 'koa-static';
import conditional from "koa-conditional-get";
import logger from "koa-logger";
import favicon from "koa-favicon";
import responseTime from "koa-response-time";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import trace from "./trace.js"
import Router from "./router.js";
import Model from "./model.js";
import Service from "./service.js";

const ROOT = path.resolve();
const app = new Koa();

//读取配置文件
let configPath = path.join(ROOT, "server/server.config.json");
const config = require(configPath)

// 模型
let model = new Model(config);
app.models = model.models;
let services = new Service(app);
app.services = services
// 路由
let router = new Router(app);

// bodyParser
app.use(bodyParser());
//gzip压缩
app.use(compress({
  filter (content_type) {
      return /text/i.test(content_type)
  },
  threshold: 2048,
  gzip: {
    flush: zlib.Z_SYNC_FLUSH
  },
  deflate: {
    flush: zlib.Z_SYNC_FLUSH,
  },
  br: false // disable brotli
}));
app.use(conditional());
app.use(etag());
//logger
app.use(logger());
//trace
trace(app);
//favicon
app.use(favicon(ROOT + 'public/favicon.ico'));
//response time
app.use(responseTime({ hrtime: true }));

//start server
app.run = (port, configuration) => {
  if (configuration) {
    config = configuration;
  }
  if(config.static) {
    //静态目录
    let sp = path.join(ROOT, config.static);
    console.log("静态目录>", sp);
    app.use(staticRoot(sp));
  }
  //初始化模型
  importModules("server/models");
  //初始化服务
  importModules("server/services");
  //初始化路由
  importModules("server/routers")
  //启动
  app.listen(port);
  console.log(' ')
  console.log(' ')
  console.log('      88                      88      ')
  console.log('      88         88           88  88  ')
  console.log('      88   ,d8        ,adPPYb,88      ')
  console.log('      88 ,a8"    88  a8"    `Y88  88  ')
  console.log('      8888[      88  8b       88  88  ')
  console.log('      88`"Yba,   88  "8a,   ,d88  88  ')
  console.log('      88   `Y8a  88   `"8bbdP"Y8  88  ')
  console.log(' ')
  console.log('   = = = = = = = = v1.0.2 = = = = = = =')
  console.log(' ')

  console.log("kidi started at 🚀: http://localhost:3000");
};

function importModules(dirPath) {
  let files = fs.readdirSync(path.join(ROOT, dirPath));
  files.forEach(file => {
    import(path.join(ROOT, dirPath, file));
  })
}
// service decoration
function service(target, name){
  services.add(name, target)
}
service.create = (name, Clas) => {
  services.create(name, target)
}

export {app, router, model, service}