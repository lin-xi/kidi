import path from "path"
import Sequelize from 'sequelize';
import "better-sqlite3";

const ROOT = path.resolve();

export default class Model {
    constructor(config) {
        this.models = {};
        let dbconfig = config.database;
        if(dbconfig) {
            switch(dbconfig.dialect) {
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
                    break;
            }
        }
    }

    create(name, fields) {
        this.models[name] = this.db.define(name, fields)
    }

    get(name) {
        return this.models(name)
    }
}
