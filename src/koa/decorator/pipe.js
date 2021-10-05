import context from "../core/context.js";

function Pipe(pipeClass) {
  return function (target) {
    if (!context.pipes[target.name]) {
      context.pipes[target.name] = [];
    }
    context.pipes[target.name].push(pipeClass);
  };
}

export { Pipe };
