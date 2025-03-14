# 心情鼓励器

一个简单的网页应用，帮助用户表达当前心情并获得鼓励性反馈。

## 功能

- 通过滑块选择当前心情评分（1-10 分）
- 点击按钮获取基于心情评分的鼓励性反馈
- 简洁美观的用户界面

## 技术栈

- React
- TypeScript
- CSS

## 本地开发

### 前提条件

- Node.js (v14.0.0 或更高版本)
- npm (v6.0.0 或更高版本)

### 安装步骤

1. 克隆仓库

```
git clone <仓库地址>
cd mood-encourage
```

2. 安装依赖

```
npm install
```

3. 启动开发服务器

```
npm start
```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 部署

### 构建生产版本

```
npm run build
```

生成的文件将位于 `build` 目录中，可以部署到任何静态网站托管服务。

## 集成 DeepSeek API

目前，应用使用模拟数据提供反馈。要集成 DeepSeek API，需要：

1. 创建一个后端服务或使用无服务器函数（如 Netlify Functions 或 Vercel Serverless Functions）
2. 在后端服务中处理 DeepSeek API 调用
3. 取消注释 `App.tsx` 中的 `getDeepSeekFeedback` 函数并更新 API 端点

## 许可证

MIT
