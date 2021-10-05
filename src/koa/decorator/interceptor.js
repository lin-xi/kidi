import context from "../core/context.js";

function Interceptor(interceptorClass) {
  return function (target) {
    if (!context.interceptors[target.name]) {
      context.interceptors[target.name] = [];
    }
    context.interceptors[target.name].push(interceptorClass);
  };
}

export { Interceptor };
