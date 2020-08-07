import fetch from 'node-fetch';
import Sequelize from 'sequelize';
import {app, router, model, service} from '../lib/index.js';

app.run(6000, {
    "staticPath": "test/static",
    "uploadPath": "test/upload",
    "database": {
        "type": "sqlite",
        "config": {
            "path": "test/data/test_service.db"
        }
    }
});

model.create('userModel', {
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

// inject model
@service("user", "userModel")
class UserService {
    constructor(userModel) {
        this.model = userModel;
    }
    add(user) {
        return this.model.create(user);
    }
    find(data) {
        return this.model.findAll({ where: data });
    }
}

// inject service
@service("user2", "user")
class UserService2 {
    constructor(user) {
        this.service = user;
    }
    find2(data) {
        return this.service.find(data);
    }
}

router.get("/test/service", async (ctx, res, next, services) => {
    let user = services.user;
    let user2 = services.user2;
    let record = await user.add({name: "kidi-service-new"});

    let records = await user2.find2({name: "kidi-service-new"});
    if(records.length > 0) {
        res.json({"result": records[0].dataValues.name})
    } else {
        res.json({"result": "none"})
    }
})

// service--------------------------
describe("service", () => {
    test('test service: di', async () => {
        let result = await fetch("http://localhost:6000/test/service").then(res => res.json());
        expect(result.result).toBe("kidi-service-new");
    });

    test('test service: di error', async () => {
        class Test {
            constructor(hello) {
                console.log(hello);
            }
        }
        try{
            service.create('user3', Test, 'hello');
        } catch(err) {
            expect(err.message).toBe("hello 依赖注入失败")
        }
    });
})