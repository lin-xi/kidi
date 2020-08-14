"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _response = _interopRequireDefault(require("./response.js"));

var Route = /*#__PURE__*/function () {
  function Route(app) {
    (0, _classCallCheck2["default"])(this, Route);
    this.app = app;
    this.router = new _koaRouter["default"]();
    this.services = app.services.services;
  }

  (0, _createClass2["default"])(Route, [{
    key: "get",
    value: function get(path, middleware) {
      var _this = this;

      this.router.get(path, /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
          var res;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  res = new _response["default"](_this.app, ctx);
                  _context.next = 3;
                  return middleware.apply(_this.router, [ctx, res, next, _this.services]);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      this._registerRouter();

      return this;
    }
  }, {
    key: "post",
    value: function post(path, middleware) {
      var _this2 = this;

      this.router.post(path, /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx, next) {
          var res;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  res = new _response["default"](_this2.app, ctx);
                  _context2.next = 3;
                  return middleware.apply(_this2.router, [ctx, res, next, _this2.services]);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());

      this._registerRouter();

      return this;
    }
  }, {
    key: "put",
    value: function put(path, middleware) {
      var _this3 = this;

      this.router.put(path, /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx, next) {
          var res;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  res = new _response["default"](_this3.app, ctx);
                  _context3.next = 3;
                  return middleware.apply(_this3.router, [ctx, res, next, _this3.services]);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());

      this._registerRouter();

      return this;
    }
  }, {
    key: "patch",
    value: function patch(path, middleware) {
      var _this4 = this;

      this.router.patch(path, /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx, next) {
          var res;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  res = new _response["default"](_this4.app, ctx);
                  _context4.next = 3;
                  return middleware.apply(_this4.router, [ctx, res, next, _this4.services]);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());

      this._registerRouter();

      return this;
    }
  }, {
    key: "delete",
    value: function _delete(path, middleware) {
      var _this5 = this;

      this.router["delete"](path, /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx, next) {
          var res;
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  res = new _response["default"](_this5.app, ctx);
                  _context5.next = 3;
                  return middleware.apply(_this5.router, [ctx, res, next, _this5.services]);

                case 3:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());

      this._registerRouter();

      return this;
    }
  }, {
    key: "all",
    value: function all(path, middleware) {
      var _this6 = this;

      this.router.all(path, /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(ctx, next) {
          var res;
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  res = new _response["default"](_this6.app, ctx);
                  _context6.next = 3;
                  return middleware.apply(_this6.router, [ctx, res, next, _this6.services]);

                case 3:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());

      this._registerRouter();

      return this;
    }
  }, {
    key: "use",
    value: function use(pattern, middleware) {
      var _this7 = this;

      this.router.use(pattern, /*#__PURE__*/function () {
        var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ctx, next) {
          var res;
          return _regenerator["default"].wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  res = new _response["default"](_this7.app, ctx);
                  _context7.next = 3;
                  return middleware.apply(_this7.router, [ctx, res, next, _this7.services]);

                case 3:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }());

      this._registerRouter();

      return this;
    }
  }, {
    key: "param",
    value: function param(path, middleware) {
      this.router.param(path, middleware);

      this._registerRouter();

      return this;
    }
  }, {
    key: "prefix",
    value: function prefix(pattern) {
      this.router.prefix(pattern);

      this._registerRouter();

      return this;
    }
  }, {
    key: "redirect",
    value: function redirect(source, destination, code) {
      this.router.redirect(source, destination, code);

      this._registerRouter();

      return this;
    }
  }, {
    key: "_registerRouter",
    value: function _registerRouter() {
      this.app.use(this.router.routes(), this.router.allowedMethods());
    }
  }]);
  return Route;
}();

exports["default"] = Route;