// Vercel Serverless Function for DeepSeek API
import axios from "axios";

// DeepSeek API配置
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"; // 请替换为实际的DeepSeek API URL

// 尝试从不同格式的环境变量名中获取API密钥
const getApiKey = () => {
  // 尝试多种可能的环境变量名
  return (
    process.env.DEEPSEEK_API_KEY ||
    process.env.deepseekapikey ||
    process.env.DeepseekApiKey
  );
};

export default async function handler(req, res) {
  // 设置CORS头，允许前端页面调用
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // 处理OPTIONS请求（预检请求）
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // 只接受POST请求
  if (req.method !== "POST") {
    return res.status(405).json({ error: "只支持POST请求" });
  }

  // 获取API密钥
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("未找到DeepSeek API密钥");
    return res.status(500).json({ error: "服务器配置错误：未找到API密钥" });
  }

  try {
    // 从请求体中获取心情分数
    const { mood } = req.body;

    if (mood === undefined || mood < 1 || mood > 10) {
      return res.status(400).json({ error: "心情分数必须在1-10之间" });
    }

    // 构建发送给DeepSeek的提示词
    const prompt = `用户当前的心情评分为${mood}分（1-10分，1分表示非常低落，10分表示非常愉快）。
请根据用户的心情，提供一句简短、温暖、鼓励性的话语。
回复应该是一句话，不超过50个字。
回复的风格可以是幽默的、温暖的或激励的。`;

    // 调用DeepSeek API
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat", // 请替换为实际的模型名称
        messages: [
          {
            role: "system",
            content:
              "你是一个善解人意、富有同理心的AI助手，擅长根据用户的心情提供鼓励和支持。",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // 使用获取的API密钥
        },
      }
    );

    // 提取AI的回复
    const feedback = response.data.choices[0].message.content.trim();

    // 返回结果给前端
    return res.status(200).json({ feedback });
  } catch (error) {
    console.error("DeepSeek API调用失败:", error);

    // 返回错误信息
    return res.status(500).json({
      error: "获取反馈失败",
      details: error.message,
    });
  }
}
