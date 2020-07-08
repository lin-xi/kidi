import fetch from 'node-fetch';
import Sequelize from 'sequelize';
import {app, router, model, service} from '../lib/index.js';

app.run(5000, {
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

// service--------------------------
describe("model", ()=> {
    test('test service: invoke', () => {
        router.post("/test/post", async (ctx, res, next, services) => {
            res.json({result: 'post'});
            let user = services.user;
            user.create({name: "kidi-service"});

            let u = await user.findOne({where: {name: "kidi-service"}});
            expect(u.name).toBe("kidi-service");
        })
        
    });
})

// di-------------------------------
describe("di", ()=> {
    test('test model di', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('test service di', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

function sum(a, b)  {
    return a + b;
}