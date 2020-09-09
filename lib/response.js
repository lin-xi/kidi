"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Response = /*#__PURE__*/function () {
  function Response(app, ctx) {
    (0, _classCallCheck2["default"])(this, Response);
    this.app = app;
    this.ctx = ctx;
    this.response = ctx.response;
  }

  (0, _createClass2["default"])(Response, [{
    key: "status",
    value: function status(code) {
      this.ctx.status = code;
      return this;
    }
  }, {
    key: "json",
    value: function json(data) {
      if (data) {
        this.response.type = "application/json";
        this.ctx.status = 200;
        this.response.body = JSON.stringify(data);
      } else {
        return JSON.parse(this.response.body);
      }
    }
  }, {
    key: "jsonp",
    value: function jsonp(callback, data) {
      this.response.type = "text/javascript";
      this.ctx.status = 200;
      this.response.body = ";".concat(callback, "(").concat(JSON.stringify(data), ")");
    }
  }, {
    key: "type",
    value: function type(_type) {
      this.ctx.type = _type;
      return this;
    }
  }, {
    key: "attachment",
    value: function attachment(filename) {
      this.response.attachment(filename);
      return this;
    }
  }, {
    key: "append",
    value: function append(field, val) {
      this.response.append(field, val);
      return this;
    }
  }, {
    key: "set",
    value: function set() {
      var _this$response;

      (_this$response = this.response).set.apply(_this$response, arguments);

      return this;
    }
  }, {
    key: "get",
    value: function get(field) {
      return this.response.get(field);
    }
  }, {
    key: "cookie",
    value: function cookie(name, value, options) {
      this.ctx.cookies.set(name, value, options);
      return this;
    }
  }, {
    key: "redirect",
    value: function redirect(url, alt) {
      this.response.redirect(url, alt);
      return this;
    }
  }]);
  return Response;
}();

exports["default"] = Response;