import React from 'react';
import styles from './postTop.module.css';
import { Link } from 'react-router-dom';
import getUserName, { getSubName } from '../../../utils/getUserName';
import dateToFromNowDaily, { dateFormater } from '../../../utils/formatDate';
import Avatar from '../../Avatar';
import { FcCancel } from 'react-icons/fc';
import StateString from '../../Label/stateString';
import { HiLockClosed, HiOutlineCheckCircle } from 'react-icons/hi';
import FlairLabel from '../../Label/flairLabel';
import useStore from '../../../store/useStore';
import Dot from '../../Dot';
import DropDown from '../../DropDown';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsEyeSlash, BsPencil, BsPinAngleFill } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import { GoMute } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';

const PostTop = ({
  post,
  type,
  subPlebbit,
  isOnline,
  authorPath,
  loading,
  stateString,
  openRemovalModal,
  hideAvatar,
  wrapperStyle,
  allowedSpecial,
  pending,
  detail,
  handleOption,
  owner,
  muted,
  blocked,
}) => {
  const { device } = useStore((state) => state);
  return (
    <>
      {device !== 'mobile' ? (
        <div className={styles.card_top} style={wrapperStyle}>
          {loading ? (
            <StateString stateString={stateString} />
          ) : (
            <>
              {/* subplebbit avatar */}
              {!hideAvatar && (
                <div className={styles.card_avatar_wrap}>
                  <Link to={`/p/${post?.subplebbitAddress}/`} className={styles.card_avatar}>
                    <Avatar
                      avatar={subPlebbit?.suggested?.avatarUrl}
                      width={24}
                      height={24}
                      badge
                      isOnline={isOnline}
                      style={{
                        marginRight: '8px',
                        marginBottom: '5px',
                      }}
                    />
                  </Link>
                </div>
              )}
              <div className={styles.card_top_right}>
                {/* subplebbit address */}
                <div className={styles.card_top_right_txt}>
                  {type !== 'subPlebbit' && (
                    <div className={styles.card_top_right_sub}>
                      <Link
                        to={`/p/${post?.subplebbitAddress}/`}
                        className={styles.card_top_right_sub_text}
                      >
                        {getSubName(subPlebbit)}
                      </Link>
                    </div>
                  )}
                  {type !== 'subPlebbit' && <span className={styles.dot}>•</span>}

                  <span className={styles.posted_by}>Posted by</span>
                  {/* post author */}
                  <div className={styles.author_wrap}>
                    <div>
                      <Link to={authorPath} className={styles.author}>
                        {' '}
                        {getUserName(post?.author)}
                      </Link>
                    </div>
                  </div>
                  {/* authors flair */}
                  {post?.author?.flair && (
                    <div className={styles.authors_flair}>
                      <FlairLabel
                        bg={statusBg}
                        color={statusColor}
                        text={post?.author?.flair?.text}
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="16px"
                        borderRadius="2px"
                        display="inline-block"
                        mr="5px"
                        overflow="hidden"
                        isTruncated
                        padding="0 4px"
                      />
                    </div>
                  )}
                  {/* date/time */}

                  <span className={styles.post_timestamp}>
                    {dateToFromNowDaily(parseInt(post?.timestamp * 1000))}
                  </span>

                  {/* locked */}
                  {post?.locked && (
                    <span className={styles.lock_wrap}>
                      <HiLockClosed color="#ffd635" />
                    </span>
                  )}
                  {/* removed */}
                  {post?.removed && (
                    <div
                      className={styles.remove_icon_wrap}
                      onClick={() => (!post?.reason ? openRemovalModal() : {})}
                    >
                      <FcCancel />
                      {!post?.reason ? (
                        allowedSpecial && <div>Add a removal reason</div>
                      ) : (
                        <div className={styles.removal_reason}>{post?.reason}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.mobile_post_header_container}>
          <div className={styles.sub_detail_wrap}>
            <div className={styles.sub_detail}>
              <span>
                <span className={styles.mobile_top_subndate}>
                  <Link className={styles.mobile_sub_link} to={`/p/${post?.subplebbitAddress}/`}>
                    <div className={styles.mobile_sub_icon}>
                      <Avatar
                        avatar={subPlebbit?.suggested?.avatarUrl}
                        width={32}
                        height={32}
                        badge
                        isOnline={isOnline}
                      />
                    </div>
                    {getSubName(subPlebbit || { address: post?.subplebbitAddress })}
                  </Link>
                  <Dot />
                  <span>{dateToFromNowDaily(post?.timestamp * 1000)}</span>
                </span>
                {(detail || type === 'subPlebbit') && post?.author?.flair && (
                  <>
                    <Dot />
                    <FlairLabel
                      bg={statusBg}
                      color={statusColor}
                      text={post?.author?.flair?.text}
                      fontSize="12px"
                      fontWeight="500"
                      lineHeight="16px"
                      borderRadius="16px"
                      display="inline-block"
                      mr="5px"
                      overflow="hidden"
                      isTruncated
                      padding="0 4px"
                    />
                  </>
                )}

                {(detail || type === 'subPlebbit') && pending && !loading && (
                  <>
                    <Dot />
                    <PendingLabel />
                  </>
                )}
                {(detail || type === 'subPlebbit') && post?.spoiler && (
                  <>
                    <Dot />
                    <span>
                      <span className={styles.spoiler}>SPOILER</span>
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
          <div className={styles.sub_statuses}>
            {(detail || type === 'subPlebbit') && post?.pinned && (
              <BsPinAngleFill className={styles.status} color="#46d160" />
            )}
            {post?.locked && <HiLockClosed className={styles.status} color="#ffd635" />}
            {post?.removed && <AiTwotoneDelete className={styles.status} color="#ff585b" />}
          </div>
          {!pending && (
            <DropDown
              onChange={handleOption}
              rightOffset="10px"
              leftOffset="none"
              dropDownTitle={
                <div className={styles.mobile_card_menu}>
                  <FiMoreHorizontal size={16} />
                </div>
              }
              options={[
                {
                  label: 'Edit',
                  icon: BsPencil,
                  id: 'edit',
                  disabled: !(owner && detail),
                },
                {
                  label: 'Approve',
                  icon: HiOutlineCheckCircle,
                  id: 'approved',
                  disabled: !(allowedSpecial && post?.removed),
                },
                {
                  label: 'Remove',
                  icon: TiDeleteOutline,
                  id: 'removed',
                  disabled: !(allowedSpecial && !post?.removed),
                },
                {
                  label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                  icon: GoMute,
                  id: 'mute',
                  disabled: type === 'subPlebbit',
                },
                {
                  label: blocked ? 'Unhide' : 'Hide',
                  icon: BsEyeSlash,
                  id: 'block',
                },
                {
                  label: 'Delete',
                  icon: MdOutlineDeleteOutline,
                  id: 'delete',
                  disabled: !owner,
                },
              ]}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PostTop;
