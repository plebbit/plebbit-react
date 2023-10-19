import React, { useMemo } from 'react';
import BottomSideBar from '../../components/sidebar/bottomSideBar';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';
import { useSubplebbits } from '@plebbit/plebbit-react-hooks';
import Avatar from '../../components/Avatar';
import getIsOnline from '../../utils/getIsOnline';
import { getSubName } from '../../utils/getUserName';
import convertArrToObj from '../../utils/convertArrToObj';
import Sort from '../../utils/sort';
import useStore from '../../store/useStore';
import styles from './home.module.css';
import { Link, useLocation } from 'react-router-dom';
import { SideBarWrap } from '../../components/container/FeedContent';

export const SideBar = () => {
  const { pathname } = useLocation();
  const { subPlebbitData } = useStore((state) => state);
  const { subplebbits } = useSubplebbits({
    subplebbitAddresses: subPlebbitData?.map((x) => x?.address),
  });
  const subs = Sort(
    convertArrToObj(
      subplebbits?.includes(undefined)
        ? [...subPlebbitData, subplebbits?.filter((x) => x !== undefined)].flat()
        : subplebbits,
      'address',
      true
    ),
    (x) => getIsOnline(x?.updatedAt),
    true
  );
  const bannerUrl = useMemo(
    () =>
      require(`../../assets/images/banners/banner-${Math.round(Math.random() * (19 - 1) + 1)}.jpg`),
    [pathname]
  );

  return (
    <SideBarWrap>
      <div className={styles.side_top_communities}>
        <div className={styles.side_top_communities2}>
          <div className={styles.side_top_communities3}>
            <div
              className={styles.side_top_communities_banner}
              style={{
                backgroundImage: `url(${bannerUrl})`,
              }}
            >
              <p>Top Communities</p>
            </div>

            <div className={styles.list} role="list">
              {subs?.map((sub, index) => (
                <Link
                  to={`/p/${sub?.address}/`}
                  className={styles.side_top_communities_link}
                  key={index}
                >
                  <div className={styles.side_top_communities_link2}>
                    <span className={styles.sn}>{index + 1}</span>
                    <Avatar
                      width={20}
                      height={20}
                      style={{
                        marginRight: '8px',
                      }}
                      avatar={sub?.suggested?.avatarUrl}
                      badge
                      isOnline={getIsOnline(sub?.updatedAt)}
                    />
                    <div className={styles.comm_add}> {getSubName(sub)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plebbit_side_wrap}>
        <BottomSideBar />
        <BacktoTopButton />
      </div>
    </SideBarWrap>
  );
};

export default SideBar;
