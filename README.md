### react 留言板项目联系

#### 项目结构

```bash
├── /dist/            # 输出目录
├── /src/             # 源码目录
│ ├── /components/    # 通用组件
│ ├── /components/    # 容器组件
│ ├── /server/        # express
│ ├── /utils/         # 工具函数
│ ├── app.js          # 入口文件
│ ├── action          # 状态管理文件
│ ├── reducer.js      # reducer
│ └── store           
├── package.json      # 项目信息
└── webpack.config.js # webpack 配置
```
#### 快速开始

克隆项目文件:

    git clone git@github.com:caoaoyu/react-comment.git

安装依赖:

    npm i 或者 yarn install


开发：

```bash
npm start
打开 http://0.0.0.0:1337/
```