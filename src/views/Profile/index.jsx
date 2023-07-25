import { Flex, Box, Icon, useColorModeValue, useColorMode } from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { BsChat, BsBoxArrowUpRight } from 'react-icons/bs';
import SideBar from './sideBar';
import Post from '../../components/Post';
import { useAccount, useAccountComments, useAuthorAvatar, useComments } from '@plebbit/plebbit-react-hooks';
import InfiniteScroll from '../../components/InfiniteScroll';
import FeedSort from '../../components/Post/FeedSort';
import getUserName from '../../utils/getUserName';
import numFormatter from '../../utils/numberFormater';
import { MdEdit } from 'react-icons/md';
import Layout from '../../components/layout';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';

import useStore from '../../store/useStore';
const Profile = () => {
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { device } = useStore(state => state)
  const bg = useColorModeValue('white', 'darkNavBg');
  const mobileBg = useColorModeValue('white', 'black');
  const mobileBorder = useColorModeValue('lightMobileIcon', 'darkMobileIcon');
  const mobileLink = useColorModeValue('lightLink', 'darkLink');
  const { colorMode } = useColorMode();
  const location = useLocation();
  const currentView = location.pathname.split('/').at(-2);
  const { accountComments: myPost } = useAccountComments({
    filter: {
      hasParentCid: currentView === 'comments' ? true : undefined
    },
  }
  );
  const blockedCids = useMemo(() => Object.keys(profile?.blockedCids || {}) || [], [profile?.blockedCids]);
  const { comments: blockedFeeds, } = useComments(
    {
      commentCids: blockedCids,

    }
  );
  const navOptions = [
    { label: 'overview', link: 'overview', optional: 'profile' },
    { label: 'posts', link: 'posts', },
    { label: 'comments', link: 'comments', },
    { label: 'history', link: 'history', },
    { label: 'saved', link: 'saved', },
    { label: 'hidden', link: 'hidden', },
    { label: 'upvoted', link: 'upvoted', },
    { label: 'downvoted', link: 'downvoted', },
    { label: 'awards received', link: 'gilded', },
    { label: 'awards given', link: 'gilded/given', },

  ];
  const feeds = myPost ? [...myPost].reverse() : [];
  const fullNav = !(currentView === 'overview' || currentView === 'profile')


  return (
    <Layout name={ { label: getUserName(profile?.author) || 'Profile', value: location?.pathname } }>
      <>
        { device !== 'mobile' ? (
          <Flex flexDir="column">
            <Flex alignItems="center" bg={ bg } width="100%">
              <Flex width={ fullNav ? '100%' : '70%' }
                marginX="auto"
                justifyContent="space-between" paddingX="15px" maxWidth={ !fullNav && "984px" }>

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
                        key={ option?.label }
                        _hover={ {
                          textDecoration: "none",

                        } }
                        to={ `/profile/${option?.link}/` }
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
              maxWidth={ !fullNav && "984px" }
            >
              <Flex width="calc(100% - 312px)" flexDir="column" >
                <FeedSort hideControl />

                { (currentView === 'overview' || currentView === 'profile') && (
                  <Flex width="100%" flexDir="column">
                    <InfiniteScroll
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
                { currentView === 'posts' && (
                  <Flex width="100%" flexDir="column">
                    <InfiniteScroll
                      feeds={ feeds }
                      loader={ <Post loading={ true } mode="classic" key={ Math.random() } /> }
                      content={ (index, feed) => <Post index={ index } post={ feed } key={ feed?.cid || index } mode="classic" /> }
                    />
                  </Flex>
                ) }
                { currentView === 'saved' && (
                  <Flex width="100%" flexDir="column">
                    {/* <Post mode />

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
                { currentView === 'upvoted' && <Flex width="100%" flexDir="column"></Flex> }
                { currentView === 'downvoted' && (
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
                { currentView === 'hidden' && (
                  <Flex width="100%" flexDir="column">
                    <Flex width="100%" flexDir="column">
                      <InfiniteScroll
                        feeds={ blockedFeeds }
                        loader={ <Post loading={ true } mode="classic" key={ Math.random() } /> }
                        content={ (index, feed) => <Post index={ index } post={ feed } key={ feed?.cid || index } mode="classic" /> }
                        disableBlocked
                      />
                    </Flex>
                  </Flex>
                ) }
                { currentView === 'awards given' && (
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
                { currentView === 'awards recieved' && (
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

              <SideBar mt="0px" profile={ profile } avatar={ authorAvatarImageUrl } />
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
                      avatar={ authorAvatarImageUrl }
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
                      { getUserName(profile?.author) }
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
                        <strong>{ numFormatter(profile?.karma?.score) }</strong> karma
                      </Box>
                    </Flex>
                    <Box as={ Link } to='/settings/' color={ mobileLink } >
                      Edit profile <Icon marginLeft="4px" as={ MdEdit } verticalAlign="middle" />
                    </Box>
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
                          _hover={ {
                            textDecoration: "none",

                          } }
                          to={ `/profile/${option?.link}/` }
                          as={ Link }

                        >
                          { option?.label }
                        </Box>

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

export default Profile;
