import React from 'react'
import styles from './classic-post.module.css'
import PostVote from './PostVote'
import { BsFileText } from 'react-icons/bs'

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
    blocked, muted
}) => {
    return (
        <div className={ styles.wrapper }>
            {/* Vote Bar */ }
            <PostVote vote={ vote } upVote={ upVote } downVote={ downVote } postVotes={ postVotes } />
            <div className={ styles.main }>
                <div className={ styles.main_wrap }>
                    <div className={ styles.left }>
                        <div className={ styles.left_wrap }>
                            <div className={ styles.icon_wrap }>
                                <BsFileText className={ `${styles.icon} ${styles.icon_text_post}` } />
                            </div>

                        </div>

                    </div>
                    <div className={ styles.right }></div>

                </div>

            </div>
        </div>
    )
}

export default ClassicPost2