import http from 'http';
const { STATUS_CODES } = http;

export default class Response {
    constructor(app, ctx) {
        this.app = app;
        this.ctx = ctx;
        this.res = ctx.response;
    }

    status(code) {
        this.res.status = code;
        return this;
    }

    json(data) {
        this.res.type = 'application/json';
        this.res.status = 200;
        this.res.body = JSON.stringify(data);
    }

    jsonp(data) {
        this.res.type = 'application/json'
        this.res.status = 200;
        this.res.body = `${callback}(${JSON.stringify(data)})`
    }

    sendStatus(statusCode) {
        const body = STATUS_CODES[statusCode] || String(statusCode);
        return this.status(statusCode).send(body);
    }

    type(type) {
        this.res.type = type;
        return this;
    }

    attachment(filename) {
        this.res.attachment(filename);
        return this;
    }

    append(field, val) {
        this.res.append(field, val);
        return this;
    }

    set() {
        this.res.set(...arguments);
        return this;
    }

    get(field) {
        return this.res.get(field);
    }

    clearCookie(name, options) {
    }

    cookie(name, value, options) {
        this.res.cookies.set(name, value, options);
        return this;
    }

    redirect(url, alt) {
        this.res.redirect(url, alt);
        return this;
    }
}
