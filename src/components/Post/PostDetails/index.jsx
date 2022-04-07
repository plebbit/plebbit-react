import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  IconButton,
  Link,
  Image,
  Heading,
  Tag,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import PdMenu from './pdMenu';
import { BsChat, BsBookmark } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal, FiShare, FiBell } from 'react-icons/fi';
import { CgNotes } from 'react-icons/cg';
import SideBar from './postDetailSideBar';
import { dateToNow } from '../../../utils/formatDate';
import Comment from '../comment';
import Editor from '../../Editor';

function PostDetail({ post, isOpen, onClose }) {
  const postDetCover = useColorModeValue('lightBg', 'black');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const [vote] = useState(+post?.upvoteCount - +post?.downvoteCount);
  const [voteMode, setVoteMode] = useState(0);
  const subPledditTextColor = useColorModeValue('lightText2', 'darkText');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const bg = useColorModeValue('white', 'darkNavBg');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const borderColor = useColorModeValue('#ccc', '#343536');

  useEffect(() => {
    window.history.replaceState(null, post?.title, `#/p/${post?.subplebbitAddress}/c/${post?.cid}`);
    return () => {
      window.history.replaceState(null, '', '/#');
    };
  }, [isOpen]);
  return (
    <Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        closeOnEsc
        trapFocus={false}
        onEsc={() => window.history.replaceState(null, 'Plebbit', `/`)}
        returnFocusOnClose
      >
        <ModalOverlay bg="rgba(28,28,28,.9)" backdropFilter="blur(10px) hue-rotate(90deg)" />

        <ModalContent
          bg={postDetCover}
          flexDir="column"
          width="calc(100% - 240px)"
          margin="0 auto"
          paddingBottom="32px"
          marginTop="48px !important"
          sx={{
            '@media (min-width: 1280px)': {},
            '@media (max-width: 1120px)': {
              maxWidth: '100%',
              width: '100%',
            },
          }}
        >
          <Flex
            margin="0 auto"
            bg="#030303"
            h="48px"
            padding="0 8%"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            sx={{
              '@media (min-width: 1280px)': {},
              '@media (max-width: 1120px)': {
                display: 'none',
              },
            }}
          >
            <Flex alignItems="center" width="calc(100% - 312px)">
              <Flex alignItems="center" margin="0" padding="0 2px">
                <Box
                  borderRight="1px solid #a4a4a4"
                  height="16px"
                  mr="8px"
                  content=""
                  verticalAlign="text-bottom"
                  width="0"
                />
                <IconButton
                  aria-label="Upvote Post"
                  color={voteMode === 1 ? 'upvoteOrange' : iconColor}
                  w="24px"
                  h="24px"
                  bg="none"
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
                  onClick={() => {
                    setVoteMode(voteMode === 1 ? 0 : 1);
                  }}
                  icon={<Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                />
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  pointerEvents="none"
                  color="#D7DADC"
                >
                  {vote + voteMode === 0 ? 'vote' : vote + voteMode}
                </Text>
                <IconButton
                  aria-label="Downvote Post"
                  color={voteMode === -1 ? 'downvoteBlue' : iconColor}
                  w="24px"
                  h="24px"
                  minW="24px"
                  minH="24px"
                  border="none"
                  bg="none"
                  borderRadius="2px"
                  _hover={{
                    bg: iconBg,
                    color: 'downvoteBlue',
                  }}
                  _focus={{
                    outline: 'none',
                  }}
                  onClick={() => {
                    setVoteMode(voteMode === -1 ? 0 : -1);
                  }}
                  icon={<Icon as={voteMode === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />}
                />
                <Box
                  borderRight="1px solid #a4a4a4"
                  height="16px"
                  margin="0 8px"
                  verticalAlign="text-bottom"
                  content=""
                  width="0"
                />
              </Flex>
              <Icon as={CgNotes} mr="8px" color="#D7DADC" />

              <Text
                color="#D7DADC"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                minWidth="0"
                ml="2px"
                paddingRight="5px"
                sx={{
                  '@media (max-width: 768px)': {
                    display: 'none',
                  },
                }}
                isTruncated
              >
                {post?.title}
              </Text>
            </Flex>

            <Flex
              alignItems="center"
              justifyContent="flex-end"
              color="#D7DADC"
              fontSize="12px"
              lineHeight="16px"
              fontWeight="700"
              width="312px"
            >
              <CloseIcon mr="5px" onClick={onClose} cursor="pointer" />
              <Box onClick={onClose} cursor="pointer">
                Close
              </Box>
            </Flex>
          </Flex>
          <Flex
            padding="0 8%"
            sx={{
              '@media (min-width: 1280px)': {},
              '@media (max-width: 1120px)': {
                padding: '0',
              },
            }}
          >
            <Flex flexGrow="1" mt="32px" mr="12px" flexDirection="column">
              {/* Main */}
              <Flex width="100%" bg={bg} borderRadius="4px">
                {/* vote column */}
                <Flex display="flex">
                  <Flex
                    flexDir="column"
                    w="40px"
                    h="revert"
                    borderLeft="4px solid transparent"
                    borderRadius="4px"
                    bg="none"
                    alignItems="center"
                    p="8px 4px 8px 0"
                    sx={{
                      '@media (max-width: 960px)': {
                        display: 'none',
                      },
                    }}
                  >
                    <IconButton
                      aria-label="Upvote Post"
                      color={voteMode === 1 ? 'upvoteOrange' : iconColor}
                      w="24px"
                      h="24px"
                      bg="none"
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
                      onClick={() => {
                        setVoteMode(voteMode === 1 ? 0 : 1);
                      }}
                      icon={<Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                    />
                    <Text
                      fontSize="12px"
                      fontWeight="700"
                      lineHeight="16px"
                      pointerEvents="none"
                      color=""
                    >
                      {vote + voteMode === 0 ? 'vote' : vote + voteMode}
                    </Text>
                    <IconButton
                      aria-label="Downvote Post"
                      color={voteMode === -1 ? 'downvoteBlue' : iconColor}
                      w="24px"
                      h="24px"
                      minW="24px"
                      minH="24px"
                      border="none"
                      bg="none"
                      borderRadius="2px"
                      _hover={{
                        bg: iconBg,
                        color: 'downvoteBlue',
                      }}
                      _focus={{
                        outline: 'none',
                      }}
                      onClick={() => {
                        setVoteMode(voteMode === -1 ? 0 : -1);
                      }}
                      icon={<Icon as={voteMode === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />}
                    />
                  </Flex>
                </Flex>
                {/* post Details */}
                <Flex flexDir="column" paddingTop="8px" flex="1">
                  {/* post Head */}
                  <Flex
                    alignItems="start"
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    margin="0 8px 8px"
                    position="relative"
                  >
                    <Image
                      src="https://place-hold.it/100x100"
                      width="20px"
                      height="20px"
                      marginRight="4px"
                      borderRadius="100%"
                      verticalAlign="middle"
                    />
                    <Flex
                      alignItems="center"
                      flexWrap="wrap"
                      flex="1 1 auto"
                      justifyContent="space-between"
                      position="relative"
                    >
                      <Box display="inline">
                        <Box display="inline-block" flex="0 0 auto">
                          <Link
                            color={subPledditTextColor}
                            fontSize="12px"
                            fontWeight="700"
                            display="inline"
                            lineHeight="20px"
                            textDecoration="none"
                          >
                            p/gaming
                          </Link>
                        </Box>
                        <Text
                          color={separatorColor}
                          as="span"
                          verticalAlign="middle"
                          fontSize="6px"
                          lineHeight="20px"
                          margin="0 4px"
                        >
                          •
                        </Text>
                        <Text as="span" marginRight="3px">
                          Posted By
                        </Text>

                        <Link marginRight="3px">u/Abydin</Link>

                        <Link>{dateToNow(parseInt(post?.timestamp))} ago</Link>
                      </Box>
                      <Icon
                        sx={{
                          '@media (min-width: 1280px)': {},
                          '@media (max-width: 1120px)': {
                            display: 'none',
                          },
                        }}
                        as={FiBell}
                        height="16px"
                        width="16px"
                      />
                      <PdMenu />
                    </Flex>
                  </Flex>
                  {/* post Title */}
                  <Flex margin="0 8px" display="flex" alignItems="center">
                    <Heading
                      color={titleColor}
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="22px"
                      paddingRight="5px"
                      wordBreak="break-word"
                    >
                      {post?.title}
                    </Heading>

                    <Tag borderRadius="20px" p="2px 8px" mr="5px">
                      {post?.tag || 'pleb'}
                    </Tag>
                  </Flex>
                  {/* post Body */}
                  <Box marginTop="8px">
                    {post?.content ? (
                      <Box
                        color={subPledditTextColor}
                        padding="5px 8px 10px"
                        fontFamily="Noto sans, Arial, sans-serif"
                        fontSize="14px"
                        fontWeight="400"
                        lineHeight="21px"
                        wordBreak="break-word"
                        overflow="hidden"
                      >
                        {post?.content}
                      </Box>
                    ) : (
                      <Box display="flex" justifyContent="center">
                        <Image src={post?.link} />
                      </Box>
                    )}
                  </Box>
                  {/* Post Bottom Bar */}
                  <Flex
                    sx={{
                      '@media (max-width: 960px)': {
                        display: 'none',
                      },
                    }}
                    flexDirection="row"
                    alignItems="center"
                    paddingRight="10px"
                    overflowY="visible"
                    mb="2px"
                  >
                    <Flex
                      flexDirection="row"
                      alignItems="stretch"
                      flexGrow={1}
                      padding="0 8px 0 4px"
                      fontSize="12px"
                      fontWeight="700"
                      lineHeight="16px"
                      overflow="hidden"
                    >
                      <Link
                        display="flex"
                        alignItems="center"
                        borderRadius="2px"
                        padding="8px"
                        marginRight="4px"
                        _hover={{
                          textDecor: 'none',
                          outline: 'none',
                          bg: bottomButtonHover,
                        }}
                        _focus={{
                          boxShadow: 'none',
                        }}
                      >
                        <Icon as={BsChat} height={5} width={5} mr="5px" />
                        <Box>{post?.replyCount} Comments</Box>
                      </Link>
                      <Link
                        display="flex"
                        alignItems="center"
                        borderRadius="2px"
                        padding="8px"
                        marginRight="4px"
                        _hover={{
                          textDecor: 'none',
                          outline: 'none',
                          bg: bottomButtonHover,
                        }}
                        _focus={{
                          boxShadow: 'none',
                        }}
                      >
                        <Icon as={GoGift} height={5} width={5} mr="5px" />
                        <Box>Award</Box>
                      </Link>
                      <Link
                        display="flex"
                        alignItems="center"
                        borderRadius="2px"
                        padding="8px"
                        marginRight="4px"
                        _hover={{
                          textDecor: 'none',
                          outline: 'none',
                          bg: bottomButtonHover,
                        }}
                        _focus={{
                          boxShadow: 'none',
                        }}
                      >
                        <Icon as={FaShare} height={5} width={5} mr="5px" />
                        <Box>share</Box>
                      </Link>

                      <Link
                        display="flex"
                        alignItems="center"
                        borderRadius="2px"
                        padding="8px"
                        marginRight="4px"
                        _hover={{
                          textDecor: 'none',
                          outline: 'none',
                          bg: bottomButtonHover,
                        }}
                        _focus={{
                          boxShadow: 'none',
                        }}
                      >
                        <Icon as={BsBookmark} height={5} width={5} mr="5px" />
                        <Box>save</Box>
                      </Link>
                      <Link
                        display="flex"
                        alignItems="center"
                        borderRadius="2px"
                        padding="8px"
                        marginRight="4px"
                        _hover={{
                          textDecor: 'none',
                          outline: 'none',
                          bg: bottomButtonHover,
                        }}
                        _focus={{
                          boxShadow: 'none',
                        }}
                      >
                        <Icon as={FiMoreHorizontal} height={5} width={5} mr="5px" />
                      </Link>
                    </Flex>
                  </Flex>

                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    overflowY="visible"
                    mb="2px"
                    paddingBottom="12px"
                    paddingTop="8px"
                    sx={{
                      '@media (min-width: 960px)': {
                        display: 'none',
                      },
                    }}
                  >
                    <Flex
                      flexDirection="row"
                      alignItems="stretch"
                      flexGrow={1}
                      padding="0 8px 0 8px"
                      fontSize="12px"
                      fontWeight="500"
                      lineHeight="16px"
                      overflow="hidden"
                    >
                      <Flex
                        borderRadius="16px"
                        alignItems="center"
                        maxH=""
                        p=""
                        width="auto"
                        maxWidth="110px"
                        minWidth="32px"
                        mr="10px"
                        flexShrink="0"
                        border={`1px solid ${borderColor}`}
                      >
                        <IconButton
                          aria-label="Upvote Post"
                          color={voteMode === 1 ? 'upvoteOrange' : iconColor}
                          w="24px"
                          h="24px"
                          bg="none"
                          minW="24px"
                          minH="24px"
                          border="none"
                          borderRadius="2px"
                          _hover={{
                            color: 'upvoteOrange',
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                          onClick={() => {
                            setVoteMode(voteMode === 1 ? 0 : 1);
                          }}
                          icon={<Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                        />
                        <Text
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          pointerEvents="none"
                          color=""
                        >
                          {vote + voteMode === 0 ? 'vote' : vote + voteMode}
                        </Text>
                        <IconButton
                          aria-label="Downvote Post"
                          color={voteMode === -1 ? 'downvoteBlue' : iconColor}
                          w="24px"
                          h="24px"
                          minW="24px"
                          minH="24px"
                          border="none"
                          bg="none"
                          borderRadius="2px"
                          _hover={{
                            color: 'downvoteBlue',
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                          onClick={() => {
                            setVoteMode(voteMode === -1 ? 0 : -1);
                          }}
                          icon={
                            <Icon as={voteMode === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />
                          }
                        />
                      </Flex>
                      <Link
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="50%"
                        _hover={{
                          textDecor: 'none',
                        }}
                        _focus={{
                          boxShadow: 'none',
                        }}
                        mr="10px"
                        border={`1px solid ${borderColor}`}
                        minW="32px"
                        height="32px"
                        flexShrink="0"
                      >
                        <Icon as={GoGift} height={5} width={5} />
                      </Link>
                      <Link
                        borderRadius="16px"
                        alignItems="center"
                        maxH=""
                        p="2px 8px"
                        width="auto"
                        maxWidth="100px"
                        minWidth="32px"
                        mr="10px"
                        flexShrink="0"
                        border={`1px solid ${borderColor}`}
                        display="flex"
                      >
                        <Icon as={BsChat} height={5} width={5} mr="5px" />
                        <Box>{post?.replyCount}</Box>
                      </Link>
                      <Link
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="50%"
                        _hover={{
                          textDecor: 'none',
                        }}
                        _focus={{
                          boxShadow: 'none',
                        }}
                        ml="auto"
                        border={`1px solid ${borderColor}`}
                        minW="32px"
                        height="32px"
                        flexShrink="0"
                        sx={{
                          '@media (min-width: 1280px)': {},
                          '@media (max-width: 1120px)': {
                            display: 'none',
                          },
                        }}
                      >
                        <Icon as={FiShare} height={5} width={5} />
                      </Link>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Box maxW="100%" bg={bg} mt="10px" padding="10px">
                <Box padding="24px 40px">
                  <Box fontSize="12px" fontWeight="400" lineHeight="18px" mb="4px">
                    Comment As Abydin
                  </Box>
                  <Box>
                    <Editor />
                  </Box>
                  <Box
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="16px"
                    marginTop="16px"
                    marginBottom="4px "
                  >
                    Sort By: Best
                  </Box>
                  <hr />
                </Box>
                {post?.replies?.pages?.topAll?.comments.map((comment) => (
                  <Comment comment={comment} key={comment.cid} />
                ))}
              </Box>
            </Flex>

            <SideBar
              margin="32px 0"
              borderRadius="4px"
              padding="0"
              right="0"
              top="0"
              width="312px"
              sx={{
                '@media (max-width: 1120px)': {
                  display: 'none',
                },
              }}
            />
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PostDetail;
