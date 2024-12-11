import React from 'react';
import { useParams } from 'react-router-dom';

const answers = [
  { questionId: 1, content: '学习React的第一步是了解JSX和组件化。' },
  { questionId: 2, content: '前端性能优化可以从缓存、代码分割等入手。' },
];

function QuestionPage() {
  const { id } = useParams();
  const questionAnswers = answers.filter((a) => a.questionId === parseInt(id));

  return (
    <div style={{ padding: '20px' }}>
      <h2>问题详情</h2>
      {questionAnswers.map((a, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <p>{a.content}</p>
        </div>
      ))}
    </div>
  );
}

export default QuestionPage;
