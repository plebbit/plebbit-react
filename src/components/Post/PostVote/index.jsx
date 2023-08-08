import React from 'react'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import numFormatter from '../../../utils/numberFormater'
import styles from './post-vote.module.css'

const PostVote = ({ vote, upVote, downVote, postVotes, horizontal }) => {
    return (
        <>
            {
                horizontal
                    ?
                    <div className={ styles.h_vote_bar }>
                        <div className={ styles.h_vote_bar_wrap }>
                            <button className={ styles.vote_btn } onClick={ upVote }>
                                <div className={ styles.upVote_wrap }>
                                    { vote === 1 ? <ImArrowUp className={ styles.upVote } /> : <BiUpvote className={ styles.upVote } /> }
                                </div>
                            </button>
                            <div className={ styles.h_vote_text }>
                                { postVotes === 0 ? "vote" : numFormatter(postVotes) }
                            </div>
                            <button className={ styles.vote_btn } onClick={ downVote }>
                                <div className={ styles.upVote_wrap }>
                                    { vote === -1 ? <ImArrowDown className={ styles.downVote } /> : <BiDownvote className={ styles.downVote } /> }

                                </div>
                            </button>
                        </div>

                    </div>
                    :
                    <div className={ styles.vote_bar }>
                        <div className={ styles.vote_btn_wrap }>
                            <button className={ styles.vote_btn } onClick={ upVote }>
                                <div className={ styles.upVote_wrap }>
                                    { vote === 1 ? <ImArrowUp className={ styles.upVote } /> : <BiUpvote className={ styles.upVote } /> }
                                </div>
                            </button>
                            <div className={ styles.vote_text }>
                                { postVotes === 0 ? "vote" : numFormatter(postVotes) }
                            </div>
                            <button className={ styles.vote_btn } onClick={ downVote }>
                                <div className={ styles.upVote_wrap }>
                                    { vote === -1 ? <ImArrowDown className={ styles.downVote } /> : <BiDownvote className={ styles.downVote } /> }

                                </div>
                            </button>
                        </div>
                    </div>
            }

        </>
    )
}

export default PostVote