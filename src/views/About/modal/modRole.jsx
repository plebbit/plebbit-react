import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import styles from './modal.module.css';
import Input from '../../../components/Input';
import { Button2 } from '../../../components/Button';
import Select from '../../../components/Select';

const ModRole = ({
  setIsOpen,
  isOpen,
  subPlebbit,
  handleSubPlebbitedit,
  loading,
  data,
  setData,
}) => {
  const [input, setInput] = useState('');

  return (
    <Modal
      header="Add Moderator"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalBodyStyle={styles.main_wrapper}
      onClose={() => setData({})}
    >
      <div className={styles.wrapper}>
        <Input
          placeholder="Enter user address"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          title="User Address"
          type="text"
          wrapperClass={styles.input}
        />
        <div className={styles.select_wrap}>
          <Select
            titleClass={styles.select}
            className={styles.select}
            options={['admin', 'moderator']}
            placeholder="Select role"
            left={-12}
            onChange={(value) =>
              setData({ ...data, roles: { ...subPlebbit?.roles, [input]: { role: value } } })
            }
            disabled={!input}
          />
        </div>
      </div>
      <footer className={styles.footer}>
        <Button2
          onClick={() => {
            setData({});
            setIsOpen(false);
          }}
        >
          Cancel
        </Button2>
        <Button2
          onClick={() => {
            handleSubPlebbitedit();

            setIsOpen(false);
          }}
          disabled={!(data && data.roles && data.roles[input] && data.roles[input].role && input)}
          style={{
            color: '#fff',
            backgroundColor: '#0079df',
          }}
          loading={loading}
        >
          Assign role
        </Button2>
      </footer>
    </Modal>
  );
};

export default ModRole;
