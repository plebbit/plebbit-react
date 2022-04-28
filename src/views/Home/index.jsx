import React, { useContext } from 'react';
import { Box, Flex, Icon, useColorModeValue, Input, Image } from '@chakra-ui/react';
// import { useHistory } from 'react-router';
import { LinkIcon } from '@chakra-ui/icons';
import { RiFireFill, RiRocketLine } from 'react-icons/ri';
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
import Post from '../../components/Post/index2';
import { ProfileContext } from '../../store/profileContext';
import SideBar from './sideBar';
import DropDown from '../../components/DropDown';
import { useFeed } from '@plebbit/plebbit-react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const { isLoggedIn, postStyle, setPostStyle, feedSort, setFeedSort } = useContext(ProfileContext);
  // const history = useHistory();
  const bg = useColorModeValue('white', 'darkNavBg');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const { feed, loadMore, hasMore } = useFeed(['news.eth', 'crypto.eth', 'memes.eth'], feedSort);

  const feeds = feed;
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const inputText = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const activeFilterText = useColorModeValue('lightText', 'bodyTextDark');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  console.log('here', feed);
  return (
    <Flex maxW="100%" padding="20px 24px" justifyContent="center" margin="0 auto">
      <Box
        width={postStyle === 'card' ? '640px' : '100%'}
        sx={{
          '@media (min-width: 960px)': {
            minWidth: '0',
          },
          '@media (max-width: 960px)': {
            width: '100%',
            minWidth: '0',
          },
        }}
      >
        {!isLoggedIn ? (
          <>
            <Box
              pb="10px"
              fontSize="14px"
              textTransform="unset"
              lineHeight="18px"
              color="#878A8c"
              position="relative"
              width="100%"
            >
              Popular posts
            </Box>
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
                      borderTop={`1px solid ${border2}`}
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
                      borderTop={`1px solid ${border2}`}
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
          </>
        ) : (
          <>
            {/* Create Post Bar */}
            <Flex
              bg={mainBg}
              borderRadius="4px"
              border={`1px solid ${border1}`}
              mb="16px"
              padding="8px"
            >
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
                  <Box borderRadius="50%" width="38px" height="38px" position="relative">
                    <Box width="100%" height="100%" borderRadius="50%" bg={border2} />
                    <Box width="100%" position="absolute" bottom="0">
                      <Image
                        src={`https://robohash.org/${Math.round(
                          Math.random() * (5 - 1 + 1) + 1
                        )}?set=set${Math.floor(Math.random() * (5 - 1 + 1) + 1)}`}
                        width="100%"
                        transformOrigin="bottom center"
                        display="block"
                        transform="scale(1.3)"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Input
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
              >
                <LinkIcon height="20px" width="20px" />
              </Box>
            </Flex>
            {/* feed sorter bar */}
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
                </Box>
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
                      borderTop={`1px solid ${border2}`}
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
                      borderTop={`1px solid ${border2}`}
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
          </>
        )}

        <Box minHeight="1000px" width="100%">
          <InfiniteScroll
            dataLength={feeds ? feeds.length : 0}
            next={loadMore}
            hasMore={hasMore}
            loader={<Post loading={true} mode={postStyle} key={Math.random()} />}
            // below props only if you need pull down functionality
            refreshFunction={() => {}}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
          >
            {feeds?.map((feed) => (
              <Post post={feed} key={feed?.cid} mode={postStyle} />
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
      <SideBar bg={bg} />
    </Flex>
  );
};

export default Home;
