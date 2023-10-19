import React from 'react';
import useCommentEdit from '../../../hooks/useCommentEdit';
import ConfirmModal from '../../Modal/ConfirmationModal';
import styles from './modal.module.css';

const ConfirmDelete = ({ setIsOpen, isOpen, post, title, message, cancelText, confirmText }) => {
  const data = {
    deleted: true,
  };

  const { commentEdit } = useCommentEdit(data, post);

  const handleEditComment = async () => {
    await commentEdit(() => onClose());
  };

  return (
    <ConfirmModal
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      title={title}
      confirmText={confirmText || 'Delete'}
      closeText={cancelText}
      onConfirm={handleEditComment()}
      confirmBtnClassName={styles.delBtn}
    >
      {message || `Are you sure you want to delete your post? You can't undo this.`}
    </ConfirmModal>
  );
};

export default ConfirmDelete;
