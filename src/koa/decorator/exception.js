import context from "../core/context.js";

function Exception(exceptionClass) {
  return function (target) {
    if (!context.exceptions[target.name]) {
      context.exceptions[target.name] = [];
    }
    context.exceptions[target.name].push(exceptionClass);
  };
}

export { Exception };
