import { Flex, Box, Icon, useColorModeValue, useColorMode } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BsChat, BsBoxArrowUpRight } from 'react-icons/bs';
import SideBar from './sideBar';
import Post from '../../components/Post';
import { useAuthor, useAuthorAvatar, useAuthorComments } from '@plebbit/plebbit-react-hooks';
import InfiniteScroll from '../../components/InfiniteScroll';
import FeedSort from '../../components/Post/FeedSort';
import { ProfileContext } from '../../store/profileContext';
import getUserName from '../../utils/getUserName';
import numFormatter from '../../utils/numberFormater';
import Layout from '../../components/layout';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';

const Author = () => {
  const location = useLocation();
  const params = useParams();
  const { device } = useContext(ProfileContext);
  const currentView = location.pathname.split('/').at(-1);
  const bg = useColorModeValue('white', 'darkNavBg');
  const mobileBg = useColorModeValue('white', 'black');
  const mobileBorder = useColorModeValue('lightMobileIcon', 'darkMobileIcon');
  const mobileLink = useColorModeValue('lightLink', 'darkLink');
  const { colorMode } = useColorMode();
  const author = useAuthor({ commentCid: params?.commentCid, authorAddress: params?.authorAddress })
  const { imageUrl } = useAuthorAvatar({ author: author?.author })
  const { authorComments, hasMore, loadMore } = useAuthorComments({
    commentCid: params?.commentCid, authorAddress: params?.authorAddress, filter: {
      hasParentCid: currentView === 'comments' ? true : undefined
    }
  })

  const navOptions = [
    { label: 'overview', link: 'overview', optional: params?.commentCid },
    { label: 'posts', link: 'posts', },
    { label: 'comments', link: 'comments', },
    { label: 'awards received', link: 'gilded', },

  ];


  const feeds = authorComments;
  const fullNav = !(currentView === 'overview' || currentView === params?.commentCid)
  const address = `/u/${params?.authorAddress}/c/${params?.commentCid}`

  return (
    <Layout name={ { label: getUserName(author?.author) || 'Profile', value: location?.pathname } }>
      <>
        { device !== 'mobile' ? (
          <Flex flexDir="column">
            <Flex alignItems="center" bg={ bg } width="100%">
              <Flex width={ fullNav ? '100%' : '70%' }
                marginX="auto"
                justifyContent="space-between" paddingX="15px">

                <Flex
                  alignItems="center"
                  height="39px"
                  textTransform="uppercase"
                  width="calc(100% - 312px)"
                >
                  {
                    navOptions?.map((option) =>
                      <Box
                        fontSize="14px"
                        fontWeight="500"
                        lineHeight="18px"
                        cursor="pointer"
                        margin="0 5px"
                        padding="8px"
                        height="100%"
                        color={ (currentView === option?.link || currentView === option?.optional) && '#0079d3' }
                        borderBottom={ (currentView === option?.link || currentView === option?.optional) && '2px solid #0079d3' }
                        mb="-3px"
                        textTransform="uppercase"
                        _hover={ {
                          textDecoration: "none",

                        } }
                        key={ option?.label }

                        to={ `${address}/${option?.link}` }
                        as={ Link }
                      >
                        { option?.label }
                      </Box>
                    )
                  }

                </Flex>
              </Flex>
            </Flex>

            <Flex
              width={ fullNav ? '100%' : '70%' }
              marginX="auto"
              justifyContent="space-between"
              padding="15px"
            >
              <Flex width="calc(100% - 312px)" flexDir="column">
                <FeedSort hideControl />

                { (currentView === 'overview' || currentView === params?.commentCid) && (
                  <Flex width="100%" flexDir="column">
                    <InfiniteScroll
                      hasMore={ hasMore }
                      loadMore={ loadMore }
                      feeds={ feeds }
                      loader={ <Post loading={ true } mode="card" key={ Math.random() } /> }
                      content={ (index, feed) => <Post post={ feed } index={ index } key={ feed?.cid || index } mode="card" /> }
                    />
                  </Flex>
                ) }
                { currentView === 'comments' && (
                  <Flex width="100%" flexDir="column">
                    {/* nested comment */ }
                    <Flex
                      cursor="pointer"
                      borderRadius="5px"
                      border="none"
                      mb="10px"
                      bg={ bg }
                      width="100%"
                      flexDir="column"
                    >
                      <Flex
                        borderTopLeftRadius="4px"
                        borderTopRightRadius="4px"
                        borderTopWidth="1px"
                        alignItems="center"
                        padding="8px"
                        flex="1 1 auto"
                        fontSize="12px"
                        fontWeight="400"
                        lineHeight="16px"
                      >
                        <Icon as={ BsChat } width={ 5 } height={ 5 } fontSize="20px" mr="8px" />
                        <Flex alignItems="center" flexWrap="wrap">
                          <Box mr="1">abydin</Box>
                          <Box mr="1">commented on</Box>
                          <Box mr="1"> Every single time </Box>

                          <Flex margin="4px 8px">
                            <Box>i.plebbit.it/75uf7h...</Box>

                            <Icon as={ BsBoxArrowUpRight } />
                          </Flex>
                          <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                            p/gaming
                          </Box>
                          <Box>Posted by u/tomfrumtarn</Box>
                        </Flex>
                      </Flex>
                      <Box width="100%" px="8px">
                        <hr
                          style={ {
                            borderTopWidth: '2px',
                          } }
                        />
                      </Box>
                      <Flex
                        borderBottomLeftRadius="4px"
                        borderBottomRightRadius="4px"
                        padding="8px 16px"
                      >
                        <Flex width="100%">
                          <Box
                            borderLeft={ `2px dashed ${colorMode === 'light' ? '#edeff1' : '#343536'
                              }` }
                            flex="0 0 1px"
                            mr="16px"
                          />
                          <Flex flexDir="column" flex="1 1 auto" marginBottom="8px">
                            <Flex flexDir="column" mb="8px">
                              <Flex
                                alignItems="center"
                                fontSize="12px"
                                fontWeight="400"
                                lineHeight="16px"
                              >
                                <Box mr="1">esteban</Box>
                                <Box mr="1">13 points</Box> <Box mr="1">4 days ago</Box>
                              </Flex>
                              <Box>right ?</Box>
                            </Flex>
                            <Flex width="100%">
                              <Box
                                borderLeft={ `2px dashed ${colorMode === 'light' ? '#edeff1' : '#343536'
                                  }` }
                                flex="0 0 1px"
                                mr="16px"
                              />
                              <Flex
                                flexDir="column"
                                mb="8px"
                                padding="4px 8px"
                                bg="rgba(0,121,211,0.05)"
                                width="100%"
                              >
                                <Flex
                                  alignItems="center"
                                  fontSize="12px"
                                  fontWeight="400"
                                  lineHeight="16px"
                                >
                                  <Box mr="1">Abydin</Box>
                                  <Box mr="1">1 point</Box> <Box mr="1">3 days ago</Box>
                                </Flex>
                                <Flex flexDir="column">
                                  <Box
                                    fontSize="14px"
                                    fontWeight="400"
                                    lineHeight="21px"
                                    wordBreak="break-word"
                                  >
                                    Hello there
                                  </Box>
                                  <Flex
                                    alignItems="center"
                                    fontSize="12px"
                                    fontWeight="700"
                                    lineHeight="16px"
                                    color="#878a8c"
                                  >
                                    <Box cursor="pointer" transition="color .1s">
                                      Reply
                                    </Box>
                                    <Box padding="4px 8px" cursor="pointer" transition="color .1s">
                                      Share
                                    </Box>
                                    <Box
                                      padding="4px 8px"
                                      alignSelf="flex-start"
                                      cursor="pointer"
                                      transition="color .1s"
                                    >
                                      ...
                                    </Box>
                                  </Flex>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                    {/* direct comment */ }

                    <Flex
                      cursor="pointer"
                      borderRadius="5px"
                      border="none"
                      mb="10px"
                      bg={ bg }
                      width="100%"
                      flexDir="column"
                    >
                      <Flex
                        borderTopLeftRadius="4px"
                        borderTopRightRadius="4px"
                        borderTopWidth="1px"
                        alignItems="center"
                        padding="8px"
                        flex="1 1 auto"
                        fontSize="12px"
                        fontWeight="400"
                        lineHeight="16px"
                      >
                        <Icon as={ BsChat } width={ 5 } height={ 5 } fontSize="20px" mr="8px" />
                        <Flex alignItems="center" flexWrap="wrap">
                          <Box mr="1">abydin</Box>
                          <Box mr="1">commented on</Box>
                          <Box mr="1"> Every single time </Box>

                          <Flex margin="4px 8px">
                            <Box>i.plebbit.it/75uf7h...</Box>

                            <Icon as={ BsBoxArrowUpRight } />
                          </Flex>
                          <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                            p/gaming
                          </Box>
                          <Box>Posted by u/tomfrumtarn</Box>
                        </Flex>
                      </Flex>
                      <Box width="100%" px="8px">
                        <hr
                          style={ {
                            borderTopWidth: '2px',
                          } }
                        />
                      </Box>
                      <Flex
                        borderBottomLeftRadius="4px"
                        borderBottomRightRadius="4px"
                        padding="8px 16px"
                      >
                        <Flex width="100%">
                          <Box
                            borderLeft={ `2px dashed ${colorMode === 'light' ? '#edeff1' : '#343536'
                              }` }
                            flex="0 0 1px"
                            mr="16px"
                          />
                          <Flex
                            flexDir="column"
                            mb="8px"
                            padding="4px 8px"
                            bg="rgba(0,121,211,0.05)"
                            width="100%"
                          >
                            <Flex
                              alignItems="center"
                              fontSize="12px"
                              fontWeight="400"
                              lineHeight="16px"
                            >
                              <Box mr="1">Abydin</Box>
                              <Box mr="1">1 point</Box> <Box mr="1">3 days ago</Box>
                            </Flex>
                            <Flex flexDir="column">
                              <Box
                                fontSize="14px"
                                fontWeight="400"
                                lineHeight="21px"
                                wordBreak="break-word"
                              >
                                Hello there
                              </Box>
                              <Flex
                                alignItems="center"
                                fontSize="12px"
                                fontWeight="700"
                                lineHeight="16px"
                                color="#878a8c"
                              >
                                <Box cursor="pointer" transition="color .1s">
                                  Reply
                                </Box>
                                <Box padding="4px 8px" cursor="pointer" transition="color .1s">
                                  Share
                                </Box>
                                <Box
                                  padding="4px 8px"
                                  alignSelf="flex-start"
                                  cursor="pointer"
                                  transition="color .1s"
                                >
                                  ...
                                </Box>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>


                  </Flex>
                ) }
                { currentView === 'post' && (
                  <Flex width="100%" flexDir="column">
                    <InfiniteScroll
                      feeds={ feeds }
                      hasMore={ hasMore }
                      loadMore={ loadMore }
                      loader={ <Post loading={ true } mode="classic" key={ Math.random() } /> }
                      content={ (index, feed) => <Post index={ index } post={ feed } key={ feed?.cid || index } mode="classic" /> }
                    />
                  </Flex>
                ) }

                { currentView === 'awardRecieved' && (
                  <Flex width="100%" flexDir="column">
                    {/* <Post hideContent />

                    <Post hideContent />
                    <Post hideContent />

                    <Post hideContent />

                    <Post hideContent />
                    <Post hideContent />

                    <Post hideContent />
                    <Post hideContent />

                    <Post hideContent />

                    <Post hideContent /> */}
                  </Flex>
                ) }
              </Flex>

              <SideBar mt="0px" profile={ author } avatar={ imageUrl } />
            </Flex>
          </Flex>
        ) : (
          <Box>
            <Box>
              <Box
                bg={ mobileBg }
                borderBottomWidth="1px"
                borderBottomColor={ mobileBorder }
                borderBottomStyle="solid"
              >
                <Box>
                  <Box padding="8px" textAlign="center">
                    <Avatar
                      avatar={ imageUrl }
                      height={ 64 }
                      width={ 64 }
                      sx={ {
                        margin: 'auto',
                      } }
                    />

                    <Box
                      fontSize="24px"
                      paddingLeft="8px"
                      paddingRight="8px"
                      verticalAlign="middle"
                      margin="0"
                    >
                      { getUserName(author?.author) }
                    </Box>
                    <Flex
                      justifyContent="center"
                      textAlign="center"
                      paddingTop="4px"
                      paddingLeft="8px"
                      paddingRight="8px"
                      fontWeight="lighter"
                      verticalAlign="middle"
                      alignItems="center"
                    >
                      <Box>
                        <strong>{ numFormatter(author?.author?.karma?.score) || 0 }</strong> karma
                      </Box>
                    </Flex>

                  </Box>
                  <Box position="relative">
                    <Flex
                      style={ {
                        overflowX: 'scroll',
                        whiteSpace: 'nowrap',
                      } }
                      justifyContent="space-between"
                    >
                      { navOptions?.map((option) => (
                        <Link
                          _hover={ {
                            textDecoration: "none",

                          } }
                          to={ `${address}/${option?.link}` } >
                          <Box
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="17px"
                            padding="9px 8px"
                            color={ (currentView === option?.link || currentView === option?.optional) ? mobileLink : '#6a6d6f' }
                            borderBottomWidth={ (currentView === option?.link || currentView === option?.optional) ? '1px' : '0' }
                            borderBottomColor={ (currentView === option?.link || currentView === option?.optional) && mobileLink }
                            borderBottomStyle="solid"
                            key={ option?.label }

                          >
                            { option?.label }
                          </Box>
                        </Link>
                      )) }
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
            <FeedSort hideControl />
            <Flex flexDir="column">
              <InfiniteScroll
                feeds={ feeds }
                hasMore={ hasMore }
                loadMore={ loadMore }
                loader={ <Post loading={ true } mode="card" key={ Math.random() } /> }
                content={ (index, feed) => <Post index={ index } post={ feed } key={ feed?.cid || index } mode="card" /> }
              />
            </Flex>
          </Box>
        ) }
      </>
    </Layout>
  );
};

export default Author;
