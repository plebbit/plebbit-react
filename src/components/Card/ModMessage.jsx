import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiShieldX } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa';
import { getSubName } from '../../utils/getUserName';

export const RemovedMessage = ({ subplebbit }) => {
  const removeColor = useColorModeValue('persimmon', 'persimmon');

  return (
    <Flex
      border="1px solid #878A8C"
      borderRadius="4px"
      margin="16px 16px 8px 8px"
      padding="4px 8px 4px 0"
      position="relative"
    >
      <Box bg="#878A8C" bottom="0" top="0" pos="absolute" width="8px" />
      <Box margin="12px 8px 8px 16px">
        <Icon width="20px" as={BiShieldX} color={removeColor} />
      </Box>
      <Box margin="8px 0">
        <Box fontSize="12" fontWeight="700" lineHeight="16px">
          Sorry, this post has been removed by the moderators of {getSubName(subplebbit)}.
        </Box>
        <Box fontSize="12" fontWeight="400" lineHeight="16px" pt="4px">
          Moderators remove posts from feeds for a variety of reasons, including keeping communities
          safe, civil, and true to their purpose.
        </Box>
      </Box>
    </Flex>
  );
};

export const DeletedMessage = () => {
  const removeColor = useColorModeValue('persimmon', 'persimmon');

  return (
    <Flex
      border="1px solid #878A8C"
      borderRadius="4px"
      margin="16px 16px 8px 8px"
      padding="4px 8px 4px 0"
      position="relative"
    >
      <Box bg="#878A8C" bottom="0" top="0" pos="absolute" width="8px" />
      <Box margin="12px 8px 8px 16px">
        <Icon width="20px" as={BiShieldX} color={removeColor} />
      </Box>
      <Box margin="8px 0">
        <Box fontSize="12" fontWeight="700" lineHeight="16px">
          Sorry, this post was deleted by the person who originally posted it.
        </Box>
        <Box fontSize="12" fontWeight="400" lineHeight="16px" pt="4px">
          Sorry, this post was deleted by the person who originally posted it. It doesn't appear in
          any feeds, and anyone with a direct link to it will see a message like this one.
        </Box>
      </Box>
    </Flex>
  );
};
export const LockedMessage = ({ subplebbit }) => {
  const lockColor = useColorModeValue('brightSun', 'brightSun');

  return (
    <Flex
      border="1px solid "
      borderRadius="4px"
      margin="16px 16px 8px 8px"
      padding="4px 8px 4px 0"
      position="relative"
      borderColor={lockColor}
    >
      <Box bg={lockColor} bottom="0" top="0" pos="absolute" width="8px" />
      <Box margin="12px 8px 8px 16px">
        <Icon width="20px" as={FaLock} color={lockColor} />
      </Box>
      <Box margin="8px 0">
        <Box fontSize="12" fontWeight="700" lineHeight="16px">
          This thread has been locked by the moderators of {getSubName(subplebbit)}.
        </Box>
        <Box fontSize="12" fontWeight="400" lineHeight="16px" pt="4px">
          New comments cannot be posted
        </Box>
      </Box>
    </Flex>
  );
};
