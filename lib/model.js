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

var _path = _interopRequireDefault(require("path"));

var _typeorm = require("typeorm");

var ROOT = _path["default"].resolve();

var ModelBase = /*#__PURE__*/function () {
  function ModelBase() {
    (0, _classCallCheck2["default"])(this, ModelBase);
    this.models = {};
  }

  (0, _createClass2["default"])(ModelBase, [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(config) {
        var dbconfig;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(config && config.database)) {
                  _context.next = 11;
                  break;
                }

                dbconfig = config.database;

                if (!dbconfig) {
                  _context.next = 11;
                  break;
                }

                _context.t0 = dbconfig.type;
                _context.next = _context.t0 === "mysql" ? 6 : _context.t0 === "postgres" ? 6 : _context.t0 === "sqlite" ? 6 : 11;
                break;

              case 6:
                _context.next = 8;
                return this.connectSqlite(dbconfig);

              case 8:
                this.db = _context.sent;
                // this.db.synchronize(true);
                console.log("🟠 database connected!");
                return _context.abrupt("break", 11);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect(_x) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "synchronize",
    value: function synchronize() {
      this.db.synchronize();
    }
  }, {
    key: "create",
    value: function create(name, options) {
      var opts = Object.assign(options, {
        name: name
      });
      var m = new _typeorm.EntitySchema(opts);
      this.models[name] = new Model(m);
      return this.models[name];
    }
  }, {
    key: "connectSqlite",
    value: function connectSqlite(opts) {
      if (opts.database) {
        opts.database = _path["default"].join(ROOT, opts.database);
      }

      opts.entities = Object.values(this.models).map(function (item) {
        return item.entity;
      });
      return (0, _typeorm.createConnection)(opts);
    }
  }]);
  return ModelBase;
}();

exports["default"] = ModelBase;

var Model = /*#__PURE__*/function () {
  function Model(entity) {
    (0, _classCallCheck2["default"])(this, Model);
    this.entity = entity;
  }

  (0, _createClass2["default"])(Model, [{
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        var respository, record;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                record = respository.create(data);
                return _context2.abrupt("return", respository.save(record));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function add(_x2) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(instance) {
        var respository;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                return _context3.abrupt("return", respository.remove(instance));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function remove(_x3) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(where) {
        var respository;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                return _context4.abrupt("return", respository["delete"](where));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _delete(_x4) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "merge",
    value: function () {
      var _merge = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(instance, data) {
        var respository;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                return _context5.abrupt("return", respository.merge(instance, data));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function merge(_x5, _x6) {
        return _merge.apply(this, arguments);
      }

      return merge;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(where, data) {
        var respository;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                return _context6.abrupt("return", respository.update(where, data));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "count",
    value: function () {
      var _count = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(where) {
        var respository;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                return _context7.abrupt("return", respository.count(where));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function count(_x9) {
        return _count.apply(this, arguments);
      }

      return count;
    }()
  }, {
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(where) {
        var respository;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                return _context8.abrupt("return", respository.find(where));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function find(_x10) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "findAndCount",
    value: function () {
      var _findAndCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(where) {
        var respository;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                return _context9.abrupt("return", respository.findAndCount(where));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function findAndCount(_x11) {
        return _findAndCount.apply(this, arguments);
      }

      return findAndCount;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(where) {
        var respository;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                respository = (0, _typeorm.getRepository)(this.entity);
                return _context10.abrupt("return", respository.findOne(where));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function findOne(_x12) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }]);
  return Model;
}();