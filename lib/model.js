import path from "path";
import { EntitySchema, getManager } from "typeorm";
const ROOT = path.resolve();

export default class ModelBase {
  constructor() {
    this.models = {};
  }

  async connect(config) {
    return new Promise(async (resolve, reject) => {
      if (config && config.database) {
        let dbconfig = Object.assign(config.database, {
          migrationsTableName: "custom_migration_table",
          migrations: ["migration/*.js"],
          cli: {
            migrationsDir: "migration",
          },
        });
        if (dbconfig) {
          switch (dbconfig.type) {
            case "mysql":
              break;
            case "postgres":
              break;
            case "sqlite":
              this.db = await createConnection({
                type: "sqlite",
                database: path.join(ROOT, dbconfig.config.path),
                logging: true,
              });
              console.log("🟠 database connected!");
              resolve();
              break;
          }
        }
      } else {
        resolve();
      }
    });
  }

  create(name, columns) {
    if (!this.db) {
      throw new Error("数据库未配置");
    }
    let m = new EntitySchema({
      name,
      columns,
    });
    this.models[name] = new Model(m);
    return this.models[name];
  }
}

class Model {
  constructor(entity) {
    this.entity = entity;
  }
  async add(data) {
    const manager = getManager();
    return manager.create(this.entity, data);
  }
  async remove(instance) {
    const manager = getManager();
    return manager.remove(instance);
  }
  async delete(where) {
    const manager = getManager();
    return manager.delete(this.entity, where);
  }
  async merge(instance, data) {
    const manager = getManager();
    return manager.merge(this.entity, instance, data);
  }
  async update(where, data) {
    const manager = getManager();
    return manager.update(this.entity, where, data);
  }
  async count(where) {
    const manager = getManager();
    return manager.count(this.entity, where);
  }
  async find(where) {
    const manager = getManager();
    return manager.find(this.entity, where);
  }
  async findAndCount(where) {
    const manager = getManager();
    return manager.findAndCount(this.entity, where);
  }
  async findOne(where) {
    const manager = getManager();
    return manager.findOne(this.entity, where);
  }
}
