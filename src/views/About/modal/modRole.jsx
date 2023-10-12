import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import styles from './modal.module.css';
import Input from '../../../components/Input';
import { Button2 } from '../../../components/Button';
import Select from '../../../components/Select';

const ModRole = ({ setIsOpen, isOpen, subPlebbit, handleSubPlebbitedit, loading }) => {
  const data = useState({ ...subPlebbit });
  const [input, setInput] = useState('');
  const [role, setRole] = useState('');

  return (
    <Modal
      header="Add Moderator"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalBodyStyle={styles.main_wrapper}
    >
      <div className={styles.wrapper}>
        <Input
          placeholder="Enter Username"
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
            onChange={(value) => setRole(value)}
          />
        </div>
      </div>
      <footer className={styles.footer}>
        <Button2 onClick={() => setIsOpen(false)}>Cancel</Button2>
        <Button2
          onClick={() => {
            handleSubPlebbitedit({ roles: { ...data?.roles, [input]: { role } } });

            setIsOpen(false);
          }}
          disabled={!(role && input)}
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
