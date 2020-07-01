require("@babel/register");
const {app, router, model, service} = require('./mock.js');

model.create('user', {
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
    async update(user) {
        this.model.destroy({ where })
    }
})

test('test app start', () => {
    app.run(3000, {
        "database": {
            "dialect": "sqlite",
            "config": {
                "path": "/data/test.db"
            }
        }
    })
    setTimeout(()=> {
        expect(app.status).toBe(3);
    }, 1000)
});

test('test serve static files', () => {
    expect(sum(1, 2)).toBe(3);
});

// router--------------------------
test('test router:get', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:post', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:put', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:del', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:all', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:use', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:url', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:param', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:prefix', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:redirect', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:dynamic param', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test post: application/json', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test post: form-type', () => {
    expect(sum(1, 2)).toBe(3);
});
// db--------------------------
test('test db:connect', () => {
    let result = model.authenticate();
    expect(result).toBe(3);
});

// model--------------------------
test('test model:create', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test model:append record', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test model:query record', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:update record', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test router:delete record', () => {
    expect(sum(1, 2)).toBe(3);
});

// service--------------------------
test('test service: invoke', () => {
    expect(sum(1, 2)).toBe(3);
});

// di-------------------------------
test('test model di', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test service di', () => {
    expect(sum(1, 2)).toBe(3);
});