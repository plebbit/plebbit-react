import React, { useContext } from 'react';
import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
// import { useHistory } from 'react-router';
import { RiFireFill } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { TiStarburstOutline } from 'react-icons/ti';
import { BsBoxArrowUp } from 'react-icons/bs';
import {
  MdOutlineViewStream,
  MdViewAgenda,
  MdOutlineTableRows,
  MdOutlineViewHeadline,
  MdTableRows,
  MdViewHeadline,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { ProfileContext } from '../../../store/profileContext';
import DropDown from '../../DropDown';

const FeedSort = () => {
  const { postStyle, setPostStyle, isLoggedIn, feedSort, setFeedSort } = useContext(ProfileContext);
  // const history = useHistory();
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');

  const mainBg = useColorModeValue('lightBody', 'darkBody');
  // const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const activeFilterText = useColorModeValue('lightText', 'bodyTextDark');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  return (
    <>
      {isLoggedIn ? (
        <Flex
          alignItems="center"
          bg={mainBg}
          border={`1px solid ${border2}`}
          borderRadius="4px"
          flexFlow="nowrap"
          justifyContent="flex-start"
          mb="16px"
          padding="10px 12px"
        >
          <Flex alignItems="center" cursor="pointer">
            {/* <Box
              bg={feedSort === 'best' ? inputBg : 'transparent'}
              color={feedSort === 'best' ? activeFilterText : iconColor}
              cursor="default"
              fill={feedSort === 'best' ? activeFilterText : iconColor}
              mr="8px"
              textTransform="capitalize"
              position="relative"
              border="1px solid transparent"
              minH="unset"
              minW="unset"
              padding="6px 8px"
              borderRadius="20px"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="unset"
              lineHeight="17px"
              width="auto"
              display="flex"
              alignItems="center"
              _hover={{
                background: feedSort === 'best' ? '' : inputBg,
              }}
              // onClick={() => setFeedSort('best')}
            >
              <Icon width="20px" mr="8px" height="20px" as={RiRocketLine} />
              Best
            </Box> */}
            <Box
              bg={feedSort === 'hot' ? inputBg : 'transparent'}
              color={feedSort === 'hot' ? activeFilterText : iconColor}
              cursor="default"
              fill={feedSort === 'hot' ? activeFilterText : iconColor}
              mr="8px"
              textTransform="capitalize"
              position="relative"
              border="1px solid transparent"
              minH="unset"
              minW="unset"
              padding="6px 8px"
              borderRadius="20px"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="unset"
              lineHeight="17px"
              width="auto"
              display="flex"
              alignItems="center"
              _hover={{
                background: feedSort === 'hot' ? '' : inputBg,
              }}
              onClick={() => setFeedSort('hot')}
            >
              <Icon width="20px" mr="8px" height="20px" as={RiFireFill} />
              Hot
            </Box>
            <Box
              bg={feedSort === 'new' ? inputBg : 'transparent'}
              color={feedSort === 'new' ? activeFilterText : iconColor}
              cursor="default"
              fill={feedSort === 'new' ? activeFilterText : iconColor}
              mr="8px"
              textTransform="capitalize"
              position="relative"
              border="1px solid transparent"
              minH="unset"
              minW="unset"
              padding="6px 8px"
              borderRadius="20px"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="unset"
              lineHeight="17px"
              width="auto"
              display="flex"
              alignItems="center"
              _hover={{
                background: feedSort === 'new' ? '' : inputBg,
              }}
              onClick={() => setFeedSort('new')}
            >
              <Icon width="20px" mr="8px" height="20px" as={TiStarburstOutline} />
              New
            </Box>
            <Box
              bg={feedSort === 'topAll' ? inputBg : 'transparent'}
              color={feedSort === 'topAll' ? activeFilterText : iconColor}
              cursor="default"
              fill={feedSort === 'topAll' ? activeFilterText : iconColor}
              mr="8px"
              textTransform="capitalize"
              position="relative"
              border="1px solid transparent"
              minH="unset"
              minW="unset"
              padding="6px 8px"
              borderRadius="20px"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="unset"
              lineHeight="17px"
              width="auto"
              display="flex"
              alignItems="center"
              _hover={{
                background: feedSort === 'topAll' ? '' : inputBg,
              }}
              onClick={() => setFeedSort('topAll')}
            >
              <Icon width="20px" mr="8px" height="20px" as={BsBoxArrowUp} />
              Top
            </Box>
          </Flex>
          <Flex alignItems="center" cursor="pointer" display="flex">
            <Flex alignItems="center" borderRadius="4px">
              <Box
                borderRadius="20px"
                color={iconColor}
                outLine="none"
                padding="8px"
                bg="transparent"
                cursor="pointer"
                display="flex"
                alignItems="center"
                _hover={{
                  background: inputBg,
                }}
              >
                <Icon as={FiMoreHorizontal} width="20px" height="20px" />
              </Box>
            </Flex>
          </Flex>
          <DropDown
            caret
            inputBg={inputBg}
            dropDownTitle={
              <>
                {' '}
                <Flex color={iconColor} alignItems="center">
                  <Icon
                    as={
                      postStyle === 'card'
                        ? MdOutlineViewStream
                        : postStyle === 'classic'
                        ? MdOutlineTableRows
                        : MdOutlineViewHeadline
                    }
                    height={6}
                    width={6}
                  />
                </Flex>
              </>
            }
            content={
              <>
                {' '}
                <Flex
                  color={postStyle === 'card' && activeFilterText}
                  fill={postStyle === 'card' && activeFilterText}
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={{
                    background: inputBg,
                  }}
                  onClick={() => setPostStyle('card')}
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={postStyle === 'card' ? MdViewAgenda : MdOutlineViewStream}
                    width={6}
                    height={6}
                  />
                  <Box>Card</Box>
                </Flex>
                <Flex
                  color={postStyle === 'classic' && activeFilterText}
                  fill={postStyle === 'classic' && activeFilterText}
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={{
                    background: inputBg,
                  }}
                  borderY={`1px solid ${border2}`}
                  onClick={() => setPostStyle('classic')}
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={postStyle === 'classic' ? MdTableRows : MdOutlineTableRows}
                    width={6}
                    height={6}
                  />
                  <Box>Classic</Box>
                </Flex>
                <Flex
                  color={postStyle === 'compact' && activeFilterText}
                  fill={postStyle === 'compact' && activeFilterText}
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={{
                    background: inputBg,
                  }}
                  borderY={`1px solid ${border2}`}
                  onClick={() => setPostStyle('compact')}
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={postStyle === 'compact' ? MdViewHeadline : MdOutlineViewHeadline}
                    width={6}
                    height={6}
                  />
                  <Box>Compact</Box>
                </Flex>
              </>
            }
          />
        </Flex>
      ) : (
        <Flex
          alignItems="center"
          bg={mainBg}
          border={`1px solid ${border2}`}
          borderRadius="4px"
          flexFlow="nowrap"
          justifyContent="flex-start"
          mb="16px"
          padding="10px 12px"
        >
          <Flex alignItems="center" cursor="pointer">
            <Box
              bg={inputBg}
              color={activeFilterText}
              cursor="default"
              fill={activeFilterText}
              mr="8px"
              textTransform="capitalize"
              position="relative"
              border="1px solid transparent"
              minH="unset"
              minW="unset"
              padding="6px 8px"
              borderRadius="20px"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="unset"
              lineHeight="17px"
              width="auto"
              display="flex"
              alignItems="center"
            >
              <Icon width="20px" mr="8px" height="20px" as={RiFireFill} />
              Hot
            </Box>
            <Box
              bg={inputBg}
              color={activeFilterText}
              cursor="default"
              fill={activeFilterText}
              mr="8px"
              textTransform="capitalize"
              position="relative"
              border="1px solid transparent"
              minH="unset"
              minW="unset"
              padding="6px 8px"
              borderRadius="20px"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="unset"
              lineHeight="17px"
              width="auto"
              display="flex"
              alignItems="center"
            >
              Everywhere
              <Icon width="20px" height="20px" as={MdOutlineKeyboardArrowDown} />
            </Box>
            <Box
              bg="transparent"
              color={iconColor}
              cursor="default"
              fill={iconColor}
              mr="8px"
              textTransform="capitalize"
              position="relative"
              border="1px solid transparent"
              minH="unset"
              minW="unset"
              padding="6px 8px"
              borderRadius="20px"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="unset"
              lineHeight="17px"
              width="auto"
              display="flex"
              alignItems="center"
              _hover={{
                background: inputBg,
              }}
            >
              <Icon width="20px" mr="8px" height="20px" as={TiStarburstOutline} />
              New
            </Box>
            <Box
              bg="transparent"
              color={iconColor}
              cursor="default"
              fill={iconColor}
              mr="8px"
              textTransform="capitalize"
              position="relative"
              border="1px solid transparent"
              minH="unset"
              minW="unset"
              padding="6px 8px"
              borderRadius="20px"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="unset"
              lineHeight="17px"
              width="auto"
              display="flex"
              alignItems="center"
              _hover={{
                background: inputBg,
              }}
            >
              <Icon width="20px" mr="8px" height="20px" as={BsBoxArrowUp} />
              Top
            </Box>
          </Flex>
          <Flex alignItems="center" cursor="pointer" display="flex">
            <Flex alignItems="center" borderRadius="4px">
              <Box
                borderRadius="20px"
                color={iconColor}
                outLine="none"
                padding="8px"
                bg="transparent"
                cursor="pointer"
                display="flex"
                alignItems="center"
                _hover={{
                  background: inputBg,
                }}
              >
                <Icon as={FiMoreHorizontal} width="20px" height="20px" />
              </Box>
            </Flex>
          </Flex>
          <DropDown
            caret
            inputBg={inputBg}
            dropDownTitle={
              <>
                {' '}
                <Flex color={iconColor} alignItems="center">
                  <Icon
                    as={
                      postStyle === 'card'
                        ? MdOutlineViewStream
                        : postStyle === 'classic'
                        ? MdOutlineTableRows
                        : MdOutlineViewHeadline
                    }
                    height={6}
                    width={6}
                  />
                </Flex>
              </>
            }
            content={
              <>
                {' '}
                <Flex
                  color={postStyle === 'card' && activeFilterText}
                  fill={postStyle === 'card' && activeFilterText}
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={{
                    background: inputBg,
                  }}
                  onClick={() => setPostStyle('card')}
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={postStyle === 'card' ? MdViewAgenda : MdOutlineViewStream}
                    width={6}
                    height={6}
                  />
                  <Box>Card</Box>
                </Flex>
                <Flex
                  color={postStyle === 'classic' && activeFilterText}
                  fill={postStyle === 'classic' && activeFilterText}
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={{
                    background: inputBg,
                  }}
                  borderY={`1px solid ${border2}`}
                  onClick={() => setPostStyle('classic')}
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={postStyle === 'classic' ? MdTableRows : MdOutlineTableRows}
                    width={6}
                    height={6}
                  />
                  <Box>Classic</Box>
                </Flex>
                <Flex
                  color={postStyle === 'compact' && activeFilterText}
                  fill={postStyle === 'compact' && activeFilterText}
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={{
                    background: inputBg,
                  }}
                  borderY={`1px solid ${border2}`}
                  onClick={() => setPostStyle('compact')}
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={postStyle === 'compact' ? MdViewHeadline : MdOutlineViewHeadline}
                    width={6}
                    height={6}
                  />
                  <Box>Compact</Box>
                </Flex>
              </>
            }
          />
        </Flex>
      )}
    </>
  );
};

export default FeedSort;
