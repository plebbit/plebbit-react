import React from 'react'
import styles from './compact-post.module.css'
import PostVote from '../PostVote'
import { BsPlayBtn } from 'react-icons/bs'

const CompactPost2 = ({
    loading,
    setShowContent,
    showContent,
    vote,
    post,
    type,
    isOnline,
    subPlebbit,
    postVotes,
    handleOption,
    // setCopied,
    // location,
    // copied,
    pending,
    detailRoute,
    openRemovalModal,
    allowedSpecial,
    mediaInfo,
    owner,
    hasThumbnail,
    commentCount,
    upVote,
    downVote,
    editLabel,
    authorPath,
    stateString,
    blocked,
    muted
}) => {
    return (
        <div className={ styles.wrapper }>
            <div className={ styles.container }>
                {/* Vote Bar */ }
                <PostVote vote={ vote } upVote={ upVote } downVote={ downVote } postVotes={ postVotes } horizontal />


            </div>
        </div>
    )
}

export default CompactPost2