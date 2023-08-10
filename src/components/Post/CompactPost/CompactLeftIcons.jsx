import React, { useState } from 'react'
import { BsCardImage, BsFileText, BsPlayBtn } from 'react-icons/bs'
import { MdOutlineAudiotrack } from 'react-icons/md'
import { BiLinkExternal } from 'react-icons/bi'
import { ImEmbed2 } from 'react-icons/im'
import { CgArrowsExpandLeft, CgCompressLeft } from 'react-icons/cg'
import styles from './compact-post.module.css'

const CompactLeftIcons = ({ showContent, setShowContent, isYoutube, post, mediaInfo }) => {
    const [showExpand, setShowExpand] = useState(false);
    return (
        <>
            {
                showExpand ?
                    <>
                        {
                            showContent ?
                                <button className={ styles.left } onClick={ () => setShowContent(!showContent) }
                                    onMouseEnter={ () => setShowExpand(true) }
                                    onMouseLeave={ () => setShowExpand(false) }>
                                    <CgCompressLeft className={ styles.left_icon } />
                                </button>
                                :

                                <button className={ styles.left } onClick={ () => setShowContent(!showContent) }
                                    onMouseEnter={ () => setShowExpand(true) }
                                    onMouseLeave={ () => setShowExpand(false) }>
                                    <CgArrowsExpandLeft className={ styles.left_icon } />
                                </button>


                        }
                    </> :
                    <>
                        {
                            showContent ?
                                <button className={ styles.left } onClick={ () => setShowContent(!showContent) }
                                    onMouseEnter={ () => setShowExpand(true) }
                                    onMouseLeave={ () => setShowExpand(false) }>
                                    <CgCompressLeft className={ styles.left_icon } />
                                </button>
                                :
                                post?.content ?
                                    <button className={ styles.left } onClick={ () => setShowContent(!showContent) }
                                        onMouseEnter={ () => setShowExpand(true) }
                                        onMouseLeave={ () => setShowExpand(false) }>
                                        <BsFileText className={ styles.left_icon } />
                                    </button>

                                    : mediaInfo?.type === 'video' ?
                                        <button className={ styles.left } onClick={ () => setShowContent(!showContent) }
                                            onMouseEnter={ () => setShowExpand(true) }
                                            onMouseLeave={ () => setShowExpand(false) }>
                                            <BsPlayBtn className={ styles.left_icon } />
                                        </button>


                                        : mediaInfo?.type === 'image' ?
                                            <button className={ styles.left } onClick={ () => setShowContent(!showContent) }
                                                onMouseEnter={ () => setShowExpand(true) }
                                                onMouseLeave={ () => setShowExpand(false) }>
                                                <BsCardImage className={ styles.left_icon } />
                                            </button>

                                            : mediaInfo?.type === 'audio' ?
                                                <button className={ styles.left } onClick={ () => setShowContent(!showContent) }
                                                    onMouseEnter={ () => setShowExpand(true) }
                                                    onMouseLeave={ () => setShowExpand(false) }>
                                                    <MdOutlineAudiotrack className={ styles.left_icon } />
                                                </button>

                                                : isYoutube ?
                                                    <button className={ styles.left } onClick={ () => setShowContent(!showContent) }
                                                        onMouseEnter={ () => setShowExpand(true) }
                                                        onMouseLeave={ () => setShowExpand(false) }>
                                                        <ImEmbed2 className={ styles.left_icon } />
                                                    </button>
                                                    :
                                                    <a href={ post?.link } className={ styles.left }
                                                        target='_blank'
                                                    >
                                                        <BiLinkExternal className={ styles.left_icon } />
                                                    </a>
                        }
                    </>
            }

        </>
    )
}

export default CompactLeftIcons