import fetch from 'node-fetch';
import Sequelize from 'sequelize';
import {app, router, model, service} from '../lib/index.js';

app.run(4000, {
    "staticPath": "test/static",
    "uploadPath": "test/upload",
    "database": {
        "type": "sqlite",
        "config": {
            "path": "test/data/test.db"
        }
    }
});

let userModel = model.create('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    }  //资源配置
})

service.create('user', class UserService {
    constructor(models) {
        this.model = models.user;
    }
    async add(user) {
        return this.model.create(user);
    }
    async update(where, data) {
        return this.model.update(data, { where });
    }
    async del(where) {
        this.model.destroy({ where });
    }
})

app.on('error', err => {
    app.context.trace(err);
});

// db--------------------------
describe("db", ()=> {
    test('test db:connect', async () => {
        try {
            await await model.authenticate();
            expect(1).toBe(1);
          } catch (error) {
            expect(0).toBe(1);
          }
    });
});

// model--------------------------
describe("model", ()=> {
    test('test model', () => {
        let testUser = model.create('test_user', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(128),
                allowNull: false
            }  //资源配置
        })
        expect(testUser).not.toBe(undefined);
    });

    test('test model:append record', async () => {
        let ins = await userModel.create({name: "kidi22"});
        expect(ins.dataValues.name).toBe("kidi22");
    });

    test('test model:query record', async () => {
        await userModel.create({name: "kidi33"});
        let list = await userModel.findAll({where: {name: "kidi33"}});
        expect(list.length).toBeGreaterThan(0);
    });

    test('test router:update record', async () => {
        await userModel.create({name: "kidi44"});
        let user = await userModel.findOne({where: {name: "kidi44"}});
        user.name = "kidi55"
        let newIns = await user.save();
        expect(newIns.name).toBe("kidi55");
    });

    test('test router:delete record', async () => {
        await userModel.create({name: "kidi66"});
        let user = await userModel.findOne({where: {name: "kidi66"}});
        let newIns = await user.destroy();
        let newUser = await userModel.findAll({where: {name: "kidi66"}});
        expect(newUser.length).toBe(0);
    });
}); 
