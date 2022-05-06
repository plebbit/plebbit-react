import React, { useContext } from 'react';
import { Box, Flex, Icon, Image, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import Button from '../../components/Button';
import { FaBell } from 'react-icons/fa';
import { ProfileContext } from '../../store/profileContext';
import Post from '../../components/Post/index2';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreatePostBar from '../../components/Post/CreatePost/createPostBar';
import FeedSort from '../../components/Post/FeedSort';
import { useFeed } from '@plebbit/plebbit-react-hooks';

const SubPlebbit = ({ match }) => {
  const { postStyle, feedSort } = useContext(ProfileContext);
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const subPlebbitBorder = useColorModeValue('borderLight1', 'borderDark1');
  const inactiveSubTitle = useColorModeValue('lightText1', 'darkText1');
  const { feed, loadMore, hasMore } = useFeed([match.params.subplebbitAddress], feedSort);
  const feeds = feed;

  return (
    <Box width="100%">
      <Box
        minW="260px"
        margin="0 auto"
        padding="8px 16px"
        height="145px"
        background={`url("https://styles.redditmedia.com/t5_2wlj3/styles/bannerBackgroundImage_bx1bi0qmmcg61.jpg?width=4000&format=pjpg&s=8fbb510f1bae6b0fdd98d075458022e98e4910f4") center center / cover no-repeat rgb(55, 60, 63)`}
      />
      <Box bg={mainBg} display="block" width="100%">
        <Flex
          maxWidth="984px"
          flexDir="column"
          alignItems="flex-start"
          justifyContent="space-between"
          margin="0 auto"
          padding="0 16px 0 24px"
        >
          <Flex marginTop="-14px" marginBottom="12px" alignItems="flex-start">
            <Image
              src="https://styles.redditmedia.com/t5_2wlj3/styles/communityIcon_7jxh2j4ouky41.png?width=256&s=59ea46d93492e9d0951b43d7c580f72982a86974"
              backgroundColor="#fff"
              backgroundSize="cover"
              borderRadius="100%"
              border="4px solid #fff"
              display="inline-block"
              height="76px"
              width="76px"
            />
            <Flex
              boxSizing="border-box"
              alignContent="flex-start"
              flex="1"
              paddingLeft="16px"
              marginTop="24px"
              justifyContent="space-between"
              width="calc(100% - 80px)"
            >
              <Box paddingRight="24px" box-sizing="border-box">
                <Text
                  flex="1"
                  fontSize="28px"
                  fontWeight="700"
                  lineHeight="32px"
                  overflow="hidden"
                  padding="0 2px 4px 0"
                  width="100%"
                  text-overflow="ellipsis"
                >
                  Cryptocurrency News & Discussion
                </Text>
                <Text fontSize="14px" fontWeight="500" lineHeight="18px" color={subPlebbitSubTitle}>
                  p/CryptoCurrency
                </Text>
              </Box>
              <Flex>
                <Box width="96px">
                  <Button
                    bg="transparent"
                    content="Joined"
                    padding="4px 16px"
                    minW="32px"
                    minH="32px"
                  />
                </Box>
                <Box>
                  <Button
                    content={<Icon verticalAlign="middle" width="20px" height="20px" as={FaBell} />}
                    padding="5px"
                    borderRadius="100%"
                    height="32px"
                    width="33px"
                    bg="transparent"
                  />
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Box bg="inherit">
            <Flex
              mb="2px"
              maxW="1200px"
              minW="260px"
              alignItems="center"
              color={subPlebbitSubTitle}
            >
              <Box
                borderBottom={`3px solid`}
                borderColor={subPlebbitBorder}
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Posts
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
                color={inactiveSubTitle}
              >
                Polls
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
                display="flex"
                alignItems="center"
              >
                Prediction
                <Tag
                  fontSize="10px"
                  padding="1px 4px"
                  bg="#ea0027"
                  borderRadius="full"
                  fontWeight="700"
                  color="#fff"
                  ml="4px"
                  lineHeight="12px"
                  textTransform="uppercase"
                  size="small"
                >
                  live
                </Tag>
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Wiki
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Plebbit Talk
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Our Network
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Wiki
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Official Discord
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Flex maxW="100%" padding="20px 24px" justifyContent="center" margin="0 auto">
        <Box width={postStyle === 'card' ? '640px' : '100%'} minWidth="0">
          {/* Create Post Bar */}
          <CreatePostBar />
          {/* feed sort bar */}
          <FeedSort />
          {/* feed list */}

          <Box minHeight="1000px" width="100%">
            <InfiniteScroll
              dataLength={feeds ? feeds.length : 0}
              next={loadMore}
              hasMore={hasMore}
              loader={
                <Post type="subPlebbit" loading={true} mode={postStyle} key={Math.random()} />
              }
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
                <Post type="subPlebbit" post={feed} key={feed?.cid} mode={postStyle} />
              ))}
            </InfiniteScroll>
          </Box>
        </Box>
        {/* side bar */}
        <Box
          width="312px"
          flex="0 0 312px"
          display="none"
          ml="24px"
          margin="0"
          sx={{
            '@media (min-width: 960px)': {
              display: 'block',
            },
          }}
        ></Box>
      </Flex>
    </Box>
  );
};

export default SubPlebbit;
