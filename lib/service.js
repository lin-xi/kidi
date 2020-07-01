export default class Service {
    constructor(app) {
        this.app = app;
        this.services = {};
    }
    create(name, Clas) {
        this.services[name] = new Clas(this.app.models);
    }
}
