import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState({});
  const [pending, isPending] = useState(0);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5002/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
    console.log("Re Render");
  }, [pending]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify justify-content-between">
      {renderedPosts}
    </div>
  );
};
