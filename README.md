# kidi

![kidi](kidi.png)

kidi is a light weight framework runs on node intergrated with sqlite and ORM, and a powerful web console.

[![build](https://travis-ci.org/lin-xi/kidi.svg?branch=master "build")](https://travis-ci.org/lin-xi/kidi)
[![Coverage Status](https://coveralls.io/repos/github/lin-xi/kidi/badge.svg)](https://coveralls.io/github/lin-xi/kidi)
[![download](http://img.shields.io/npm/dm/kidi.svg "download")](https://npmcharts.com/compare/kidi?minimal=true)
![LICENSE](https://img.shields.io/badge/License-MIT-yellow.svg "LICENSE")

<hr>

## Start in 5mins

### structure

```
.
├── routers
│   └── project.js
├── models
│   └── project.js
├── services
│   └── project.js
├── server.config.js
└── server.js
```

### model

project.js

```
import {model} from "kidi";
import Sequelize from 'sequelize';

model.create("projectModel", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false
  }
});

```

### service

project.js
(decoration style)

```
import {service} from "kidi";

@service('project', 'projectModel')
// service name: project, inject: projectModel
class PorjectService {
    constructor(projectModel) {
        this.model = projectModel
    }
    add() {
        console.log("model add");
    }
}
```

or

```
import {service} from "kidi";

class PorjectService {
    constructor(projectModel) {
        this.model = projectModel
    }
    add() {
        console.log("model add");
    }
}
service.create('project', PorjectService, 'projectModel');
```

### router

project.js

```
import {router} from "kidi";
router.get('/add', (req, res, next, services) => {
    let projectService = services.project;
    // do something with service
    res.json({data: {message: "hello, world"}})
})

```

### server.js

```
import {app} from "kidi";
app.run(3000);
```

## Server configuration

add a server.config.js file in the root directory

```
{
    "staticPath": "/public",
    "uploadPath": "test/upload",
    "database": {
        "dialect": "sqlite",
        "config": {
            "path": "/data/something.db"
        }
    }
}
```

or

```
app.run(3000, {
    "staticPath": "test/static",
    "uploadPath": "test/upload",
    "database": {
        "type": "sqlite",
        "config": {
            "path": "test/data/test.db"
        }
    }
});
```

# Realse Note

`version 1.1.0`

- [x] change ORM to typeORM
