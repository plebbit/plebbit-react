import { Flex, Box, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiStarburst } from 'react-icons/ti';
import { RiFireLine } from 'react-icons/ri';
import { BsBoxArrowUp, BsChat, BsBoxArrowUpRight } from 'react-icons/bs';
import Posts from '../Home/Post';
import SideBar from './sideBar';

const Profile = () => {
  const [currentView, setCurrentView] = useState('overview');

  return (
    <Flex flexDir="column">
      <Flex alignItems="center" justifyContent="center" bg="#fff">
        <Flex alignItems="center" justifyContent="center" height="39px" textTransform="uppercase">
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lineHeight="18px"
              cursor="default"
              margin="0 5px"
              padding="8px"
              height="100%"
              color={currentView === 'overview' && '#0079d3'}
              onClick={() => setCurrentView('overview')}
              borderBottom={currentView === 'overview' && '2px solid #0079d3'}
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
              color={currentView === 'posts' && '#0079d3'}
              onClick={() => setCurrentView('posts')}
              borderBottom={currentView === 'posts' && '2px solid #0079d3'}
              mb="-3px"
            >
              Posts
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
              color={currentView === 'comments' && '#0079d3'}
              onClick={() => setCurrentView('comments')}
              borderBottom={currentView === 'comments' && '2px solid #0079d3'}
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
              cursor="default"
              margin="0 5px"
              padding="8px"
              height="100%"
              color={currentView === 'saved' && '#0079d3'}
              onClick={() => setCurrentView('saved')}
              borderBottom={currentView === 'saved' && '2px solid #0079d3'}
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
              cursor="default"
              margin="0 5px"
              padding="8px"
              height="100%"
              color={currentView === 'hidden' && '#0079d3'}
              onClick={() => setCurrentView('hidden')}
              borderBottom={currentView === 'hidden' && '2px solid #0079d3'}
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
              cursor="default"
              margin="0 5px"
              padding="8px"
              height="100%"
              color={currentView === 'upvoted' && '#0079d3'}
              onClick={() => setCurrentView('upvoted')}
              borderBottom={currentView === 'upvoted' && '2px solid #0079d3'}
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
              cursor="default"
              margin="0 5px"
              padding="8px"
              height="100%"
              color={currentView === 'downvoted' && '#0079d3'}
              onClick={() => setCurrentView('downvoted')}
              borderBottom={currentView === 'downvoted' && '2px solid #0079d3'}
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
              cursor="default"
              margin="0 5px"
              padding="8px"
              height="100%"
              color={currentView === 'awardRecieved' && '#0079d3'}
              onClick={() => setCurrentView('awardRecieved')}
              borderBottom={currentView === 'awardRecieved' && '2px solid #0079d3'}
              mb="-3px"
            >
              Award Recieved
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
              color={currentView === 'awardGiven' && '#0079d3'}
              onClick={() => setCurrentView('awardGiven')}
              borderBottom={currentView === 'awardGiven' && '2px solid #0079d3'}
              mb="-3px"
            >
              Award Given
            </Box>
          </Link>
        </Flex>
      </Flex>

      <Flex
        width={currentView !== 'overview' ? '100%' : '70%'}
        marginX="auto"
        justifyContent="space-between"
        padding="15px"
      >
        <Flex width="calc(100% - 312px)" flexDir="column">
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="flex-start"
            bg="#fff"
            padding="5px 12px"
            marginBottom="16px"
            borderRadius="4px"
            flexFlow="nowrap"
          >
            <Link>
              <Flex
                alignItems="center"
                borderRadius="20px"
                padding="6px 8px"
                mr="8px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="17px"
              >
                <Icon as={TiStarburst} padding="0 8px 0 0" height={8} width={8} fontWeight="400" />
                <Box>New</Box>
              </Flex>
            </Link>
            <Link>
              <Flex
                alignItems="center"
                borderRadius="20px"
                padding="6px 8px"
                mr="8px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="17px"
              >
                <Icon as={RiFireLine} padding="0 8px 0 0" height={8} width={8} fontWeight="400" />
                <Box>Hot</Box>
              </Flex>
            </Link>
            <Link>
              <Flex
                alignItems="center"
                borderRadius="20px"
                padding="6px 8px"
                mr="8px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="17px"
              >
                <Icon as={BsBoxArrowUp} padding="0 8px 0 0" height={8} width={8} fontWeight="400" />
                <Box>Top</Box>
              </Flex>
            </Link>
          </Flex>

          {currentView === 'overview' && (
            <Flex width="100%" flexDir="column">
              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex flexDir="column" flex="1 1 auto" marginBottom="8px">
                      <Flex flexDir="column" mb="8px">
                        <Flex
                          alignItems="center"
                          fontSize="12px"
                          lineWeight="400"
                          lineHeight="16px"
                        >
                          <Box mr="1">esteban</Box>
                          <Box mr="1">13 points</Box> <Box mr="1">4 days ago</Box>
                        </Flex>
                        <Box>right ?</Box>
                      </Flex>
                      <Flex width="100%">
                        <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
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
                            lineWeight="400"
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
              <Posts />

              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Posts />
              <Posts />

              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Posts />

              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Posts />
            </Flex>
          )}
          {currentView === 'comments' && (
            <Flex width="100%" flexDir="column">
              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex flexDir="column" flex="1 1 auto" marginBottom="8px">
                      <Flex flexDir="column" mb="8px">
                        <Flex
                          alignItems="center"
                          fontSize="12px"
                          lineWeight="400"
                          lineHeight="16px"
                        >
                          <Box mr="1">esteban</Box>
                          <Box mr="1">13 points</Box> <Box mr="1">4 days ago</Box>
                        </Flex>
                        <Box>right ?</Box>
                      </Flex>
                      <Flex width="100%">
                        <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
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
                            lineWeight="400"
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

              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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

              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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

              <Flex
                cursor="pointer"
                borderRadius="5px"
                border="none"
                mb="10px"
                bg="#fff"
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
                  liineHeight="16px"
                >
                  <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
                  <Flex alignItems="center" flexWrap="wrap">
                    <Box mr="1">abydin</Box>
                    <Box mr="1">commented on</Box>
                    <Box mr="1"> Every single time </Box>

                    <Flex margin="4px 8px">
                      <Box>i.plebbit.it/75uf7h...</Box>

                      <Icon as={BsBoxArrowUpRight} />
                    </Flex>
                    <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
                      p/gaming
                    </Box>
                    <Box>Posted by u/tomfrumtarn</Box>
                  </Flex>
                </Flex>
                <Box width="100%" px="8px">
                  <hr
                    style={{
                      borderTopWidth: '2px',
                    }}
                  />
                </Box>
                <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
                  <Flex width="100%">
                    <Box borderLeft="2px dashed #edeff1 " flex="0 0 1px" mr="16px" />
                    <Flex
                      flexDir="column"
                      mb="8px"
                      padding="4px 8px"
                      bg="rgba(0,121,211,0.05)"
                      width="100%"
                    >
                      <Flex alignItems="center" fontSize="12px" lineWeight="400" lineHeight="16px">
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
          )}
          {currentView === 'posts' && (
            <Flex width="100%" flexDir="column">
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
            </Flex>
          )}
          {currentView === 'saved' && (
            <Flex width="100%" flexDir="column">
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
            </Flex>
          )}
          {currentView === 'upvoted' && (
            <Flex width="100%" flexDir="column">
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
            </Flex>
          )}
          {currentView === 'downvoted' && (
            <Flex width="100%" flexDir="column">
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
            </Flex>
          )}
          {currentView === 'hidden' && (
            <Flex width="100%" flexDir="column">
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
            </Flex>
          )}
          {currentView === 'awardGiven' && (
            <Flex width="100%" flexDir="column">
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
            </Flex>
          )}
          {currentView === 'awardRecieved' && (
            <Flex width="100%" flexDir="column">
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />
              <Posts hideContent />

              <Posts hideContent />

              <Posts hideContent />
            </Flex>
          )}
        </Flex>

        <SideBar mt="0px" />
      </Flex>
    </Flex>
  );
};

export default Profile;
