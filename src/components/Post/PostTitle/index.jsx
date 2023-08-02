import React from 'react'
import { Link } from 'react-router-dom'
import styles from './post-title.module.css'
import FlairLabel from '../../Label/flairLabel'
import SpoilerLabel from '../../Label/spoilerLabel'
import PendingLabel from '../../Label/pendingLabel'
import EditLabel from '../../Label/editLabel'

const PostTitle = ({ post, detailRoute, editLabel, pending, type }) => {
    return (
        <div className={ styles.card_title }>
            {/* flair */ }
            { type === "subPlebbit" && post?.flair?.text.length ? (
                <FlairLabel flair={ post?.flair } />
            ) : (
                ""
            ) }
            <div className={ styles.post_title_wrap }>
                <Link to={ detailRoute } className={ styles.post_title }>
                    <div className={ styles.title_wrap }>
                        <h3 className={ styles.title }>   { post?.title }</h3>
                    </div>
                </Link>
            </div>
            { type !== "subPlebbit" && post?.flair?.text && (
                <FlairLabel flair={ post?.flair } />

            ) }
            { post?.spoiler && (

                <SpoilerLabel />
            ) }
            { pending && (
                <PendingLabel />
            ) }
            {/* edit status */ }
            <EditLabel editLabel={ editLabel } post={ post } />

        </div>
    )
}

export default PostTitle