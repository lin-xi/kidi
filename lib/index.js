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

var ROOT = _path["default"].dirname(process.argv[1]);

console.log("📁 root:", ROOT);
var app = new _koa["default"](); //读取配置文件

exports.app = app;

var configPath = _path["default"].join(ROOT, "server.config.json");

var config = {};
config.ROOT = ROOT;
app.config = config;

if (_fs["default"].existsSync(configPath)) {
  var content = _fs["default"].readFileSync(configPath, "utf8");

  try {
    config = Object.assign(config, JSON.parse(content));
  } catch (err) {
    console.log("\uD83D\uDCA3 server.config.json json parse error");
  }
}

function log() {
  if (config && config.debug) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, ["💡 "].concat(args));
  }
} // 模型


var model = new _model["default"]();
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
log("gzip is enabled");
app.use((0, _koaEtag["default"])()); //logger

app.use((0, _koaLogger["default"])()); //favicon

app.use((0, _koaFavicon["default"])(_path["default"].join(ROOT, "public/favicon.ico"))); //response time

app.use((0, _koaResponseTime["default"])({
  hrtime: true
})); //start server

app.run = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(port, configuration) {
    var sp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (configuration) {
              config = Object.assign(config, configuration);
            }

            if (config.staticPath) {
              //静态目录
              sp = _path["default"].join(ROOT, config.staticPath);
              app.use((0, _koaStatic["default"])(sp));
            } // 连接数据库


            _context.next = 4;
            return model.connect(config);

          case 4:
            //初始化模型
            log("init model");
            _context.next = 7;
            return importModules("models");

          case 7:
            log(Object.keys(model.models)); //初始化服务

            log("init service");
            _context.next = 11;
            return importModules("services");

          case 11:
            log(Object.keys(services.services)); //初始化路由

            log("init routers");
            _context.next = 15;
            return importModules("routers");

          case 15:
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

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function importModules(_x3) {
  return _importModules.apply(this, arguments);
} // service decoration


function _importModules() {
  _importModules = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(dirPath) {
    var dir, files;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dir = _path["default"].join(ROOT, dirPath);

            if (_fs["default"].existsSync(dir)) {
              files = _fs["default"].readdirSync(dir);
              files.forEach( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(file) {
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(_path["default"].extname(file) === ".js")) {
                            _context2.next = 4;
                            break;
                          }

                          log(_path["default"].join(dir, file));
                          _context2.next = 4;
                          return Promise.resolve("".concat(_path["default"].join(dir, file))).then(function (s) {
                            return (0, _interopRequireWildcard2["default"])(require(s));
                          });

                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }());
            } else {
              console.log("- \uD83D\uDCA3 ".concat(dir, " not exist"));
            }

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _importModules.apply(this, arguments);
}

function service(name) {
  for (var _len2 = arguments.length, injection = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    injection[_key2 - 1] = arguments[_key2];
  }

  return function (target) {
    services.create(name, target, injection);
  };
}

service.create = function (name, target) {
  for (var _len3 = arguments.length, injection = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    injection[_key3 - 2] = arguments[_key3];
  }

  services.create(name, target, injection);
};