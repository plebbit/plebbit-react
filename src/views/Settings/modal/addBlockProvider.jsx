import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import styles from './modal.module.css';

const AddBlockProvide = ({ isOpen, setIsOpen, handleSave, loading }) => {
  const [data, setData] = useState({});

  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} header="Add Block Provider">
      <div className={styles.wrapper}>
        <div className={styles.settings_options}>
          <div className={styles.settings_options_title}>
            <div className={styles.settings_options_title}>
              <h3>ChainTicker</h3>
              <p>ChainTicker of the provider RPC</p>
            </div>
          </div>
          <div className={styles.settings_options_input}>
            <input
              placeholder="ChainProvider Chain Ticker"
              value={data?.chainTicker}
              onChange={(e) => setData({ ...data, chainTicker: e.target.value.toLowerCase() })}
              name="chainTicker"
              disabled={loading}
            />
          </div>
        </div>
        <div className={styles.settings_options}>
          <div className={styles.settings_options_title}>
            <h3>url</h3>
            <p>URL of the provider RPC</p>
          </div>
          <div className={styles.settings_options_input}>
            <textarea
              placeholder="ChainProvider Url"
              value={data?.url}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              name="url"
              disabled={loading}
              style={{
                minHeight: '80px',
              }}
            />
          </div>
        </div>
        <div className={styles.settings_options}>
          <div className={styles.settings_options_title}>
            <h3>chainId</h3>
            <p>ID of the EVM chain if any</p>
          </div>
          <div className={styles.settings_options_input}>
            <input
              placeholder="ChainProvider chainId"
              type="number"
              value={data?.chainId}
              onChange={(e) => setData({ ...data, chainId: e.target.value })}
              name="chainId"
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button
            style={{
              color: '#0079d3',
              border: '1px solid currentColor',
              backgroundColor: 'transparent',
            }}
            isLoading={loading}
            onClick={() => handleSave(data)}
            mr="10px"
          >
            save
          </button>
          <button onClick={() => setIsOpen(true)}>cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddBlockProvide;
