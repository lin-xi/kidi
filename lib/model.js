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
                this.config = config;

                if (!(config && config.database)) {
                  _context.next = 12;
                  break;
                }

                dbconfig = config.database;

                if (!dbconfig) {
                  _context.next = 12;
                  break;
                }

                _context.t0 = dbconfig.type;
                _context.next = _context.t0 === "mysql" ? 7 : _context.t0 === "postgres" ? 7 : _context.t0 === "sqlite" ? 7 : 12;
                break;

              case 7:
                _context.next = 9;
                return this.connectSqlite(dbconfig, config);

              case 9:
                this.db = _context.sent;
                // this.db.synchronize(true);
                console.log("🟠 database connected!");
                return _context.abrupt("break", 12);

              case 12:
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
    key: "connectSqlite",
    value: function () {
      var _connectSqlite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(opts, config) {
        var connection;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (opts.database) {
                  opts.database = _path["default"].join(config.ROOT, opts.database);
                  console.log("🟠 db file path:", opts.database);
                }

                opts.entities = Object.values(this.models).map(function (item) {
                  return item.entity;
                });
                _context2.next = 4;
                return (0, _typeorm.createConnection)(opts);

              case 4:
                connection = _context2.sent;
                // set connection
                Object.values(this.models).forEach(function (mod) {
                  mod.setConnection(connection);
                });
                return _context2.abrupt("return", connection);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function connectSqlite(_x2, _x3) {
        return _connectSqlite.apply(this, arguments);
      }

      return connectSqlite;
    }()
  }, {
    key: "synchronize",
    value: function synchronize() {
      if (this.db) {
        this.db.synchronize();
      }
    }
  }, {
    key: "create",
    value: function create(name, options) {
      options.name = name;
      this.log("create model [".concat(name, "]"), options);
      var m = new _typeorm.EntitySchema(options);
      this.models[name] = new Model(m);
      return this.models[name];
    }
  }, {
    key: "log",
    value: function log() {
      if (this.config && this.config.debug) {
        var _console;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_console = console).log.apply(_console, ["💡 "].concat(args));
      }
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
    key: "setConnection",
    value: function setConnection(connection) {
      this.connection = connection;
      this.respository = connection.getRepository(this.entity);
    }
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
        var record;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.respository) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model add:", data);
                record = this.respository.create(data);
                return _context3.abrupt("return", this.respository.save(record));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function add(_x4) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(instance) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.respository) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model remove:", instance);
                return _context4.abrupt("return", this.respository.remove(instance));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function remove(_x5) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(where) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.respository) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model delete:", where);
                return _context5.abrupt("return", this.respository["delete"](where));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "merge",
    value: function () {
      var _merge = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(instance, data) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.respository) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model merge:", instance, data);
                return _context6.abrupt("return", this.respository.merge(instance, data));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function merge(_x7, _x8) {
        return _merge.apply(this, arguments);
      }

      return merge;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(where, data) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.respository) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model update:", where, data);
                return _context7.abrupt("return", this.respository.update(where, data));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function update(_x9, _x10) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "count",
    value: function () {
      var _count = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(where) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this.respository) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model query:", where);
                return _context8.abrupt("return", this.respository.count(where));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function count(_x11) {
        return _count.apply(this, arguments);
      }

      return count;
    }()
  }, {
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(where) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.respository) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model query:", where);
                return _context9.abrupt("return", this.respository.find(where));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function find(_x12) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "findAndCount",
    value: function () {
      var _findAndCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(where) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.respository) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model query:", where);
                return _context10.abrupt("return", this.respository.findAndCount(where));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function findAndCount(_x13) {
        return _findAndCount.apply(this, arguments);
      }

      return findAndCount;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(where) {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.respository) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return", new Error("database is not connected"));

              case 2:
                console.log("🟠 model query:", where);
                return _context11.abrupt("return", this.respository.findOne(where));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function findOne(_x14) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "executeSQL",
    value: function () {
      var _executeSQL = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(sql) {
        var rawData;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.connection.query(sql);

              case 2:
                rawData = _context12.sent;
                return _context12.abrupt("return", rawData);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function executeSQL(_x15) {
        return _executeSQL.apply(this, arguments);
      }

      return executeSQL;
    }()
  }]);
  return Model;
}();