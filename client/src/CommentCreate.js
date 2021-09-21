import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [content, setContent] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    const res = await axios.post(`http://localhost:5001/posts/${postId}/comments`, {
      content,
    });
    console.log(res);

    setContent('');
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
