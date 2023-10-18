import React, { useState } from 'react';

import Modal from '..';
import styles from './challengeModal.module.css';
import Image from '../../Image';
import Input from '../../Input';
import Button from '../../Button';

const GetChallengesModal = ({ handleSubmit, post, challenges, isOpen, setIsOpen }) => {
  const [data, setData] = useState({});

  const [step, setStep] = useState(1);
  const noOfChallenges = challenges.length;

  // const isVote = (post.vote !== undefined) && post.cid
  const isVote = post?.constructor.name === 'Vote';
  const isReply = post?.parentCid && !post.cid;
  const isPost = !post?.parentCid && !post?.cid;
  const isCommentEdit = post?.cid && post?.vote === undefined;

  const handleClose = () => {
    setIsOpen(false);
    setData({});
  };

  return (
    <Modal
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      modalBodyStyle={styles.main_wrapper}
      onClose={handleClose}
      header={
        <>
          {' '}
          Challenge for{' '}
          {isVote
            ? 'Vote'
            : isReply
            ? 'Reply'
            : isPost
            ? 'Comment'
            : isCommentEdit
            ? 'Comment Edit'
            : ''}{' '}
          {` `}
          {post?.title || post?.shortCid || post?.parentCid || post?.commentCid}{' '}
        </>
      }
    >
      <div className={styles.wrapper}>
        {challenges?.map(
          (challenge, index) =>
            index + 1 === step && (
              <ModalItem item={challenge} step={step} data={data} setData={setData} />
            )
        )}
      </div>
      <>
        {step === noOfChallenges ? (
          <footer className={styles.footer}>
            <span fontSize="14px" lineHeight="16px" fontWeight="500">
              Challenge {step} of {noOfChallenges}
            </span>

            <div className={styles.footer_btn_wrap}>
              <Button
                onClick={() => (step === 1 ? handleClose() : setStep((previous) => previous - 1))}
              >
                {step === 1 ? 'Cancel' : 'Previous'}
              </Button>
              <Button
                onClick={() => handleSubmit(data)}
                disabled={Object.values(data)?.length !== noOfChallenges}
                style={{
                  color: '#fff',
                  backgroundColor: '#0079d3',
                }}
              >
                Submit
              </Button>
            </div>
          </footer>
        ) : (
          <footer className={styles.footer}>
            <div>
              <span fontSize="14px" lineHeight="16px" fontWeight="500">
                Challenge {step} of {noOfChallenges}
              </span>
            </div>
            <div className={styles.footer_btn_wrap}>
              <Button
                style={{
                  color: '#fff',
                  backgroundColor: '#0079d3',
                }}
                onClick={() => (step === 1 ? handleClose() : setStep((previous) => previous - 1))}
              >
                {step === 1 ? 'Cancel' : 'Previous'}
              </Button>
              <Button onClick={() => setStep((previous) => previous + 1)}>Next</Button>
            </div>
          </footer>
        )}
      </>
    </Modal>
  );
};

export default GetChallengesModal;

const ModalItem = ({ item, step, data, setData }) => {
  return (
    <div>
      {item?.type === 'text/plain' ? (
        <div className={styles.modal_item}>{item?.challenge}</div>
      ) : item?.type === 'image/png' ? (
        <div className={styles.modal_item}>
          <Image width="100%" height="100%" src={`data:image/png;base64,  ${item?.challenge}`} />
        </div>
      ) : (
        ''
      )}
      <Input
        wrapperClass={styles.modal_item_input}
        placeholder="Complete the challenge above"
        onChange={(e) => setData({ ...data, [step]: e.target.value })}
        value={data[step]}
      />
    </div>
  );
};
