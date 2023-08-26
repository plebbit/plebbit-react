import React, { useEffect, useState } from 'react'
import styles from './post-detail.module.css'
import useStore from '../../store/useStore'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/layout'
import useStateString from '../../hooks/useStateString'
import { getSubName } from '../../utils/getUserName'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import { useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { useAccount, useAccountComments, useAccountSubplebbits, useAccountVote, useAuthorAddress, useBlock, useComment, useEditedComment, useSubplebbit, useSubscribe } from '@plebbit/plebbit-react-hooks'
import getCommentMediaInfo from '../../utils/getCommentMediaInfo'
import usePublishUpvote from '../../hooks/usePublishUpvote'
import usePublishDownvote from '../../hooks/usePublishDownvote'
import useRepliesAndAccountReplies from '../../hooks/useRepliesAndAccountReplies';
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import numFormatter from '../../utils/numberFormater'
import { CgNotes } from 'react-icons/cg'
import FlairLabel from '../../components/Label/flairLabel'
import EditLabel from '../../components/Label/editLabel'
import { CloseIcon } from '@chakra-ui/icons'
import { MdClose } from 'react-icons/md'


const PostDetail2 = () => {


    const {
        onOpen: openRemovalModal,
        onClose: closeRemovalModal,
        isOpen: isRemovalModalOpen,
    } = useDisclosure();
    const {
        onOpen: openDeleteModal,
        onClose: closeDeleteModal,
        isOpen: isDeleteModalOpen,
    } = useDisclosure();
    const location = useLocation();
    const postDetailModal = location?.state?.modal && location?.state?.detail;
    const params = useParams();

    const feedFromProfile = location?.pathname.includes('/profile/c');
    const myPostLocation = params?.index;
    const { accountComments: myPost } = useAccountComments();
    const profilePost = myPost && myPostLocation && myPost[Number(myPostLocation)];
    // post from link or link address
    const commentFromCid = useComment({ commentCid: !feedFromProfile ? params?.commentCid : undefined });
    // const commentFromFeed = location?.state?.detail;
    // applicable if coming from feeds, if posts takes time to load uses feeds post props
    const comment = feedFromProfile
        ? profilePost
        : commentFromCid;
    let detail;
    let reply;
    let replyParent;
    let replyPost = useComment(
        { commentCid: feedFromProfile ? comment?.postCid || comment?.parentCid : comment?.postCid }
    ); // if comment is a reply, this is what you replied to
    const isReply =
        Boolean((feedFromProfile && profilePost?.parentCid) || (comment?.parentCid && comment?.depth !== 0));
    if (isReply) {
        detail = replyPost;
        reply = comment;
    } else {
        detail = comment;
    }
    const replyParentaux = useComment({ commentCid: reply?.parentCid }); // incase what the reply parent is a comment also this is the parent
    replyPost = useComment({ commentCid: replyParentaux?.postCid });
    if (replyPost?.state === 'succeeded') {
        detail = replyPost;
    }
    replyParent = replyParentaux;
    if (replyPost?.cid === replyParentaux?.cid) {
        replyParent = comment;
        reply = undefined;
    }

    const sub = useSubplebbit({ subplebbitAddress: detail?.subplebbitAddress });
    const loading = detail?.state === "fetching-ipfs" || !detail?.timestamp;
    const commentLoading = detail?.state === "fetching-ipfs" || !detail?.updatedAt
    const detailPending = !detail?.cid;
    const subplebbit =
        sub === undefined ? { ...detail?.subplebbit, address: detail?.subplebbitAddress } : sub;



    const mediaInfo = getCommentMediaInfo(detail);
    const hasThumbnail = !detail?.removed && detail?.thumbnailUrl && !mediaInfo
    const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
    const iconColor = useColorModeValue('lightIcon', 'darkIcon');
    const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
    const titleColor = useColorModeValue('lightText', 'darkText');
    const [postVotes] = useState(detail?.upvoteCount || 0 - detail?.downvoteCount || 0);
    const accountVote = useAccountVote({ commentCid: detail?.cid });
    const vote = accountVote?.vote || 0
    const subPledditTextColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
    const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
    const bg = useColorModeValue('white', 'darkNavBg');
    const statusColor = useColorModeValue('lightVoteText', 'fff');
    const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
    const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
    const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
    // const approveColor = useColorModeValue('pastelGreen', 'pastelGreen');
    const removeColor = useColorModeValue('persimmon', 'persimmon');
    const lockColor = useColorModeValue('brightSun', 'brightSun');
    // const borderColor = useColorModeValue('#ccc', '#343536');
    const postBg = useColorModeValue(
        "lightCommunityThemePost",
        "darkCommunityThemePost"
    );
    const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
    // const borderColor2 = useColorModeValue('#d3d6da', '#545452');
    const border2 = useColorModeValue('#edeff1', '#343536');
    const mainMobileBg = useColorModeValue('white', 'black');
    const mobileColor = useColorModeValue('lightMobileText2', 'darkMobileText');
    const toast = useToast();

    const [subLoading, setSubLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editMode, setEditMode] = useState(detail?.content ? 'post' : 'link');
    const [copied, setCopied] = useState(false);

    const [showSpoiler, setShowSpoiler] = useState(detail?.spoiler);
    const { accountSubplebbits } = useAccountSubplebbits()
    const profile = useAccount();
    const {
        device,
        baseUrl,
    } = useStore(state => state)
    const navigate = useNavigate();
    const [showFullComments, setShowFullComments] = useState(!isReply);

    const { blocked, unblock, block } = useBlock({ cid: detail?.cid })
    const { muted, unblock: unMute, block: mute } = useBlock({ address: detail?.subplebbitAddress })



    const upVote = usePublishUpvote(detail)
    const downVote = usePublishDownvote(detail)




    const { subscribe, unsubscribe, subscribed } = useSubscribe({ subplebbitAddress: detail?.subplebbitAddress })

    const handleSubscribe = async () => {
        try {
            await subscribe();
        } catch (error) {
            logger('subscribe:response:', error, 'error');
            toast({
                title: 'Subscription declined',
                description: error?.toString(),
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };
    const handleUnSubscribe = async () => {
        try {
            await unsubscribe();
        } catch (error) {
            logger('unsubscribe:response:', error, 'error');
            toast({
                title: 'UnSubscribe declined',
                description: error?.toString(),
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleOption = (option) => {
        if (option?.id === 'edit') {
            setEdit(true);
        } else if (option?.id === 'delete') {
            openDeleteModal()
        } if (option?.id === 'block') {
            blocked ? unblock() : block()
        }
        if (option?.id === 'mute') {
            muted ? unMute() : mute()
        } else openRemovalModal();
    };



    const sharePath = `${baseUrl}p/${detail?.subplebbitAddress}/c/${detail?.cid}`;
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };
    const isSpecial = Object.keys(accountSubplebbits || {})?.includes(detail?.subplebbitAddress);


    useEffect(() => {
        if (feedFromProfile && comment?.cid) {
            navigate(`/p/${comment?.subplebbitAddress}/c/${comment?.cid}/`);
        }
    }, [comment?.cid]);

    const { authorAddress, shortAuthorAddress } = useAuthorAddress({ comment: detail })
    const owner =
        profile?.author?.address === authorAddress ||
        profile?.signer?.address === authorAddress;

    const authorPath = owner ? "/profile" : `/u/${detail?.author?.address}/c/${detail?.cid}/`

    const comments = useRepliesAndAccountReplies(detail)



    const detailCommentCount = detail?.replyCount || 0


    const { state: editedCommentState, editedComment } = useEditedComment({ comment: detail })



    let editLabel
    if (editedCommentState === 'succeeded') {
        editLabel = { text: 'edited', color: 'green' }
    }
    if (editedCommentState === 'pending') {
        editLabel = { text: 'pending edit', color: 'orange' }
    }
    if (editedCommentState === 'failed') {
        editLabel = { text: 'failed edit', color: 'red' }
    }

    const stateString = useStateString(detail)


    useEffect(() => {
        detail = editedComment


    }, [editedComment])



    return (
        <Layout
            name={ {
                label: detail?.title || detail?.shortCid || subplebbit?.title || subplebbit && getSubName(subplebbit) || getAddress(params?.commentCid),
                value: location?.pathname,
            } }
            stateString={ stateString }
        >
            <div>
                <div className={ styles.wrapper }>
                    <div className={ styles.container }>
                        <div className={ styles.overlay_scroll_container }>
                            <div className={ styles.detail_top_wrap } tabIndex="-1">
                                <div className={ styles.detail_top }>
                                    <div className={ styles.detail_top_left }>
                                        <div className={ styles.vote_wrap }>
                                            <button onClick={ detail?.locked ? null : upVote
                                            } className={ styles.vote_btn }>
                                                <span className={ `${styles.vote_btn_wrap} ${styles.upvote_btn_wrap}` }>
                                                    { vote === 1 ?
                                                        <ImArrowUp className={ styles.vote_btn_icon } /> : <BiUpvote className={ styles.vote_btn_icon } /> }
                                                </span>
                                            </button>
                                            <div className={ styles.vote_text_wrap }>
                                                { postVotes === 0 ? 'vote' : numFormatter(postVotes) }
                                            </div>
                                            <button className={ styles.vote_btn } onClick={ detail?.locked ? null : downVote
                                            }>
                                                <span className={ `${styles.vote_btn_wrap} ${styles.downvote_btn_wrap}` }>
                                                    { vote === -1 ?
                                                        <ImArrowDown className={ styles.vote_btn_icon } /> : <BiDownvote className={ styles.vote_btn_icon } /> }
                                                </span>
                                            </button>
                                        </div>
                                        <CgNotes className={ styles.post_type_icon } />
                                        <div className={ styles.detail_top_title_wrap }>
                                            <div className={ styles.detail_top_title_wrap_2 }>
                                                <div className={ styles.detail_top_title_wrap_3 }>
                                                    <h1 className={ styles.detail_top_title }>{ detail?.title }</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={ styles.detail_top_tags_wrap }>
                                            <div className={ styles.detail_top_flair_cont }>
                                                { detail?.flair?.text.length ? (
                                                    <FlairLabel flair={ detail?.flair } />
                                                ) : (
                                                    ""
                                                ) }
                                                { detail?.spoiler && (

                                                    <SpoilerLabel />
                                                ) }
                                                { detailPending && (

                                                    <PendingLabel />

                                                ) }
                                                {/* edit status */ }
                                                <EditLabel editLabel={ editLabel } post={ detail } />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ styles.detail_top_right }>
                                        <button tabindex="0" title="close" className={ styles.detail_top_right_btn } onClick={ () => navigate(-1) }>
                                            <MdClose className={ styles.detail_top_close_icon } />
                                            <span >Close</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PostDetail2