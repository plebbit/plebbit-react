import React from 'react'
import styles from './card-post.module.css'
import { BsBookmark, BsChat, BsChatSquare, BsEyeSlash, BsPencil, BsPinAngleFill } from 'react-icons/bs'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { GoGift, GoMute } from 'react-icons/go'
import { FaShare } from 'react-icons/fa'
import { FiExternalLink, FiMoreHorizontal, FiShare } from 'react-icons/fi'
import numFormatter from '../../../utils/numberFormater'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import getUserName, { getSubName } from '../../../utils/getUserName'
import dateToFromNowDaily from '../../../utils/formatDate'
import Marked from "../../Editor/marked";
import PostMedia from '../PostMedia'
import useStore from '../../../store/useStore'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar'
import PostTop from '../PostTop'
import PostTitle from '../PostTitle'
import PostBody from '../PostBody'
import PostFooter from '../PostFooter'
import PostVote from '../PostVote'
import Image from '../../Image'
import PendingLabel from '../../Label/pendingLabel'
import { useColorModeValue } from '@chakra-ui/react'
import { HiLockClosed, HiOutlineCheckCircle } from 'react-icons/hi'
import { AiTwotoneDelete } from 'react-icons/ai'
import DropDown from '../../DropDown'
import { TiDeleteOutline } from 'react-icons/ti'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import Dot from '../../Dot'
import truncateString from '../../../utils/truncateString'
import CopyToClipboard from 'react-copy-to-clipboard'

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
    mediaInfo,
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


    return (
        <>
            {
                device !== 'mobile' ?
                    <div className={ styles.wrapper }>
                        {/* Vote Bar */ }
                        <PostVote vote={ vote } upVote={ upVote } downVote={ downVote } postVotes={ postVotes } />

                        <div className={ styles.card_main }>
                            <article className={ styles.card_article }>
                                <div className={ styles.article_left }>
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
                                    <PostTop post={ post } type={ type } subPlebbit={ subPlebbit } isOnline={ isOnline } authorPath={ authorPath } loading={ loading } stateString={ stateString } openRemovalModal={ openRemovalModal } allowedSpecial={ allowedSpecial } />
                                    {/* post  title */ }
                                    <PostTitle post={ post } detailRoute={ detailRoute } editLabel={ editLabel } pending={ pending } type={ type } />
                                    {/* post  body */ }
                                    <PostBody post={ post } hasThumbnail={ hasThumbnail } detailRoute={ detailRoute } />
                                </div>
                                { hasThumbnail &&
                                    <div className={ styles.article_right }>
                                        <div className={ styles.card_thumbnail_wrap }>
                                            <a href={ post?.link } target='_blank'>
                                                <div className={ styles.img_cont } style={ {
                                                    backgroundImage: `url(${post?.thumbnailUrl})`
                                                } }>
                                                    <div
                                                        className={ styles.external_wrap }
                                                    >
                                                        <FiExternalLink className={ styles.external_icon } />
                                                    </div>
                                                    <img alt={ post?.title } style={ {
                                                        display: 'none'
                                                    } } />
                                                </div>
                                            </a>

                                        </div>
                                    </div> }
                            </article>
                            {/* post  fgooter */ }
                            <PostFooter muted={ muted } blocked={ blocked } owner={ owner } subPlebbit={ subPlebbit } handleOption={ handleOption } type={ type } location={ location } handleCopy={ handleCopy } copied={ copied } detailRoute={ detailRoute } allowedSpecial={ allowedSpecial } post={ post } pending={ pending } loading={ loading } commentCount={ commentCount } />
                        </div>


                    </div> :
                    <div>
                        <article className={ styles.mobile_wrapper }>
                            <Link to={ detailRoute } />

                            <div className={ styles.mobile_header_wrapper }>
                                <header className={ styles.mobile_post_header }>
                                    <PostTop post={ post } type={ type } subPlebbit={ subPlebbit } isOnline={ isOnline } authorPath={ authorPath } loading={ loading } stateString={ stateString } openRemovalModal={ openRemovalModal } allowedSpecial={ allowedSpecial } pending={ pending } detail={ detail } handleOption={ handleOption } owner={ owner } muted={ muted } blocked={ blocked } />
                                    <PostTitle type={ type } post={ post } detailRoute={ detailRoute } />
                                </header>
                            </div>
                            <PostBody post={ post } hasThumbnail={ hasThumbnail } detailRoute={ detailRoute } mediaInfo={ mediaInfo } detail={ detail } showSpoiler={ showSpoiler } setShowSpoiler={ setShowSpoiler } />
                            <PostFooter muted={ muted } blocked={ blocked } owner={ owner } subPlebbit={ subPlebbit } handleOption={ handleOption } type={ type } location={ location } handleCopy={ handleCopy } copied={ copied } allowedSpecial={ allowedSpecial } detailRoute={ detailRoute } post={ post } pending={ pending } loading={ loading } commentCount={ commentCount } mediaInfo={ mediaInfo } vote={ vote } postVotes={ postVotes } />
                        </article>
                    </div>
            }


        </>
    )
}

export default CardPost2