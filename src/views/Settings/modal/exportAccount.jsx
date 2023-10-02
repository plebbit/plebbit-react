import React, { useEffect, useState } from 'react';
import { exportAccount } from '@plebbit/plebbit-react-hooks';
import Modal from '../../../components/Modal';
import styles from './modal.module.css';

const ExportAccount = ({ isOpen, setIsOpen }) => {
  const [account, setAccount] = useState();

  const fetchAccount = async () => {
    const exportedAccount = await exportAccount();
    setAccount(exportedAccount);
  };

  useEffect(() => {
    fetchAccount();

    return () => {
      setAccount();
    };
  }, []);

  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} header="Export Account">
      <div className={styles.wrapper}>
        <textarea value={account} />

        <h3 fontWeight="400" color="red" fontSize="12px" lineHeight="16px" paddingTop="5px">
          copy this text in the box above and store in a safe place
        </h3>

        <div className={styles.footer}>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportAccount;
