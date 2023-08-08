import React from 'react'
import styles from './compact-post.module.css'
import PostVote from '../PostVote'

import CompactLeftIcons from './CompactLeftIcons'
import PostTitle from '../PostTitle'

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
    muted,
    isYoutube
}) => {


    return (
        <div className={ styles.wrapper }>
            <div className={ styles.container }>
                {/* Vote Bar */ }
                <PostVote vote={ vote } upVote={ upVote } downVote={ downVote } postVotes={ postVotes } horizontal />

                <div className={ styles.main }>
                    <div className={ styles.main_wrap }>
                        <CompactLeftIcons showContent={ showContent } setShowContent={ setShowContent } isYoutube={ isYoutube } post={ post } mediaInfo={ mediaInfo } />
                        <div className={ styles.body }>
                            <PostTitle showThumbnailLink post={ post } detailRoute={ detailRoute } editLabel={ editLabel } pending={ pending } type={ type } titleStyle={ {
                                fontSize: "14px",
                                fontWeight: "500",
                                lineHeight: "18px"

                            } } hasThumbnail={ hasThumbnail } />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompactPost2