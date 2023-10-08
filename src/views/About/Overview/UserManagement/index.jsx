import React, { useState } from 'react';
import styles from './usermanagement.module.css';
import AboutHead from '../../AboutHead';
import { subUserMgmtTabs } from '../../../../store/data';
import LeaveMod from '../../modal/leaveMod';
import ModRole from '../../modal/modRole';
import { useAccount } from '@plebbit/plebbit-react-hooks';
import useStore from '../../../../store/useStore';
import { useDisclosure } from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Avatar from '../../../../components/Avatar';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { Button2 } from '../../../../components/Button';

const UserManagement = ({
  page,
  subPlebbit,
  role,
  allowedSpecial,
  handleSubPlebbitedit,
  loading,
}) => {
  const [selected, setSelected] = useState('');
  const profile = useAccount();
  const { device } = useStore((state) => state);
  const { isOpen: leaveModShow, onOpen: openLeaveMod, onClose: closeLeaveMod } = useDisclosure();
  const { isOpen: removeModShow, onOpen: openRemoveMod, onClose: closeRemoveMod } = useDisclosure();
  const { isOpen: roleModShow, onOpen: openRoleMod, onClose: closeRoleMod } = useDisclosure();
  return (
    <div className={styles.wrapper}>
      <div className={styles.content_top}>
        <AboutHead
          active={page}
          subPlebbit={subPlebbit}
          title="User Management"
          options={subUserMgmtTabs}
        />
      </div>
      <div className={styles.content_top2}>
        <Button2 onClick={openLeaveMod}>Leave as mod</Button2>

        <Button2
          role="button"
          style={{
            backgroundColor: '#0079d3',
            color: '#fff',
            fill: '#fff',
          }}
          onClick={openRoleMod}
          disabled={!allowedSpecial}
        >
          Invite user as mod
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]?.map((_, index) => (
          <div key={index}>
            <div className={styles.table_row}>
              <div className={styles.user}>
                <Link>
                  <Avatar width={32} height={32} mr="6px" />
                  <span className={styles.user_detail}>
                    <span>esteban abaroa</span>
                    <span className={styles.user_time}>10 months ago (permanent)</span>
                  </span>
                </Link>
              </div>
              <div className={styles.user_middle}></div>
              <div className={styles.user_end}>
                <div className={styles.user_previlege}>Everything</div>
                <div className={styles.user_previlege_edit}>
                  <MdOutlineModeEditOutline />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {leaveModShow && (
        <LeaveMod
          isOpen={leaveModShow}
          onClose={closeLeaveMod}
          subPlebbit={subPlebbit}
          profile={profile}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
      {roleModShow && (
        <ModRole
          isOpen={roleModShow}
          onClose={closeRoleMod}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default UserManagement;
