import React from 'react'
import styles from './card-post.module.css'
import { BsBookmark, BsChatSquare } from 'react-icons/bs'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { GoGift } from 'react-icons/go'
import { FaShare } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'

const CardPost2 = () => {
    return (
        <div className={ styles.wrapper }>
            <div className={ styles.vote_bar }>
                <button className={ styles.vote_btn }>
                    <BiUpvote className={ styles.upVote } />
                </button>
                <div className={ styles.vote_text }>Vote</div>
                <button className={ styles.vote_btn }>
                    <BiDownvote className={ styles.downVote } />
                </button>
            </div>
            <div className={ styles.card_main }>
                <div className={ styles.card_top }>
                    <div className={ styles.card_avatar_wrap }>
                        <a className={ styles.card_avatar }>
                            <img className={ styles.card_image } />
                        </a>
                    </div>
                    <div className={ styles.card_top_right }>
                        <div className={ styles.card_top_right_txt }>
                            <div className={ styles.card_top_right_sub }>
                                <a className={ styles.card_top_right_sub_text }>p/careerquidance</a>
                            </div>
                            <span className={ styles.dot }>•</span>
                            <span className={ styles.posted_by }>Posted by</span>
                            <div className={ styles.author_wrap }>
                                <div>
                                    <a className={ styles.author }>u/Abydin</a>
                                </div>
                            </div>
                            <span className={ styles.post_timestamp }>15 hours ago</span>
                        </div>
                    </div>
                </div>
                <div className={ styles.card_title }>
                    <div className={ styles.post_title_wrap }>
                        <a className={ styles.post_title }>
                            <div className={ styles.title_wrap }>
                                <h3 className={ styles.title }>I’m taking the leap leaving my corporate finance job and going into luxury retail. Am I crazy?</h3>
                            </div>
                        </a>
                    </div>
                </div>
                <div className={ styles.card_body }>
                    <a className={ styles.card_body_wrap }>
                        <div className={ styles.bodyWrap }>
                            <div className={ styles.body }>
                                I started my job in 2014. I was promoted to an assistant from a floor worker despite telling my supervisor I can't handle stress. This was completely ignored. I have extreme anxiety dealing with people directly to the point I get heart palpitations. Over the past few years, I've also been trying to take care of my terminally ill father this was known at work; more work was piled on. Recently I've been asked to start training people - I not only don't want to do it, but I also suffered a health event so bad I nearly went to the hospital. I really, really want to quit without notice. I don't have a job lined up, but I do have some savings. I'm looking at a part time cleaning job to bring in a little cash and escape directly dealing with a lot of people. Am I being the jerk here? I work at a large corporation that fires people routinely when they give notice (including trips to the big boss' office to be screamed at). PS. I've never quit a job in the past without two weeks notice.
                            </div>

                        </div>
                    </a>
                </div>
                <div className={ styles.card_footer }>
                    <div className={ styles.card_footer_wrap }>
                        <a className={ styles.footer_comment }>
                            <BsChatSquare className={ styles.footer_comment_icon } />
                            <span className={ styles.footer_comment_text }>56 comments</span>
                        </a>
                        <div className={ styles.footer_award }>
                            <button className={ styles.card_footer_award_wrap }>
                                <span className={ styles.award_icon_wrap }>
                                    <GoGift className={ styles.award_icon } />
                                </span>
                                <span>Award</span>
                            </button>
                        </div>
                        <div className={ styles.footer_award }>
                            <button className={ styles.card_footer_award_wrap }>
                                <span className={ styles.award_icon_wrap }>
                                    <FaShare className={ styles.award_icon } />
                                </span>
                                <span>Share</span>
                            </button>
                        </div>
                        <div className={ styles.footer_award }>
                            <button className={ styles.card_footer_award_wrap }>
                                <span className={ styles.award_icon_wrap }>
                                    <BsBookmark className={ styles.award_icon } />
                                </span>
                                <span>Save</span>
                            </button>
                        </div>
                        <div className={ styles.footer_award }>
                            <button className={ styles.card_footer_award_wrap }>
                                <span className={ styles.award_icon_wrap }>
                                    <FiMoreHorizontal className={ styles.award_icon } />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardPost2