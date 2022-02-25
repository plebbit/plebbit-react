import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Image,
  Link,
  Icon,
  IconButton,
  Heading,
  Tag,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CloseIcon } from '@chakra-ui/icons';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal, FiShare, FiBell } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { BsChat } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import SideBar from './postDetailSideBar';
import { ProfileContext } from '../../../../store/profileContext';
import { dateToNow } from '../../../../utils/formatDate';
import PdMenu from './pdMenu';

const PostDetails = ({ post }) => {
  const postDetCover = useColorModeValue('lightLayoutBg', 'black');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const borderColor = useColorModeValue('#ccc', '#343536');
  const postBg = useColorModeValue('white', 'black');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const voteBg = useColorModeValue('#F8F9FA', '');
  const subPledditTextColor = useColorModeValue('#1c1c1c', 'darkText');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const [vote] = useState(0);
  const [voteMode, setVoteMode] = useState(0);
  const history = useHistory();
  const { postStyle } = useContext(ProfileContext);

  return (
    <Flex
      bg={postDetCover}
      flexDir="column"
      width="calc(100% - 240px)"
      margin="0 auto"
      paddingBottom="32px"
      height="calc(100vh -48px)"
      sx={{
        '@media (min-width: 1280px)': {},
        '@media (max-width: 1120px)': {
          width: '100%',
          maxWidth: '100%',
        },
      }}
    >
      <Flex
        margin="0 auto"
        bg="#030303"
        h="48px"
        padding="0 6%"
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
        <Flex alignItems="center" mr="auto">
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
          <Box
            color="#D7DADC"
            fontSize="14px"
            fontWeight="500"
            whiteSpace="noWrap"
            lineHeight="18px"
            textOverflow="ellipsis"
            ml="2px"
            paddingRight="5px"
            sx={{
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
          >
            The Reason or the dreams of plebbit
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="flex-end"
          width="312px"
          color="#D7DADC"
          fontSize="12px"
          lineHeight="16px"
          fontWeight="700"
          ml="12px"
        >
          <CloseIcon mr="5px" onClick={() => history.goBack()} cursor="pointer" />
          <Box onClick={() => history.goBack()} cursor="pointer">
            Close
          </Box>
        </Flex>
      </Flex>
      <Flex
        padding="0 6%"
        sx={{
          '@media (min-width: 1280px)': {},
          '@media (max-width: 1120px)': {
            padding: '0',
          },
        }}
      >
        <Flex
          bg={bg}
          color={color}
          fill={color}
          borderColor={borderColor}
          borderRadius="4px"
          borderWidth="1px"
          margin="32px 12px 32px 0px"
          boxShadow="none"
          transition="color .5s, fill .5s, box-shadow .5s"
          _focus={{
            boxShadow: 'none',
          }}
          sx={{
            '@media (min-width: 1280px)': {},
            '@media (max-width: 1120px)': {
              margin: '0',
            },
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

          <Flex flexDir="column" bg={postBg} padding="1rem" flex="1">
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

                  <Link>{dateToNow(parseInt(1643151600000))}</Link>
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
            <Box margin="0 8px" display="flex" alignItems="center">
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
              <Box marginTop="8px">
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
                  {post?.detail ||
                    ` Plebbit: A serverless, adminless, decentralized Reddit alternative (Whitepaper
                    v0.2.0) Abstract A decentralized social media has 2 problems: How to store the
                    entire world's data on a blockchain, and how to prevent spam while being
                    feeless. We propose solving the data problem by not using a blockchain, but
                    rather "public key based addressing" and a peer-to-peer pubsub network. A
                    blockchain or even a DAG is unnecessary because unlike cryptocurrencies that
                    must know the order of each transaction to prevent double spends, social media
                    does not care about the order of posts, nor about the availability of old posts.
                    We propose solving the spam problem by having each subplebbit owner run a
                    "captcha service" node over peer-to-peer pubsub. Peers who fail too many
                    captchas are blocked from pubsub. Public key based addressing In Bittorrent, you
                    have "content based addressing". The hash of a file becomes its address. With
                    "public key based addressing", the hash of a public key becomes the address of
                    the subplebbit. Network peers perform a DHT query of this address to retrieve
                    the content of the subplebbit. Each time the content gets updated, the nonce of
                    the content increases. The network only keeps the latest nonce. Peer-to-peer
                    pubsub Pubsub is an architecture where you subscribe to a "topic", like "cats",
                    then whenever someone publishes a message of topic "cats", you receive it. A
                    peer-to-peer pubsub network means that anyone can publish, and anyone can
                    subscribe. To publish a post to a subplebbit, a user would publish a message
                    with a "topic" equal to the subplebbit public key (its public key based
                    addressing). Captcha service over peer-to-peer pubsub An open peer-to-peer
                    pubsub network is susceptible to spam attacks that would DDOS it, as well as
                    makes it impossible for moderators to manually moderate an infinite amount of
                    bot spam. We solve this problem by requiring publishers to first request a
                    captcha challenge from the subplebbit owner's peer. If a peer or IP address
                    relays too many captcha challenge requests without providing enough correct
                    captcha challenge answers, it gets blocked from the pubsub. This requires the
                    subplebbit owner's peer to broadcast the result of all captcha challenge
                    answers, and for each peer to keep this information for some time. Note: The
                    captcha implementation is completely up to the subplebbit owner. He can decide
                    to prompt all users, first time users only, or no users at all. He can use 3rd
                    party services like Google captchas. Lifecycle of creating a subplebbit
                    Subplebbit owner starts a Plebbit client "node" on his desktop or server. It
                    must be always online to serve content to his users. He generates a public key
                    pair, which will be the "address" of his subplebbit. He configures captcha
                    options, like how often and what kind of captchas to show. He publishes the
                    metadata of his subplebbit to his public key based addressing. This includes
                    subpebblit title, description, rules, list of public keys of moderators, etc.
                    Note: It is possible to delegate running a client to a centralized service,
                    without providing the private key, which makes user experience easier, without
                    sacrificing censorship resistance. Lifecycle of reading the latest posts on a
                    subplebbit 5 User opens the Plebbit app in a browser or desktop client, and sees
                    an interface similar to Reddit. His client joins the public key addressing
                    network as a peer and makes a DHT query for each address of each subplebbit he
                    is a member of. The queries each take several seconds but can be performed
                    concurrently. The query returns the latest posts of each subplebbit, as well as
                    their metadata such as title, description, moderator list and captcha server
                    URL. His client arranges the content received in an interface similar to Reddit.
                    Lifecycle of publishing a post on a subplebbit 4 6 User opens the Plebbit app in
                    a browser or desktop client, and sees an interface similar to Reddit. The app
                    automatically generates a public key pair if the user doesn't already have one.
                    He publishes a cat post for a subplebbit called "Cats" with the public key
                    "Y2F0cyA..." His client joins the pubsub network for "Y2F0cyA..." His client
                    makes a request for a captcha challenge over pubsub. His client receives a
                    captcha challenge over pubsub (relayed from the subplebbit owner's peer). The
                    app displays the captcha challenge to the user in an iframe. The user completes
                    the captcha challenge and publishes his post and captcha challenge answer over
                    pubsub. The subplebbit owner's client gets notified that the user published to
                    his pubsub, the post is not ignored because it contains a correct captcha
                    challenge answer. The subplebbit owner's client publishes a message over pubsub
                    indicating that the captcha answer is correct or incorrect. Peers relaying too
                    many messages with incorrect or no captcha answers get blocked to avoid DDOS of
                    the pubsub. The subplebbit owner's client updates the content of his
                    subplebbit's public key based addressing automatically. A few minutes later,
                    each user reading the subplebbit receives the update in their app. If the user's
                    post violates the subplebbit's rules, a moderator can delete it, using a similar
                    process the user used to publish. Note: Browser users cannot join peer-to-peer
                    networks directly, but they can use an HTTP provider or gateway that relays data
                    for them. This service can exist for free without users having to do or pay
                    anything. What is a "post" Post content is not retrieved directly by querying a
                    subplebbit's public key. What is retrieved is list of "content based addressing"
                    fields. Example: latest post: "bGF0ZXN0...", metadata: "bWV0YWRhdGE...". The
                    client will then perform a DHT query to retrieve the content. At least one peer
                    should have the data: the subplebbit's owner client node. If a subplebbit is
                    popular, many other peers will have it and the load will be distributed, like on
                    Bittorrent. Using anti-spam strategies other than the captcha service The
                    captcha service can be replaced by other "anti-spam strategies", such proof of
                    balance of a certain cryptocurrency. For example, a subplebbit owner might
                    require that posts be signed by users holding at least 1 ETH, or at least 1
                    token of his choice. Another strategy could be a proof of payment, each post
                    must be accompanied by a minimum payment to the owner of the subplebbit. This
                    might be fitting for celebrities wanting to use their subplebbit as a form of
                    "onlyfan", where fans pay to interact with them. Both these scenarios would not
                    eliminate spam, but they would bring them down from an infinite amount of spam,
                    to an amount that does not overwhelm the pubsub network, and that a group of
                    human moderators can manage. Proof of balance/payment are deterministic so the
                    P2P pubsub network can block spam attacks deterministically. Even more
                    strategies can be added to fit the need of different communities if found, but
                    at this time the captcha service remains the most versatile strategy. Improving
                    speed of public key based addressing A public key based addressing network query
                    is much slower than a content addressing based one, because even after you find
                    a peer that has the content, you must keep searching, in case another peer has
                    content with a later nonce (more up to date content). In content based
                    addressing, you stop as soon as you find a single peer, because the content is
                    always the same. It is possible to achieve the same speed in Plebbit, by having
                    public key based addressing content expire after X minutes, and having the
                    subplebbit owner republish the content after the same X minutes. Using this
                    strategy, there is only ever one valid content floating around the network, and
                    as soon as you find one peer that has it, you can deterministically stop your
                    search. Conclusion We believe that the design above would solve the problems of
                    a serverless, adminless decentralized Reddit alternative. It would allow
                    unlimited amounts of subplebbits, users, posts, comments and votes. This is
                    achieved by not caring about the order or availability of old data. It would
                    allow users to post for free using an identical Reddit interface. It would allow
                    subplebbit owners to moderate spam semi-automatically using their own captcha
                    service over peer-to-peer pubsub. It would allow for all features that make
                    Reddit addictive: upvotes, replies, notifications, awards, and a chance to make
                    the "front page". Finally, it would allow the Plebbit client developers to serve
                    an unlimited amount of users, without any server, legal, advertising or
                    moderation infrastructure. Please contact me on Telegram @estebanabaroa or
                    Discord estebanabaroa#2853 to get involved, we are looking for contributors.`}
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
    </Flex>
  );
};

export default PostDetails;
