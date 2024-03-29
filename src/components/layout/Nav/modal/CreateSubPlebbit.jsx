import { useCreateSubplebbit } from '@plebbit/plebbit-react-hooks';
import React, { useEffect, useState } from 'react';
import logger from '../../../../utils/logger';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../Modal';
import useStore from '../../../../store/useStore';
import styles from './createSub.module.css';
import { toast } from 'react-toastify';

const CreateSubPlebbit = () => {
  const { showCreateSubModal, setShowCreateSubModal } = useStore((state) => state);

  const [value, setValue] = useState({ title: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { createdSubplebbit, createSubplebbit, error, errors } = useCreateSubplebbit({ value });

  useEffect(() => {
    if (createdSubplebbit?.address) {
      navigate(`/p/${createdSubplebbit?.address}/`);
      logger('created-sub', createdSubplebbit);
      setLoading(false);
      onClose();
    }
  }, [createdSubplebbit?.address]);

  if (error) {
    logger('create-sub', error, 'error');
    setLoading(false);
    toast.error(error?.toString());
  }

  const handleCreateSubPlebbit = async () => {
    setLoading(true);
    await createSubplebbit();
    setShowCreateSubModal(false);
  };
  return (
    <Modal
      header="Create a Subplebbit"
      isOpen={showCreateSubModal}
      setIsOpen={setShowCreateSubModal}
      width="36em"
    >
      <div className={styles.wrapper}>
        <label className={styles.create_sub_label} htmlFor="title">
          <p>Title</p>
          <input
            name="title"
            id="title"
            className={styles.create_sub_input}
            value={value?.title}
            onChange={(e) => setValue({ ...value, title: e.target.value })}
            disabled={loading}
            placeholder="input subplebbit title"
            max={21}
          />
          <span className={styles.title_length}>
            {21 - (value?.title?.length || 0)} Characters remaining
          </span>
        </label>
        <label className={styles.create_sub_label} htmlFor="description">
          <p>Description</p>
          <textarea
            name="description"
            id="description"
            className={styles.create_sub_descr}
            value={value?.description}
            onChange={(e) => setValue({ ...value, description: e.target.value })}
            disabled={loading}
            placeholder="input subplebbit description"
            max={500}
          />
          <span className={styles.title_length}>
            {500 - (value?.description?.length || 0)} Characters remaining
          </span>
        </label>
        <footer className={styles.import_account_footer}>
          <button
            className={styles.footer_btn}
            style={{
              background: '#2b6cb0',
              color: '#fff',
            }}
            onClick={() => setShowCreateSubModal(false)}
          >
            Cancel
          </button>
          <button className={styles.footer_btn} onClick={handleCreateSubPlebbit}>
            Create Subplebbit
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default CreateSubPlebbit;
