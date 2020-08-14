module.exports = {
  title: "kidi",
  base: "/kidi/",
  description: "an application framework for node.js",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "教程", link: "/guide/" },
      { text: "API", link: "/api/" },
      { text: "CLI", link: "/cli/" },
      { text: "案例", link: "/example/" },
      { text: "Github", link: "https://github.com/lin-xi/kidi" },
    ],
    sidebar: [
      {
        title: "教程", // 必要的
        path: "/guide/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          {
            title: "介绍", // 必要的
            path: "/guide/introduce.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "安装", // 必要的
            path: "/guide/install.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "客户端工具", // 必要的
            path: "/guide/cli.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "快速入门", // 必要的
            path: "/guide/5min.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "路由", // 必要的
            path: "/guide/router.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "模型", // 必要的
            path: "/guide/model.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "服务", // 必要的
            path: "/guide/service.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "数据库", // 必要的
            path: "/guide/database.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1, // 可选的, 默认值是 1
          },
          {
            title: "中间件", // 必要的
            path: "/guide/middleware", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            children: [
              {
                title: "邮件", // 必要的
                path: "/guide/email.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              },
              {
                title: "Redis", // 必要的
                path: "/guide/email.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              },
            ],
          },
          {
            title: "全局配置", // 必要的
            path: "/guide/config.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          },
          {
            title: "运行部署", // 必要的
            path: "/guide/deploy.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            children: [
              {
                title: "docker", // 必要的
                path: "/cli/database.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
              },
              {
                title: "docker-compose", // 必要的
                path: "/cli/database.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
              },
              {
                title: "k8s", // 必要的
                path: "/cli/database.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
              },
              {
                title: "funcdock", // 必要的
                path: "/cli/database.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
              },
            ],
          },
          {
            title: "案例", // 必要的
            path: "/guide/example/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            children: [
              {
                title: "文件上传", // 必要的
                path: "/guide/email.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              },
            ],
          },
        ],
      },
      {
        title: "API",
        path: "/api/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          {
            title: "app", // 必要的
            path: "/api/app.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "context", // 必要的
            path: "/api/context.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "request", // 必要的
            path: "/api/request.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "response", // 必要的
            path: "/api/response.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "router", // 必要的
            path: "/api/router.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "model", // 必要的
            path: "/api/model.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "service", // 必要的
            path: "/api/service.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
        ],
      },
      {
        title: "CLI",
        path: "/cli/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          {
            title: "命令行工具", // 必要的
            path: "/cli/cli.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
          {
            title: "数据管理", // 必要的
            path: "/cli/database.md", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
          },
        ],
      },
    ],
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: false,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: false,
  },
};
