# kidi
![kidi](kidi.png)

kidi is a koa based node.js framework with powerful dependency injection and Express like API style，and a powerful UI scaffolds！

`koa`  `di` `model`  `service`


[![build](https://travis-ci.org/lin-xi/kidi.svg?branch=master "build")](https://travis-ci.org/lin-xi/kidi)
[![coverage](https://coveralls.io/repos/github/lin-xi/kidi/badge.svg?branch=master "coverage")](https://coveralls.io/github/lin-xi/kidi?branch=master)
[![download](http://img.shields.io/npm/dm/kidi.svg "download")](https://npmcharts.com/compare/kidi?minimal=true)
![LICENSE](https://img.shields.io/badge/License-MIT-yellow.svg "LICENSE")

<hr>

## Start in 5mins

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
decoration style
```
import {service} from "kidi";

@service('project', 'projectModel') // service name: project, inject projectModel
class PorjectService {
    constructor(projectModel) {
        this.model = projectModel
    }
    add() {
        console.log("model add");
    }
}
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

## 


