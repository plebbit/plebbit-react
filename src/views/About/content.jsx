import React from 'react';
import { BsFillShieldFill } from 'react-icons/bs';
import styles from './about.module.css';
import { SubplebbitSideItem } from '../../store/data';
import SubSettings from './Settings';
import { useParams } from 'react-router-dom';
import Overview from './Overview';
import Moderation from './Moderation';

const Content2 = ({
  subPlebbit,
  role,
  handleSubPlebbitedit,
  loading,
  allowedSpecial,
  data,
  setData,
}) => {
  const { page } = useParams();
  const getContent = (value) =>
    SubplebbitSideItem?.filter((x) => x?.name === value)[0]
      ['children']?.map((x) => (x?.children ? x?.children : x?.id))
      ?.flat();

  return (
    <div className={styles.content_wrapper}>
      {page === undefined ? (
        <div className={styles.content_home}>
          <BsFillShieldFill />
          Welcome to the mod tools for {subPlebbit?.title}
        </div>
      ) : (
        <>
          {getContent('Overview')?.includes(page) ? (
            <Overview
              subPlebbit={subPlebbit}
              role={role}
              handleSubPlebbitedit={handleSubPlebbitedit}
              loading={loading}
              allowedSpecial={allowedSpecial}
              data={data}
              setData={setData}
            />
          ) : getContent('Moderation')?.includes(page) ? (
            <Moderation
              subPlebbit={subPlebbit}
              role={role}
              handleSubPlebbitedit={handleSubPlebbitedit}
              loading={loading}
              allowedSpecial={allowedSpecial}
              data={data}
              setData={setData}
            />
          ) : page === 'edit' ? (
            <SubSettings
              subPlebbit={subPlebbit}
              role={role}
              handleSubPlebbitedit={handleSubPlebbitedit}
              loading={loading}
              allowedSpecial={allowedSpecial}
              data={data}
              setData={setData}
            />
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};
export default Content2;
