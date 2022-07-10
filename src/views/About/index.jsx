import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BiAddToQueue, BiBarChartAlt, BiLinkExternal, BiUser } from 'react-icons/bi';
import {
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlineRight,
  AiOutlineSetting,
  AiOutlineTag,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { TiDocumentText } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { BsChatDots, BsFillShieldFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import PlebbitLogo from '../../assets/images/plebbit-logo.png';
import { HiPencil } from 'react-icons/hi';
import LeaveMod from './modal/leaveMod';
import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import truncateString from '../../utils/truncateString';
import ModRole from './modal/modRole';

const About = ({ match }) => {
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const subPlebbit = useSubplebbit(match?.params?.subplebbitAddress);
  const page = match?.path.split('/').at(-1);
  const { isOpen: leaveModShow, onOpen: openLeaveMod, onClose: closeLeaveMod } = useDisclosure();
  const { isOpen: roleModShow, onOpen: openRoleMod, onClose: closeRoleMod } = useDisclosure();

  return (
    <Flex bg={layoutBg} flexDir="column" color={mainColor} minH="100vh" overflowX="auto">
      <Flex
        fontSize="12px"
        fontWeight="700"
        letterSpacing="0.5px"
        textTransform="uppercase"
        lineHeight="24px"
        alignItems="center"
        bg={mainBg}
        height="40px"
        paddingLeft="24px"
        position="fixed"
        width="100%"
        zIndex="30"
      >
        <Image
          fallbackSrc={require('../../assets/images/fallback.png')}
          src=""
          width="20px"
          height="20px"
          mr="8px"
          borderRadius="999px"
        />
        <Link>
          <Flex alignItems="center" color={linkColor} mr="4px">
            P/Bydino {'  '}
            <Box color={mainColor}>
              /{' '}
              {page === 'modqueue'
                ? 'mod queue'
                : page === 'scheduledposts'
                ? 'Scheduled posts'
                : page === 'eventposts'
                ? 'event posts'
                : page.toUpperCase()}{' '}
            </Box>
          </Flex>
        </Link>
      </Flex>
      <Flex margin="40px 0">
        {/* sideBar */}
        <Box
          bg={inputBg}
          bottom="0"
          boxSizing="border-box"
          color={mainColor}
          overflow="auto"
          paddingTop="16px"
          paddingBottom="32px"
          position="fixed"
          top="88px"
          width="280px"
          zIndex="30"
        >
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={BiAddToQueue} mr="8px" width="20px" height="20px" />
              <Box>Queues</Box>
            </Flex>
            <Link to="modqueue">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'modqueue' && `4px solid #1a1a1b `}
                bg={page === 'modqueue' && border1}
              >
                Mod Queue
              </Flex>
            </Link>

            <Link to="reports">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'reports' && `4px solid #1a1a1b `}
                bg={page === 'reports' && border1}
              >
                Reports
              </Flex>
            </Link>
            <Link to="spam">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'spam' && `4px solid #1a1a1b `}
                bg={page === 'spam' && border1}
              >
                Spam
              </Flex>
            </Link>
            <Link to="edited">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'edited' && `4px solid #1a1a1b `}
                bg={page === 'edited' && border1}
              >
                Edited
              </Flex>
            </Link>
            <Link to="ummoderated">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'ummoderated' && `4px solid #1a1a1b `}
                bg={page === 'ummoderated' && border1}
              >
                Unmoderated
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={BiUser} mr="8px" width="20px" height="20px" />
              <Box>User Management</Box>
            </Flex>
            <Link to="banned">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'banned' && `4px solid #1a1a1b `}
                bg={page === 'banned' && border1}
              >
                Banned
              </Flex>
            </Link>

            <Link to="muted">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'muted' && `4px solid #1a1a1b `}
                bg={page === 'muted' && border1}
              >
                Muted
              </Flex>
            </Link>
            <Link to="approved">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'approved' && `4px solid #1a1a1b `}
                bg={page === 'approved' && border1}
              >
                Approved
              </Flex>
            </Link>
            <Link to="moderators">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'moderators' && `4px solid #1a1a1b `}
                bg={page === 'moderators' && border1}
              >
                Moderators
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={AiOutlineTag} mr="8px" width="20px" height="20px" />
              <Box>Flairs & emojis</Box>
            </Flex>
            <Link to="flair">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'flair' && `4px solid #1a1a1b `}
                bg={page === 'flair' && border1}
              >
                Grant User Flair
              </Flex>
            </Link>

            <Link to="emojis">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'emojis' && `4px solid #1a1a1b `}
                bg={page === 'emojis' && border1}
              >
                Emojis
              </Flex>
            </Link>
            <Link to="userflair">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'userflair' && `4px solid #1a1a1b `}
                bg={page === 'userflair' && border1}
              >
                User Flair
              </Flex>
            </Link>
            <Link to="postflair">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'postflair' && `4px solid #1a1a1b `}
                bg={page === 'postflair' && border1}
              >
                Post Flair
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={TiDocumentText} mr="8px" width="20px" height="20px" />
              <Box>Rules & Regulations</Box>
            </Flex>
            <Link to="rules">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'rules' && `4px solid #1a1a1b `}
                bg={page === 'rules' && border1}
              >
                Rules
              </Flex>
            </Link>

            <Link to="removal">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'removal' && `4px solid #1a1a1b `}
                bg={page === 'removal' && border1}
              >
                Removal Reasons
              </Flex>
            </Link>
            <Link to="settings">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'settings' && `4px solid #1a1a1b `}
                bg={page === 'settings' && border1}
              >
                Content Controls
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Auto Mods
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={AiOutlineUnorderedList} mr="8px" width="20px" height="20px" />
              <Box>Content</Box>
            </Flex>
            <Link to="scheduledposts">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'scheduledposts' && `4px solid #1a1a1b `}
                bg={page === 'scheduledposts' && border1}
              >
                Scheduled Post
              </Flex>
            </Link>

            <Link to="eventposts">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'eventposts' && `4px solid #1a1a1b `}
                bg={page === 'eventposts' && border1}
              >
                Event Posts
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={AiOutlineSetting} mr="8px" width="20px" height="20px" />
              <Box>Other</Box>
            </Flex>
            <Link to="awards">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'awards' && `4px solid #1a1a1b `}
                bg={page === 'awards' && border1}
              >
                Awards
              </Flex>
            </Link>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Wiki Pages
              </Flex>
            </Link>
            <Link to="edit?page=community">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                <Box>Community Settings</Box>
                <Icon as={AiOutlineRight} ml="auto" color={iconColor} />
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                <Box>Community Appearance</Box>
                <Icon as={AiOutlineRight} ml="auto" color={iconColor} />
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={AiOutlineMail} mr="8px" width="20px" height="20px" />
              <Box>MODMAIL</Box>
            </Flex>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                <Box>Modmail</Box>
                <Icon as={BiLinkExternal} ml="auto" color={iconColor} />
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={BsChatDots} mr="8px" width="20px" height="20px" />
              <Box>Chat</Box>
            </Flex>

            <Link to="chat">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'chat' && `4px solid #1a1a1b `}
                bg={page === 'chat' && border1}
              >
                Chat Settings
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={BiBarChartAlt} mr="8px" width="20px" height="20px" />
              <Box>Community Activity</Box>
            </Flex>

            <Link to="traffic">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'traffic' && `4px solid #1a1a1b `}
              >
                Traffic Stats
              </Flex>
            </Link>
            <Link to="log">
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={page === 'log' && `4px solid #1a1a1b `}
              >
                Mod Log
              </Flex>
            </Link>
          </Box>
        </Box>
        {/*Body */}
        <Box paddingLeft="280px" boxSizing="border-box" width="100%">
          {page === '' && (
            <Flex
              alignItems="center"
              bg={inputBg}
              color={mainColor}
              flexDirection="column"
              justifyContent="center"
              margin="30px"
              padding="60px"
            >
              <Icon as={BsFillShieldFill} color={iconColor} width="30px" height="30px" />
              <Box>Welcome to the mod tools for r/bydino</Box>
            </Flex>
          )}
          {page === 'moderators' && (
            <Box>
              <Flex
                alignItems="center"
                background={border1}
                height="48px"
                justifyContent="flex-end"
                left="280px"
                padding="0 24px"
                position="fixed"
                right="0"
                zIndex="3"
              >
                <Button
                  variant="outline"
                  colorScheme="blackAlpha"
                  mr="8px"
                  position="relative"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="17px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  width="auto"
                  borderRadius="999px"
                  padding="4px 16px"
                  height="32px"
                  onClick={openLeaveMod}
                >
                  Leave as mod
                </Button>
                <Button
                  colorScheme="blackAlpha"
                  position="relative"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="17px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  width="auto"
                  borderRadius="999px"
                  padding="4px 16px"
                  height="32px"
                  onClick={openRoleMod}
                >
                  Invite user as mod
                </Button>
              </Flex>
              <Box
                ml="24px"
                mr="24px"
                paddingTop="64px"
                borderRadius="0 0 4px 4px"
                overflow="hidden"
              >
                <Flex
                  fontSize="18px"
                  fontWeight="500"
                  lineHeight="22px"
                  color={mainColor}
                  marginBottom="16px"
                  alignItems="center"
                >
                  <Box>Moderators of r/bydino</Box>
                  <Icon as={AiOutlineInfoCircle} ml="4px" verticalAlign="text-top" />
                </Flex>
                <Flex
                  bg={border1}
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
                      bg={mainBg}
                      border={`1px solid ${border1}`}
                      color={mainColor}
                      borderRadius="4px 0 0 4px"
                      boxSizing="border-box"
                      height="32px"
                      padding="8px"
                      _placeholder={{
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '21px',
                      }}
                    />
                    <Button bg={iconColor} borderRadius="0 4px 4px 0" height="32px" width="40px">
                      <Icon as={FiSearch} color={mainBg} />
                    </Button>
                  </Flex>
                </Flex>
                <Box
                  border={`1px solid ${border1}`}
                  borderRadius="0 4px 4px 0"
                  boxSizing="border-box"
                  marginBottom="36px"
                  overflow="hidden"
                >
                  {subPlebbit?.moderatorAddresses?.map((user) => (
                    <Flex
                      key={user}
                      alignItems="center"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      bg={mainBg}
                      borderBottom={`1px solid ${border1}`}
                      boxSizing="border-box"
                      color={iconColor}
                      height="48px"
                      padding="8px 16px"
                      width="100%"
                    >
                      <Box
                        fontSize="14px"
                        fontWeight="500"
                        lineHeight="18px"
                        color={mainColor}
                        flex="0 0 220px"
                        minW="220px"
                      >
                        <Link>
                          <Flex flex="0 0 auto" alignItems="center">
                            <Box h="32px" width="32px" mr="6px" verticalAlign="middle">
                              <Box height="100%" position="relative">
                                <Box
                                  borderRadius="4px"
                                  width="100%"
                                  height="100%"
                                  position="relative"
                                >
                                  <Box bg={border1} width="100%" height="100%" borderRadius="50%" />
                                  <Box width="100%" position="absolute" bottom="0">
                                    <Image
                                      fallbackSrc={require('../../assets/images/fallback.png')}
                                      src={PlebbitLogo}
                                      width="100%"
                                      border={`1px solid ${border1}`}
                                      borderRadius="50%"
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            <Box>{truncateString(user, 14, '...')}</Box>
                          </Flex>
                        </Link>
                      </Box>
                      <Box
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        flex="1 0 100px"
                        lineHeight="normal"
                      >
                        4 days ago
                      </Box>
                      <Flex alignItems="center" ml="auto" minW="0">
                        <Box
                          padding="4px"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          Everything
                        </Box>
                      </Flex>
                    </Flex>
                  ))}
                </Box>
                <Box
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  color={mainColor}
                  mb="8px"
                  ml="4px"
                >
                  You can edit these moderators
                </Box>
                <Box
                  border={`1px solid ${border1}`}
                  borderRadius="0 4px 4px 0"
                  boxSizing="border-box"
                  marginBottom="36px"
                  overflow="hidden"
                >
                  {subPlebbit?.moderatorAddresses?.map((user) => (
                    <Flex
                      key={user}
                      alignItems="center"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      bg={mainBg}
                      borderBottom={`1px solid ${border1}`}
                      boxSizing="border-box"
                      color={iconColor}
                      height="48px"
                      padding="8px 16px"
                      width="100%"
                    >
                      <Box
                        fontSize="14px"
                        fontWeight="500"
                        lineHeight="18px"
                        color={mainColor}
                        flex="0 0 220px"
                        minW="220px"
                      >
                        <Link>
                          <Flex flex="0 0 auto" alignItems="center">
                            <Box h="32px" width="32px" mr="6px" verticalAlign="middle">
                              <Box height="100%" position="relative">
                                <Box
                                  borderRadius="4px"
                                  width="100%"
                                  height="100%"
                                  position="relative"
                                >
                                  <Box bg={border1} width="100%" height="100%" borderRadius="50%" />
                                  <Box width="100%" position="absolute" bottom="0">
                                    <Image
                                      fallbackSrc={require('../../assets/images/fallback.png')}
                                      src={PlebbitLogo}
                                      width="100%"
                                      border={`1px solid ${border1}`}
                                      borderRadius="50%"
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            <Box>{truncateString(user, 14, '...')}</Box>
                          </Flex>
                        </Link>
                      </Box>
                      <Box
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        flex="1 0 100px"
                        lineHeight="normal"
                      >
                        4 days ago
                      </Box>
                      <Flex alignItems="center" ml="auto" minW="0">
                        <Box
                          padding="4px"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          Everything
                        </Box>
                        <Box cursor="pointer">
                          <Icon as={HiPencil} width="16px" height="16px" />
                        </Box>
                      </Flex>
                    </Flex>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Flex>

      {leaveModShow && <LeaveMod isOpen={leaveModShow} onClose={closeLeaveMod} />}
      {roleModShow && <ModRole isOpen={roleModShow} onClose={closeRoleMod} />}
    </Flex>
  );
};

export default About;
