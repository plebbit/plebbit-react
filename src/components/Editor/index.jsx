import React from 'react';
import { convertToRaw } from 'draft-js';
import { useColorModeValue } from '@chakra-ui/react';
import { Editor as MarkdownEditor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Wrapper from './style';

const Editor = ({
  hideToolBar,
  wrapperClassName,
  editorClassName,
  toolbarClassName,
  setValue,
  setEditorState,
  editorState,
}) => {
  const toolbarBg = useColorModeValue('#F6F7F8', '#272729');
  const toolbarColor = useColorModeValue('#818384', '#818384');
  const wrapperBorder = useColorModeValue('#edeff1', '#343536');

  const handleChange = (data) => {
    setEditorState(data);
    setValue(() => draftToMarkdown(convertToRaw(data.getCurrentContent())));
  };

  return (
    <Wrapper toolbarBg={toolbarBg} toolbarColor={toolbarColor} wrapperBorder={wrapperBorder}>
      <MarkdownEditor
        toolbarClassName={toolbarClassName || 'toolbarClassName'}
        wrapperClassName={wrapperClassName || 'wrapperClassName'}
        editorClassName={editorClassName || 'editorClassName'}
        onEditorStateChange={handleChange}
        editorState={editorState}
        toolbarHidden={hideToolBar}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
            'remove',
            'history',
          ],
          inline: {
            bold: { className: 'button-class' },
            italic: { className: 'button-class' },
            underline: { className: 'button-class' },
            strikethrough: { className: 'button-class' },
            monospace: { className: 'button-class' },
            superscript: { className: 'button-class' },
            subscript: { className: 'button-class' },
          },
          blockType: {
            className: 'button-class',
            dropdownClassName: 'demo-dropdown-custom',
          },
          fontSize: { className: 'button-class' },
          list: {
            unordered: { className: 'button-class' },
            ordered: { className: 'button-class' },
            indent: { className: 'button-class' },
            outdent: { className: 'button-class' },
          },
          textAlign: {
            left: { className: 'button-class' },
            center: { className: 'button-class' },
            right: { className: 'button-class' },
            justify: { className: 'button-class' },
          },
          fontFamily: {
            className: 'button-class',
            dropdownClassName: 'demo-dropdown-custom',
          },
          colorPicker: { className: 'button-class', popupClassName: 'demo-popup-custom' },
          link: {
            popupClassName: 'button-class',
            link: { className: 'button-class' },
            unlink: { className: 'button-class' },
          },
          emoji: { className: 'button-class', popupClassName: 'demo-popup-custom' },
          embedded: { className: 'button-class', popupClassName: 'demo-popup-custom' },
          image: {
            className: 'button-class',
            popupClassName: 'demo-popup-custom',
          },
          remove: { className: 'button-class' },
          history: {
            undo: { className: 'button-class' },
            redo: { className: 'button-class' },
          },
        }}
      />
    </Wrapper>
  );
};

export default Editor;
