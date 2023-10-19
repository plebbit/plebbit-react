import React, { useState } from 'react';
import useCommentEdit from '../../../hooks/useCommentEdit';
import Modal from '../../Modal';
import styles from './modal.module.css';
import Input, { Switch, TextArea } from '../../Input';
import Button from '../../Button';

const AddRemovalReason = ({ setIsOpen, isOpen, post, hideList }) => {
  const [data, setData] = useState({
    pinned: post?.pinned,
    removed: post?.removed,
    locked: post?.locked,
    spoiler: post?.spoiler,
    reason: post?.reason,
  });

  const { commentEdit } = useCommentEdit(data, post);

  const handleEditComment = async () => {
    await commentEdit(() => setIsOpen(false));
  };

  return (
    <Modal
      modalBodyStyle={styles.main_wrapper}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      header="Add Moderation options"
    >
      <div className={styles.wrapper}>
        <div className={styles.modal_form}>
          {!hideList?.includes('pinned') && (
            <div className={styles.modal_form_item}>
              <div>
                <Input
                  hideInput
                  title="Pinned"
                  subTitle="This means that this post will remain at the top of the subplebbit, even as new
                    posts are submitted."
                />
              </div>
              <div onClick={() => setData({ ...data, pinned: !data?.pinned })}>
                <Switch id="pinned" checked={data?.pinned} />
              </div>
            </div>
          )}
          {!hideList?.includes('removed') && (
            <div className={styles.modal_form_item}>
              <div>
                <Input
                  hideInput
                  title="Removed"
                  subTitle=" The post will no longer visible to other users, but the person who posted it can
                    still see it in their own account."
                />
              </div>
              <div onClick={() => setData({ ...data, removed: !data?.removed })}>
                <Switch id="pinned" checked={data?.removed} />
              </div>
            </div>
          )}
          {!hideList?.includes('locked') && (
            <div className={styles.modal_form_item}>
              <div>
                <Input
                  hideInput
                  title="Locked"
                  subTitle="Locking a post allows users to still see the content, but they cannot add any
                    new comments or replies to it."
                />
              </div>
              <div onClick={() => setData({ ...data, locked: !data?.locked })}>
                <Switch id="locked" checked={data?.locked} />
              </div>
            </div>
          )}
          {!hideList?.includes('spoiler') && (
            <div className={styles.modal_form_item}>
              <div>
                <Input
                  hideInput
                  title="Spoiler"
                  subTitle=" this will mark this with a 'spoiler' tag or warning to alert others of the
                    potential spoilers contained within."
                />
              </div>
              <div onClick={() => setData({ ...data, spoiler: !data?.spoiler })}>
                <Switch id="spoiler" checked={data?.spoiler} />
              </div>
            </div>
          )}

          {!hideList?.includes('reason') && (
            <TextArea
              title="Reason"
              placeholder="Enter Reason"
              onChange={(e) => setData({ ...data, reason: e.target.value })}
              value={data?.reason}
              id="reason"
              subTitle=" Help people become better posters by giving a short reason why their post was
                removed."
            />
          )}
        </div>
      </div>
      <footer className={styles.footer}>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button
          style={{
            color: 'white',
            background: '#0079d3',
          }}
          onClick={handleEditComment}
        >
          Save
        </Button>
      </footer>
    </Modal>
  );
};

export default AddRemovalReason;
