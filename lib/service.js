"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Service = /*#__PURE__*/function () {
  function Service(app) {
    (0, _classCallCheck2["default"])(this, Service);
    this.app = app;
    this.services = {};
  }

  (0, _createClass2["default"])(Service, [{
    key: "create",
    value: function create(name, Clas, injection) {
      var _this = this;

      var ins = injection.map(function (item) {
        if (_this.app.models.models[item]) {
          return _this.app.models.models[item];
        } else if (_this.app.services.services[item]) {
          return _this.app.services.services[item];
        }

        throw Error("".concat(item, " \u4F9D\u8D56\u6CE8\u5165\u5931\u8D25"));
      });
      this.services[name] = (0, _construct2["default"])(Clas, (0, _toConsumableArray2["default"])(ins));
    }
  }]);
  return Service;
}();

exports["default"] = Service;