import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Editor as MarkdownEditor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Wrapper from './style';
import Button from '../Button';

const Editor = ({
  hideToolBar,
  wrapperClassName,
  editorClassName,
  toolbarClassName,
  setValue,
  setEditorState,
  editorState,
  handleSubmit,
  showSubmit,
  submitBtnStyle,
  submitBtnText,
  otherBtn,
}) => {
  const toolbarBg = useColorModeValue('#F6F7F8', '#272729');
  const toolbarColor = useColorModeValue('#818384', '#818384');
  const wrapperBorder = useColorModeValue('#edeff1', '#343536');
  const [disabled, setDisabled] = useState(true);

  const handleChange = (data) => {
    if (draftToMarkdown(convertToRaw(data.getCurrentContent())).length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
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
      {showSubmit && (
        <Flex
          width="100%"
          bg={toolbarBg}
          borderRadius="0 0 4px 4px"
          opacity={1}
          mb="25px"
          zIndex="1"
          alignItems="center"
        >
          {otherBtn}
          <Button
            content={submitBtnText || 'comment'}
            cursor="pointer"
            disabled={disabled}
            padding="4px 8px"
            minH="24px"
            margin="4px 8px"
            height=""
            marginLeft="auto"
            sx={{ filter: 'grayscale(1)', ...submitBtnStyle }}
            onClick={handleSubmit}
          />
        </Flex>
      )}
    </Wrapper>
  );
};

export default Editor;
