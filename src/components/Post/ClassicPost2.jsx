import React from 'react'
import styles from './classic-post.module.css'
import PostVote from './PostVote'
import { BsCardImage, BsFileText, BsLink45Deg, BsPlayBtn } from 'react-icons/bs'
import PostTitle from './PostTitle'
import PostTop from './PostTop'
import { FiExternalLink } from 'react-icons/fi'
import { MdOutlineAudiotrack } from 'react-icons/md'
import PostFooter from './PostFooter'
import PostBody from './PostBody'

const ClassicPost2 = ({
    loading,
    vote,
    post,
    type,
    showContent,
    setShowContent,
    location,
    copied,
    detail,
    isOnline,
    handleOption,
    subPlebbit: sub,
    postVotes,
    handleCopy,
    pending,
    detailRoute,
    openRemovalModal,
    allowedSpecial,
    owner,
    showSpoiler,
    setShowSpoiler,
    mediaInfo,
    hasThumbnail,
    commentCount,
    upVote,
    downVote,
    editLabel,
    authorPath,
    stateString,
    blocked, muted,
}) => {
    const subPlebbit = sub || { address: post?.subplebbitAddress };
    return (
        <div className={ styles.wrapper }>
            {/* Vote Bar */ }
            <PostVote vote={ vote } upVote={ upVote } downVote={ downVote } postVotes={ postVotes } />
            <div className={ styles.main }>
                <div className={ styles.main_wrap }>
                    <div className={ styles.left }>
                        <div className={ styles.left_wrap }>
                            <div className={ styles.icon_wrap }>
                                {
                                    post?.content ?
                                        <BsFileText className={ `${styles.icon} ${styles.icon_text_post}` } />
                                        : hasThumbnail ? <a href={ post?.link } target='_blank'>
                                            <div className={ styles.img_cont } style={ {
                                                backgroundImage: `url(${post?.thumbnailUrl})`
                                            } }>
                                                <BsLink45Deg className={ `${styles.icon} ${styles.icon_text_post}` } />
                                                <div
                                                    className={ styles.external_wrap }
                                                >
                                                    <FiExternalLink className={ styles.external_icon } />
                                                </div>
                                                <img alt={ post?.title } style={ {
                                                    display: 'none'
                                                } } />
                                            </div>
                                        </a> : mediaInfo?.type === 'image' ? <a href={ post?.link } target='_blank'>
                                            <div className={ styles.img_cont } style={ {
                                                backgroundImage: `url(${mediaInfo?.url})`
                                            } }>
                                                <BsCardImage className={ `${styles.icon} ${styles.icon_text_post}` } />
                                                <img alt={ post?.title } style={ {
                                                    display: 'none'
                                                } } />
                                            </div>
                                        </a> : mediaInfo?.type === 'video' ?
                                            <BsPlayBtn className={ `${styles.icon} ${styles.icon_text_post}` } />
                                            : mediaInfo?.type === 'audio' ?
                                                <MdOutlineAudiotrack className={ `${styles.icon} ${styles.icon_text_post}` } />

                                                : post?.link ? <BsLink45Deg className={ `${styles.icon} ${styles.icon_text_post}` } /> : ''

                                }
                            </div>

                        </div>

                    </div>
                    <div className={ styles.right }>
                        <PostTitle showThumbnailLink post={ post } detailRoute={ detailRoute } editLabel={ editLabel } pending={ pending } type={ type } titleStyle={ {
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "20px"

                        } } hasThumbnail={ hasThumbnail } />
                        <PostTop post={ post } type={ type } subPlebbit={ subPlebbit } isOnline={ isOnline } authorPath={ authorPath } loading={ loading } stateString={ stateString } openRemovalModal={ openRemovalModal } hideAvatar />
                        <PostFooter muted={ muted } blocked={ blocked } owner={ owner } subPlebbit={ subPlebbit } handleOption={ handleOption } type={ type } location={ location } handleCopy={ handleCopy } copied={ copied } detailRoute={ detailRoute } allowedSpecial={ allowedSpecial } post={ post } pending={ pending } loading={ loading } commentCount={ commentCount } showContent={ showContent } setShowContent={ setShowContent } classic hasThumbnail={ hasThumbnail } />
                    </div>

                </div>
                { showContent && !post?.removed && <div className={ styles.content }>

                    <PostBody post={ post } hasThumbnail={ hasThumbnail } detailRoute={ detailRoute } />

                </div> }
            </div>
        </div>
    )
}

export default ClassicPost2