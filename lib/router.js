"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

      this.router.get(path, function (ctx, next) {
        var res = new _response["default"](_this.app, ctx);
        return middleware.apply(_this.router, [ctx, res, next, _this.services]);
      });

      this._registerRouter();

      this.log("GET", path);
      return this;
    }
  }, {
    key: "post",
    value: function post(path, middleware) {
      var _this2 = this;

      this.router.post(path, function (ctx, next) {
        var res = new _response["default"](_this2.app, ctx);
        ctx.body = ctx.request.body;
        return middleware.apply(_this2.router, [ctx, res, next, _this2.services]);
      });

      this._registerRouter();

      this.log("POST", path);
      return this;
    }
  }, {
    key: "put",
    value: function put(path, middleware) {
      var _this3 = this;

      this.router.put(path, function (ctx, next) {
        var res = new _response["default"](_this3.app, ctx);
        ctx.body = ctx.request.body;
        return middleware.apply(_this3.router, [ctx, res, next, _this3.services]);
      });

      this._registerRouter();

      this.log("PUT", path);
      return this;
    }
  }, {
    key: "patch",
    value: function patch(path, middleware) {
      var _this4 = this;

      this.router.patch(path, function (ctx, next) {
        var res = new _response["default"](_this4.app, ctx);
        ctx.body = ctx.request.body;
        return middleware.apply(_this4.router, [ctx, res, next, _this4.services]);
      });

      this._registerRouter();

      this.log("PATCH", path);
      return this;
    }
  }, {
    key: "delete",
    value: function _delete(path, middleware) {
      var _this5 = this;

      this.router["delete"](path, function (ctx, next) {
        var res = new _response["default"](_this5.app, ctx);
        ctx.body = ctx.request.body;
        return middleware.apply(_this5.router, [ctx, res, next, _this5.services]);
      });

      this._registerRouter();

      this.log("DELETE", path);
      return this;
    }
  }, {
    key: "all",
    value: function all(path, middleware) {
      var _this6 = this;

      this.router.all(path, function (ctx, next) {
        var res = new _response["default"](_this6.app, ctx);
        ctx.body = ctx.request.body;
        return middleware.apply(_this6.router, [ctx, res, next, _this6.services]);
      });

      this._registerRouter();

      this.log("ALL", path);
      return this;
    }
  }, {
    key: "use",
    value: function use(pattern, middleware) {
      var _this7 = this;

      this.router.use(pattern, function (ctx, next) {
        var res = new _response["default"](_this7.app, ctx);
        return middleware.apply(_this7.router, [ctx, res, next, _this7.services]);
      });

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
  }, {
    key: "log",
    value: function log() {
      if (this.app && this.app.config && this.app.config.debug) {
        var _console;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_console = console).log.apply(_console, ["💡 "].concat(args));
      }
    }
  }]);
  return Route;
}();

exports["default"] = Route;