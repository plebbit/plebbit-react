import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BsFillShieldFill } from 'react-icons/bs';
import Flair from './flair';
import PostFlair from './flair/postFlair';
import UserFlair from './flair/userFlair';
import Moderators from './Moderator/subPlebbitModerators';
import ModQueue from './Modqueue';
import Rules from './Rules';

const Content = ({ page, subPlebbit, role, handleSubPlebbitedit, loading }) => {
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
        />
      )}
      {page === 'moderators' && (
        <Moderators
          subPlebbit={subPlebbit}
          role={role}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
      {page === 'modqueue' && <ModQueue />}
      {page === 'flair' && (
        <Flair
          role={role}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
      {page === 'userflair' && (
        <UserFlair
          role={role}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
      {page === 'postflair' && (
        <PostFlair
          role={role}
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
    </>
  );
};

export default Content;
