import React from 'react';

export default ({ comments }) => {

  const renderedComments = comments && comments.map((comment) => {
    let content;

    switch (comment.status) {
      case "approved":
        content = comment.content;
        break;

      case "pending":
        content = 'This comment is awaiting moderation';
        break;

      case "rejected":
        content = 'This comment has been rejected';
        break;

    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
