import React from 'react'
import { Link } from 'react-router-dom'
import styles from './post-title.module.css'
import FlairLabel from '../../Label/flairLabel'
import SpoilerLabel from '../../Label/spoilerLabel'
import PendingLabel from '../../Label/pendingLabel'
import EditLabel from '../../Label/editLabel'
import { FiExternalLink } from 'react-icons/fi'
import truncateString from '../../../utils/truncateString'
import useStore from '../../../store/useStore'
import getLink from '../../../utils/getLink'

const PostTitle = ({ post, detailRoute, editLabel, pending, type, hasThumbnail, showThumbnailLink, titleStyle, classic }) => {
    const { device } = useStore(state => state);
    return (
        <>
            {
                device !== 'mobile' ?
                    <div className={ styles.card_title }>
                        {/* flair */ }
                        { type === "subPlebbit" && post?.flair?.text.length ? (
                            <FlairLabel flair={ post?.flair } />
                        ) : (
                            ""
                        ) }
                        <div className={ styles.post_title_wrap }>
                            <Link to={ detailRoute } className={ styles.post_title }>
                                <div className={ `${styles.title_wrap}` } style={ titleStyle }>
                                    <h3 className={ styles.title } >   { post?.title }</h3>
                                </div>
                            </Link>
                        </div>
                        { showThumbnailLink && post?.link && (
                            <a

                                href={ post?.link }
                                target="_blank"
                                className={ styles.thumbnail_link }
                            >
                                <span>{ truncateString(post?.link, 20, '...') }</span>
                                <FiExternalLink
                                    className={ styles.thumbnail_icon }
                                />
                            </a>
                        )
                        }
                        {
                            type !== "subPlebbit" && post?.flair?.text && (
                                <FlairLabel flair={ post?.flair } />

                            )
                        }
                        {
                            post?.spoiler && (

                                <SpoilerLabel />
                            )
                        }
                        {
                            pending && (
                                <PendingLabel />
                            )
                        }
                        {/* edit status */ }
                        <EditLabel editLabel={ editLabel } post={ post } />

                    </div> : <div className={ styles.titlenThumbnail }>
                        <div className={ styles.titlenFlair }>
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
                        </div>
                        { classic && post?.link && <div div className={ styles.mobile_compact_content }>
                            <div className={ styles.mobile_compact_thumbnail }>
                                <Link href={ detailRoute } className={ styles.mobile_compact_thumbnail_link } >
                                    <img src={ post?.thumbnailUrl || post?.link } />
                                </Link>
                                <a href={ post?.link } className={ styles.mobile_content_bar_link } target="_blank">
                                    <span className={ styles.mobile_content_media_thumbnail_bar_text }> { truncateString(getLink(post?.link), 10, '...') }</span>
                                </a>
                            </div>
                        </div>
                        }
                    </div>
            }
        </>
    )
}

export default PostTitle