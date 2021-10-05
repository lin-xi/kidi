import KoaApplication from "./koa/index.js";

class Factory {
  constructor() {
    if (new.target) {
      throw new Error("Singleton pattern class, new is not allowed");
    }
  }

  static create(target) {
    if (target.name === "KoaApplication") {
      return new KoaApplication();
    }
  }
}

export { Factory, KoaApplication };
