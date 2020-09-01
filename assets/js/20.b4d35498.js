(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{372:function(e,t,a){"use strict";a.r(t);var s=a(42),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"快速入门"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快速入门"}},[e._v("#")]),e._v(" 快速入门")]),e._v(" "),a("h3",{attrs:{id:"目录结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#目录结构"}},[e._v("#")]),e._v(" 目录结构")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(".\n├── routers\n│   └── project.js\n├── models\n│   └── project.js\n├── services\n│   └── project.js\n├── server.config.js\n└── server.js\n")])])]),a("h3",{attrs:{id:"模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模型"}},[e._v("#")]),e._v(" 模型")]),e._v(" "),a("p",[e._v("project.js")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('import {model} from "kidi";\n\nmodel.create("projectModel", {\n    columns: {\n        id: {\n            type: Number,\n            primary: true,\n            generated: "increment",\n        },\n        name: {\n            type: String,\n        }\n    }\n});\n\n')])])]),a("h3",{attrs:{id:"服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#服务"}},[e._v("#")]),e._v(" 服务")]),e._v(" "),a("p",[e._v("project.js\n(decoration style)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("import {service} from \"kidi\";\n\n@service('project', 'projectModel')\n// service name: project, inject: projectModel\nclass PorjectService {\n    constructor(projectModel) {\n        this.model = projectModel\n    }\n    add() {\n        console.log(\"model add\");\n    }\n}\n")])])]),a("p",[e._v("or")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("import {service} from \"kidi\";\n\nclass PorjectService {\n    constructor(projectModel) {\n        this.model = projectModel\n    }\n    add() {\n        console.log(\"model add\");\n    }\n}\nservice.create('project', PorjectService, 'projectModel');\n")])])]),a("h3",{attrs:{id:"路由"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#路由"}},[e._v("#")]),e._v(" 路由")]),e._v(" "),a("p",[e._v("project.js")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('import {router} from "kidi";\nrouter.get(\'/add\', (req, res, next, services) => {\n    let projectService = services.project;\n    // do something with service\n    res.json({data: {message: "hello, world"}})\n})\n\n')])])]),a("h3",{attrs:{id:"启动应用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动应用"}},[e._v("#")]),e._v(" 启动应用")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('import {app} from "kidi";\napp.run(3000);\n')])])]),a("h3",{attrs:{id:"应用配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#应用配置"}},[e._v("#")]),e._v(" 应用配置")]),e._v(" "),a("p",[e._v("add a server.config.json file in the root directory\n"),a("code",[e._v("sqlite")]),e._v(" configuration")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('{\n    "staticPath": "/public",\n    "uploadPath": "test/upload",\n    "database": {\n        "type": "sqlite",\n        "database": "/data/something.db",\n        "logging": true\n        "synchronize": true,\n    }\n}\n')])])]),a("p",[e._v("or")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('app.run(3000, {\n    "staticPath": "test/static",\n    "uploadPath": "test/upload",\n    "database": {\n       "type": "sqlite",\n        "database": "/data/something.db",\n        "logging": true\n        "synchronize": true,\n    }\n});\n')])])])])}),[],!1,null,null,null);t.default=r.exports}}]);