import React, { useState } from 'react';
import {
  useAuthorAvatar,
  useAccountVote,
  useEditedComment,
  useAccountComment,
  useAuthorAddress,
  useAccountSubplebbits,
  useAccount,
} from '@plebbit/plebbit-react-hooks';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { EditorState } from 'draft-js';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { BsBookmark, BsChat, BsFlag, BsShield } from 'react-icons/bs';
import Editor from '../../Editor';
import Marked from '../../Editor/marked';
import dateToNow from '../../../utils/formatDate';
import numFormatter from '../../../utils/numberFormater';
import getUserName from '../../../utils/getUserName';
import Avatar from '../../Avatar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DropDown from '../../DropDown';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GoGift } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import useRepliesAndAccountReplies from '../../../hooks/useRepliesAndAccountReplies';
import usePublishUpvote from '../../../hooks/usePublishUpvote';
import usePublishDownvote from '../../../hooks/usePublishDownvote';
import EditLabel from '../../Label/editLabel';
import PendingLabel from '../../Label/pendingLabel';
import FlairLabel from '../../Label/flairLabel';
import useStateString from '../../../hooks/useStateString';
import StateString from '../../Label/stateString';
import usePublishComment from '../../../hooks/usePublishComment';
import ConfirmDelete from '../Modal/confirmDelete';
import AddRemovalReason from '../Modal/addRemovalReason';
import useStore from '../../../store/useStore';
import { Link, useParams } from 'react-router-dom';
import styles from './comment.module.css';
import Dot from '../../Dot';
import Label from '../../Label';

const Comment = ({ comment: data, disableReplies, loading }) => {
  let comment = data;
  const { commentCid } = useParams();
  const replies = useRepliesAndAccountReplies(comment);
  const [vote] = useState(+comment?.upvoteCount || 0 - +comment?.downvoteCount || 0);
  const postVote = useAccountVote({ commentCid: comment?.cid });
  const voteMode = postVote?.vote || 0;
  const [reply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: comment?.author });
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { baseUrl } = useStore((state) => state);
  const [copied, setCopied] = useState(false);
  const commentPending = comment?.state === 'pending';
  const commentFailed = comment?.state === 'failed';
  const isSpecial = Object.keys(accountSubplebbits || {})?.includes(comment?.subplebbitAddress);
  const [isDeleteModalOpen, setDeleteModal] = useState(false);

  const [isRemovalModalOpen, setRemovalModalOpen] = useState(false);
  const { authorAddress } = useAuthorAddress({ comment });

  const owner =
    profile?.author?.address === authorAddress || profile?.signer?.address === authorAddress;

  const upVote = usePublishUpvote(comment);
  const downVote = usePublishDownvote(comment);
  //options needed to publish a comment

  const { publishComment } = usePublishComment(content, comment);

  const accountComment = useAccountComment({ commentIndex: comment?.index });

  const handlePublishPost = async () => {
    await publishComment(
      () => {
        setContent('');
        setEditorState(EditorState.createEmpty());
      },
      () => {}
    );
  };

  const handleOption = (val) => {
    if (val?.id === 'delete') {
      setDeleteModal(true);
    } else {
      openRemovalModal();
    }
  };

  const { state: editedCommentState, editedComment } = useEditedComment({ comment: comment });

  if (editedComment) {
    comment = editedComment;
  }

  let editLabel;
  if (editedCommentState === 'succeeded') {
    editLabel = { text: 'edited', color: 'green' };
  }
  if (editedCommentState === 'pending') {
    editLabel = { text: 'pending edit', color: 'orange' };
  }
  if (editedCommentState === 'failed') {
    editLabel = { text: 'failed edit', color: 'red' };
  }
  const authorPath = owner ? '/profile' : `/u/${comment?.author?.address}/c/${comment?.cid}`;

  const stateString = useStateString(accountComment);

  return (
    <>
      <div>
        <div>
          <div
            className={styles.wrapper}
            tabindex="-1"
            style={{
              paddingLeft: `calc(16px + ${+comment?.depth - 1} * 21px)`,
            }}
          >
            <div className={styles.wrapper_thread}>
              {comment?.depth > 1 &&
                [...Array(comment?.depth - 1)]?.map((x, index) => (
                  <div className={styles.wrapper_thread2_alt} key={index}>
                    <div className={styles.thread_line} />
                  </div>
                ))}

              <div className={styles.wrapper_thread2}>
                <div className={styles.wrapper_thread3}>
                  <div className={styles.thread_line} />
                </div>
              </div>
            </div>
            <div
              className={styles.comment_main}
              style={{
                background: commentCid === comment?.cid && 'rgba(0,121,211,0.05',
              }}
            >
              <div className={styles.comment_user_avatar}>
                <div className={styles.comment_user_avatar2}>
                  <Avatar height="100%" width="100%" src={authorAvatarImageUrl} />
                </div>
              </div>
              <div className={styles.comment_content}>
                <div className={styles.cc_top}>
                  <span className={styles.cc_top2}>
                    <div className={styles.cc_top_name}>
                      <div className={styles.cc_top_name2}>
                        <div>
                          <Link to={authorPath}> {getUserName(comment?.author)}</Link>
                        </div>
                      </div>
                    </div>
                    {commentPending && <PendingLabel />}
                    {commentFailed && (
                      <Label
                        text="Failed"
                        style={{
                          color: '#ff585b',
                          border: '1px solid currentColor',
                        }}
                      />
                    )}
                    {commentPending && (
                      <StateString
                        stateString={stateString}
                        textSx={{
                          fontWeight: '400 !important',
                          fontSize: '12px !important',
                        }}
                      />
                    )}
                    {comment?.flair?.text && <FlairLabel flair={comment?.flair} />}
                    <EditLabel editLabel={editLabel} post={comment} />
                    <Dot className={styles.cct_dot} />
                    <span className={styles.cct_time}>{dateToNow(comment?.timestamp * 1000)}</span>
                  </span>
                </div>
                <div className={styles.comment_text}>
                  <div className={styles.comment_text2}>
                    <Marked content={comment?.content || ''} />
                  </div>
                </div>
                {(!loading || !commentPending || !commentFailed) && (
                  <div className={styles.comment_footer}>
                    <div className={styles.cf_vote}>
                      <button
                        upvote="true"
                        onClick={disableReplies ? null : upVote}
                        disabled={disableReplies}
                      >
                        <span>{voteMode === 1 ? <ImArrowUp color="#cc3700" /> : <BiUpvote />}</span>
                      </button>
                      <div className={styles.cf_vote_text}>
                        {numFormatter(vote + voteMode) === 0
                          ? 'vote'
                          : numFormatter(vote + voteMode) || 0}
                      </div>
                      <button
                        downvote="true"
                        onClick={disableReplies ? null : downVote}
                        disabled={disableReplies}
                      >
                        <span>
                          {voteMode === -1 ? <ImArrowDown color="#5a75cc" /> : <BiDownvote />}
                        </span>
                      </button>
                    </div>
                    {!disableReplies && (
                      <div className={styles.cf_others} onClick={() => setShowReply(!reply)}>
                        <button>
                          <BsChat />
                          Reply
                        </button>
                      </div>
                    )}
                    <CopyToClipboard
                      text={`${baseUrl}/p/${comment?.subplebbitAddress}/c/${comment?.cid}/`}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 3000);
                      }}
                    >
                      <div className={styles.cf_others}>
                        <button> {copied ? 'Copied' : 'share'}</button>
                      </div>
                    </CopyToClipboard>

                    <DropDown
                      onChange={(val) => handleOption(val?.id)}
                      wrapSx={{
                        marginLeft: '0px !important',
                      }}
                      dropDownTitle={
                        <div className={styles.cf_others} onClick={() => setShowReply(!reply)}>
                          <button>
                            <FiMoreHorizontal />
                          </button>
                        </div>
                      }
                      options={[
                        {
                          label: 'Give Award',
                          icon: GoGift,
                          id: 'award',
                        },
                        {
                          label: 'Report',
                          icon: BsFlag,
                          id: 'award',
                          disabled: owner,
                        },
                        {
                          label: 'Save',
                          icon: BsBookmark,
                          id: 'save',
                        },
                        {
                          label: 'Delete',
                          icon: MdOutlineDeleteOutline,
                          id: 'delete',
                          disabled: !owner,
                        },
                      ]}
                      rightOffset={0}
                      leftOffset="none"
                      topOffset="34px"
                    />
                    {isSpecial && (
                      <DropDown
                        onChange={(val) => handleOption(val?.id)}
                        wrapSx={{
                          marginLeft: '0px !important',
                        }}
                        dropDownTitle={
                          <div className={styles.cf_others} onClick={() => setShowReply(!reply)}>
                            <button>
                              <BsShield />
                            </button>
                          </div>
                        }
                        options={[
                          {
                            label: !comment?.removed ? 'Approved' : 'Approve',
                            id: 'removed',
                            color: !comment?.removed ? ' green' : 'red',
                          },
                          {
                            label: 'Lock Comments',
                            id: 'locked',
                            color: comment?.locked && 'red',
                          },
                        ]}
                        rightOffset={0}
                        leftOffset="none"
                        topOffset="34px"
                      />
                    )}
                  </div>
                )}
                {reply && (
                  <div className={styles.reply_comment}>
                    <div
                      style={{
                        left: '33px',
                      }}
                    >
                      <Editor
                        setValue={setContent}
                        editorState={editorState}
                        setEditorState={setEditorState}
                        showSubmit
                        handleSubmit={handlePublishPost}
                        value={content}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {replies?.map((val, index) => (
        <Comment key={index} comment={val} loading={loading} />
      ))}

      {isDeleteModalOpen && (
        <ConfirmDelete
          isOpen={isDeleteModalOpen}
          setIsOpen={setDeleteModal}
          post={comment}
          title="Delete comment"
          message="Are you sure you want to delete your comment?"
          cancelText="Keep"
        />
      )}

      {isRemovalModalOpen && (
        <AddRemovalReason
          isOpen={isRemovalModalOpen}
          setIsOpen={setRemovalModalOpen}
          post={comment}
          hideList={['pinned', 'reason']}
        />
      )}
    </>
  );
};

export default Comment;
