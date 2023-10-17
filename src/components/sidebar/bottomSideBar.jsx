import React from 'react';
import plebbitReactPackageJson from '../../../package.json';
import { projectLinks, projectSocialLinks } from '../../store/data';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

const BottomSideBar = () => {
  return (
    <div className={styles.bottom_link_wrapper}>
      <div className={styles.bottom_link_wrapper2}>
        <div className={styles.bottom_link_content}>
          <div className={styles.blc_top}>
            <div className={styles.blc_t_left}>
              {projectLinks?.map((item, index) => (
                <Link target="_blank" rel="noreferrer" to={item?.link} key={index}>
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
            <div className={styles.blc_t_left}>
              {projectSocialLinks?.map((item, index) => (
                <Link target="_blank" rel="noreferrer" to={item?.link} key={index}>
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.blc_bottom}>
            {' '}
            Plebbit v{plebbitReactPackageJson.version}. GPL-2.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSideBar;
