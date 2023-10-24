import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import Layout from '../../../components/layout';
import { getAddress } from '../../../utils/getUserName';
import styles from './moderator.module.css';
import { RiSearch2Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Container from '../container';
import useAppTitle from '../../../hooks/useAppTitle';

const Moderators = () => {
  const { pathname } = useLocation();
  const { subplebbitAddress } = useParams();
  const subPlebbit = useSubplebbit({ subplebbitAddress });

  const thereIsOwner = Object?.values(subPlebbit?.roles)
    ?.map((x) => x?.role)
    ?.includes('owner') === false && { Anonymous: { role: 'owner' } };
  const moderators = { ...thereIsOwner, ...subPlebbit?.roles };

  useAppTitle(subPlebbit?.title || getAddress(subplebbitAddress), subPlebbit);
  return (
    <>
      <div className={styles.top}>
        <Avatar
          width={20}
          height={20}
          style={{
            marginRight: '8px',
          }}
        />
        <Link to={`/p/${subplebbitAddress}/`}>
          {subPlebbit?.title || getAddress(subplebbitAddress)}
        </Link>
        / moderators
      </div>
      <Container>
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
                      <Avatar
                        width={32}
                        height={32}
                        style={{
                          marginRight: '6px',
                        }}
                      />
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
      </Container>
    </>
  );
};

export default Moderators;
