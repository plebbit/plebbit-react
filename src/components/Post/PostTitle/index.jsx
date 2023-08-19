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

const PostTitle = ({ post, detailRoute, editLabel, pending, type, hasThumbnail, showThumbnailLink, titleStyle }) => {
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

                    </div> : <>
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
                    </>
            }
        </>
    )
}

export default PostTitle