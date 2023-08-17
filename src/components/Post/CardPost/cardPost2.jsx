import React from 'react'
import styles from './card-post.module.css'
import { BsBookmark, BsChatSquare, BsEyeSlash, BsPencil, BsPinAngleFill } from 'react-icons/bs'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { GoGift, GoMute } from 'react-icons/go'
import { FaShare } from 'react-icons/fa'
import { FiExternalLink, FiMoreHorizontal } from 'react-icons/fi'
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
    const approveColor = useColorModeValue("pastelGreen", "pastelGreen");
    const removeColor = useColorModeValue("persimmon", "persimmon");
    const lockColor = useColorModeValue("brightSun", "brightSun");
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
        <>
            {
                device !== 'mobile' ?
                    <div className={ styles.wrapper }>
                        {/* Vote Bar */ }
                        <PostVote vote={ vote } upVote={ upVote } downVote={ downVote } postVotes={ postVotes } />

                        <div className={ styles.card_main }>
                            <article className={ styles.card_article }>
                                <div>
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
                                    <div className={ styles.mobile_post_header_container }>
                                        <div className={ styles.sub_detail_wrap }>
                                            <div className={ styles.sub_detail }>
                                                <span>
                                                    <Link className={ styles.mobile_sub_link } to={ `p/${post?.subplebbitAddress}/` }>
                                                        <div className={ styles.mobile_sub_icon }>

                                                            <Avatar
                                                                avatar={ subPlebbit?.suggested?.avatarUrl }
                                                                width={ 32 }
                                                                height={ 32 }
                                                                badge
                                                                isOnline={ isOnline }

                                                            />
                                                        </div>
                                                        { getSubName(
                                                            subPlebbit || { address: post?.subplebbitAddress }
                                                        ) }
                                                    </Link>
                                                    <Dot />
                                                    { post?.author?.flair && (

                                                        <FlairLabel bg={ statusBg } color={ statusColor } text={ post?.author?.flair?.text }
                                                            fontSize="12px"
                                                            fontWeight="500"
                                                            lineHeight="16px"
                                                            borderRadius="16px"
                                                            display="inline-block"
                                                            mr="5px"
                                                            overflow="hidden"
                                                            isTruncated
                                                            padding="0 4px" />
                                                    ) }
                                                    <Dot />
                                                    <span>
                                                        { dateToFromNowDaily(post?.timestamp * 1000) }
                                                    </span>

                                                    { pending && !loading && (
                                                        <>
                                                            <Dot />
                                                            <PendingLabel />
                                                        </>


                                                    ) }
                                                    { post?.spoiler && <>

                                                        <Dot />
                                                        <span>
                                                            <span className={ styles.spoiler }>SPOILER</span>
                                                        </span>
                                                    </> }
                                                </span>
                                            </div>


                                        </div>
                                        <div className={ styles.sub_statuses }>
                                            { (detail || type === "subPlebbit") && post?.pinned && (
                                                <BsPinAngleFill className={ styles.status } color='#46d160' />) }
                                            { post?.locked && (
                                                <HiLockClosed className={ styles.status } color='#ffd635' />) }
                                            { post?.removed && (
                                                <AiTwotoneDelete className={ styles.status } color='#ff585b' />) }
                                        </div>
                                        { !pending && <DropDown
                                            onChange={ handleOption }
                                            rightOffset="10px"
                                            leftOffset="none"
                                            dropDownTitle={
                                                <div className={ styles.mobile_card_menu }>
                                                    <FiMoreHorizontal size={ 16 } />
                                                </div>
                                            }
                                            options={ [
                                                {
                                                    label: "Edit",
                                                    icon: BsPencil,
                                                    id: "edit",
                                                    disabled: !(owner && detail),
                                                },
                                                {
                                                    label: "Approve",
                                                    icon: HiOutlineCheckCircle,
                                                    id: "approved",
                                                    disabled: !(allowedSpecial && post?.removed),
                                                },
                                                {
                                                    label: "Remove",
                                                    icon: TiDeleteOutline,
                                                    id: "removed",
                                                    disabled: !(allowedSpecial && !post?.removed),
                                                },
                                                {
                                                    label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                                                    icon: GoMute,
                                                    id: "mute",
                                                    disabled: type === "subPlebbit"
                                                },
                                                {
                                                    label: "Hide",
                                                    icon: BsEyeSlash,
                                                    id: "block",

                                                },
                                                {
                                                    label: "Delete",
                                                    icon: MdOutlineDeleteOutline,
                                                    id: "delete",
                                                    disabled: !owner,
                                                },
                                            ] }
                                        /> }

                                    </div>
                                    <Link to={ detailRoute } className={ styles.post_mobile_title_wrap }>
                                        { post?.title }
                                    </Link>
                                    { type === "subPlebbit" && post?.flair?.text ? (
                                        <div className={ styles.mobile_flair_container_wrap }>
                                            <FlairLabel flair={ post?.flair } />

                                        </div>
                                    ) : (
                                        ""
                                    ) }
                                </header>
                            </div>
                        </article>
                    </div>
            }


        </>
    )
}

export default CardPost2