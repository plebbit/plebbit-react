import React, { useState } from 'react';
import styles from '../moderation.module.css';
import AboutHead from '../../AboutHead';
import { SubRulesTabs } from '../../../../store/data';
import AddRules from '../../modal/addRules';
import { Button2 } from '../../../../components/Button';
import { MdEdit } from 'react-icons/md';
import { BsFileText } from 'react-icons/bs';

const RulesAndRemoval = ({
  subPlebbit,
  handleSubPlebbitedit,
  loading,
  allowedSpecial,
  data,
  setData,
}) => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <AboutHead title="Rules and Removal Reasons" options={SubRulesTabs} />
      <div className={styles.content_top2}>
        <Button2
          role="button"
          style={{
            border: 'none',
          }}
          disabled
        >
          Reorder Rules
        </Button2>
        <Button2
          role="button"
          style={{
            backgroundColor: '#0079d3',
            color: '#fff',
            fill: '#fff',
          }}
          onClick={() => setShowAdd(true)}
          disabled={loading || !allowedSpecial}
        >
          Add Rule
        </Button2>
      </div>
      <div className={styles.rules_info}>
        These are rules that visitors must follow to participate. They can be used as reasons to
        report or ban posts, comments, and users. Subplebbits can have a maximum of 15 rules.
      </div>
      {!subPlebbit?.rules ? (
        <div className={styles.no_rules}>
          <BsFileText />
          <p>No rules yet</p>
        </div>
      ) : (
        <div className={styles.rules_table}>
          {subPlebbit?.rules?.map((rule, index) => (
            <div className={styles.rules_table_row} key={index}>
              <span className={styles.rt_count}>{+index + 1}</span>
              <span className={styles.rt_rule}>{rule}</span>
              <span className={styles.rt_actions}>
                <button
                  onClick={() => {
                    setMode('edit');
                    setSelected(rule);
                    setShowAdd(true);
                  }}
                >
                  <MdEdit />
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <AddRules
          isOpen={showAdd}
          setIsOpen={setShowAdd}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
          rules={subPlebbit?.rules || []}
          data={data}
          setData={setData}
        />
      )}
    </>
  );
};

export default RulesAndRemoval;
