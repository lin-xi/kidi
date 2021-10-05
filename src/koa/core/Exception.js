export default class Exception extends Error {
  constructor(code, message, stack = null) {
    super(message);
    this.code = code;
    this.message = message;
    this.stack = stack;
  }

  pipe(res) {
    let result = "";
    if (this.stack) {
      result = this.stack.toString();
    }
    res.end({
      code: this.code,
      message: this.message,
      result,
    });
  }
}
