import React, { useState } from 'react';
import { LockedMessage } from '../../components/Card/ModMessage';
import getUserName from '../../utils/getUserName';
import Editor from '../../components/Editor';
import { EditorState } from 'draft-js';
import usePublishComment from '../../hooks/usePublishComment';
import { MdClose } from 'react-icons/md';
import { useAccount, useAuthorAvatar } from '@plebbit/plebbit-react-hooks';
import useStore from '../../store/useStore';
import Avatar from '../../components/Avatar';
import styles from './post-detail.module.css';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from '../../components/DropDown';
import Button from '../../components/Button';

const AddComment = ({ detail, subplebbit, showFullComments, setShowFullComments, isReply }) => {
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { device } = useStore((state) => state);
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showMEditor, setShowMEditor] = useState(false);
  const navigate = useNavigate();

  const { publishComment } = usePublishComment(content, detail);

  const handlePublishPost = async () => {
    await publishComment(
      () => {
        setContent('');
        setEditorState(EditorState.createEmpty());
      },
      () => {}
    );
  };
  const queryString = '?sort=new';
  const urlParams = new URLSearchParams(queryString);
  const sortValue = urlParams.get('sort');

  const sortOption = [
    {
      label: 'Top',
      id: 'topAll',
    },
    {
      label: 'New',
      id: 'new',
    },
    {
      label: 'Old',
      id: 'old',
    },
    {
      label: 'Controversial',
      id: 'controversialAll',
    },
  ];
  return (
    <>
      {device !== 'mobile' ? (
        <>
          {detail?.locked ? (
            <LockedMessage subplebbit={subplebbit} />
          ) : (
            <>
              <div className={styles.addComment_top}>
                <span>Comment as</span>
                <Link to="/profile/">{getUserName(profile?.author)}</Link>
              </div>
              <div>
                <Editor
                  setValue={setContent}
                  editorState={editorState}
                  setEditorState={setEditorState}
                  showSubmit
                  handleSubmit={handlePublishPost}
                  value={content}
                />
              </div>
            </>
          )}

          <div className={styles.sort_wrap}>
            <div className={styles.sort_wrap2}>
              <DropDown
                onChange={(val) => navigate(`?sort=${val?.id}`)}
                wrapSx={{
                  marginLeft: '0px !important',
                }}
                dropDownTitle={
                  <div className={styles.sort_wrap3}>
                    <button>
                      <span>Sort by: {sortOption?.find((x) => x?.id === sortValue)?.label}</span>
                    </button>
                  </div>
                }
                options={sortOption}
                rightOffset={0}
                leftOffset="none"
                topOffset="34px"
              />
            </div>
          </div>
          <hr />
          {!showFullComments && isReply ? (
            <div className={styles.view_all} onClick={() => setShowFullComments(!showFullComments)}>
              View all comments
            </div>
          ) : null}
        </>
      ) : (
        <>
          {detail?.locked ? (
            <LockedMessage />
          ) : (
            <>
              {showMEditor ? (
                <div>
                  <Editor
                    setValue={setContent}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    showSubmit
                    handleSubmit={handlePublishPost}
                    submitBtnText="Add Comment"
                    value={content}
                    otherBtn={
                      <Button mr="auto" onClick={() => setShowMEditor(false)}>
                        <MdClose />
                      </Button>
                    }
                  />
                </div>
              ) : (
                <div className={styles.mobile_add_com}>
                  <Avatar
                    width={24}
                    height={24}
                    avatar={authorAvatarImageUrl}
                    alt="user-icon"
                    style={{
                      verticalAlign: 'middle',
                      marginRight: '8px',
                      color: 'transparent',
                      verticalAlign: 'middle',
                    }}
                  />
                  <Button onClick={() => setShowMEditor(true)}>Leave a comment</Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AddComment;
