import React from 'react'
import { BsBookmark, BsChat, BsChatSquare, BsEyeSlash, BsFlag, BsLink45Deg, BsShield } from 'react-icons/bs'
import { FaShare } from 'react-icons/fa'
import DropDown from '../../DropDown'
import { FiMoreHorizontal, FiShare } from 'react-icons/fi'
import { getSubName } from '../../../utils/getUserName'
import styles from './post-footer.module.css'
import { GoMute, GoGift } from 'react-icons/go'
import { MdOutlineDeleteOutline, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import { TiDeleteOutline } from 'react-icons/ti'
import { CgArrowsExpandLeft, CgCompressLeft } from 'react-icons/cg'
import { VscLinkExternal } from 'react-icons/vsc'
import useStore from '../../../store/useStore'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import numFormatter from '../../../utils/numberFormater'

const PostFooter = ({ muted, blocked, owner, subPlebbit, handleOption, type, location, handleCopy, copied, allowedSpecial, detailRoute, post, pending, loading, commentCount, showContent, setShowContent, classic, hasThumbnail, compact, mediaInfo, vote, postVotes }) => {
    const { device } = useStore(state => state);
    return (
        <>
            { device !== "mobile" ?
                <>{
                    compact ?
                        <>

                            {
                                allowedSpecial ?
                                    <div className={ styles?.compact_footer }>
                                        <Link to={ detailRoute } className={ styles.compact_footer_comment }>
                                            <BsChatSquare className={ styles.compact_comment_icon } />
                                            <span className={ styles.compact_comment_text }>{ commentCount }</span>
                                        </Link>

                                        <div className={ styles.remove_group }>
                                            <button className={ styles.remove_btn } onClick={ () => handleOption({ id: 'approved' }) }>
                                                <HiOutlineCheckCircle className={ styles.remove_btn_icon } />
                                            </button>
                                            <button className={ styles.remove_btn } onClick={ () => handleOption({ id: 'removed' }) }>
                                                <TiDeleteOutline className={ styles.remove_btn_icon } />
                                            </button>

                                        </div>

                                        <DropDown
                                            onChange={ handleOption }
                                            dropDownTitle={
                                                <button className={ styles.compact_footer_more }>
                                                    <BsShield className={ styles.compact_footer_more_icon } />
                                                </button>
                                            }
                                            options={ [
                                                {
                                                    label: 'Sticky Post',
                                                    icon: post?.pinned ? MdCheckBox : MdCheckBoxOutlineBlank,
                                                    id: 'pinned',
                                                },
                                                {
                                                    label: 'Lock Comments',
                                                    icon: post?.locked ? MdCheckBox : MdCheckBoxOutlineBlank,
                                                    id: 'locked',
                                                },
                                                {
                                                    label: 'Mark As Spoiler',
                                                    icon: post?.spoiler ? MdCheckBox : MdCheckBoxOutlineBlank,
                                                    id: 'spoiler',
                                                },
                                            ] }
                                            rightOffset={ 0 }
                                            leftOffset="none"
                                            topOffset="34px"
                                        />
                                        <DropDown
                                            onChange={ handleOption }
                                            dropDownTitle={
                                                <button className={ styles.compact_footer_more }>
                                                    <FiMoreHorizontal className={ styles.compact_footer_more_icon } />
                                                </button>
                                            }
                                            options={ [
                                                {
                                                    label: "Give Award",
                                                    icon: GoGift,
                                                    id: 'gift'

                                                },
                                                {
                                                    label: "Copy Link",
                                                    icon: BsLink45Deg,
                                                    id: 'copy'

                                                },
                                                {
                                                    label: "Save",
                                                    icon: BsBookmark,
                                                    id: 'unknown',
                                                    disabled: owner

                                                },
                                                {
                                                    label: "Report",
                                                    icon: BsFlag,
                                                    id: 'unknown',
                                                    disabled: owner

                                                },
                                                {
                                                    label: blocked ? 'Unhide' : "Hide",
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
                                            rightOffset={ 0 }
                                            leftOffset="none"
                                            topOffset="34px"
                                        />


                                    </div>
                                    : <div className={ styles?.compact_footer }>
                                        <Link to={ detailRoute } className={ styles.compact_footer_comment }>
                                            <BsChatSquare className={ styles.compact_comment_icon } />
                                            <span className={ styles.compact_comment_text }>{ commentCount }</span>
                                        </Link>

                                        <DropDown
                                            onChange={ handleOption }
                                            dropDownTitle={
                                                <button className={ styles.compact_footer_more }>
                                                    <FiMoreHorizontal className={ styles.compact_footer_more_icon } />
                                                </button>
                                            }
                                            options={ [
                                                {
                                                    label: "Give Award",
                                                    icon: GoGift,
                                                    id: 'gift'

                                                },
                                                {
                                                    label: "Copy Link",
                                                    icon: BsLink45Deg,
                                                    id: 'copy'

                                                },
                                                {
                                                    label: "Save",
                                                    icon: BsBookmark,
                                                    id: 'unknown',
                                                    disabled: owner

                                                },
                                                {
                                                    label: "Report",
                                                    icon: BsFlag,
                                                    id: 'unknown',
                                                    disabled: owner

                                                },
                                                {
                                                    label: blocked ? 'Unhide' : "Hide",
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
                                            rightOffset={ 0 }
                                            leftOffset="none"
                                            topOffset="34px"
                                        />



                                    </div>
                            }


                        </>
                        :
                        <>
                            { pending ? (
                                !loading && <div />
                            ) :
                                allowedSpecial ?
                                    <div className={ styles.card_footer }>
                                        <div className={ styles.card_footer_wrap }>
                                            { classic && <>

                                                {
                                                    !hasThumbnail && (post?.content || mediaInfo) ? <>

                                                        <button className={ styles.show_content } onClick={ () => setShowContent(!showContent) }>
                                                            {
                                                                showContent ? <CgCompressLeft className={ styles.show_content_icon } /> : <CgArrowsExpandLeft className={ styles.award_icon } />
                                                            }
                                                        </button>


                                                        <div className={ styles.hr } />
                                                    </> :
                                                        <a href={ post?.link } className={ styles.footer_comment } target="_blank">
                                                            <VscLinkExternal className={ styles.footer_comment_icon } />
                                                        </a>


                                                }



                                            </> }

                                            <Link to={ detailRoute } className={ styles.footer_comment }>
                                                <BsChatSquare className={ styles.footer_comment_icon } />
                                                <span className={ styles.footer_comment_text }>{ commentCount } { type !== "subPlebbit" && 'comments' }</span>
                                            </Link>
                                            <div className={ styles.footer_award }>
                                                <button className={ styles.card_footer_award_wrap }>
                                                    <span className={ styles.award_icon_wrap }>
                                                        <GoGift className={ styles.award_icon } />
                                                    </span>
                                                    <span>Award</span>
                                                </button>
                                            </div>
                                            <CopyToClipboard text={ location } onCopy={ handleCopy }>
                                                <div className={ styles.footer_award }>
                                                    <button className={ styles.card_footer_award_wrap }>
                                                        <span className={ styles.award_icon_wrap }>
                                                            <FaShare className={ styles.award_icon } />
                                                        </span>
                                                        <span> { copied ? "copied" : "Share" }</span>
                                                    </button>
                                                </div>
                                            </CopyToClipboard>
                                            { post?.removed ?
                                                <div className={ styles.footer_award }>
                                                    <button className={ styles.card_footer_award_wrap } onClick={ () => handleOption({ id: "approved" }) }>
                                                        <span className={ styles.award_icon_wrap }>
                                                            <HiOutlineCheckCircle className={ styles.award_icon } />
                                                        </span>
                                                        <span>Approve</span>
                                                    </button>
                                                </div>
                                                :
                                                <div className={ styles.footer_award }>
                                                    <button className={ styles.card_footer_award_wrap } onClick={ () => handleOption({ id: "removed" }) }>
                                                        <span className={ styles.award_icon_wrap }>
                                                            <TiDeleteOutline className={ styles.award_icon } />
                                                        </span>
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            }
                                            <div className={ styles.footer_award }>

                                                <DropDown
                                                    onChange={ handleOption }
                                                    dropDownTitle={
                                                        <button className={ styles.card_footer_award_wrap }>
                                                            <span className={ styles.award_icon_wrap }>
                                                                <BsShield className={ styles.award_icon } />
                                                            </span>
                                                        </button>
                                                    }
                                                    options={ [
                                                        {
                                                            label: "Sticky Post",
                                                            icon: post?.pinned
                                                                ? MdCheckBox
                                                                : MdCheckBoxOutlineBlank,
                                                            id: "pinned",
                                                        },
                                                        {
                                                            label: "Lock Comments",
                                                            icon: post?.locked
                                                                ? MdCheckBox
                                                                : MdCheckBoxOutlineBlank,
                                                            id: "locked",
                                                        },
                                                        {
                                                            label: "Mark As Spoiler",
                                                            icon: post?.spoiler
                                                                ? MdCheckBox
                                                                : MdCheckBoxOutlineBlank,
                                                            id: "spoiler",
                                                        },
                                                    ] }
                                                    rightOffset={ 0 }
                                                    leftOffset="none"
                                                    topOffset="34px"
                                                />

                                            </div>
                                            <div className={ styles.footer_award }>

                                                <DropDown
                                                    onChange={ handleOption }
                                                    dropDownTitle={
                                                        <button className={ styles.card_footer_award_wrap }>
                                                            <span className={ styles.award_icon_wrap }>
                                                                <FiMoreHorizontal className={ styles.award_icon } />
                                                            </span>
                                                        </button>
                                                    }
                                                    options={ [
                                                        {
                                                            label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                                                            icon: GoMute,
                                                            id: "mute",
                                                            disabled: type === "subPlebbit"
                                                        },
                                                        {
                                                            label: blocked ? 'Unhide' : "Hide",
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
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={ styles.card_footer }>
                                        <div className={ styles.card_footer_wrap }>
                                            { classic && <>

                                                {
                                                    !hasThumbnail && (post?.content || mediaInfo) ? <>

                                                        <button className={ styles.show_content } onClick={ () => setShowContent(!showContent) }>
                                                            {
                                                                showContent ? <CgCompressLeft className={ styles.show_content_icon } /> : <CgArrowsExpandLeft className={ styles.award_icon } />
                                                            }
                                                        </button>


                                                        <div className={ styles.hr } />
                                                    </> :
                                                        <a href={ post?.link } className={ styles.footer_comment } target="_blank">
                                                            <VscLinkExternal className={ styles.footer_comment_icon } />
                                                        </a>


                                                }



                                            </> }
                                            <Link to={ detailRoute } className={ styles.footer_comment }>
                                                <BsChatSquare className={ styles.footer_comment_icon } />
                                                <span className={ styles.footer_comment_text }>56 comments</span>
                                            </Link>
                                            <div className={ styles.footer_award }>
                                                <button className={ styles.card_footer_award_wrap }>
                                                    <span className={ styles.award_icon_wrap }>
                                                        <GoGift className={ styles.award_icon } />
                                                    </span>
                                                    <span>Award</span>
                                                </button>
                                            </div>
                                            <CopyToClipboard text={ location } onCopy={ handleCopy }>
                                                <div className={ styles.footer_award }>
                                                    <button className={ styles.card_footer_award_wrap }>
                                                        <span className={ styles.award_icon_wrap }>
                                                            <FaShare className={ styles.award_icon } />
                                                        </span>
                                                        <span> { copied ? "copied" : "Share" }</span>
                                                    </button>
                                                </div>
                                            </CopyToClipboard>
                                            <div className={ styles.footer_award }>
                                                <button className={ styles.card_footer_award_wrap }>
                                                    <span className={ styles.award_icon_wrap }>
                                                        <BsBookmark className={ styles.award_icon } />
                                                    </span>
                                                    <span>Save</span>
                                                </button>
                                            </div>
                                            { owner ?
                                                <div className={ styles.footer_award }>
                                                    <button className={ styles.card_footer_award_wrap } onClick={ () => handleOption({ label: 'Delete', id: 'delete' }) }
                                                    >
                                                        <span className={ styles.award_icon_wrap }>
                                                            <MdOutlineDeleteOutline className={ styles.award_icon } />
                                                        </span>
                                                        <span>Delete</span>
                                                    </button>
                                                </div> :
                                                <>

                                                    <div className={ styles.footer_award }>
                                                        <button className={ styles.card_footer_award_wrap } onClick={ () => handleOption({ label: 'Hide', id: 'block' }) }
                                                        >
                                                            <span className={ styles.award_icon_wrap }>
                                                                <BsEyeSlash className={ styles.award_icon } />
                                                            </span>
                                                            <span>{ blocked ? 'Unhide' : 'Hide' }</span>
                                                        </button>
                                                    </div>
                                                    <div className={ styles.footer_award }>
                                                        <button className={ styles.card_footer_award_wrap }>
                                                            <span className={ styles.award_icon_wrap }>
                                                                <BsFlag className={ styles.award_icon } />
                                                            </span>
                                                            <span>Report</span>
                                                        </button>
                                                    </div>
                                                </>
                                            }

                                            { !classic && <div className={ styles.footer_award }>

                                                <DropDown
                                                    onChange={ handleOption }
                                                    dropDownTitle={
                                                        <button className={ styles.card_footer_award_wrap }>
                                                            <span className={ styles.award_icon_wrap }>
                                                                <FiMoreHorizontal className={ styles.award_icon } />
                                                            </span>
                                                        </button>
                                                    }
                                                    options={ [
                                                        {
                                                            label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                                                            icon: GoMute,
                                                            id: "mute",
                                                            disabled: type === "subPlebbit"
                                                        },
                                                        {
                                                            label: blocked ? 'Unhide' : "Hide",
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
                                                    rightOffset={ 0 }
                                                    leftOffset="none"
                                                    topOffset="34px"
                                                />

                                            </div> }
                                        </div>
                                    </div>
                            }
                        </>
                }
                </>
                : <footer className={ styles.mobile_content_footer }>
                    <div className={ styles.mobile_content_footer_wrapper }>
                        <div className={ styles.mobile_footer_voting_box }>
                            <div className={ styles.mobile_footer_upvote }>
                                { vote === 1 ? <ImArrowUp className={ styles.mobile_voting_icon } /> : <BiUpvote className={ styles.mobile_voting_icon } /> }
                            </div>
                            <div className={ styles.mobile_voting_text }>
                                { !loading
                                    ? postVotes === 0
                                        ? "vote"
                                        : numFormatter(postVotes)
                                    : "vote" }
                            </div>

                            <div className={ styles.mobile_footer_upvote }>
                                { vote === -1 ? <ImArrowDown className={ styles.mobile_voting_icon } /> : <BiDownvote className={ styles.mobile_voting_icon } /> }
                            </div>

                        </div>
                        <button className={ styles.mobile_footer_award }>
                            <span className={ styles.mobile_footer_award_container } >
                                <GoGift className={ styles.mobile_footer_award_icon } />
                            </span>
                        </button>
                        <Link to={ detailRoute } className={ styles.mobile_footer_comment }>
                            <BsChat className={ styles.mobile_footer_comment_icon } />
                            { commentCount }
                        </Link>
                        <CopyToClipboard text={ location } onCopy={ handleCopy }>
                            <span className={ styles.mobile_footer_share }>
                                <FiShare className={ styles.mobile_footer_share_icon } />

                            </span>
                        </CopyToClipboard>
                    </div>

                </footer> }
        </>
    )
}

export default PostFooter