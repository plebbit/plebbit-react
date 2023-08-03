import React from 'react'
import Marked from '../../Editor/marked'
import { FiExternalLink } from 'react-icons/fi'
import PostMedia from '../PostMedia'
import styles from './post-body.module.css'

const PostBody = ({ post, hasThumbnail }) => {
    return (
        <>
            { post?.content && (
                <div className={ styles.card_body }>
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
        </>
    )
}

export default PostBody