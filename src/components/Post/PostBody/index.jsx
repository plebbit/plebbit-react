import React from 'react'
import Marked from '../../Editor/marked'
import { FiExternalLink } from 'react-icons/fi'
import PostMedia from '../PostMedia'
import styles from './post-body.module.css'
import { Link } from 'react-router-dom'
import useStore from '../../../store/useStore'
import truncateString from '../../../utils/truncateString'
import getLink from '../../../utils/getLink'

const PostBody = ({ post, hasThumbnail, detailRoute, textContentStyle, bodyWrapStyle, mediaInfo }) => {
    const { device } = useStore(state => state);

    return (
        <>
            {
                device !== 'mobile' ?
                    <Link to={ detailRoute }>
                        { post?.content && (
                            <div className={ styles.card_body } style={ textContentStyle }>
                                <Link to={ detailRoute } className={ styles.card_body_wrap }>
                                    <div className={ styles.bodyWrap } style={ bodyWrapStyle }>
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
                                </Link>

                            </div>
                        ) }
                        {/*link post  without media  */ }

                        { hasThumbnail && (
                            <div className={ styles.post_link_wrap } >
                                <a
                                    href={ post?.link }
                                    className={ styles.post_link }
                                    target='_blank'
                                >
                                    <div>{ post?.link?.substring(0, 20) + "..." }</div>
                                    <FiExternalLink
                                        className={ styles.post_link_icon }
                                    />
                                </a>
                            </div>
                        ) }

                        {/*link post  with media  */ }
                        <div className={ styles.card_body }>
                            <PostMedia post={ post } />
                        </div>
                    </Link> :
                    <div className={ styles.mobile_content_wrapper }>
                        <div className={ styles.mobile_content_media_wrapper } style={ {
                            margin: (hasThumbnail || mediaInfo) && 0

                        } }>
                            { !post?.content && !mediaInfo && !hasThumbnail && post?.link &&
                                <a href={ post?.link } target="_blank" className={ styles.mobile_content_media_link }>
                                    <span className={ styles.mobile_content_media_link_content }>
                                        { truncateString(getLink(post?.link), 40, '...') }
                                    </span>
                                </a>
                            }
                            {
                                hasThumbnail &&
                                <>
                                    <Link to={ detailRoute } className={ styles.mobile_content_media_thumbnail }>
                                        <div>
                                            <img src={ post?.thumbnailUrl } />
                                        </div>
                                    </Link>
                                    <a href={ post?.link } target="_blank" className={ styles.mobile_content_media_thumbnail_bar }>
                                        <span className={ styles.mobile_content_media_thumbnail_bar_text }>
                                            { getLink(post?.link) }
                                        </span>
                                    </a>
                                </>
                            }
                            <PostMedia post={ post } />

                        </div>

                    </div>
            }

        </>
    )
}

export default PostBody