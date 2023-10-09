import React from 'react';
import styles from './moderation.module.css';
import Container from '../container';
import { SubRulesTabs, SubUserFlairTabs } from '../../../store/data';
import { useParams } from 'react-router-dom';
import RulesAndRemoval from './Rules';
import UserFlair from './UserFlair';

const Moderation = ({ subPlebbit, loading, handleSubPlebbitedit, allowedSpecial }) => {
  const { page } = useParams();
  return (
    <Container>
      {SubRulesTabs?.map((x) => x?.id)?.includes(page) ? (
        <RulesAndRemoval
          subPlebbit={subPlebbit}
          loading={loading}
          handleSubPlebbitedit={handleSubPlebbitedit}
          allowedSpecial={allowedSpecial}
        />
      ) : SubUserFlairTabs?.map((x) => x?.id)?.includes(page) ? (
        <UserFlair />
      ) : (
        ''
      )}
    </Container>
  );
};

export default Moderation;
