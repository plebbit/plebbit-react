import React, { useEffect, useState } from 'react';
import styles from './post-detail.module.css';
import useStore from '../../store/useStore';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import useStateString from '../../hooks/useStateString';
import { getSubName } from '../../utils/getUserName';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import { useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import {
  useAccount,
  useAccountComments,
  useAccountSubplebbits,
  useAccountVote,
  useAuthorAddress,
  useBlock,
  useComment,
  useEditedComment,
  useSubplebbit,
  useSubscribe,
} from '@plebbit/plebbit-react-hooks';
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import usePublishUpvote from '../../hooks/usePublishUpvote';
import usePublishDownvote from '../../hooks/usePublishDownvote';
import useRepliesAndAccountReplies from '../../hooks/useRepliesAndAccountReplies';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import numFormatter from '../../utils/numberFormater';
import { CgClose, CgNotes } from 'react-icons/cg';
import FlairLabel from '../../components/Label/flairLabel';
import EditLabel from '../../components/Label/editLabel';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdClose,
  MdOutlineDeleteOutline,
} from 'react-icons/md';
import PendingLabel from '../../components/Label/pendingLabel';
import PostVote from '../../components/Post/PostVote';
import PostTop from '../../components/Post/PostTop';
import getIsOnline from '../../utils/getIsOnline';
import Marked from '../../components/Editor/marked';
import { BsBookmark, BsChat, BsEyeSlash, BsPencil, BsShield } from 'react-icons/bs';
import { GoGift, GoMute } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import CopyToClipboard from 'react-copy-to-clipboard';
import PostDetailSideBar from './postDetailSideBar';
import { FiExternal, FiExternalLink, FiMoreHorizontal } from 'react-icons/fi';
import DropDown from '../../components/DropDown';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import EditComment from './editComment';
import { DeletedMessage, RemovedMessage } from '../../components/Card/ModMessage';
import PostMedia from '../../components/Post/PostMedia';
import AddComment from './addComment';
import Replies from '../../components/Post/comment/replies';
import Comment from '../../components/Post/comment';
import Avatar from '../../components/Avatar';
import Post from '../../components/Post';
import AddRemovalReason from '../../components/Post/Modal/addRemovalReason';
import ConfirmDelete from '../../components/Post/Modal/confirmDelete';

const PostDetail2 = () => {
  const {
    onOpen: openRemovalModal,
    onClose: closeRemovalModal,
    isOpen: isRemovalModalOpen,
  } = useDisclosure();
  const {
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
    isOpen: isDeleteModalOpen,
  } = useDisclosure();
  const location = useLocation();
  const postDetailModal = location?.state?.modal && location?.state?.detail;
  const params = useParams();

  const feedFromProfile = location?.pathname.includes('/profile/c');
  const myPostLocation = params?.index;
  const { accountComments: myPost } = useAccountComments();
  const profilePost = myPost && myPostLocation && myPost[Number(myPostLocation)];
  // post from   or   address
  const commentFromCid = useComment({
    commentCid: !feedFromProfile ? params?.commentCid : undefined,
  });
  // const commentFromFeed = location?.state?.detail;
  // applicable if coming from feeds, if posts takes time to load uses feeds post props
  const comment = feedFromProfile ? profilePost : commentFromCid;
  let detail;
  let reply;
  let replyParent;
  let replyPost = useComment({
    commentCid: feedFromProfile ? comment?.postCid || comment?.parentCid : comment?.postCid,
  }); // if comment is a reply, this is what you replied to
  const isReply = Boolean(
    (feedFromProfile && profilePost?.parentCid) || (comment?.parentCid && comment?.depth !== 0)
  );
  if (isReply) {
    detail = replyPost;
    reply = comment;
  } else {
    detail = comment;
  }
  const replyParentaux = useComment({ commentCid: reply?.parentCid }); // incase what the reply parent is a comment also this is the parent
  replyPost = useComment({ commentCid: replyParentaux?.postCid });
  if (replyPost?.state === 'succeeded') {
    detail = replyPost;
  }
  replyParent = replyParentaux;
  if (replyPost?.cid === replyParentaux?.cid) {
    replyParent = comment;
    reply = undefined;
  }

  const sub = useSubplebbit({ subplebbitAddress: detail?.subplebbitAddress });
  const loading =
    detail?.state === 'fetching-ipfs' || !detail?.timestamp || detail?.state === 'pending';
  const commentLoading =
    detail?.state === 'fetching-ipfs' || !detail?.updatedAt || detail?.state === 'pending';
  const detailPending = !detail?.cid;
  const subplebbit =
    sub === undefined ? { ...detail?.subplebbit, address: detail?.subplebbitAddress } : sub;

  const mediaInfo = getCommentMediaInfo(detail);
  const hasThumbnail = !detail?.removed && detail?.thumbnailUrl && !mediaInfo;
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const [postVotes] = useState(detail?.upvoteCount || 0 - detail?.downvoteCount || 0);
  const accountVote = useAccountVote({ commentCid: detail?.cid });
  const vote = accountVote?.vote || 0;
  const subPledditTextColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const bg = useColorModeValue('white', 'darkNavBg');
  const statusColor = useColorModeValue('lightVoteText', 'fff');
  const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
  const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  // const approveColor = useColorModeValue('pastelGreen', 'pastelGreen');
  const removeColor = useColorModeValue('persimmon', 'persimmon');
  const lockColor = useColorModeValue('brightSun', 'brightSun');
  // const borderColor = useColorModeValue('#ccc', '#343536');
  const postBg = useColorModeValue('lightCommunityThemePost', 'darkCommunityThemePost');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  // const borderColor2 = useColorModeValue('#d3d6da', '#545452');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const mainMobileBg = useColorModeValue('white', 'black');
  const mobileColor = useColorModeValue('lightMobileText2', 'darkMobileText');
  const toast = useToast();

  const [subLoading, setSubLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editMode, setEditMode] = useState(detail?.content ? 'post' : ' ');
  const [copied, setCopied] = useState(false);

  const [showSpoiler, setShowSpoiler] = useState(detail?.spoiler);
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { device, baseUrl } = useStore((state) => state);
  const navigate = useNavigate();
  const [showFullComments, setShowFullComments] = useState(!isReply);

  const { blocked, unblock, block } = useBlock({ cid: detail?.cid });
  const { muted, unblock: unMute, block: mute } = useBlock({ address: detail?.subplebbitAddress });

  const upVote = usePublishUpvote(detail);
  const downVote = usePublishDownvote(detail);

  const { subscribe, unsubscribe, subscribed } = useSubscribe({
    subplebbitAddress: detail?.subplebbitAddress,
  });

  const handleSubscribe = async () => {
    try {
      await subscribe();
    } catch (error) {
      logger('subscribe:response:', error, 'error');
      toast({
        title: 'Subscription declined',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleUnSubscribe = async () => {
    try {
      await unsubscribe();
    } catch (error) {
      logger('unsubscribe:response:', error, 'error');
      toast({
        title: 'UnSubscribe declined',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOption = (option) => {
    if (option?.id === 'edit') {
      setEdit(true);
    } else if (option?.id === 'delete') {
      openDeleteModal();
    }
    if (option?.id === 'block') {
      blocked ? unblock() : block();
    }
    if (option?.id === 'mute') {
      muted ? unMute() : mute();
    } else openRemovalModal();
  };

  const sharePath = `${baseUrl}p/${detail?.subplebbitAddress}/c/${detail?.cid}`;
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  const isSpecial =
    Object.keys(accountSubplebbits)?.length &&
    Object.keys(accountSubplebbits || {})?.includes(detail?.subplebbitAddress);

  useEffect(() => {
    if (feedFromProfile && comment?.cid) {
      navigate(`/p/${comment?.subplebbitAddress}/c/${comment?.cid}/`);
    }
  }, [comment?.cid]);

  const { authorAddress, shortAuthorAddress } = useAuthorAddress({ comment: detail });
  const owner =
    profile?.author?.address === authorAddress || profile?.signer?.address === authorAddress;

  const authorPath = owner ? '/profile' : `/u/${detail?.author?.address}/c/${detail?.cid}/`;

  const comments = useRepliesAndAccountReplies(detail);

  const detailCommentCount = detail?.replyCount || 0;

  const { state: editedCommentState, editedComment } = useEditedComment({ comment: detail });

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

  const stateString = useStateString(detail);

  useEffect(() => {
    detail = editedComment;
  }, [editedComment]);

  console.log({ stateString, detail });

  return (
    <Layout
      name={{
        label:
          detail?.title ||
          detail?.shortCid ||
          subplebbit?.title ||
          (subplebbit && getSubName(subplebbit)) ||
          getAddress(params?.commentCid),
        value: location?.pathname,
      }}
      stateString={stateString}
    >
      {' '}
      {device !== 'mobile' ? (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.overlay_scroll_container}>
                {/* detail top */}
                <div className={styles.detail_top_wrap} tabIndex="-1">
                  <div className={styles.detail_top}>
                    <div className={styles.detail_top_left}>
                      <div className={styles.vote_wrap}>
                        <button
                          onClick={detail?.locked ? null : upVote}
                          className={styles.vote_btn}
                        >
                          <span className={`${styles.vote_btn_wrap} ${styles.upvote_btn_wrap}`}>
                            {vote === 1 ? (
                              <ImArrowUp className={styles.vote_btn_icon} />
                            ) : (
                              <BiUpvote className={styles.vote_btn_icon} />
                            )}
                          </span>
                        </button>
                        <div className={styles.vote_text_wrap}>
                          {postVotes === 0 ? 'vote' : numFormatter(postVotes)}
                        </div>
                        <button
                          className={styles.vote_btn}
                          onClick={detail?.locked ? null : downVote}
                        >
                          <span className={`${styles.vote_btn_wrap} ${styles.downvote_btn_wrap}`}>
                            {vote === -1 ? (
                              <ImArrowDown className={styles.vote_btn_icon} />
                            ) : (
                              <BiDownvote className={styles.vote_btn_icon} />
                            )}
                          </span>
                        </button>
                      </div>
                      <CgNotes className={styles.post_type_icon} />
                      <div className={styles.detail_top_title_wrap}>
                        <div className={styles.detail_top_title_wrap_2}>
                          <div className={styles.detail_top_title_wrap_3}>
                            <h1 className={styles.detail_top_title}>{detail?.title}</h1>
                          </div>
                        </div>
                      </div>
                      <div className={styles.detail_top_tags_wrap}>
                        <div className={styles.detail_top_flair_cont}>
                          {detail?.flair?.text?.length ? <FlairLabel flair={detail?.flair} /> : ''}
                          {detail?.spoiler && <SpoilerLabel />}
                          {detailPending && <PendingLabel />}
                          {/* edit status */}
                          <EditLabel editLabel={editLabel} post={detail} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.detail_top_right}>
                      <button
                        tabindex="0"
                        title="close"
                        className={styles.detail_top_right_btn}
                        onClick={() => navigate(-1)}
                      >
                        <MdClose className={styles.detail_top_close_icon} />
                        <span>Close</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* detail body */}
                <div tabindex="-1" className={styles.detail_body_wrap}>
                  {/* detail content */}
                  <div className={styles.detail_content_wrap}>
                    <div className={styles.detail_content}>
                      <div className={styles.detail_main_content}>
                        <div>
                          {/* detail voting */}
                          <PostVote
                            vote={vote}
                            upVote={upVote}
                            downVote={downVote}
                            postVotes={postVotes}
                          />
                          <div className={styles.detail_wrap}>
                            <div className={styles.detail_wrap2}>
                              {/* detail top */}
                              <PostTop
                                post={detail}
                                subPlebbit={subplebbit}
                                isOnline={getIsOnline(subplebbit?.updatedAt)}
                                authorPath={authorPath}
                                loading={loading}
                                stateString={stateString}
                                openRemovalModal={openRemovalModal}
                                allowedSpecial={isSpecial}
                                pending={detailPending}
                                detail={true}
                                handleOption={handleOption}
                                owner={owner}
                                muted={muted}
                                blocked={blocked}
                              />
                              {/* detail title */}
                              <div className={styles.detail_title_wrap}>
                                <div className={styles.detail_title_wrap2}>
                                  <div className={styles.detail_title_wrap3}>
                                    <h1 className={styles.detail_title}>{detail?.title}</h1>
                                  </div>
                                </div>
                              </div>
                              {/* detail flair */}
                              {(detail?.flair?.text?.length ||
                                detail?.spoiler ||
                                detailPending ||
                                editLabel) && (
                                <div className={styles.detail_flair_wrap}>
                                  <div className={styles.detail_flair_wrap2}>
                                    {detail?.flair?.text?.length ? (
                                      <FlairLabel flair={detail?.flair} />
                                    ) : (
                                      ''
                                    )}
                                    {detail?.spoiler && <SpoilerLabel />}
                                    {detailPending && <PendingLabel />}
                                    {/* edit status */}
                                    <EditLabel editLabel={editLabel} post={detail} />
                                  </div>
                                </div>
                              )}
                              {/* detail content */}

                              <div className={styles.detail_content_wrapper}>
                                <div className={styles.detail_content_text}>
                                  {edit ? (
                                    <EditComment detail={detail} setEdit={setEdit} />
                                  ) : detail?.removed ? (
                                    <RemovedMessage subplebbit={subplebbit} />
                                  ) : detail?.deleted ? (
                                    <DeletedMessage />
                                  ) : showSpoiler ? (
                                    <div className={styles.detail_spoiler_wrap}>
                                      <button
                                        className={styles.detail_spoiler_btn}
                                        onClick={() => setShowSpoiler(false)}
                                      >
                                        Click to see spoiler
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      {!mediaInfo && detail?.link && (
                                        <div className={styles.detail_link_wrap}>
                                          <a
                                            href={detail?.link}
                                            target="_blank"
                                            className={styles.detail_link}
                                          >
                                            {detail?.link?.substring(0, 20) + '...'}
                                            <FiExternalLink className={styles.detail_link_icon} />
                                          </a>
                                        </div>
                                      )}

                                      {detail?.content && <Marked content={detail?.content} />}

                                      {detail?.link && <PostMedia post={detail} detail />}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {hasThumbnail && (
                              <div className={styles.detail_thumbnail_wrap}>
                                <div />

                                <div className={styles.detail_thumbnail_cont}>
                                  <a href={detail?.link} target="_blank">
                                    <div
                                      className={styles.detail_thumbnail}
                                      style={{
                                        backgroundImage: `url(${detail?.thumbnailUrl})`,
                                      }}
                                    >
                                      <div className={styles.detail_thumbnail_external}>
                                        <FiExternalLink />
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* detail footer */}
                          <div className={styles.detail_footer_wrap}>
                            {detailPending ? (
                              <div />
                            ) : isSpecial ? (
                              <div className={styles.detail_footer_wrap2}>
                                <div className={styles.detail_footer_item_comment}>
                                  <BsChat className={styles.detail_footer_item_icon} />
                                  <span> {detailCommentCount} </span>
                                </div>
                                <div className={styles.detail_footer_item_award_wrap}>
                                  <button className={styles.detail_footer_item_award}>
                                    <GoGift className={styles.detail_footer_item_icon} />
                                    <span>Award</span>
                                  </button>
                                </div>
                                <div className={styles.detail_footer_item_award_wrap}>
                                  <CopyToClipboard text={sharePath} onCopy={handleCopy}>
                                    <button className={styles.detail_footer_item_award}>
                                      <FaShare className={styles.detail_footer_item_icon} />
                                      <span>{copied ? 'Copied' : 'Share'}</span>
                                    </button>
                                  </CopyToClipboard>
                                </div>

                                <div className={styles.detail_footer_item_award_wrap}>
                                  <button
                                    className={styles.detail_footer_item_award}
                                    onClick={() => handleOption({ id: 'approved' })}
                                  >
                                    <HiOutlineCheckCircle
                                      className={styles.detail_footer_item_icon}
                                    />
                                    <span>Approve</span>
                                  </button>
                                </div>
                                <div className={styles.detail_footer_item_award_wrap}>
                                  <button
                                    className={styles.detail_footer_item_award}
                                    onClick={() => handleOption({ id: 'removed' })}
                                  >
                                    <HiOutlineCheckCircle
                                      className={styles.detail_footer_item_icon}
                                    />
                                    <span>Remove</span>
                                  </button>
                                </div>

                                <div className={styles.detail_footer_more}>
                                  <DropDown
                                    topOffset="30px"
                                    dropDownTitle={
                                      <button className={styles.detail_footer_item_more}>
                                        <BsShield className={styles.detail_footer_item_icon} />
                                      </button>
                                    }
                                    options={[
                                      {
                                        label: 'Sticky Post',
                                        icon: detail?.pinned ? MdCheckBox : MdCheckBoxOutlineBlank,
                                        id: 'pinned',
                                      },
                                      {
                                        label: 'Lock Comments',
                                        icon: detail?.locked ? MdCheckBox : MdCheckBoxOutlineBlank,
                                        id: 'locked',
                                      },

                                      {
                                        label: 'Mark As Spoiler',
                                        icon: detail?.spoiler ? MdCheckBox : MdCheckBoxOutlineBlank,
                                        id: 'spoiler',
                                      },
                                    ]}
                                    onChange={handleOption}
                                    rightOffset={0}
                                    leftOffset="none"
                                  />
                                </div>
                                <div className={styles.detail_footer_more}>
                                  <DropDown
                                    topOffset="30px"
                                    dropDownTitle={
                                      <button className={styles.detail_footer_item_more}>
                                        <FiMoreHorizontal
                                          className={styles.detail_footer_item_icon}
                                        />
                                      </button>
                                    }
                                    options={[
                                      {
                                        label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(
                                          subplebbit
                                        )}`,
                                        icon: GoMute,
                                        id: 'mute',
                                      },
                                      {
                                        label: blocked ? 'Unhide' : 'Hide',
                                        icon: BsEyeSlash,
                                        id: 'block',
                                      },
                                      {
                                        label: 'Edit Post',
                                        icon: BsPencil,
                                        id: 'edit',
                                        disabled: !owner,
                                      },

                                      {
                                        label: 'Delete',
                                        icon: MdOutlineDeleteOutline,
                                        id: 'delete',
                                        disabled: !owner,
                                      },
                                    ]}
                                    onChange={handleOption}
                                    rightOffset={0}
                                    leftOffset="none"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className={styles.detail_footer_wrap2}>
                                <div className={styles.detail_footer_item_comment}>
                                  <BsChat className={styles.detail_footer_item_icon} />
                                  <span>
                                    {' '}
                                    {detailCommentCount} Comment
                                    {detailCommentCount === 1 ? '' : 's'}
                                  </span>
                                </div>
                                <div className={styles.detail_footer_item_award_wrap}>
                                  <button className={styles.detail_footer_item_award}>
                                    <GoGift className={styles.detail_footer_item_icon} />
                                    <span>Award</span>
                                  </button>
                                </div>
                                <div className={styles.detail_footer_item_award_wrap}>
                                  <CopyToClipboard text={sharePath} onCopy={handleCopy}>
                                    <button className={styles.detail_footer_item_award}>
                                      <FaShare className={styles.detail_footer_item_icon} />
                                      <span>{copied ? 'Copied' : 'Share'}</span>
                                    </button>
                                  </CopyToClipboard>
                                </div>
                                <div className={styles.detail_footer_item_award_wrap}>
                                  <button className={styles.detail_footer_item_award}>
                                    <BsBookmark className={styles.detail_footer_item_icon} />
                                    <span>Save</span>
                                  </button>
                                </div>

                                <div className={styles.detail_footer_more}>
                                  <DropDown
                                    topOffset="30px"
                                    dropDownTitle={
                                      <button className={styles.detail_footer_item_more}>
                                        <FiMoreHorizontal
                                          className={styles.detail_footer_item_icon}
                                        />
                                      </button>
                                    }
                                    options={[
                                      {
                                        label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(
                                          subplebbit
                                        )}`,
                                        icon: GoMute,
                                        id: 'mute',
                                      },
                                      {
                                        label: blocked ? 'Unhide' : 'Hide',
                                        icon: BsEyeSlash,
                                        id: 'block',
                                      },
                                      {
                                        label: 'Edit Post',
                                        icon: BsPencil,
                                        id: 'edit',
                                        disabled: !owner,
                                      },

                                      {
                                        label: 'Delete',
                                        icon: MdOutlineDeleteOutline,
                                        id: 'delete',
                                        disabled: !owner,
                                      },
                                    ]}
                                    onChange={handleOption}
                                    rightOffset={0}
                                    leftOffset="none"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={styles.detail_add_comment}>
                        <AddComment
                          detail={detail}
                          subplebbit={subplebbit}
                          showFullComments={showFullComments}
                          setShowFullComments={setShowFullComments}
                          isReply={isReply}
                        />
                      </div>
                      <div className={styles.detail_comments_wrap}>
                        {isReply && !showFullComments ? (
                          <Replies
                            loading={loading}
                            parent={replyParent}
                            reply={reply}
                            disableReplies={detail?.locked}
                          />
                        ) : null}
                        {showFullComments &&
                          comments?.map((comment, index) => (
                            <Comment
                              loading={commentLoading}
                              comment={comment}
                              key={index || comment.cid}
                              parentCid={detail?.cid}
                              disableReplies={detail?.locked}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* detail sidebar */}
                  <div className={styles.sidebar}>
                    <PostDetailSideBar
                      handleSubscribe={handleSubscribe}
                      handleUnSubscribe={handleUnSubscribe}
                      subLoading={subLoading}
                      setSubLoading={setSubLoading}
                      subscribed={subscribed}
                      detail={detail}
                      loading={loading}
                      subplebbit={subplebbit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <article className={styles.mobile_detail_top}>
            <div className={styles.mobile_detail_header_wrapper}>
              <header className={styles.mobile_detail_header}>
                <div className={styles.mobile_detail_header_top}>
                  <div
                    className={styles.mobile_detail_header_banner}
                    style={{
                      backgroundImage:
                        subplebbit?.suggested?.backgroundUrl &&
                        `url(${subplebbit?.suggested?.backgroundUrl})`,
                    }}
                  />
                  <Link
                    to={`/p/${detail?.subplebbitAddress}/`}
                    className={styles.mobile_detail_header_sub_link}
                  />
                  <div className={styles.mobile_detail_sub_top}>
                    <Link className={styles.mobile_detail_close_link} to={-1}>
                      <CgClose className={styles.mobile_detail_close_wrap} />
                    </Link>
                    <Link
                      to={`/p/${detail?.subplebbitAddress}/`}
                      className={styles.mobile_detail_sub_wrap}
                    >
                      <div className={styles.mobile_detail_sub_avatar_circle}>
                        <Avatar
                          width={72}
                          height={72}
                          avatar={subplebbit?.suggested?.avatarUrl}
                          badge
                          isOnline={getIsOnline(subplebbit?.updatedAt)}
                          style={{
                            marginBottom: '8px',
                          }}
                        />
                      </div>
                      <h4 className={styles.mobile_detail_sub_text}>{getSubName(subplebbit)}</h4>
                    </Link>
                  </div>
                </div>
                {edit ? (
                  <EditComment detail={detail} setEdit={setEdit} />
                ) : (
                  <Post
                    detail
                    post={detail}
                    mode="card"
                    key={detail?.cid}
                    handleOption={handleOption}
                    loading={loading}
                  />
                )}
              </header>
            </div>
          </article>
          <div className={styles.mobile_detail_comments}>
            <div className={styles.mobile_detail_comments_count_wrap}>
              <div className={styles.mobile_detail_comments_count_wrap2}>
                <div className={styles.mobile_detail_comments_count}>
                  {' '}
                  {detailCommentCount} comment{detailCommentCount > 1 ? 's' : ''}
                </div>
                <AddComment
                  detail={detail}
                  subplebbit={subplebbit}
                  showFullComments={showFullComments}
                  setShowFullComments={setShowFullComments}
                  isReply={isReply}
                />
              </div>
            </div>
            <div>
              {isReply && !showFullComments ? (
                <Replies
                  loading={loading}
                  parent={replyParent}
                  reply={reply}
                  disableReplies={detail?.locked}
                />
              ) : null}
              {showFullComments &&
                comments.map((comment) => (
                  <Comment
                    loading={commentLoading}
                    comment={comment}
                    key={comment.cid}
                    disableReplies={detail?.locked}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      {isRemovalModalOpen && (
        <AddRemovalReason isOpen={isRemovalModalOpen} onClose={closeRemovalModal} post={detail} />
      )}
      {isDeleteModalOpen && (
        <ConfirmDelete isOpen={isDeleteModalOpen} onClose={closeDeleteModal} post={detail} />
      )}
    </Layout>
  );
};

export default PostDetail2;
