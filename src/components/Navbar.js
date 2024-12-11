import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav style={{ padding: '10px', background: '#f8f8f8', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ margin: '0 10px' }}>首页</Link>
      <Link to="/login" style={{ margin: '0 10px' }}>登录</Link>
      <form onSubmit={handleSearch} style={{ display: 'inline', marginLeft: '10px' }}>
        <input
          type="text"
          placeholder="搜索问题"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px', marginLeft: '5px' }}>搜索</button>
      </form>
    </nav>
  );
}

export default Navbar;
