import path from "path";
import { EntitySchema, getRepository, createConnection } from "typeorm";
import { connect } from "http2";
const ROOT = path.resolve();

export default class ModelBase {
  constructor() {
    this.models = {};
  }

  async connect(config) {
    console.log("connect>>>>>", config);
    if (config && config.database) {
      let dbconfig = config.database;
      if (dbconfig) {
        switch (dbconfig.type) {
          case "mysql":
            break;
          case "postgres":
            break;
          case "sqlite":
            this.db = await this.connectSqlite();
            this.db.synchronize(true);
            console.log("🟠 database connected!");
            break;
        }
      }
    }
  }

  create(name, columns) {
    const m = new EntitySchema({
      name,
      columns,
    });
    this.models[name] = new Model(m);
    return this.models[name];
  }

  connectSqlite(opts) {
    opts.database = path.join(ROOT, opts.database);
    opts.entities = Object.values(this.models);
    console.log("connect>>>>>", opts);

    return createConnection(opts);
  }
}

class Model {
  constructor(entity) {
    this.entity = entity;
  }
  async add(data) {
    console.log("add >>>>", this.db);
    const respository = getRepository(this.entity);
    console.log("respository >>>>", respository);
    let record = respository.create(data);
    respository.save(record);
  }
  async remove(instance) {
    const respository = getRepository(this.entity);
    return respository.remove(instance);
  }
  async delete(where) {
    const respository = getRepository(this.entity);
    return respository.delete(where);
  }
  async merge(instance, data) {
    const respository = getRepository(this.entity);
    return respository.merge(instance, data);
  }
  async update(where, data) {
    const respository = getRepository(this.entity);
    return respository.update(where, data);
  }
  async count(where) {
    const respository = getRepository(this.entity);
    return respository.count(this.entity, where);
  }
  async find(where) {
    const respository = getRepository(this.entity);
    return respository.find(where);
  }
  async findAndCount(where) {
    const respository = getRepository(this.entity);
    return respository.findAndCount(where);
  }
  async findOne(where) {
    const respository = getRepository(this.entity);
    return respository.findOne(where);
  }
}
