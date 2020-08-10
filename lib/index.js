import fs from "fs";
import Koa from "koa";
import path from "path";
import zlib from "zlib";
import etag from "koa-etag";
import bodyParser from "koa-body";
import compress from "koa-compress";
import staticRoot from "koa-static";
import logger from "koa-logger";
import favicon from "koa-favicon";
import responseTime from "koa-response-time";

import Router from "./router.js";
import Model from "./model.js";
import Service from "./service.js";

import globalConfig from "../package.json";

const ROOT = path.resolve();
const app = new Koa();

//读取配置文件
let configPath = path.join(ROOT, "server.config.json");
let config = {};
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, "utf8"));
}

// 模型
let model = new Model(config);
app.models = model;

let services = new Service(app);
app.services = services;
// 路由
let router = new Router(app);

// bodyParser
app.use(
  bodyParser({
    multipart: true,
    formidable: {
      uploadDir: path.join(
        ROOT,
        config && config.uploadPath ? config.uploadPath : "upload"
      ),
      maxFieldsSize: 2 * 1024 * 1024,
    },
  })
);

//gzip压缩
app.use(
  compress({
    filter(content_type) {
      return /text/i.test(content_type);
    },
    threshold: 2048,
    gzip: {
      flush: zlib.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: zlib.Z_SYNC_FLUSH,
    },
    br: false, // disable brotli
  })
);
app.use(etag());
//logger
app.use(logger());
//favicon
app.use(favicon(ROOT + "public/favicon.ico"));
//response time
app.use(responseTime({ hrtime: true }));

//start server
app.run = (port, configuration) => {
  if (configuration) {
    config = Object.assign(config, configuration);
  }
  if (config.staticPath) {
    //静态目录
    let sp = path.join(ROOT, config.staticPath);
    app.use(staticRoot(sp));
  }
  setTimeout(async () => {
    //初始化模型
    importModules("server/models");
    //初始化服务
    importModules("server/services");
    //初始化路由
    importModules("server/routers");
    await model.connect(config);
    //启动
    app.listen(port);
    /*
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
    console.log(`   = = = = = = = = v${globalConfig.version} = = = = = = =`)
    console.log(' ')
    */
    console.log(`kidi started at 🚀: http://localhost:${port}`);
  }, 500);
};

function importModules(dirPath) {
  if (fs.existsSync(path.join(ROOT, dirPath))) {
    let files = fs.readdirSync(path.join(ROOT, dirPath));
    files.forEach((file) => {
      import(path.join(ROOT, dirPath, file));
    });
  }
}
// service decoration
function service(name, ...injection) {
  return function (target) {
    services.create(name, target, injection);
  };
}

service.create = function (name, target, ...injection) {
  services.create(name, target, injection);
};

export { app, router, model, service };
