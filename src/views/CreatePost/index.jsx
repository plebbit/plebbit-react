import React, { useState } from 'react';
import Layout from '../../components/layout';
import {
  useAccount,
  useAccountSubplebbits,
  usePublishComment,
  useSubplebbit,
  useSubplebbits,
} from '@plebbit/plebbit-react-hooks';
import { EditorState } from 'draft-js';
import { useToast } from '@chakra-ui/react';
import useStore from '../../store/useStore';
import { useLocation, useNavigate } from 'react-router-dom';
import Sort from '../../utils/sort';
import convertArrToObj from '../../utils/convertArrToObj';
import { getSubName } from '../../utils/getUserName';
import getIsOnline from '../../utils/getIsOnline';
import onChallengeVerification from '../../utils/onChallengeVerification';
import onChallenge from '../../utils/onChallenge';
import onError from '../../utils/onError';
import styles from './createpost.module.css';
import CreatePostSideBar from './createPostSideBar';
import AddFlair from './modal/addFlair';
import DropDown2 from '../../components/DropDown/DropDown2';
import Avatar from '../../components/Avatar';
import { MdStickyNote2 } from 'react-icons/md';
import { BsChevronDown, BsLink45Deg } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';
import { AiOutlinePlus, AiOutlineTag } from 'react-icons/ai';

const CreatePost = () => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const subscriptions = useSubplebbits({ subplebbitAddresses: profile?.subscriptions });
  const { subPlebbitData, subPlebbitDefData } = useStore((state) => state);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mode, setMode] = useState('post');
  const [type, setType] = useState('markup');
  const [spoiler, setSpoiler] = useState(false);
  const [flair, setFlair] = useState({});
  const toast = useToast();
  const mySubplebbits = Object.keys(accountSubplebbits)?.length
    ? Object.keys(accountSubplebbits)?.map((pages) => ({
        label: truncateString(accountSubplebbits[pages]?.title),
        value: pages,
        ...accountSubplebbits[pages],
      }))
    : [];
  const subs = subscriptions?.length
    ? subscriptions?.map((x) => ({ ...x, value: x?.address, label: x?.title }))
    : '';

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const options = Sort(
    convertArrToObj(
      [
        ...mySubplebbits,
        ...subs,
        [
          subPlebbitData.map((x) => ({
            ...x,
            label: getSubName(x),
            value: x?.address,
          })),
          subPlebbitDefData
            ?.filter((x) => x !== undefined)
            .map((x) => ({
              ...x,
              label: getSubName(x),
              value: x?.address,
            })),
        ].flat(),
      ]
        ?.filter((x) => x !== undefined)
        .flat(),
      'value',
      true
    ),
    (x) => getIsOnline(x?.updatedAt),
    true
  );

  let potentialSubPlebbitAddress = null;
  if (location?.pathname) {
    const matches = location?.pathname.match(/p\/(.*)\/submit/);
    if (matches?.length > 1) {
      potentialSubPlebbitAddress = matches[1];
    }
  }
  const subPlebbit = useSubplebbit({ subplebbitAddress: potentialSubPlebbitAddress });
  const [address, setAddress] = useState(
    options.find((x) => x.address === potentialSubPlebbitAddress)
  );

  const publishCommentOptions = {
    content: content ? content : undefined,
    title,
    link: link ? link : undefined,
    spoiler: spoiler ? spoiler : undefined,
    subplebbitAddress: address?.value,
    flair: flair ? flair : undefined,
    onChallenge,
    onChallengeVerification: (challengeVerification, comment) =>
      onChallengeVerification(
        challengeVerification,
        comment,
        () => {
          setLoading(false);
          setAddress(null);
          setTitle('');
          setContent('');
          setLink('');
          setFlair({});
          setEditorState(EditorState.createEmpty());
        },
        () => {
          setLoading(false);
        }
      ),
    onError,
  };

  const { index, publishComment } = usePublishComment(publishCommentOptions);

  if (Boolean(index + 1)) {
    navigate(`/profile/c/${index}/`);
  }

  const handlePublishPost = async () => {
    try {
      setLoading(true);
      const res = await publishComment();
      logger('create-post', res, 'error');
    } catch (error) {
      logger('create-post', error, 'error');
      setLoading(false);
      toast({
        title: 'Declined.',
        description: error?.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout name={{ label: 'Create Post', value: location?.pathname }}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div tabIndex="0"></div>
          <div>
            <div className={styles.create_post_top}>
              <div className={styles.cpt_text}>Create a post</div>
              <button
                role="button"
                tabIndex="0"
                className={styles.cpt_btn}
                style={{
                  color: subPlebbit?.suggested?.secondaryColor,
                  fill: subPlebbit?.suggested?.secondaryColor,
                }}
              >
                Drafts
                <span className={styles.cpt_btn_n}>0</span>
              </button>
            </div>
            <div className={styles.create_post_select_wrap}>
              <div className={styles.create_post_select_wrap2}>
                <DropDown2
                  isClearable
                  options={options}
                  onChange={(value) => setAddress(value)}
                  value={address}
                  render={(data) => (
                    <div className={styles.create_post_select_options}>
                      <Avatar
                        width={20}
                        height={20}
                        mr="8px"
                        avatar={data?.suggested?.avatarUrl}
                        badge
                        isOnline={getIsOnline(data?.updatedAt)}
                      />

                      <span>{data?.label ? data?.label : truncateString(data?.address, 20)}</span>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className={styles.create_post_form}>
              <div className={styles.create_post_form_top}>
                <div className={styles.create_post_form_top2}>
                  <button
                    active={String(mode === 'post')}
                    onClick={() => {
                      setMode('post');
                      setLink('');
                    }}
                  >
                    <MdStickyNote2 className={styles.create_post_form_top_icon} />
                    Post
                  </button>
                  <button
                    active={String(mode === 'link')}
                    onClick={() => {
                      setMode('link');
                      setLink('');
                    }}
                  >
                    <BsLink45Deg className={styles.create_post_form_top_icon} />
                    Link
                  </button>
                  <button disabled>
                    <BiPoll disabled className={styles.create_post_form_top_icon} />
                    Poll
                  </button>
                </div>
              </div>
              <div className={styles.create_post_form_content}>
                <div className={styles.create_post_form_title}>
                  <div className={styles.create_post_form_title2}>
                    <textarea
                      maxLength={300}
                      placeholder="Title"
                      rows={1}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <span>{`${title.length}/300`}</span>
                  </div>
                </div>
                <div>
                  <div className={styles.create_post_form_text}>
                    <div className={styles.create_post_form_text_head} />
                    <div
                      className={styles.create_post_form_text_content}
                      style={{
                        minHeight: type !== 'post' && '66px',
                      }}
                    >
                      {mode === 'post' ? (
                        <textarea
                          placeholder="Text"
                          rows={1}
                          onChange={(e) => setContent(e.target.value)}
                          value={content}
                        />
                      ) : (
                        <textarea
                          rows={1}
                          placeholder="Url"
                          onChange={(e) => setLink(e.target.value)}
                          value={link}
                          style={{
                            height: '66px',
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.create_post_form_foot}>
                <div className={styles.create_post_form_foot_tag}>
                  <div className={styles.create_post_form_foot_tag2}>
                    <button active={String(spoiler)} onClick={() => setSpoiler(!spoiler)}>
                      <AiOutlinePlus />
                      <span>Spoiler</span>
                    </button>
                    <button disabled>
                      <AiOutlinePlus />
                      <span>NSFW</span>
                    </button>
                    <button
                      active={flair?.text}
                      onClick={() => setIsOpen(true)}
                      style={{
                        backgroundColor: flair?.backgroundColor,
                        color: flair?.textColor,
                      }}
                      disabled={!address?.flairs?.post}
                    >
                      <AiOutlineTag />
                      <span>{flair?.text || 'Flair'}</span>
                      <BsChevronDown />
                    </button>
                  </div>
                </div>
                <hr />
                <div className={styles.footer_wrap}>
                  <div className={styles.footer}>
                    <button
                      role="button"
                      tabIndex="0"
                      disabled={
                        (mode === 'post' ? !content : !link) || !title || !address || loading
                      }
                      active={String(
                        (mode === 'post' ? content !== '' : link !== '') &&
                          title !== '' &&
                          address?.value !== ''
                      )}
                      onClick={handlePublishPost}
                    >
                      Post
                    </button>{' '}
                    <button role="button" tabIndex="0">
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreatePostSideBar />
      </div>
      {isOpen && (
        <AddFlair
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          subplebbit={address}
          flair={flair}
          setFlair={setFlair}
        />
      )}
    </Layout>
  );
};

export default CreatePost;
