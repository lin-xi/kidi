import context from "../core/context.js";

function Guard(guardClass) {
  return function (target) {
    if (!context.guards[target.name]) {
      context.guards[target.name] = [];
    }
    context.guards[target.name].push(guardClass);
  };
}

export { Guard };
