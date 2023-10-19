import Label from '.';
import React, { useState } from 'react';
import EditStatus from '../Post/Modal/editStatus';
import { useEditedComment } from '@plebbit/plebbit-react-hooks';

const EditLabel = (props) => {
  const { editLabel, post } = props;
  const [isOpen, setIsOpen] = useState(false);
  const editedComment = useEditedComment({ comment: post });

  return (
    <>
      {editLabel ? (
        <Label
          onClick={() => setIsOpen(true)}
          style={{
            color: editLabel.color,
            borderColor: '1px solid currentColor',
          }}
          text={editLabel?.text}
        />
      ) : null}

      {isOpen && <EditStatus isOpen={isOpen} setIsOpen={setIsOpen} post={editedComment} />}
    </>
  );
};

export default EditLabel;
