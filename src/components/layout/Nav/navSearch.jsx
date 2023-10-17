import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import getIsOnline from '../../../utils/getIsOnline';
import Avatar from '../../Avatar';
import styles from './navbar.module.css';
import { Link } from 'react-router-dom';

export const NavSearch = () => {
  const [searchVal, setSearchVal] = useState('');

  const data = useSubplebbit(searchVal ? { subplebbitAddress: searchVal } : undefined);

  return (
    <div className={styles.ns_wrap}>
      <div className={styles.ns_wrap2}>
        <form role="search" autoComplete="off">
          <label>
            <div aria-hidden="true" className={styles.search_icon}>
              <RiSearchLine />
            </div>
          </label>
          <input
            type="search"
            placeholder="Search subplebbit"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </form>
      </div>
      {searchVal && (
        <div className={styles.ns_result_wrap}>
          <Link to={`/p/${searchVal}/`} className={styles.ns_result}>
            <Avatar
              avatar={data?.avatar}
              width={24}
              height={24}
              sx={{
                marginRight: '8px',
              }}
              badge={data !== undefined ? true : false}
              isOnline={getIsOnline(data?.updateAt)}
            />
            <div className={styles.ns_result2}>
              <div className={styles.nsr_title}>{data?.title}</div>
              <div className={styles.nsr_add}> {searchVal}</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavSearch;
