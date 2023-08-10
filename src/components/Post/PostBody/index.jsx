import React from 'react'
import Marked from '../../Editor/marked'
import { FiExternalLink } from 'react-icons/fi'
import PostMedia from '../PostMedia'
import styles from './post-body.module.css'
import { Link } from 'react-router-dom'

const PostBody = ({ post, hasThumbnail, detailRoute, textContentStyle, bodyWrapStyle }) => {
    return (
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
        </Link>
    )
}

export default PostBody