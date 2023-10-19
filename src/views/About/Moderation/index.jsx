import React from 'react';
import styles from './moderation.module.css';
import Container from '../container';
import { SubRulesTabs, SubUserFlairTabs } from '../../../store/data';
import { useParams } from 'react-router-dom';
import RulesAndRemoval from './Rules';
import UserFlair from './UserFlair';

const Moderation = ({
  subPlebbit,
  loading,
  handleSubPlebbitedit,
  allowedSpecial,
  data,
  setData,
  role,
}) => {
  const { page } = useParams();
  return (
    <Container>
      {SubRulesTabs?.map((x) => x?.id)?.includes(page) ? (
        <RulesAndRemoval
          subPlebbit={subPlebbit}
          loading={loading}
          handleSubPlebbitedit={handleSubPlebbitedit}
          allowedSpecial={allowedSpecial}
          data={data}
          setData={setData}
        />
      ) : SubUserFlairTabs?.map((x) => x?.id)?.includes(page) ? (
        <UserFlair
          subPlebbit={subPlebbit}
          loading={loading}
          handleSubPlebbitedit={handleSubPlebbitedit}
          allowedSpecial={allowedSpecial}
          data={data}
          setData={setData}
        />
      ) : (
        ''
      )}
    </Container>
  );
};

export default Moderation;
