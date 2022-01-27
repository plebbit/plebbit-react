import React from 'react';
import { Flex, Icon, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

const VoteComponent = ({ post }) => {
  const bg = useColorModeValue('#F8F9FA', '');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');

  return (
    <Flex
      bg={bg}
      flexDir="column"
      align="center"
      w="40px"
      h="100%"
      borderLeft="4px solid transparent"
      borderRadius="4px"
      pos="absolute"
      top={0}
      left={0}
      p="8px 4px 8px 0"
    >
      <IconButton
        aria-label="Upvote Post"
        bg={'none'}
        color={iconColor}
        w="24px"
        h="24px"
        minW="24px"
        minH="24px"
        border="none"
        borderRadius="2px"
        _hover={{
          bg: iconBg,
          color: 'upvoteOrange',
        }}
        _focus={{
          outline: 'none',
        }}
        onClick={() => {}}
        icon={<Icon as={BiUpvote} w={4} h={4} />}
      />
      <Text fontSize="12px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
        {post || 25}
      </Text>
      <IconButton
        aria-label="Downvote Post"
        bg="none"
        color={iconColor}
        w="24px"
        h="24px"
        minW="24px"
        minH="24px"
        border="none"
        borderRadius="2px"
        _hover={{
          bg: iconBg,
          color: 'downvoteBlue',
        }}
        _focus={{
          outline: 'none',
        }}
        onClick={() => {}}
        icon={<Icon as={BiDownvote} w={4} h={4} />}
      />
    </Flex>
  );
};

export default VoteComponent;
