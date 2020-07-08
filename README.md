# kidi
![kidi](kidi.png)

kidi is a koa based node.js framework with powerful dependency injection and Express like API style，and a powerful UI scaffolds！

`koa`  `di` `model`  `service`

<hr>
## Start in 5mins

### model
project.js
```
import {model} from "kidi";
import Sequelize from 'sequelize';

model.create("projects", {
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
```
import {service} from "kidi";

class PorjectService {
    constructor(models) {
        this.model = models.projects
    }
    add() {
        console.log("model add");
    }
}
service.create('project', PorjectService)
```
decoration style
```
import {service} from "kidi";

@service('project')
class PorjectService {
    constructor(models) {
        this.model = models.projects
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


