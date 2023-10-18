/* eslint-disable react/prop-types */
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './editor.module.css';
import Button from '../Button';

const Editor = ({
  value,
  placeholder,
  setValue,
  handleSubmit,
  showSubmit,
  submitBtnStyle,
  submitBtnText,
  otherBtn,
}) => {
  return (
    <div className={styles.wrapper}>
      <textarea
        className={styles.editor}
        placeholder={placeholder || 'What are your thoughts?'}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      {showSubmit && (
        <div className={styles.editor_footer}>
          <Button
            style={{
              color: '#fff',
              backgroundColor: '#0079d3',
              ...submitBtnStyle,
            }}
            onClick={handleSubmit}
            disabled={!value?.length}
          >
            {submitBtnText || 'Comment'}
          </Button>

          {otherBtn}
        </div>
      )}
    </div>
  );
};

export default Editor;
