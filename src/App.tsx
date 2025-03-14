import React, { useState } from "react";
// 注释掉未使用的axios导入，或者在需要时取消注释
// import axios from "axios";
import "./App.css";

function App() {
  const [mood, setMood] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 模拟API调用的函数
  const getMoodFeedback = async (moodScore: number) => {
    // 这里是模拟API调用，实际项目中会替换为真实的API调用
    // 模拟不同心情分数的反馈
    const feedbacks = {
      low: [
        "即使在最黑暗的时刻，也请记住，黎明终将到来。",
        "每一次跌倒都是成长的机会，明天的你会更坚强。",
        "生活就像心电图，平静就意味着没有生命，起伏才是人生。",
      ],
      medium: [
        "保持平静的心态是应对生活挑战的最佳方式。",
        "今天的平静为明天的精彩做准备。",
        "平静的海面下蕴藏着无限的可能性。",
      ],
      high: [
        "你的好心情是传染的，继续保持并传递给身边的人吧！",
        "快乐是一种选择，而你今天做出了最棒的选择！",
        "阳光般的心情会照亮你前行的道路，继续前进吧！",
      ],
    };

    // 定义feedbackType的类型，解决TypeScript错误
    let feedbackType: "low" | "medium" | "high";
    if (moodScore <= 3) {
      feedbackType = "low";
    } else if (moodScore <= 7) {
      feedbackType = "medium";
    } else {
      feedbackType = "high";
    }

    // 随机选择一条反馈
    const randomIndex = Math.floor(
      Math.random() * feedbacks[feedbackType].length
    );
    return feedbacks[feedbackType][randomIndex];
  };

  // 实际的DeepSeek API调用函数（目前是注释状态）
  /*
  const getDeepSeekFeedback = async (moodScore: number) => {
    try {
      // 这里将来会替换为实际的API端点
      const response = await axios.post('/api/deepseek', {
        mood: moodScore
      });
      return response.data.feedback;
    } catch (error) {
      console.error('DeepSeek API调用失败:', error);
      throw error;
    }
  };
  */

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 使用模拟API调用
      const response = await getMoodFeedback(mood);
      setFeedback(response);

      // 实际项目中会使用真实API调用
      // const response = await getDeepSeekFeedback(mood);
      // setFeedback(response);
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
