import React from 'react';
import Modal from '..';
import styles from './confirm-modal.module.css';
import { Button2 } from '../../Button';

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  title,
  children,
  onClose,
  closeText,
  onConfirm,
  confirmText,
  cancelBtnClassName,
  confirmBtnClassName,
  loading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={title}
      width="33em"
      modalBodyStyle={styles.main_wrapper}
    >
      <div className={styles.wrapper}>{children}</div>
      <footer className={styles.footer}>
        <Button2
          onClick={() => {
            typeof onClose === 'function' && onClose();
            setIsOpen(false);
          }}
          className={cancelBtnClassName}
        >
          {closeText || 'Cancel'}
        </Button2>
        <Button2
          className={confirmBtnClassName}
          onClick={onConfirm}
          style={{
            color: '#fff',
            backgroundColor: '#0079df',
          }}
          loading={loading}
        >
          {confirmText || 'Confirm'}
        </Button2>
      </footer>
    </Modal>
  );
};

export default ConfirmModal;
