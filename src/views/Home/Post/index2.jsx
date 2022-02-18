import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Image,
  Heading,
  Icon,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Link,
} from '@chakra-ui/react';
import { Link as Lk } from 'react-router-dom';
import { dateToNow } from '../../../utils/formatDate';
import VoteComponent from './PostDetails/VoteComponent';
import { ProfileContext } from '../../../store/profileContext';
import { ChatIcon } from '@chakra-ui/icons';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsBookmark, BsFlag, BsEyeSlash } from 'react-icons/bs';

const Post = ({ post }) => {
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const postBg = useColorModeValue('white', 'black');
  const borderColorHover = useColorModeValue('#898989', '#818384');
  const subPledditTextColor = useColorModeValue('#1c1c1c', 'darkText');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const borderColor = useColorModeValue('#ccc', '#343536');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const { postStyle } = useContext(ProfileContext);

  return (
    <Lk _hover={{ textDecor: 'none' }} _focus={{ boxShadow: 'none' }} to="/postId">
      <Box
        bg={bg}
        color={color}
        fill={color}
        borderColor={borderColor}
        borderRadius="4px"
        borderWidth="1px"
        pos="relative"
        marginBottom="10px"
        paddingLeft="40px"
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
        <VoteComponent />
        <Box bg={postBg} position="relative" paddingTop="8px">
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
          <Box margin="0 8px">
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
          </Box>

          {postStyle === 'card' ? (
            <Box marginTop="8px">
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

          {/* Post Bottom Bar */}
          <Flex flexDirection="row" alignItems="center" paddingRight="10px" overflowY="visible">
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
                <ChatIcon mr="5px" />
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
                <Icon as={FaShare} mr="5px" />
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
                <Icon as={BsBookmark} mr="5px" />
                <Box>save</Box>
              </Link>
              <Menu>
                <MenuButton
                  as={IconButton}
                  color="#a4a4a4"
                  aria-label="Options"
                  alignItems="center"
                  borderRadius="2px"
                  padding="8px"
                  bg="transparent"
                  marginRight="4px"
                  _hover={{
                    textDecor: 'none',
                    outline: 'none',
                    bg: bottomButtonHover,
                  }}
                  _focus={{
                    boxShadow: 'none',
                  }}
                  icon={
                    <Icon as={FiMoreHorizontal} fontSize="20px" lineHeight="20px" color="#a4a4a4" />
                  }
                />
                <MenuList width="max-content">
                  <MenuItem>
                    <Flex alignItems="center">
                      <Icon
                        as={BsEyeSlash}
                        width={6}
                        height={6}
                        fontSize="20px"
                        lineHeight="20px"
                        color="#a4a4a4"
                        mr="6px"
                      />

                      <Box fontSize="12px">Hide</Box>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    alignItems="center"
                    icon={
                      <Icon
                        as={BsFlag}
                        width={6}
                        height={6}
                        fontSize="20px"
                        lineHeight="20px"
                        color="#a4a4a4"
                        mr="6px"
                      />
                    }
                  >
                    <Box fontSize="12px">Report</Box>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Lk>
  );
};

export default Post;
