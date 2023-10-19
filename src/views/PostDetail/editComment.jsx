import React, { useState } from 'react';
import Editor from '../../components/Editor';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import useCommentEdit from '../../hooks/useCommentEdit';
import useStore from '../../store/useStore';
import styles from './post-detail.module.css';
import { TextArea } from '../../components/Input';
import Button from '../../components/Button';

const EditComment = ({ detail, setEdit }) => {
  const { device } = useStore((state) => state);
  const [editMode, setEditMode] = useState(detail?.content ? 'post' : 'link');
  const [editPost, setEditPost] = useState(editMode === 'post' ? detail?.content : detail?.link);
  const data = {
    link: editMode === 'link' ? editPost : undefined,
    content: editMode === 'post' ? editPost : undefined,
  };
  const [postEditorState, setPostEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(`<p>${editPost}</p>`))
    )
  );

  const { commentEdit } = useCommentEdit(data, detail);

  const handleEditComment = async () => {
    await commentEdit(() => setEdit(false));
  };

  return (
    <>
      {device !== 'mobile' ? (
        <div className={styles.edit_comment_wrap}>
          {editMode === 'post' ? (
            <Editor
              editorState={postEditorState}
              setEditorState={setPostEditorState}
              setValue={setEditPost}
              value={editPost}
            />
          ) : (
            <TextArea
              placeholder="Url"
              onChange={(e) => setEditPost(e.target.value)}
              value={editPost}
            />
          )}
          <div alignItems="center" mt="8px" justifyContent="flex-end">
            <Button
              borderRadius="999px"
              border="transparent"
              bg="transparent"
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
            <Button
              borderRadius="999px"
              padding="5px 10px"
              minW="90px"
              minH="27px"
              onClick={handleEditComment}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <Box marginTop="8px" padding="10px">
          {editMode === 'post' ? (
            <Editor
              editorState={postEditorState}
              setEditorState={setPostEditorState}
              setValue={setEditPost}
              value={editPost}
            />
          ) : (
            <TextArea
              placeholder="Url"
              onChange={(e) => setEditPost(e.target.value)}
              value={editPost}
              color={color}
            />
          )}
          <div className={styles.edc_footer}>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
            <Button
              style={{
                color: '#fff',
                background: '#0079d3',
              }}
              onClick={handleEditComment}
            >
              Save
            </Button>
          </div>
        </Box>
      )}
    </>
  );
};

export default EditComment;
