(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{390:function(t,e,a){"use strict";a.r(e);var n=a(42),s=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"model-模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#model-模型"}},[t._v("#")]),t._v(" model 模型")]),t._v(" "),a("p",[t._v("model 集成了 typeORM，详情文档可参考"),a("a",{attrs:{href:"https://typeorm.io/",target:"_blank"}},[t._v("typeORM")])]),t._v(" "),a("h3",{attrs:{id:"创建-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建-model"}},[t._v("#")]),t._v(" 创建 model")]),t._v(" "),a("p",[a("strong",[t._v("create(name, options)")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数名称")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("类型")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("name")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("string")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("model 名称")])]),t._v(" "),a("tr",[a("td",[t._v("options")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("object")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("配置参数"),a("br"),t._v(" columns: 列定义"),a("br"),t._v(" checks: 列定义"),a("br"),t._v(" indices: 列定义"),a("br"),t._v(" uniques: 列定义")])])])]),t._v(" "),a("p",[t._v("返回值 Model 类实例")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('import { app, model } from "kidi";\n\nlet testModel = model.create("testModel", {\n  columns: {\n      id: {\n          primary: true,\n          type: "int",\n          generated: "increment"\n      },\n      firstName: {\n          type: String,\n          length: 30\n      },\n      lastName: {\n          type: String,\n          length: 50,\n          nullable: false\n      },\n      age: {\n          type: Number,\n          nullable: false\n      }\n  },\n  checks: [\n      { expression: `"firstName" <> \'John\' AND "lastName" <> \'Doe\'` },\n      { expression: `"age" > 18` }\n  ],\n  indices: [\n      {\n          name: "IDX_TEST",\n          unique: true,\n          columns: [\n              "firstName",\n              "lastName"\n          ]\n      }\n  ],\n  uniques: [\n      {\n          name: "UNIQUE_TEST",\n          columns: [\n              "firstName",\n              "lastName"\n          ]\n      }\n  ]\n});\n')])])]),a("h3",{attrs:{id:"model-类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#model-类"}},[t._v("#")]),t._v(" Model 类")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("方法名称")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("描述")]),t._v(" "),a("th",[t._v("默认")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("add(obj)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("添加")]),t._v(" "),a("td",[t._v("无")])]),t._v(" "),a("tr",[a("td",[t._v("remove(obj)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除实例")]),t._v(" "),a("td",[t._v("false")])]),t._v(" "),a("tr",[a("td",[t._v("delete(where)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("按条件删除")]),t._v(" "),a("td",[t._v("无")])]),t._v(" "),a("tr",[a("td",[t._v("merge(old, data)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("更新")]),t._v(" "),a("td",[t._v("无")])]),t._v(" "),a("tr",[a("td",[t._v("update(where, data)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("更新")]),t._v(" "),a("td",[t._v("true")])]),t._v(" "),a("tr",[a("td",[t._v("count(where)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("查询个数")]),t._v(" "),a("td",[t._v("true")])]),t._v(" "),a("tr",[a("td",[t._v("find(where)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("查询结果")]),t._v(" "),a("td",[t._v("true")])]),t._v(" "),a("tr",[a("td",[t._v("findAndCount(where)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("查询结果并返回个数")]),t._v(" "),a("td",[t._v("true")])]),t._v(" "),a("tr",[a("td",[t._v("findOne(where)")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("查询并返回命中的一个")]),t._v(" "),a("td",[t._v("true")])])])]),t._v(" "),a("p",[t._v("创建 model")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('import { app, model } from "kidi";\n\nlet userModel = model.create("userModel", {\n  id: {\n    type: Number,\n    primary: true,\n    generated: "increment",\n  },\n  name: {\n    type: String,\n  }, //资源配置\n});\n')])])]),a("p",[a("strong",[t._v("add(obj)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('let ins = await userModel.add({ name: "kidi22" });\nconsole.log(ins);\n')])])]),a("p",[a("strong",[t._v("remove(obj)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('let user = await userModel.findOne({ name: "kidi22" });\nawait userModel.remove(user);\n')])])]),a("p",[a("strong",[t._v("delete(where)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('userModel.delete({ name: "kidi22" });\n')])])]),a("p",[a("strong",[t._v("merge(old, data)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('let user = await userModel.findOne({ name: "kidi44" });\nawait userModel.merge(user, { name: "kidi55" });\n')])])]),a("p",[a("strong",[t._v("update(where, data)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('await userModel.update({ name: "kidi44" }, { name: "kidi55" });\n')])])]),a("p",[a("strong",[t._v("count(where)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('let count = await userModel.count({ name: "kidi33" });\nconsole.log(count);\n')])])]),a("p",[a("strong",[t._v("find(where)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("let list = await userModel.find();\nconsole.log(list);\n")])])]),a("p",[a("strong",[t._v("findAndCount(where)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('let [list, length] = await userModel.findAndCount({ name: "kidi33" });\nconsole.log(list, length);\n')])])]),a("p",[a("strong",[t._v("findOne(where)")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('let user = await userModel.findOne({ name: "kidi33" });\nconsole.log(user);\n')])])])])}),[],!1,null,null,null);e.default=s.exports}}]);