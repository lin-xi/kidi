export default class Response {
  constructor(app, ctx) {
    this.app = app;
    this.ctx = ctx;
    this.response = ctx.response;
  }

  status(code) {
    this.ctx.status = code;
    return this;
  }

  json(data) {
    if (data) {
      this.response.type = "application/json";
      this.ctx.status = 200;
      this.response.body = JSON.stringify(data);
    } else {
      return JSON.parse(this.response.body);
    }
  }

  jsonp(callback, data) {
    this.response.type = "text/javascript";
    this.ctx.status = 200;
    this.response.body = `;${callback}(${JSON.stringify(data)})`;
  }

  type(type) {
    this.ctx.type = type;
    return this;
  }

  attachment(filename) {
    this.response.attachment(filename);
    return this;
  }

  append(field, val) {
    this.response.append(field, val);
    return this;
  }

  set() {
    this.response.set(...arguments);
    return this;
  }

  get(field) {
    return this.response.get(field);
  }

  cookie(name, value, options) {
    this.ctx.cookies.set(name, value, options);
    return this;
  }

  redirect(url, alt) {
    this.response.redirect(url, alt);
    return this;
  }
}
