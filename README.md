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
- Vercel Serverless Functions
- DeepSeek API

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

## DeepSeek API 集成

本应用使用 DeepSeek API 生成鼓励性反馈。集成步骤如下：

1. 在 Vercel 上设置环境变量

   - 登录 Vercel 账户
   - 进入项目设置
   - 点击 "Environment Variables"
   - 添加名为 `DEEPSEEK_API_KEY` 的环境变量，值为您的 DeepSeek API 密钥

2. 部署应用

   - 应用会自动使用 Vercel Serverless Functions 处理 API 调用
   - 在生产环境中使用 DeepSeek API，在开发环境中使用模拟数据

3. API 调用流程
   - 前端发送心情分数到 `/api/deepseek` 端点
   - Serverless Function 调用 DeepSeek API 并返回结果
   - 前端显示 AI 生成的鼓励反馈

## 许可证

MIT
