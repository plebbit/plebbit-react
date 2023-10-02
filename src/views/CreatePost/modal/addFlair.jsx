import React, { useState } from 'react';
import styles from './addflair.module.css';
import Modal from '../../../components/Modal';
import { getSubName } from '../../../utils/getUserName';
import { BsSearch } from 'react-icons/bs';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

const AddFlair = ({ setIsOpen, isOpen, subplebbit, flair, setFlair }) => {
  const [search, setSearch] = useState('');
  const flairs = subplebbit?.flairs?.post?.filter((x) =>
    x?.text?.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <Modal
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      width="402px"
      header=<div className={styles.af_head}>{`Select ${getSubName(subplebbit)} flair`}</div>
      modalBodyStyle={styles.body}
    >
      <div>
        {flair?.text ? (
          <div className={styles.top}>
            <span>Post Title</span>
            <div
              className={styles.top_flair}
              style={{
                backgroundColor: flair?.backgroundColor,
                color: flair?.textColor,
              }}
            >
              <span>{flair?.text}</span>
            </div>
          </div>
        ) : (
          <div className={styles.top}>No flair selected</div>
        )}
        <div className={styles.bottom}>
          <div className={styles.bottom2}>
            <div className={styles.bottom_input}>
              <input
                placeholder="Search for flair"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <BsSearch />
            </div>
            <div aria-label="flair_picker" role="radiogroup">
              <input value={flair} type="hidden" />
              {flairs?.map((item, index) => (
                <div
                  key={index}
                  className={styles.flair_radio}
                  aria-checked={item?.text === flair?.text ? 'true' : 'false'}
                  role="radio"
                  tabIndex={item?.text === flair?.text ? '0' : '-1'}
                  onClick={() => setFlair(item)}
                >
                  {item?.text === flair?.text ? (
                    <MdRadioButtonChecked color="#0079d3" />
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}
                  <div
                    className={styles.top_flair}
                    style={{
                      backgroundColor: item?.backgroundColor,
                      color: item?.textColor,
                    }}
                  >
                    <span>{item?.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <button
            role="button"
            tabIndex="0"
            disabled={!flair?.text}
            active={String(flair?.text?.length !== 0)}
            onClick={() => setIsOpen(false)}
          >
            Apply
          </button>{' '}
          <button role="button" tabIndex="0" onClick={() => setFlair({})}>
            Clear flair
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddFlair;
