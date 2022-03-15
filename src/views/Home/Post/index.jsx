import React, { useState, useContext } from 'react';
import {
  Flex,
  Box,
  IconButton,
  useColorModeValue,
  Icon,
  Text,
  Image,
  Link,
  Heading,
  Tag,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ProfileContext } from '../../../store/profileContext';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { dateToNow } from '../../../utils/formatDate';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal, FiShare } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { BsChat } from 'react-icons/bs';

const Posts = ({ post }) => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const postBg = useColorModeValue('white', 'black');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const voteBg = useColorModeValue('#F8F9FA', '');
  const subPledditTextColor = useColorModeValue('#1c1c1c', 'darkText');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const borderColor = useColorModeValue('#ccc', '#343536');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const borderColorHover = useColorModeValue('#898989', '#818384');
  const [vote] = useState(0);
  const [voteMode, setVoteMode] = useState(0);
  const { postStyle } = useContext(ProfileContext);
  const history = useHistory();

  return (
    <Flex
      bg={bg}
      color={color}
      fill={color}
      borderColor={borderColor}
      borderRadius="4px"
      borderWidth="1px"
      marginBottom="10px"
      boxShadow="none"
      transition="color .5s, fill .5s, box-shadow .5s"
      _hover={{
        textDecoration: 'none',
        borderColor: borderColorHover,
      }}
      _focus={{
        boxShadow: 'none',
      }}
    >
      <Flex
        flexDir="column"
        w="40px"
        h="revert"
        borderLeft="4px solid transparent"
        borderRadius="4px"
        bg={voteBg}
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
        <Text fontSize="12px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
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

      <Flex flexDir="column" bg={postBg} paddingTop="8px" flex="1">
        <Flex
          alignItems="start"
          flexFlow="row nowrap"
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
          <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
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

              <Link>{dateToNow(parseInt(1643151600000))}</Link>
            </Box>
          </Flex>
        </Flex>
        <Box
          margin="0 8px"
          display="flex"
          alignItems="center"
          onClick={() => history.push('/postId')}
          cursor="pointer"
        >
          <Heading
            color={titleColor}
            fontSize="18px"
            fontWeight="500"
            lineHeight="22px"
            paddingRight="5px"
            wordBreak="break-word"
          >
            {post?.title || `Why Plebbit ?`}
          </Heading>
          <Tag borderRadius="20px" p="2px 8px" mr="5px">
            {post?.tag || 'pleb'}
          </Tag>
        </Box>
        {postStyle === 'card' ? (
          <Box marginTop="8px" onClick={() => history.push('/postId')} cursor="pointer">
            <Box
              color={subPledditTextColor}
              maxHeight="125px"
              padding="5px 8px 10px"
              fontFamily="Noto sans, Arial, sans-serif"
              fontSize="14px"
              fontWeight="400"
              lineHeight="21px"
              wordBreak="break-word"
              overflow="hidden"
              sx={{
                maskImage: 'linear-gradient(180deg, #000 60%, transparent)',
              }}
            >
              {post?.detail ||
                `Plebbit is a serverless, adminless, decentralized Reddit alternative that has no blockchain transactions fees and uses captchas over peer-to-peer pubsub to prevent spam.
Whitepaper: https://github.com/plebbit/whitepaper/discussions/2
Reddit thread: https://redd.it/qijq8r
Reddit thread 2: https://redd.it/ps9udt
IPFS thread: https://discuss.ipfs.io/t/12158
ETHResearch thread: https://ethresear.ch/t/10523
Telegram: https://t.me/plebbit
Twitter: https://twitter.com/getplebbit`}
            </Box>
          </Box>
        ) : (
          ''
        )}
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
              <Box>6.3k Comments</Box>
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
                icon={<Icon as={voteMode === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />}
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
              <Box>6.3k</Box>
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
            >
              <Icon as={FiShare} height={5} width={5} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Posts;
