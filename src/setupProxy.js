const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 创建一个代理中间件，将/api/deepseek请求转发到DeepSeek API
  const deepseekProxy = createProxyMiddleware({
    target: "https://api.deepseek.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/deepseek": "/v1/chat/completions",
    },
    onProxyReq: function (proxyReq, req, res) {
      // 添加认证头
      proxyReq.setHeader(
        "Authorization",
        `Bearer sk-18df4173c8194a35a6a5dd25208cb665`
      );

      // 确保Content-Type正确设置
      proxyReq.setHeader("Content-Type", "application/json");

      // 打印请求信息，用于调试
      console.log("代理请求到:", proxyReq.path);
      console.log("请求方法:", req.method);
      console.log("请求头:", req.headers);
    },
    onProxyRes: function (proxyRes, req, res) {
      // 打印响应信息，用于调试
      console.log("代理响应状态:", proxyRes.statusCode);
      console.log("响应头:", proxyRes.headers);
    },
    onError: function (err, req, res) {
      // 处理代理错误
      console.error("代理错误:", err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("代理请求时发生错误: " + err.message);
    },
  });

  // 应用代理中间件
  app.use("/api/deepseek", deepseekProxy);
};
