import {
  useAccount,
  useAccountSubplebbits,
  useSubplebbit,
  useSubplebbits,
} from '@plebbit/plebbit-react-hooks';
import React, { useMemo, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import getIsOnline from '../../../utils/getIsOnline';
import Avatar from '../../Avatar';
import styles from './navbar.module.css';
import { Link } from 'react-router-dom';
import useStore from '../../../store/useStore';
import truncateString from '../../../utils/truncateString';
import Sort from '../../../utils/sort';
import convertArrToObj from '../../../utils/convertArrToObj';
import { getSubName } from '../../../utils/getUserName';

export const NavSearch = React.memo(() => {
  const [searchVal, setSearchVal] = useState('');
  const profile = useAccount();
  const { accountSubplebbits } = useAccountSubplebbits();
  const subscriptions = useSubplebbits({ subplebbitAddresses: profile?.subscriptions });
  const { subPlebbitData, subPlebbitDefData } = useStore((state) => state);
  const mySubplebbits = Object.keys(accountSubplebbits)?.length
    ? Object.keys(accountSubplebbits)?.map((pages) => ({
        label: truncateString(accountSubplebbits[pages]?.title),
        value: pages,
        ...accountSubplebbits[pages],
      }))
    : [];
  const subs = subscriptions?.length
    ? subscriptions?.map((x) => ({ ...x, value: x?.address, label: x?.title }))
    : '';

  const data = useSubplebbit(searchVal ? { subplebbitAddress: searchVal } : undefined);
  const options = useMemo(
    () =>
      Sort(
        convertArrToObj(
          [
            ...mySubplebbits,
            ...subs,
            [
              subPlebbitData.map((x) => ({
                ...x,
                label: getSubName(x),
                value: x?.address,
              })),
              subPlebbitDefData
                ?.filter((x) => x !== undefined)
                .map((x) => ({
                  ...x,
                  label: getSubName(x),
                  value: x?.address,
                })),
            ].flat(),
          ]
            ?.filter((x) => x !== undefined)
            .flat(),
          'value',
          true
        ),
        (x) => getIsOnline(x?.updatedAt),
        true
      ),
    [mySubplebbits, subs, subPlebbitDefData]
  );

  const searchResult = useMemo(
    () =>
      options?.filter(
        (x) =>
          x?.address.includes(searchVal?.replace(/\s/g, '')?.toLowerCase()) ||
          x?.title
            ?.replace(/\s/g, '')
            ?.toLowerCase()
            ?.includes(searchVal?.replace(/\s/g, '')?.toLowerCase())
      ),
    [searchVal]
  );

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
            list="subs"
            type="search"
            placeholder="Search subplebbit"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            autoComplete="off"
          />
        </form>
      </div>
      {searchVal && (
        <div id="subs" className={styles.ns_result_wrap}>
          {searchResult?.length ? (
            searchResult?.map((val, index) => (
              <Link
                to={`/p/${searchVal}/`}
                value={val?.address}
                name={val?.title}
                key={index}
                className={styles.ns_result}
              >
                <Avatar
                  avatar={val?.suggested?.avatarUrl}
                  width={24}
                  height={24}
                  style={{
                    marginRight: '8px',
                  }}
                  badge
                  isOnline={getIsOnline(data?.updateAt)}
                />
                <div className={styles.ns_result2}>
                  <div className={styles.nsr_title}>{val?.title}</div>
                  <div className={styles.nsr_add}> {val?.address}</div>
                </div>
              </Link>
            ))
          ) : (
            <Link to={`/p/${searchVal}/`} className={styles.ns_result}>
              <Avatar
                avatar={data?.suggested?.avatarUrl}
                width={24}
                height={24}
                style={{
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
          )}
        </div>
      )}
    </div>
  );
});

export default NavSearch;
