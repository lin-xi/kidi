import path from "path"
import Sequelize from 'sequelize';
import "better-sqlite3";

const ROOT = path.resolve();

export default class Model {
    constructor(config) {
        this.init(config);
    }

    init(config) {
        this.models = {};
        if(config && config.database) {
            let dbconfig = config.database;
            if(dbconfig) {
                switch(dbconfig.type) {
                    case "mysql":
                        break;
                    case "postgres":
                        break;
                    case "sqlite":
                        this.db = new Sequelize({
                            dialect: 'sqlite',
                            storage: path.join(ROOT, dbconfig.config.path),
                            logging: console.log
                        });
                        this.db.sync()
                        break;
                }
            }
        }
    }

    async authenticate() {
        return this.db.authenticate()
    }

    create(name, fields) {
        if(!this.db) {
            throw new Error('数据库未配置');
        }
        let m = this.db.define(name, fields);
        this.models[name] = m;
        return m;
    }
}
