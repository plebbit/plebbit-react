import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor as MarkdownEditor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = ({ hideToolBar }) => {
  const [value, setValue] = useState({});

  const handleChange = (editorState) => {
    setValue(editorState);
    {
      value && draftToMarkdown(convertToRaw(value.getCurrentContent()));
    }
  };
  return (
    <MarkdownEditor
      // wrapperClassName="wrapper"
      onEditorStateChange={handleChange}
      toolbarHidden={hideToolBar}
    />
  );
};

export default Editor;
