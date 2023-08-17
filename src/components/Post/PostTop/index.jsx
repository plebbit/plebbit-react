import React from 'react'
import styles from './postTop.module.css'
import { Link } from 'react-router-dom'
import getUserName, { getSubName } from '../../../utils/getUserName'
import dateToFromNowDaily, { dateFormater } from '../../../utils/formatDate'
import Avatar from '../../Avatar'
import Label from '../../Label'
import { Icon, Tooltip } from '@chakra-ui/react'
import { FcCancel } from 'react-icons/fc'
import StateString from '../../Label/stateString'
import { HiLockClosed } from 'react-icons/hi'
import FlairLabel from '../../Label/flairLabel'

const PostTop = ({ post, type, subPlebbit, isOnline, authorPath, loading, stateString, openRemovalModal, hideAvatar, wrapperStyle, allowedSpecial }) => {
    return (
        <div className={ styles.card_top } style={ wrapperStyle }>
            {/* subplebbit avatar */ }
            { !hideAvatar && <div className={ styles.card_avatar_wrap }>
                <Link to={ `p/${post?.subplebbitAddress}/` } className={ styles.card_avatar }>
                    <Avatar avatar={ subPlebbit?.suggested?.avatarUrl }
                        width={ 24 }
                        height={ 24 }
                        mr="8px"
                        badge
                        isOnline={ isOnline }
                        mb="5px" />
                </Link>
            </div> }
            <div className={ styles.card_top_right }>
                {/* subplebbit address */ }
                <div className={ styles.card_top_right_txt }>
                    { type !== 'subPlebbit' && <div className={ styles.card_top_right_sub }>
                        <Link to={ `p/${post?.subplebbitAddress}/` } className={ styles.card_top_right_sub_text }>{ getSubName(subPlebbit) }</Link>
                    </div> }
                    { type !== 'subPlebbit' &&
                        <span className={ styles.dot }>•</span>
                    }

                    <span className={ styles.posted_by }>Posted by</span>
                    {/* post author */ }
                    <div className={ styles.author_wrap }>
                        <div>
                            <Link to={ authorPath } className={ styles.author }> { getUserName(post?.author) }</Link>
                        </div>
                    </div>
                    {/* authors flair */ }
                    { post?.author?.flair && (
                        <div className={ styles.authors_flair } >
                            <FlairLabel bg={ statusBg } color={ statusColor } text={ post?.author?.flair?.text }
                                fontSize="12px"
                                fontWeight="500"
                                lineHeight="16px"
                                borderRadius="2px"
                                display="inline-block"
                                mr="5px"
                                overflow="hidden"
                                isTruncated
                                padding="0 4px" />
                        </div>
                    ) }
                    {/* date/time */ }
                    <Tooltip
                        fontSize="10px"
                        label={ dateFormater(
                            parseInt(post?.timestamp * 1000)
                        ) }
                        aria-label="date tooltip"
                        placement="top"
                    >

                        <span className={ styles.post_timestamp }> { dateToFromNowDaily(
                            parseInt(post?.timestamp * 1000)
                        ) }</span>
                    </Tooltip>
                    {/* locked */ }
                    { post?.locked && (

                        <span className={ styles.lock_wrap }>

                            <Icon as={ HiLockClosed } color='#ffd635' />
                        </span>

                    ) }
                    {/* removed */ }
                    { post?.removed && (
                        <div className={ styles.remove_icon_wrap }
                            onClick={ () =>
                                !post?.reason ? openRemovalModal() : {}
                            }
                        >
                            <Icon as={ FcCancel } />
                            { !post?.reason ? (
                                allowedSpecial && (
                                    <div>Add a removal reason</div>
                                )
                            ) : (
                                <Tooltip
                                    fontSize="10px"
                                    label="removal reason"
                                    aria-label="removal reason"
                                    placement="top"
                                >
                                    <div
                                        className={ styles.removal_reason }
                                    >
                                        { post?.reason }
                                    </div>
                                </Tooltip>
                            ) }
                        </div>
                    ) }
                </div>
            </div>
            { loading && <StateString stateString={ stateString } /> }
        </div>
    )
}

export default PostTop