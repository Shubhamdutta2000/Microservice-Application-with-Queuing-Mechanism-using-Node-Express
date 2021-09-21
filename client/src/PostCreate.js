import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:5000/posts', {
      title,
    });
    console.log(res);

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
