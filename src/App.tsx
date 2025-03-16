import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [mood, setMood] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 直接调用DeepSeek API的函数
  const getDeepSeekFeedback = async (moodScore: number) => {
    try {
      console.log("调用DeepSeek API，心情分数:", moodScore);

      // DeepSeek API配置（硬编码）
      const baseURL = "https://api.deepseek.com";
      const apiKey = "sk-18df4173c8194a35a6a5dd25208cb665";
      const model = "deepseek-chat";

      // 构建提示词
      const prompt = `用户当前的心情评分为${moodScore}分（1-10分，1分表示非常低落，10分表示非常愉快）。
请根据用户的心情，提供一句简短、温暖、鼓励性的话语。
回复应该是一句话，不超过50个字。
回复的风格可以是幽默的、温暖的或激励的。`;

      // 直接调用DeepSeek API
      const response = await axios({
        method: "post",
        url: `${baseURL}/v1/chat/completions`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        data: {
          model: model,
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
      });

      console.log("API响应:", response.data);

      // 提取AI的回复
      const aiResponse = response.data.choices[0].message.content.trim();
      return aiResponse;
    } catch (error) {
      console.error("DeepSeek API调用失败:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("错误响应状态:", error.response.status);
        console.error("错误响应数据:", error.response.data);
      }
      throw error;
    }
  };

  // 备用的模拟API调用函数，当API调用失败时使用
  const getMockFeedback = (moodScore: number) => {
    // 根据心情分数返回不同的鼓励语
    if (moodScore <= 3) {
      const lowMoodResponses = [
        "即使在最黑暗的时刻，也请记住，黎明终将到来。",
        "每一次跌倒都是成长的机会，明天的你会更坚强。",
        "生活就像心电图，平静就意味着没有生命，起伏才是人生。",
      ];
      return lowMoodResponses[
        Math.floor(Math.random() * lowMoodResponses.length)
      ];
    } else if (moodScore <= 7) {
      const mediumMoodResponses = [
        "保持平静的心态是应对生活挑战的最佳方式。",
        "今天的平静为明天的精彩做准备。",
        "平静的海面下蕴藏着无限的可能性。",
      ];
      return mediumMoodResponses[
        Math.floor(Math.random() * mediumMoodResponses.length)
      ];
    } else {
      const highMoodResponses = [
        "你的好心情是传染的，继续保持并传递给身边的人吧！",
        "快乐是一种选择，而你今天做出了最棒的选择！",
        "阳光般的心情会照亮你前行的道路，继续前进吧！",
      ];
      return highMoodResponses[
        Math.floor(Math.random() * highMoodResponses.length)
      ];
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 尝试调用DeepSeek API
      try {
        const response = await getDeepSeekFeedback(mood);
        setFeedback(response);
      } catch (apiError) {
        console.error("API调用失败，使用模拟数据:", apiError);
        // API调用失败时使用模拟数据
        const mockResponse = getMockFeedback(mood);
        setFeedback(mockResponse);
      }
    } catch (error) {
      console.error("获取反馈失败:", error);
      setFeedback("获取反馈时出错，请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>心情鼓励器</h1>
        <div className="mood-container">
          <p>你现在的心情如何？（1-10分）</p>
          <div className="slider-container">
            <span>1</span>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="mood-slider"
            />
            <span>10</span>
          </div>
          <p>当前心情评分: {mood}</p>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? "获取中..." : "获取鼓励"}
          </button>
        </div>

        {feedback && (
          <div className="feedback-container">
            <p>{feedback}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
