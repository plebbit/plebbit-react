import React, { useContext } from 'react';
import { Box, Flex, useColorModeValue, Input } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { LinkIcon } from '@chakra-ui/icons';
import { ProfileContext } from '../../../store/profileContext';
import Avatar from '../../Avatar';

const CreatePostBar = (address) => {
  const history = useHistory();
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const inputText = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const { authorAvatarImageUrl } = useContext(ProfileContext);

  console.log('address', address);
  let route = '/submit';
  if (address?.address) {
    route = `/p/${address.address}/submit`;
  }
  return (
    <Flex bg={mainBg} borderRadius="4px" border={`1px solid ${border1}`} mb="16px" padding="8px">
      <Box
        border="1px solid"
        borderColor={border2}
        flexBasis="38px"
        mr="8px"
        borderRadius="50%"
        width="38px"
        height="38px"
      >
        <Box position="relative">
          <Avatar avatar={authorAvatarImageUrl} width={38} height={38} mr="8px" />
        </Box>
      </Box>
      <Input
        onClick={() => history.push(route)}
        placeholder="Create Post"
        bg={inputBg}
        border={`1px solid ${border2}`}
        boxShadow="none"
        boxSizing="border-box"
        color={inputText}
        display="block"
        flexGrow="1"
        height="38px"
        mr="8px"
        outline="none"
        padding="0 16px"
        fontSize="14px"
        lineHeight="21px"
        fontWeight="400"
        fontFamily="inherit"
      />
      <Box
        borderRadius="4px"
        position="relative"
        border="1px solid transparent"
        color={iconColor}
        fill={iconColor}
        _hover={{
          background: inputBg,
        }}
        minH="40px"
        minW="40px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="auto"
        onClick={() => history.push(route)}
      >
        <LinkIcon height="20px" width="20px" />
      </Box>
    </Flex>
  );
};

export default CreatePostBar;
