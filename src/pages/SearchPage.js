import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchPage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get('query') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post('http://rampo.me:19900/xhs_search', {
          keyWord: query,
          note_num: 100,
        });

        if (response.data) {
          setResults(response.data.items);
        } else {
          setResults([]);
        }
      } catch (err) {
        setError(err.message || '请求失败');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const toggleImages = (index) => {
    setResults((prevResults) =>
      prevResults.map((item, idx) =>
        idx === index ? { ...item, isImagesOpen: !item.isImagesOpen } : item
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>搜索结果</h2>

      {loading && <p>加载中...</p>}
      {error && <p style={{ color: 'red' }}>错误: {error}</p>}
      {!loading && !error && results.length === 0 && <p>没有找到相关内容。</p>}

      {!loading && !error && results.length > 0 && (
        <div>
          {results.map((item, index) => {
            const noteCard = item.note_card || {};
            const user = noteCard.user || {};
            const isImagesOpen = item.isImagesOpen || false;

            return (
              <div
                key={item.id}
                style={{
                  marginBottom: '20px',
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <h3>{noteCard.display_title || '无标题'}</h3>
                <p>
                  作者: {user.nickname || '未知'}{' '}
                  <img
                    src={user.avatar || ''}
                    alt="头像"
                    style={{ width: '30px', borderRadius: '50%', marginLeft: '10px' }}
                  />
                </p>
                <p>点赞数: {noteCard.interact_info?.liked_count || 0}</p>

                {!isImagesOpen ? (
                  <button
                    onClick={() => toggleImages(index)}
                    style={{
                      padding: '10px',
                      border: 'none',
                      backgroundColor: '#f05',
                      color: '#fff',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    展开图片
                  </button>
                ) : (
                  <div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '10px',
                        marginTop: '10px',
                      }}
                    >
                      {noteCard.image_list?.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          style={{
                            position: 'relative',
                            paddingBottom: '133.33%', // 高度为宽度的 4/3（比例 3:4）
                            overflow: 'hidden',
                            borderRadius: '5px',
                            background: '#f8f8f8',
                          }}
                        >
                          <img
                            src={img.info_list?.[0]?.url || ''}
                            alt={`图片 ${imgIdx + 1}`}
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => toggleImages(index)}
                      style={{
                        marginTop: '10px',
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#ccc',
                        color: '#000',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      收起图片
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
