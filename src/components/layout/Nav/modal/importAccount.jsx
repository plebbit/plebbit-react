import React, { useState } from 'react';
import Modal from '../../../Modal';
import styles from './importAccount.module.css';
import { useToast } from '@chakra-ui/react';
import { importAccount } from '@plebbit/plebbit-react-hooks';
import useStore from '../../../../store/useStore';

const ImportAccount = () => {
  const [account, setAccount] = useState();
  const { showImportAccountModal, setShowImportAccountModal } = useStore((state) => state);

  const toast = useToast();

  const handleImportAccount = async () => {
    await importAccount(account);
    toast({
      title: 'Import Account.',
      description: 'Account Imported Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setShowImportAccountModal(false);
  };
  return (
    <Modal
      isOpen={showImportAccountModal}
      setIsOpen={setShowImportAccountModal}
      header="Import Account"
    >
      <div className={styles.wrapper}>
        <label htmlFor="account_detail" className={styles.import_account}>
          <p className={styles.import_account_label}>Account Details (JSON)</p>
          <textarea
            name="account_detail"
            id="account_detail"
            className={styles.import_account_input}
            placeholder="paste account details"
            onChange={(e) => setAccount(e.target.value)}
            value={account}
          />
        </label>
        <footer className={styles.import_account_footer}>
          <button
            style={{
              background: '#2b6cb0',
              color: '#fff',
            }}
            className={styles.footer_btn}
            onClick={handleImportAccount}
          >
            Import account
          </button>
          <button className={styles.footer_btn} onClick={() => setShowImportAccountModal(false)}>
            Cancel
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default ImportAccount;
