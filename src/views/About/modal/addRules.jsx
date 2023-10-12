import React from 'react';
import Modal from '../../../components/Modal';
import styles from './modal.module.css';
import { Button2 } from '../../../components/Button';
import { TextArea } from '../../../components/Input';

const AddRules = ({ setIsOpen, isOpen, rules, handleSubPlebbitedit, loading, data, setData }) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header="Add Rule"
      modalBodyStyle={styles.main_wrapper}
      onClose={() => setData({})}
    >
      <div className={styles.wrapper}>
        <TextArea
          placeholder="Rule displayed (e.g. No photos, No nudes, No spamming) seperated by comma ' , '"
          onChange={(e) => setData({ rules: [...rules, e.target.value.split(/\s*,\s*/)] })}
          value={data?.rules?.join(',')}
          title="Rule"
        />
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
          isLoading={loading}
          style={{
            color: '#fff',
            backgroundColor: '#0079df',
          }}
          loading={loading}
          onClick={handleSubPlebbitedit}
        >
          Add rules
        </Button2>
      </footer>
    </Modal>
  );
};

export default AddRules;
