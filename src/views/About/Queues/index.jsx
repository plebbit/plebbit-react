import React, { useState } from 'react';
import styles from './queues.module.css';
import TabButton from '../TabButton';
import { queuesTabs } from '../../../store/data';
import { HiChevronDown } from 'react-icons/hi';
import {
  MdCancelPresentation,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdIndeterminateCheckBox,
  MdOutlineCheckCircleOutline,
  MdOutlineNotInterested,
  MdOutlineViewStream,
} from 'react-icons/md';
import { BsListUl } from 'react-icons/bs';
import Select from '../../../components/Select';

const Queues = ({ page, subPlebbit }) => {
  const [selected, setSelected] = useState([1]);
  const feeds = [1, 2, 3, 4, 5];

  return (
    <div className={styles.content}>
      <div className={styles.content_top}>
        <div className={styles.content_title}>Queues</div>
        <div className={styles.content_page_tabs}>
          {queuesTabs?.map((tab, index) => (
            <TabButton tab={tab} key={index} subPlebbit={subPlebbit} page={page} />
          ))}
        </div>
        <div className={styles.queues_sort}>
          <Select
            options={['Newest First', 'Oldest First', 'Most Reported First']}
            offset={10}
            title={(selected) => (
              <div className={styles.queues_sort_dropdown}>
                Newest First
                <HiChevronDown className={styles.qsd_caret} />
              </div>
            )}
          />

          <Select
            options={['Posts and Comments', 'Posts', 'Comments']}
            offset={10}
            title={() => (
              <div className={styles.queues_sort_dropdown}>
                POSTS AND COMMENTS
                <HiChevronDown className={styles.qsd_caret} />
              </div>
            )}
          />

          <div className={styles.queues_mode_dropdown}>
            <div className={styles.queues_mode_dropdown2}>
              <button role="menuitem">
                <span className={styles.mode_icon}>
                  <MdOutlineViewStream />
                </span>
                <HiChevronDown className={styles.mode_caret} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.queue_post_filter}>
          <Select
            options={[
              'Spam Filtered',
              'Has Reports',
              'Self Posts',
              'Posts With Flair',
              'Posts',
              'Comments',
            ]}
            offset={10}
            title={() => (
              <div className={styles.queue_post_filter2}>
                {feeds?.length && selected?.length === feeds?.length ? (
                  <MdCheckBox className={styles.queue_post_filter_icon} />
                ) : selected?.length ? (
                  <MdIndeterminateCheckBox className={styles.queue_post_filter_icon} />
                ) : (
                  <MdCheckBoxOutlineBlank className={styles.queue_post_filter_icon} />
                )}
                <HiChevronDown className={styles.queue_post_filter_icon} />
              </div>
            )}
          />
          {selected?.length && (
            <>
              <button className={styles.queue_post_actions}>
                <MdOutlineCheckCircleOutline className={styles.queue_post_filter_icon} />
                <span className={styles.queue_post_filter_action_text}>Approve</span>
              </button>
              <button className={styles.queue_post_actions}>
                <MdOutlineNotInterested className={styles.queue_post_filter_icon} />
                <span className={styles.queue_post_filter_action_text}>Remove</span>
              </button>
              <button className={styles.queue_post_actions}>
                <MdCancelPresentation className={styles.queue_post_filter_icon} />
                <span className={styles.queue_post_filter_action_text}>Spam</span>
              </button>
              <button className={styles.queue_post_actions}>
                <BsListUl className={styles.queue_post_filter_icon} />
              </button>
              <div className={styles.queue_post_filter_action_selected}>
                <span>{selected?.length} selected</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queues;
