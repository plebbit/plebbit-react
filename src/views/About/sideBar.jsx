import React from 'react';
import { BiArrowBack, BiLinkExternal } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import styles from './about.module.css';
import { SubplebbitSideItem } from '../../store/data';

export const SideBar = ({ page, subPlebbit }) => {
  const pag = useLocation();
  return (
    <div className={styles.about_nav}>
      <div className={styles.about_nav2}>
        <Link className={styles.nav_back} to={`/p/${subPlebbit.address}`}>
          <BiArrowBack />
          <span>Exit mod tools</span>
        </Link>
        {SubplebbitSideItem?.map((item, index) => (
          <React.Fragment key={index}>
            <span className={styles.nav_head}>{item?.name}</span>
            {item?.children?.map((child, key) => (
              <li key={key}>
                <Link to={`/p/${subPlebbit?.address}/about/${child?.id}/`}>
                  <div
                    className={styles.selected}
                    active={String(`${page}${pag?.search}`?.split('/')[0] === child?.id)}
                  />
                  <span className={styles.list_icon_wrap}>
                    <span className={styles.list_icon}>
                      <child.icon />
                    </span>
                  </span>
                  <span className={styles.list_text}>
                    {child.name}
                    {child?.isExternal && (
                      <span className={styles.lt_icon}>
                        <BiLinkExternal />
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
