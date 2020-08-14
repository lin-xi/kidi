"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.service = service;
exports.model = exports.router = exports.app = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fs = _interopRequireDefault(require("fs"));

var _koa = _interopRequireDefault(require("koa"));

var _path = _interopRequireDefault(require("path"));

var _zlib = _interopRequireDefault(require("zlib"));

var _koaEtag = _interopRequireDefault(require("koa-etag"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _koaCompress = _interopRequireDefault(require("koa-compress"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaFavicon = _interopRequireDefault(require("koa-favicon"));

var _koaResponseTime = _interopRequireDefault(require("koa-response-time"));

var _router = _interopRequireDefault(require("./router.js"));

var _model = _interopRequireDefault(require("./model.js"));

var _service = _interopRequireDefault(require("./service.js"));

var _package = _interopRequireDefault(require("../package.json"));

var ROOT = _path["default"].resolve();

var app = new _koa["default"](); //读取配置文件

exports.app = app;

var configPath = _path["default"].join(ROOT, "server.config.json");

var config = {};

if (_fs["default"].existsSync(configPath)) {
  config = JSON.parse(_fs["default"].readFileSync(configPath, "utf8"));
} // 模型


var model = new _model["default"](config);
exports.model = model;
app.models = model;
var services = new _service["default"](app);
app.services = services; // 路由

var router = new _router["default"](app); // bodyParser

exports.router = router;
app.use((0, _koaBody["default"])({
  multipart: true,
  formidable: {
    uploadDir: _path["default"].join(ROOT, config && config.uploadPath ? config.uploadPath : "upload"),
    maxFieldsSize: 2 * 1024 * 1024
  }
})); //gzip压缩

app.use((0, _koaCompress["default"])({
  filter: function filter(content_type) {
    return /text/i.test(content_type);
  },
  threshold: 2048,
  gzip: {
    flush: _zlib["default"].Z_SYNC_FLUSH
  },
  deflate: {
    flush: _zlib["default"].Z_SYNC_FLUSH
  },
  br: false // disable brotli

}));
app.use((0, _koaEtag["default"])()); //logger

app.use((0, _koaLogger["default"])()); //favicon

app.use((0, _koaFavicon["default"])(ROOT + "public/favicon.ico")); //response time

app.use((0, _koaResponseTime["default"])({
  hrtime: true
})); //start server

app.run = function (port, configuration) {
  if (configuration) {
    config = (0, _extends2["default"])(config, configuration);
  }

  if (config.staticPath) {
    //静态目录
    var sp = _path["default"].join(ROOT, config.staticPath);

    app.use((0, _koaStatic["default"])(sp));
  }

  setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //初始化模型
            importModules("server/models"); //初始化服务

            importModules("server/services"); //初始化路由

            importModules("server/routers");
            _context.next = 5;
            return model.connect(config);

          case 5:
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

            console.log("kidi started at \uD83D\uDE80: http://localhost:".concat(port));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), 500);
};

function importModules(dirPath) {
  if (_fs["default"].existsSync(_path["default"].join(ROOT, dirPath))) {
    var files = _fs["default"].readdirSync(_path["default"].join(ROOT, dirPath));

    files.forEach(function (file) {
      Promise.resolve("".concat(_path["default"].join(ROOT, dirPath, file))).then(function (s) {
        return (0, _interopRequireWildcard2["default"])(require(s));
      });
    });
  }
} // service decoration


function service(name) {
  for (var _len = arguments.length, injection = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    injection[_key - 1] = arguments[_key];
  }

  return function (target) {
    services.create(name, target, injection);
  };
}

service.create = function (name, target) {
  for (var _len2 = arguments.length, injection = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    injection[_key2 - 2] = arguments[_key2];
  }

  services.create(name, target, injection);
};