import React from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

const Editor = () => {
  return (
    <MarkdownEditor
      toolbars={[
        'bold',
        'italic',
        'header',
        'strike',
        'underline',
        'olist',
        'ulist',
        'link',
        'todo',
      ]}
      visibleEditor="false"
      value="Text"
      onChange={() => {}}
      height={150}
    />
  );
};

export default Editor;
