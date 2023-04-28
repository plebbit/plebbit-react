import { Flex, Box, Icon, useColorModeValue, useColorMode } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BsChat, BsBoxArrowUpRight } from 'react-icons/bs';
import SideBar from './sideBar';
import Post from '../../components/Post';
import { useAccountComments } from '@plebbit/plebbit-react-hooks';
import InfiniteScroll from '../../components/InfiniteScroll';
import FeedSort from '../../components/Post/FeedSort';
import { ProfileContext } from '../../store/profileContext';
import getUserName from '../../utils/getUserName';
import numFormatter from '../../utils/numberFormater';
import { MdEdit } from 'react-icons/md';
import Layout from '../../components/layout';
import Avatar from '../../components/Avatar';

const Profile = () => {
  const { profile, device, authorAvatarImageUrl } = useContext(ProfileContext);
  const [currentView, setCurrentView] = useState('overview');
  const bg = useColorModeValue('white', 'darkNavBg');
  const mobileBg = useColorModeValue('white', 'black');
  const mobileBorder = useColorModeValue('lightMobileIcon', 'darkMobileIcon');
  const mobileLink = useColorModeValue('lightLink', 'darkLink');
  const { colorMode } = useColorMode();
  const [selectedNav, setSelectedNav] = useState('Overview');
  const { accountComments: myPost } = useAccountComments({
    filter: {
      hasParentCid: selectedNav !== "Comments"
    }
  });

  const navOptions = ['Overview', 'Posts', 'Comments', 'Moderation', 'Saved', 'Hidden'];
  const history = useHistory();
  const location = useLocation();
  const feeds = myPost ? [...myPost].reverse() : [];


  return (
    <Layout name={ { label: profile?.author?.title || 'Profile', value: location?.pathname } }>
      <>
        { device !== 'mobile' ? (
          <Flex flexDir="column">
            <Flex alignItems="center" justifyContent="center" bg={ bg }>
              <Flex
                alignItems="center"
                justifyContent="center"
                height="39px"
                textTransform="uppercase"
              >
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    cursor="default"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'overview' && '#0079d3' }
                    onClick={ () => setCurrentView('overview') }
                    borderBottom={ currentView === 'overview' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Overview
                  </Box>
                </Link>
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    cursor="default"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'post' && '#0079d3' }
                    onClick={ () => setCurrentView('post') }
                    borderBottom={ currentView === 'post' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Post
                  </Box>
                </Link>
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    cursor="default"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'comments' && '#0079d3' }
                    onClick={ () => setCurrentView('comments') }
                    borderBottom={ currentView === 'comments' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Comments
                  </Box>
                </Link>
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    cursor="not-allowed"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'saved' && '#0079d3' }
                    // onClick={() => setCurrentView('saved')}
                    borderBottom={ currentView === 'saved' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Saved
                  </Box>
                </Link>
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    cursor="not-allowed"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'hidden' && '#0079d3' }
                    // onClick={() => setCurrentView('hidden')}
                    borderBottom={ currentView === 'hidden' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Hidden
                  </Box>
                </Link>
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    cursor="not-allowed"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'upvoted' && '#0079d3' }
                    // onClick={() => setCurrentView('upvoted')}
                    borderBottom={ currentView === 'upvoted' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Upvoted
                  </Box>
                </Link>
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    cursor="not-allowed"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'downvoted' && '#0079d3' }
                    // onClick={() => setCurrentView('downvoted')}
                    borderBottom={ currentView === 'downvoted' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Downvoted
                  </Box>
                </Link>
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    cursor="not-allowed"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'awardRecieved' && '#0079d3' }
                    // onClick={() => setCurrentView('awardRecieved')}
                    borderBottom={ currentView === 'awardRecieved' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Award Received
                  </Box>
                </Link>
                <Link>
                  <Box
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    margin="0 5px"
                    padding="8px"
                    height="100%"
                    color={ currentView === 'awardGiven' && '#0079d3' }
                    // onClick={() => setCurrentView('awardGiven')}
                    cursor="not-allowed"
                    borderBottom={ currentView === 'awardGiven' && '2px solid #0079d3' }
                    mb="-3px"
                  >
                    Award Given
                  </Box>
                </Link>
              </Flex>
            </Flex>

            <Flex
              width={ currentView !== 'overview' ? '100%' : '70%' }
              marginX="auto"
              justifyContent="space-between"
              padding="15px"
            >
              <Flex width="calc(100% - 312px)" flexDir="column">
                <FeedSort hideControl />

                { currentView === 'overview' && (
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
                { currentView === 'post' && (
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
                { currentView === 'awardGiven' && (
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
                    <Box color={ mobileLink } onClick={ () => history.push('/settings', []) }>
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
                      { navOptions?.map((op) => (
                        <Box
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          fontSize="14px"
                          fontWeight="600"
                          lineHeight="17px"
                          padding="9px 8px"
                          color={ selectedNav === op ? mobileLink : '#6a6d6f' }
                          borderBottomWidth={ selectedNav === op ? '1px' : '0' }
                          borderBottomColor={ selectedNav === op && mobileLink }
                          borderBottomStyle="solid"
                          key={ op }
                          onClick={ () => setSelectedNav(op) }
                        >
                          { op }
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
