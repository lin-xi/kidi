import context from "../core/context.js";

function Controller(rootPath) {
  return function (target) {
    //保存controllr的路由和类
    if (!context.routers[target.name]) {
      context.routers[target.name] = {};
    }
    context.routers[target.name].rootPath = rootPath;
  };
}

function Get(routePath) {
  return function (target, key, descriptor) {
    let className = target.constructor.name;

    const originDescriptor = descriptor.value;
    if (typeof fn === "function") {
      descriptor.value = function () {
        return originDescriptor.apply(this, arguments);
      }.bind(this);
    }
    if (!context.routers[className]) {
      context.routers[className] = { route: {} };
    }
    context.routers[className].route[routePath] = {
      method: "GET",
      fn: descriptor.value,
    };
  };
}

function Post(routePath) {
  return function (target, key, descriptor) {
    let className = target.constructor.name;
    const originDescriptor = descriptor.value;
    if (typeof fn === "function") {
      descriptor.value = function () {
        if (fn.apply(this, arguments)) {
          return originDescriptor.apply(this, arguments);
        } else {
          console.log(">> before reject");
        }
      }.bind(this);
    }
    if (!context.routers[className]) {
      context.routers[className] = { route: {} };
    }
    context.routers[className].route[routePath] = {
      method: "POST",
      fn: descriptor.value,
    };
  };
}

function Delete() {
  return function (target, key, descriptor) {
    let className = target.constructor.name;
    const originDescriptor = descriptor.value;
    if (typeof fn === "function") {
      descriptor.value = function () {
        if (fn.apply(this, arguments)) {
          return originDescriptor.apply(this, arguments);
        } else {
          console.log(">> before reject");
        }
      }.bind(this);
    }
    if (!context.routers[className]) {
      context.routers[className] = { route: {} };
    }
    context.routers[className].route[routePath] = {
      method: "POST",
      fn: descriptor.value,
    };
  };
}

export { Controller, Get, Post, Delete };
