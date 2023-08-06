import React from 'react'
import styles from './card-post.module.css'
import { BsBookmark, BsChatSquare, BsEyeSlash, BsPinAngleFill } from 'react-icons/bs'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { GoGift, GoMute } from 'react-icons/go'
import { FaShare } from 'react-icons/fa'
import { FiExternalLink, FiMoreHorizontal } from 'react-icons/fi'
import numFormatter from '../../utils/numberFormater'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import getUserName, { getSubName } from '../../utils/getUserName'
import dateToFromNowDaily from '../../utils/formatDate'
import Marked from "../Editor/marked";
import PostMedia from './PostMedia'
import useStore from '../../store/useStore'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar'
import PostTop from './PostTop'
import PostTitle from './PostTitle'
import PostBody from './PostBody'
import PostFooter from './PostFooter'

const CardPost2 = ({
    post,
    vote,
    postVotes,
    loading,
    type,
    detail,
    handleOption,
    location,
    copied,
    isOnline,
    subPlebbit: sub,
    handleCopy,
    pending,
    detailRoute,
    allowedSpecial,
    openRemovalModal,
    owner,
    showSpoiler,
    setShowSpoiler,
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

    const subPlebbit = sub || { address: post?.subplebbitAddress };

    const { device } = useStore(state => state);
    const getLink = (link) => {
        let val

        try {
            val = (link?.startsWith('https://') || link?.startsWith('https://www.')) ? link.replace(/^https:\/\/(www.)?/, '') : link
            return val
        } catch (error) {

        }
    }

    return (
        <div className={ styles.wrapper }>
            {/* Vote Bar */ }
            <div className={ styles.vote_bar }>
                <div className={ styles.vote_btn_wrap }>
                    <button className={ styles.vote_btn } onClick={ upVote }>
                        <div className={ styles.upVote_wrap }>
                            { vote === 1 ? <ImArrowUp className={ styles.upVote } /> : <BiUpvote className={ styles.upVote } /> }
                        </div>
                    </button>
                    <div className={ styles.vote_text }>
                        { postVotes === 0 ? "vote" : numFormatter(postVotes) }
                    </div>
                    <button className={ styles.vote_btn } onClick={ downVote }>
                        <div className={ styles.upVote_wrap }>
                            { vote === -1 ? <ImArrowDown className={ styles.downVote } /> : <BiDownvote className={ styles.downVote } /> }

                        </div>
                    </button>
                </div>
            </div>
            <div className={ styles.card_main }>
                { post?.pinned && type === "subPlebbit" && (
                    <div
                        className={ styles.pin_head_wrap }
                    >
                        <BsPinAngleFill
                            className={ styles.pin_head_icon }
                        />
                        <span
                            className={ styles.pin_head_text }
                        >
                            PINNED BY MODERATORS
                        </span>{ " " }



                    </div>
                ) }
                {/* post card top */ }
                <PostTop post={ post } type={ type } subPlebbit={ subPlebbit } isOnline={ isOnline } authorPath={ authorPath } loading={ loading } stateString={ stateString } openRemovalModal={ openRemovalModal } />
                {/* post  title */ }
                <PostTitle post={ post } detailRoute={ detailRoute } editLabel={ editLabel } pending={ pending } type={ type } />
                {/* post  body */ }
                <PostBody post={ post } hasThumbnail={ hasThumbnail } />
                {/* post  fgooter */ }
                <PostFooter muted={ muted } blocked={ blocked } owner={ owner } subPlebbit={ subPlebbit } handleOption={ handleOption } type={ type } location={ location } handleCopy={ handleCopy } copied={ copied } detailRoute={ detailRoute } allowedSpecial={ allowedSpecial } post={ post } pending={ pending } loading={ loading } commentCount={ commentCount } />

            </div>
        </div>
    )
}

export default CardPost2