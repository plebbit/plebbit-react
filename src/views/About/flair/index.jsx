import { Box, Button, Flex, Icon, Input, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineInfoCircle, AiOutlineTag } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import useStore from '../../../store/useStore';

const Flair = () => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const { device } = useStore(state => state);

  return (
    <Box>
      <Flex
        alignItems="center"
        background={ border1 }
        height="48px"
        justifyContent={ device !== 'mobile' ? 'flex-end' : 'flex-start' }
        left={ device !== 'mobile' ? '280px' : '0' }
        padding={ device !== 'mobile' ? '0 24px' : '5px 24px' }
        position="fixed"
        right="0"
        zIndex="3"
      />

      <Box ml="24px" mr="24px" paddingTop="64px" borderRadius="0 0 4px 4px" overflow="hidden">
        <Flex
          fontSize="18px"
          fontWeight="500"
          lineHeight="22px"
          color={ mainColor }
          marginBottom="16px"
          alignItems="center"
        >
          <Box>Grant user flair </Box>
          <Icon as={ AiOutlineInfoCircle } ml="4px" verticalAlign="text-top" />
        </Flex>
        <Flex
          bg={ border1 }
          alignItems="center"
          borderRadius="4px 4px 0 0"
          boxSizing="border-box"
          justifyContent="space-between"
          padding="8px 16px"
        >
          <Flex alignItems="center">
            <Input
              placeholder="Search for a user"
              width="248px"
              bg={ mainBg }
              border={ `1px solid ${border1}` }
              color={ mainColor }
              borderRadius="4px 0 0 4px"
              boxSizing="border-box"
              height="32px"
              padding="8px"
              _placeholder={ {
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '21px',
              } }
            />
            <Button bg={ iconColor } borderRadius="0 4px 4px 0" height="32px" width="40px">
              <Icon as={ FiSearch } color={ mainBg } />
            </Button>
          </Flex>
        </Flex>
        <Flex
          border={ `1px solid ${border1}` }
          borderRadius="0 4px 4px 0"
          boxSizing="border-box"
          marginBottom="36px"
          overflow="hidden"
          flexDir="column"
        >
          <Flex
            alignItems="center"
            fontSize="12px"
            fontWeight="400"
            lineHeight="16px"
            bg={ inputBg }
            borderBottom={ `1px solid ${border1}` }
            boxSizing="border-box"
            color={ iconColor }
            height="48px"
            padding="16px 42px 16px 24px"
            width="100%"
          >
            <Flex flex="0 0 auto" alignItems="center">
              <Box>USERNAME WITH PREVIEW</Box>
            </Flex>

            <Flex ml="auto" alignItems="flex-start">
              <Flex alignItems="center" w="144px" paddingRight="16px">
                <Box padding="4px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  FLAIR TEMPLATE
                </Box>
                <Icon as={ AiOutlineInfoCircle } ml="4px" verticalAlign="text-top" />
              </Flex>
              <Flex alignItems="center" ml="auto" w="144px">
                <Box padding="4px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  FLAIR TEXT
                </Box>
                <Icon as={ AiOutlineInfoCircle } ml="4px" verticalAlign="text-top" />
              </Flex>
            </Flex>
          </Flex>
          <Flex alignItems="center" bg={ mainBg } flexDir="column" padding="90px 0">
            <Icon as={ AiOutlineTag } width={ 8 } height={ 8 } color={ iconColor } mb="16px" />
            <Box fontSize="18px" fontWeight="500" lineHeight="22px" mb="8px">
              You do not have any users with user flair
            </Box>
            <Box>Search for a user to assign a user flair</Box>
          </Flex>
          <Flex padding="8px 16px" bg={ border1 } height="48px" />
        </Flex>
      </Box>
    </Box>
  );
};

export default Flair;
