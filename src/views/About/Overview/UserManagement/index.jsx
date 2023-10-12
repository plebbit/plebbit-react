import React, { useState } from 'react';
import styles from './usermanagement.module.css';
import AboutHead from '../../AboutHead';
import { subUserMgmtTabs } from '../../../../store/data';
import LeaveMod, { RemoveMod } from '../../modal/leaveMod';
import ModRole from '../../modal/modRole';
import { useAccount } from '@plebbit/plebbit-react-hooks';
import useStore from '../../../../store/useStore';
import { useDisclosure } from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../../../components/Avatar';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { Button2 } from '../../../../components/Button';
import { getAddress } from '../../../../utils/getUserName';

const UserManagement = ({ subPlebbit, role, allowedSpecial, handleSubPlebbitedit, loading }) => {
  const [selected, setSelected] = useState('');
  const profile = useAccount();
  const [leaveModShow, setLeaveMod] = useState(false);
  const [removeModShow, setRemoveMod] = useState(false);
  const [roleModShow, setRoleMod] = useState(false);
  const thereIsOwner = Object?.values(subPlebbit?.roles)
    ?.map((x) => x?.role)
    ?.includes('owner') === false && { Anonymous: { role: 'owner' } };
  const moderators = { ...thereIsOwner, ...subPlebbit?.roles };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_top}>
        <AboutHead title="User Management" options={subUserMgmtTabs} />
      </div>
      <div className={styles.content_top2}>
        <Button2 onClick={() => setLeaveMod(true)}>Leave as mod</Button2>

        <Button2
          role="button"
          style={{
            backgroundColor: '#0079d3',
            color: '#fff',
            fill: '#fff',
          }}
          onClick={() => setRoleMod(true)}
          disabled={!allowedSpecial}
        >
          Assign role to user
        </Button2>
      </div>
      <div className={styles.table_head}>
        <div className={styles.table_head_search}>
          <input type="text" placeholder="Search for user" />
          <button>
            <RiSearch2Line />
          </button>
        </div>
      </div>
      <div className={styles.table_content}>
        {subPlebbit?.roles &&
          Object.keys(moderators)?.map((user, index) => (
            <div key={index}>
              <div className={styles.table_row}>
                <div className={styles.user}>
                  <Link>
                    <Avatar width={32} height={32} mr="6px" />
                    <span className={styles.user_detail}>
                      <span>{getAddress(user)}</span>
                    </span>
                  </Link>
                </div>
                <div className={styles.user_middle}></div>
                <div className={styles.user_end}>
                  <div className={styles.user_previlege}>{moderators[user]?.role}</div>
                  {moderators[user]?.role !== 'owner' && (
                    <div className={styles.user_previlege_edit} disabled>
                      <MdOutlineModeEditOutline />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {removeModShow && (
        <RemoveMod
          isOpen={removeModShow}
          setIsOpen={setRemoveMod}
          subPlebbit={subPlebbit}
          address={selected}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
          setSelected={setSelected}
        />
      )}
      {leaveModShow && (
        <LeaveMod
          isOpen={leaveModShow}
          setIsOpen={setLeaveMod}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
      {roleModShow && (
        <ModRole
          isOpen={roleModShow}
          setIsOpen={setRoleMod}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default UserManagement;
