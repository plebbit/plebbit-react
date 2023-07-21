import React, { useContext } from 'react'
import styles from './card-post.module.css'
import { BsBookmark, BsChatSquare } from 'react-icons/bs'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { GoGift } from 'react-icons/go'
import { FaShare } from 'react-icons/fa'
import { FiExternalLink, FiMoreHorizontal } from 'react-icons/fi'
import { ProfileContext } from '../../store/profileContext'
import numFormatter from '../../utils/numberFormater'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import getUserName, { getSubName } from '../../utils/getUserName'
import dateToFromNowDaily from '../../utils/formatDate'
import Marked from "../Editor/marked";
import PostMedia from './PostMedia'

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

    const { device } = useContext(ProfileContext);
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
                <div className={ styles.card_top }>
                    <div className={ styles.card_avatar_wrap }>
                        <a href={ `p/${post?.subplebbitAddress}/` } className={ styles.card_avatar }>
                            <img className={ styles.card_image } src={ subPlebbit?.suggested?.avatarUrl } alt='sub-avatar' />
                        </a>
                    </div>
                    <div className={ styles.card_top_right }>
                        <div className={ styles.card_top_right_txt }>
                            <div className={ styles.card_top_right_sub }>
                                <a href={ `p/${post?.subplebbitAddress}/` } className={ styles.card_top_right_sub_text }>{ getSubName(subPlebbit) }</a>
                            </div>
                            <span className={ styles.dot }>•</span>
                            <span className={ styles.posted_by }>Posted by</span>
                            <div className={ styles.author_wrap }>
                                <div>
                                    <a href={ authorPath } className={ styles.author }> { getUserName(post?.author) }</a>
                                </div>
                            </div>
                            <span className={ styles.post_timestamp }> { dateToFromNowDaily(
                                parseInt(post?.timestamp * 1000)
                            ) }</span>
                        </div>
                    </div>
                </div>
                <div className={ styles.card_title }>
                    <div className={ styles.post_title_wrap }>
                        <a className={ styles.post_title }>
                            <div className={ styles.title_wrap }>
                                <h3 className={ styles.title }>   { post?.title }</h3>
                            </div>
                        </a>
                    </div>
                </div>
                <div className={ styles.card_body }>
                    { post?.content && (
                        <a className={ styles.card_body_wrap }>
                            <div className={ styles.bodyWrap }>
                                <div className={ styles.body }>

                                    { post?.spoiler ? (
                                        ""
                                    ) : post?.removed ? (
                                        "[removed]"
                                    ) : (
                                        <Marked content={ post?.content } />
                                    ) }

                                </div>
                            </div>
                        </a>
                    ) }
                    {/*link post  without media  */ }

                    <div className={ styles.post_link_wrap } >
                        { hasThumbnail && (
                            <a
                                href={ post?.link }
                                className={ styles.post_link }
                            >
                                <div>{ post?.link?.substring(0, 20) + "..." }</div>
                                <FiExternalLink
                                    className={ styles.post_link_icon }
                                />
                            </a>
                        ) }
                    </div>

                    {/*link post  with media  */ }

                    <PostMedia post={ post } />
                </div>
                <div className={ styles.card_footer }>
                    <div className={ styles.card_footer_wrap }>
                        <a className={ styles.footer_comment }>
                            <BsChatSquare className={ styles.footer_comment_icon } />
                            <span className={ styles.footer_comment_text }>56 comments</span>
                        </a>
                        <div className={ styles.footer_award }>
                            <button className={ styles.card_footer_award_wrap }>
                                <span className={ styles.award_icon_wrap }>
                                    <GoGift className={ styles.award_icon } />
                                </span>
                                <span>Award</span>
                            </button>
                        </div>
                        <div className={ styles.footer_award }>
                            <button className={ styles.card_footer_award_wrap }>
                                <span className={ styles.award_icon_wrap }>
                                    <FaShare className={ styles.award_icon } />
                                </span>
                                <span>Share</span>
                            </button>
                        </div>
                        <div className={ styles.footer_award }>
                            <button className={ styles.card_footer_award_wrap }>
                                <span className={ styles.award_icon_wrap }>
                                    <BsBookmark className={ styles.award_icon } />
                                </span>
                                <span>Save</span>
                            </button>
                        </div>
                        <div className={ styles.footer_award }>
                            <button className={ styles.card_footer_award_wrap }>
                                <span className={ styles.award_icon_wrap }>
                                    <FiMoreHorizontal className={ styles.award_icon } />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardPost2