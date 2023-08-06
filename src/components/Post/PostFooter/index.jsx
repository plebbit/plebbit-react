import React from 'react'
import { BsBookmark, BsChatSquare, BsEyeSlash, BsShield } from 'react-icons/bs'
import { FaShare } from 'react-icons/fa'
import DropDown from '../../DropDown'
import { FiMoreHorizontal } from 'react-icons/fi'
import { getSubName } from '../../../utils/getUserName'
import styles from './post-footer.module.css'
import { GoMute, GoGift } from 'react-icons/go'
import { MdOutlineDeleteOutline, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import { TiDeleteOutline } from 'react-icons/ti'

const PostFooter = ({ muted, blocked, owner, subPlebbit, handleOption, type, location, handleCopy, copied, allowedSpecial, detailRoute, post, pending, loading }) => {
    return (
        <>
            { pending ? (
                !loading && <div />
            ) :
                allowedSpecial ?
                    <div className={ styles.card_footer }>
                        <div className={ styles.card_footer_wrap }>
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
                    </div> :
                    <div className={ styles.card_footer }>
                        <div className={ styles.card_footer_wrap }>
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
                                    rightOffset={ 0 }
                                    leftOffset="none"
                                    topOffset="34px"
                                />

                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default PostFooter