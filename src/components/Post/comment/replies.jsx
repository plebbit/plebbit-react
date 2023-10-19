import React from 'react';
import Comment from '.';

const Replies = ({ parent, reply, loading, disableReplies }) => {
  return (
    <div>
      <Comment
        comment={parent}
        type={reply === undefined ? 'singleComment' : 'child'}
        key={parent?.cid}
        singleComment={reply}
        loading={loading}
        disableReplies={disableReplies}
      />
    </div>
  );
};

export default Replies;
