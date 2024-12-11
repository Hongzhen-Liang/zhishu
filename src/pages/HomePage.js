import React from 'react';
import { Link } from 'react-router-dom';

const questions = [
  { id: 1, title: '如何学习React？', description: 'React的学习资源和入门方法。' },
  { id: 2, title: '前端如何优化性能？', description: '性能优化的最佳实践。' },
];

function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
          <Link to={`/question/${q.id}`}>查看详情</Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
