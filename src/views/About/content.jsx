import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BsFillShieldFill } from 'react-icons/bs';
import Flair from './flair';
import PostFlair from './flair/postFlair';
import UserFlair from './flair/userFlair';
import Moderators from './Moderator/subPlebbitModerators';
import ModQueue from './Modqueue';
import Rules from './Rules';

import styles from './about.module.css';
import { SubplebbitSideItem, subQueuesTabs, subUserMgmtTabs } from '../../store/data';
import Queues from './Overview/Queues';
import UserManagement from './Overview/UserManagement';
import SubSettings from './Settings';

const Content = ({ page, subPlebbit, role, handleSubPlebbitedit, loading, allowedSpecial }) => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  return (
    <>
      {page === '' && (
        <Flex
          alignItems="center"
          bg={inputBg}
          color={mainColor}
          flexDirection="column"
          justifyContent="center"
          margin="30px"
          padding="60px"
        >
          <Icon as={BsFillShieldFill} color={iconColor} width="30px" height="30px" />
          <Box>Welcome to the mod tools for {subPlebbit?.title}</Box>
        </Flex>
      )}
      {page === 'rules' && (
        <Rules
          subPlebbit={subPlebbit}
          role={role}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
          allowedSpecial={allowedSpecial}
        />
      )}
      {page === 'moderators' && (
        <Moderators
          subPlebbit={subPlebbit}
          role={role}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
          allowedSpecial={allowedSpecial}
        />
      )}
      {page === 'modqueue' && <ModQueue />}
      {page === 'flair' && (
        <Flair
          role={role}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
          allowedSpecial={allowedSpecial}
        />
      )}
      {page === 'userflair' && (
        <UserFlair
          role={role}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
          allowedSpecial={allowedSpecial}
        />
      )}
      {page === 'postflair' && (
        <PostFlair
          role={role}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
          allowedSpecial={allowedSpecial}
        />
      )}
    </>
  );
};

const Content2 = ({ page, subPlebbit, role, handleSubPlebbitedit, loading, allowedSpecial }) => {
  return (
    <div className={styles.content_wrapper}>
      {page === '' ? (
        <div className={styles.content_home}>
          <BsFillShieldFill />
          Welcome to the mod tools for {subPlebbit?.title}
        </div>
      ) : (
        <>
          {subQueuesTabs?.map((x) => x?.id)?.includes(page) ? (
            <Queues page={page} subPlebbit={subPlebbit} />
          ) : subUserMgmtTabs?.map((x) => x?.id)?.includes(page) ? (
            <UserManagement
              page={page}
              subPlebbit={subPlebbit}
              role={role}
              loading={loading}
              handleSubPlebbitedit={handleSubPlebbitedit}
              allowedSpecial={allowedSpecial}
            />
          ) : page === 'edit' ? (
            <SubSettings />
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};
export default Content2;
