import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Skeleton,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { RiCopperCoinLine } from 'react-icons/ri';
import { BsChat, BsBookmark, BsEyeSlash, BsFlag, BsFileText } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { CgArrowsExpandLeft, CgCompressLeft } from 'react-icons/cg';
import { VscLinkExternal } from 'react-icons/vsc';
import { FiMoreHorizontal, FiExternalLink } from 'react-icons/fi';
import DropDown from '../../components/DropDown';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link as ReactLink } from 'react-router-dom';
import { dateToNow } from '../../utils/formatDate';
import PostDetail from './PostDetails';
import Swal from 'sweetalert2';
import { useToast } from '@chakra-ui/react';
import { useAccountsActions } from '@plebbit/plebbit-react-hooks';
import numFormatter from '../../utils/numberFormater';

const CardPost = (props) => {
  return (
    <Box
      borderRadius="4px"
      paddingLeft="40px"
      cursor="pointer"
      transition="color .5s,fill .5s,box-shadow .5s"
      mb="10px"
      overflow="hidden"
      border={`1px solid ${props.border1}`}
      bg={props.postTransBg}
      color={props.iconColor}
      position="relative"
    >
      {/* Vote Bar */}
      <Flex
        width="40px"
        borderLeft="4px solid transparent"
        alignItems="center"
        boxSizing="border-box"
        flexDir="column"
        left="0"
        padding="8px 4px 8px 0"
        position="absolute"
        top="0"
      >
        <Flex flexDir="column" alignItems="center" fill="inherit">
          <Box
            width="24px"
            height="24px"
            bg="transparent"
            border="none"
            color="inherit"
            cursor="pointer"
            padding="inherit"
          >
            <Box
              border="2px solid transparent"
              cursor="pointer"
              display="inline-block"
              overflow="hidden"
              h="24px"
              w="24px"
              fontSize="16px"
              lineHeight="24px"
              _hover={{
                bg: props.iconBg,
                color: 'upvoteOrange',
              }}
              _focus={{
                outline: 'none',
              }}
              onClick={() => {
                props.setVoteMode(props.voteMode === 1 ? 0 : 1);
                props.handleVote(props.voteMode === 1 ? 0 : 1);
              }}
              color={props.voteMode === 1 ? 'upvoteOrange' : props.iconColor}
            >
              <Icon
                width="20px"
                height="20px"
                fontSize="20px"
                fontWeight="400"
                as={props.voteMode === 1 ? ImArrowUp : BiUpvote}
              />
            </Box>
          </Box>
          <Box
            color={props.voteColor}
            margin="4px 0"
            fontSize="12px"
            fontWeight="700"
            lineHeight="16px"
            pointerEvents="none"
            wordBreak="normal"
          >
            {!props.loading
              ? props.vote + props.voteMode === 0
                ? 'vote'
                : numFormatter(props.vote + props.voteMode)
              : ''}
          </Box>
          <Box
            width="24px"
            height="24px"
            bg="transparent"
            border="none"
            color="inherit"
            cursor="pointer"
            padding="inherit"
          >
            <Box
              border="2px solid transparent"
              cursor="pointer"
              color={props.voteMode === -1 ? 'downvoteBlue' : props.iconColor}
              display="inline-block"
              overflow="hidden"
              h="24px"
              w="24px"
              fontSize="16px"
              lineHeight="24px"
              _hover={{
                bg: props.iconBg,
                color: 'downvoteBlue',
              }}
              _focus={{
                outline: 'none',
              }}
              onClick={() => {
                props.setVoteMode(props.voteMode === -1 ? 0 : -1);
                props.handleVote(props.voteMode === -1 ? 0 : -1);
              }}
            >
              <Icon
                width="20px"
                height="20px"
                fontSize="20px"
                fontWeight="400"
                as={props.voteMode === -1 ? ImArrowDown : BiDownvote}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Box bg={props.mainBg} position="relative" paddingTop="8px">
        {props.post?.content ? (
          <>
            {/* Post Head */}
            <Flex
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
              flexFlow="row nowrap"
              alignItem="start"
              margin="0 8px 8px"
              position="relative"
            >
              <Skeleton mb="8px" isLoaded={!props.loading}>
                <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                  <Flex
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    alignItems="center"
                    flexFlow="row wrap"
                  >
                    {props.type !== 'subPlebbit' ? (
                      <>
                        <Link
                          as={ReactLink}
                          to={`p/${props.post?.subplebbitAddress}`}
                          color={props.subPledditTextColor}
                          fontSize="12px"
                          fontWeight="700"
                          display="inline"
                          lineHeight="20px"
                          textDecoration="none"
                        >
                          {`p/${props.post?.subplebbitAddress}`}
                        </Link>
                        <Box
                          verticalAlign="middle"
                          color={props.subPlebbitSubTitle}
                          fontSize="6px"
                          lineHeight="20px"
                          margin="0 4px"
                        >
                          •
                        </Box>
                      </>
                    ) : (
                      ''
                    )}
                    <Text color={props.misCol} flex="0 0 auto" mr="3px">
                      Posted by
                    </Text>
                    {/* User Badge */}{' '}
                    <Flex
                      alignItems="center"
                      display="inline-flex"
                      justifyContent="center"
                      verticalAlign="middle"
                      mr="4px"
                    >
                      <Image
                        h="24px"
                        verticalAlign="middle"
                        src="https://picsum.photos/200?random=1"
                      />
                    </Flex>
                    <Flex
                      alignItems="center"
                      display="inline-flex"
                      justifyContent="center"
                      verticalAlign="middle"
                      mr="4px"
                    >
                      <Image
                        h="24px"
                        verticalAlign="middle"
                        src="https://picsum.photos/200?random=2"
                      />
                    </Flex>
                    {/* User Name */}
                    <Box display="inline-block" flex="0 0 auto">
                      <Box>
                        <Link
                          as={ReactLink}
                          to={`u/${props.post?.author?.address}`}
                          _hover={{
                            textDecoration: 'underline',
                          }}
                          color={props.misCol}
                          fontWeight="700"
                          mr="3px"
                          textDecor="none"
                          fontSize="12px"
                          lineHeight="16px"
                        >
                          {`u/${props.post?.author?.displayName}`}
                        </Link>
                      </Box>
                    </Box>
                    {/* status */}
                    <Box display="inline" verticalAlign="text-top">
                      <Text
                        bg={props.statusBg}
                        color={props.statusColor}
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="16px"
                        borderRadius="2px"
                        display="inline-block"
                        mr="5px"
                        overflow="hidden"
                        isTruncated
                        padding="0 4px"
                      >
                        texting Text
                      </Text>
                    </Box>
                    {/* tips */}
                    <Tooltip
                      fontSize="10px"
                      label={`Tip ${props?.post?.author?.displayName} with Moons`}
                      aria-label="tip tooltip"
                    >
                      <Flex
                        cursor="pointer"
                        alignItems="center"
                        display="inline-flex"
                        margin="-2px 0 0 4px"
                        verticalAlign="middle"
                      >
                        <Icon
                          color={props.iconColor}
                          as={RiCopperCoinLine}
                          height="16px"
                          width="16px"
                          _hover={{
                            color: '#cc3700',
                          }}
                        />
                        <Text
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          color={props.subPlebbitSubTitle}
                          ml="5px"
                          _hover={{
                            textDecoration: 'underline',
                          }}
                        >
                          3.2k
                        </Text>
                        <Box
                          verticalAlign="middle"
                          color={props.subPlebbitSubTitle}
                          fontSize="6px"
                          lineHeight="20px"
                          margin="0 4px"
                        >
                          •
                        </Box>
                      </Flex>
                    </Tooltip>
                    {/* date/time */}
                    <Tooltip
                      fontSize="10px"
                      label={props?.post?.timestamp * 1000}
                      aria-label="date tooltip"
                      placement="top"
                    >
                      <Text
                        color={props.misCol}
                        mr="3px"
                        textDecor="none"
                        display="inline-block"
                        flex="0 0 auto"
                      >
                        {dateToNow(parseInt(props?.post?.timestamp * 1000))}
                      </Text>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Skeleton>
            </Flex>{' '}
            {/* Post Title */}
            <Box margin="0 8px" onClick={props.onOpen}>
              <Skeleton isLoaded={!props.loading}>
                {' '}
                {/* flair */}
                {props.type === 'subPlebbit' && props?.post?.flair?.text.length ? (
                  <Tag
                    bg={props.post?.flair?.backgroundColor}
                    color={props.post?.flair?.textColor}
                    borderRadius="20px"
                    padding="2px 8px"
                    size="sm"
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="16px"
                    mr="5px"
                    ml="0"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    display="inline-block"
                    verticalAlign="text-bottom"
                  >
                    {props.post?.flair?.text}
                  </Tag>
                ) : (
                  ''
                )}
                <Text
                  display="inline"
                  color={props.inactiveSubTitle}
                  fontSize="18px"
                  fontWeight="500"
                  lineHeight="22px"
                  paddingRight="5px"
                  textDecor="none"
                  wordBreak="break-word"
                >
                  {props.post?.title}
                </Text>
                {props.type !== 'subPlebbit' && props?.post?.flair?.text ? (
                  <Tag
                    bg={props.post?.flair?.backgroundColor}
                    color={props.post?.flair?.textColor}
                    borderRadius="20px"
                    padding="2px 8px"
                    size="sm"
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="16px"
                    ml="5px"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    display="inline-block"
                    verticalAlign="text-bottom"
                  >
                    {props.post?.flair?.text}
                  </Tag>
                ) : (
                  ''
                )}
              </Skeleton>
            </Box>
            {/* Post Body */}
            <Box mt="8px">
              <Box
                maxH="250px"
                overflow="hidden"
                padding="5px 8px 10px"
                sx={{
                  maskImage: 'linear-gradient(180deg, #000 60%, transparent)',
                }}
              >
                <Skeleton mt="20px" isLoaded={!props.loading}>
                  <Box
                    color={props.voteColor}
                    fontFamily="Noto sans, Arial, sans-serif"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    wordBreak="break-word"
                    paddingBottom="1px"
                    marginBottom="-1px"
                  >
                    {props.post?.content}
                  </Box>
                </Skeleton>
              </Box>
            </Box>
          </>
        ) : (
          <Flex paddingBottom="8px">
            <Flex
              flexDir="column"
              flex="1 1 100%"
              paddingBottom="22px"
              position="relative"
              wordBreak="break-word"
            >
              {/* Post Head */}
              <Flex
                fontSize="12px"
                fontWeight="400"
                lineHeight="16px"
                flexFlow="row nowrap"
                alignItem="start"
                margin="0 8px 8px"
                position="relative"
              >
                <Skeleton mb="8px" isLoaded={!props.loading}>
                  <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                    <Flex
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      alignItems="center"
                      flexFlow="row wrap"
                    >
                      {props.type !== 'subPlebbit' ? (
                        <>
                          <Link
                            as={ReactLink}
                            to={`/p/${props.post?.subplebbitAddress}`}
                            color={props.subPledditTextColor}
                            fontSize="12px"
                            fontWeight="700"
                            display="inline"
                            lineHeight="20px"
                            textDecoration="none"
                          >
                            {`p/${props.post?.subplebbitAddress}`}
                          </Link>
                          <Box
                            verticalAlign="middle"
                            color={props.subPlebbitSubTitle}
                            fontSize="6px"
                            lineHeight="20px"
                            margin="0 4px"
                          >
                            •
                          </Box>
                        </>
                      ) : (
                        ''
                      )}
                      <Text color={props.misCol} flex="0 0 auto" mr="3px">
                        Posted by
                      </Text>
                      {/* User Badge */}{' '}
                      <Flex
                        alignItems="center"
                        display="inline-flex"
                        justifyContent="center"
                        verticalAlign="middle"
                        mr="4px"
                      >
                        <Image
                          h="24px"
                          verticalAlign="middle"
                          src="https://picsum.photos/200?random=1"
                        />
                      </Flex>
                      <Flex
                        alignItems="center"
                        display="inline-flex"
                        justifyContent="center"
                        verticalAlign="middle"
                        mr="4px"
                      >
                        <Image
                          h="24px"
                          verticalAlign="middle"
                          src="https://picsum.photos/200?random=2"
                        />
                      </Flex>
                      {/* User Name */}
                      <Box display="inline-block" flex="0 0 auto">
                        <Box>
                          <Link
                            _hover={{
                              textDecoration: 'underline',
                            }}
                            as={ReactLink}
                            to={`u/${props.post?.author?.address}`}
                            color={props.misCol}
                            fontWeight="700"
                            mr="3px"
                            textDecor="none"
                            fontSize="12px"
                            lineHeight="16px"
                          >
                            {`u/${props.post?.author?.displayName}`}
                          </Link>
                        </Box>
                      </Box>
                      {/* status */}
                      <Box display="inline" verticalAlign="text-top">
                        <Text
                          bg={props.statusBg}
                          color={props.statusColor}
                          fontSize="12px"
                          fontWeight="500"
                          lineHeight="16px"
                          borderRadius="2px"
                          display="inline-block"
                          mr="5px"
                          overflow="hidden"
                          isTruncated
                          padding="0 4px"
                        >
                          texting Text
                        </Text>
                      </Box>
                      {/* tips */}
                      <Tooltip
                        fontSize="10px"
                        label={`Tip ${props?.post?.author?.displayName} with Moons`}
                        aria-label="tip tooltip"
                      >
                        <Flex
                          cursor="pointer"
                          alignItems="center"
                          display="inline-flex"
                          margin="-2px 0 0 4px"
                          verticalAlign="middle"
                        >
                          <Icon
                            color={props.iconColor}
                            as={RiCopperCoinLine}
                            height="16px"
                            width="16px"
                            _hover={{
                              color: '#cc3700',
                            }}
                          />
                          <Text
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                            color={props.subPlebbitSubTitle}
                            ml="5px"
                            _hover={{
                              textDecoration: 'underline',
                            }}
                          >
                            3.2k
                          </Text>
                          <Box
                            verticalAlign="middle"
                            color={props.subPlebbitSubTitle}
                            fontSize="6px"
                            lineHeight="20px"
                            margin="0 4px"
                          >
                            •
                          </Box>
                        </Flex>
                      </Tooltip>
                      {/* date/time */}
                      <Tooltip
                        fontSize="10px"
                        label={props?.post?.timestamp * 1000}
                        aria-label="date tooltip"
                        placement="top"
                      >
                        <Text
                          color={props.misCol}
                          mr="3px"
                          textDecor="none"
                          display="inline-block"
                          flex="0 0 auto"
                        >
                          {dateToNow(parseInt(props?.post?.timestamp * 1000))}
                        </Text>
                      </Tooltip>
                    </Flex>
                  </Flex>
                </Skeleton>
              </Flex>{' '}
              {/* Post Title */}
              <Box margin="0 8px" onClick={props.onOpen}>
                <Skeleton mb="30px" isLoaded={!props.loading}>
                  {' '}
                  {/* flair */}
                  {props.type === 'subPlebbit' && props?.post?.flair?.text ? (
                    <Tag
                      bg={props?.post?.flair?.color}
                      borderRadius="20px"
                      padding="2px 8px"
                      size="sm"
                      fontSize="12px"
                      fontWeight="500"
                      lineHeight="16px"
                      mr="5px"
                      ml="0"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      display="inline-block"
                      verticalAlign="text-bottom"
                    >
                      {props.post?.flair?.text}
                    </Tag>
                  ) : (
                    ''
                  )}
                  <Text
                    display="inline"
                    color={props.inactiveSubTitle}
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="22px"
                    paddingRight="5px"
                    textDecor="none"
                    wordBreak="break-word"
                  >
                    {props?.post?.title}
                  </Text>
                  {props.type !== 'subPlebbit' ? (
                    <Tag
                      bg={props.post?.flair?.backgroundColor}
                      color={props.post?.flair?.textColor}
                      borderRadius="20px"
                      padding="2px 8px"
                      size="sm"
                      fontSize="12px"
                      fontWeight="500"
                      lineHeight="16px"
                      ml="5px"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      display="inline-block"
                      verticalAlign="text-bottom"
                    >
                      {props.post?.flair?.text}
                    </Tag>
                  ) : (
                    ''
                  )}
                </Skeleton>
              </Box>
              {/* Post url */}
              <Flex mt="0">
                {props?.post?.link ? (
                  <Link
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    margin="4px 8px"
                    whiteSpace="nowrap"
                    color="mainBlue"
                    display="flex"
                    href={props.post?.link}
                    alignItems="flex-end"
                  >
                    <Box>{props.post?.link?.substring(0, 20) + '...'}</Box>
                    <Icon
                      as={FiExternalLink}
                      verticalAlign="middle"
                      fontWeight="400"
                      width="20px"
                      height="20px"
                      fontSize="12px"
                      paddingLeft="4px"
                    />
                  </Link>
                ) : (
                  ''
                )}
              </Flex>
            </Flex>
            <Flex
              flex="0 0 144px"
              height="108px"
              alignItems="flex-end"
              borderRadius="2px"
              flexDir="column"
              padding="0 8px"
            >
              <Box
                borderRadius="4px"
                flex="1"
                height="100%"
                width="100%"
                overflow="hidden"
                position="relative"
                verticalAlign="bottom"
              >
                <Skeleton isLoaded={!props.loading}>
                  {' '}
                  <Link href={props.post?.link}>
                    <Image
                      borderColor="mainBlue"
                      border="1px solid #0079d3;"
                      src={props.post?.link}
                      width="100%"
                      height="100%"
                    />
                  </Link>
                </Skeleton>
              </Box>
            </Flex>
          </Flex>
        )}
        {/* Post Footer */}
        <Flex alignItems="center" height="40px" paddingRight="10px" overflowY="visible">
          <Flex
            fontSize="12px"
            fontWeight="700"
            lineHeight="16px"
            alignItems="stretch"
            overflow="hidden"
            padding="0 8px 0 4px"
            flexGrow="1"
          >
            <Flex
              padding="8px"
              wordBreak="normal"
              mr="4px"
              alignItems="center"
              borderRadius="2px"
              fontSize="12px"
              fontWeight="700"
              lineHeight="16px"
              boxSizing="border-box"
              _hover={{
                backgroundColor: props.inputBg,
              }}
            >
              <Icon
                as={BsChat}
                width="20px"
                height="20px"
                verticalAlign="middle"
                fontWeight="400"
                mr="6px"
              />
              <Text
                display="inline-block"
                lineHeight={1}
                textTransform="capitalize"
                verticalAlign="middle"
              >
                {props.post?.replyCount} comments
              </Text>
            </Flex>
            <Flex
              padding="8px"
              wordBreak="normal"
              mr="4px"
              alignItems="center"
              borderRadius="2px"
              fontSize="12px"
              fontWeight="700"
              lineHeight="16px"
              boxSizing="border-box"
              _hover={{
                backgroundColor: props.inputBg,
              }}
            >
              <Icon
                as={GoGift}
                width="20px"
                height="20px"
                verticalAlign="middle"
                fontWeight="400"
                mr="6px"
              />
              <Text
                display="inline-block"
                lineHeight={1}
                textTransform="capitalize"
                verticalAlign="middle"
              >
                Award
              </Text>
            </Flex>
            <Flex
              padding="8px"
              wordBreak="normal"
              mr="4px"
              alignItems="center"
              borderRadius="2px"
              fontSize="12px"
              fontWeight="700"
              lineHeight="16px"
              boxSizing="border-box"
              _hover={{
                backgroundColor: props.inputBg,
              }}
            >
              <Icon
                as={FaShare}
                width="20px"
                height="20px"
                verticalAlign="middle"
                fontWeight="400"
                mr="6px"
              />
              <Text
                display="inline-block"
                lineHeight={1}
                textTransform="capitalize"
                verticalAlign="middle"
              >
                Share
              </Text>
            </Flex>
            <Flex
              padding="8px"
              wordBreak="normal"
              mr="4px"
              alignItems="center"
              borderRadius="2px"
              fontSize="12px"
              fontWeight="700"
              lineHeight="16px"
              boxSizing="border-box"
              _hover={{
                backgroundColor: props.inputBg,
              }}
            >
              <Icon
                as={BsBookmark}
                width="20px"
                height="20px"
                verticalAlign="middle"
                fontWeight="400"
                mr="6px"
              />
              <Text
                display="inline-block"
                lineHeight={1}
                textTransform="capitalize"
                verticalAlign="middle"
              >
                Save
              </Text>
            </Flex>
            <Flex justifyContent="center">
              <DropDown
                dropDownTitle={
                  <Flex
                    borderRadius="2px"
                    height="24px"
                    verticalAlign="middle"
                    padding="0 4px"
                    width="100%"
                    bg="transparent"
                    border="none"
                    alignItems="center"
                    _hover={{
                      backgroundColor: props.inputBg,
                    }}
                  >
                    <Icon as={FiMoreHorizontal} color={props.iconColor} h="20px" w="20px" />
                  </Flex>
                }
                options={[
                  {
                    label: 'Hide',
                    icon: BsEyeSlash,
                    id: Math.random(),
                  },
                ]}
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

const ClassicPost = (props) => {
  return (
    <Box
      color={props.iconColor}
      fill={props.iconColor}
      cursor="pointer"
      paddingLeft="40px"
      overflow="hidden"
      position="relative"
      border={`thin solid ${props.border1}`}
      zIndex="0"
      bg={props.postTransBg}
    >
      {/* Vote Bar */}
      <Skeleton isLoaded={!props.loading}>
        <Flex
          width="40px"
          borderLeft="4px solid transparent"
          alignItems="center"
          boxSizing="border-box"
          flexDir="column"
          left="0"
          padding="8px 4px 8px 0"
          position="absolute"
          top="0"
        >
          <Flex flexDir="column" alignItems="center" fill="inherit">
            <Box
              width="24px"
              height="24px"
              bg="transparent"
              border="none"
              color="inherit"
              cursor="pointer"
              padding="inherit"
            >
              <Box
                border="2px solid transparent"
                cursor="pointer"
                display="inline-block"
                overflow="hidden"
                h="24px"
                w="24px"
                fontSize="16px"
                lineHeight="24px"
                _hover={{
                  bg: props.iconBg,
                  color: 'upvoteOrange',
                }}
                _focus={{
                  outline: 'none',
                }}
                onClick={() => {
                  props.setVoteMode(props.voteMode === 1 ? 0 : 1);
                  props.handleVote(props.voteMode === 1 ? 0 : 1);
                }}
                color={props.voteMode === 1 ? 'upvoteOrange' : props.iconColor}
              >
                <Icon
                  width="20px"
                  height="20px"
                  fontSize="20px"
                  fontWeight="400"
                  as={props.voteMode === 1 ? ImArrowUp : BiUpvote}
                />
              </Box>
            </Box>
            <Box
              color={props.voteColor}
              margin="4px 0"
              fontSize="12px"
              fontWeight="700"
              lineHeight="16px"
              pointerEvents="none"
              wordBreak="normal"
            >
              <Skeleton isLoaded={!props.loading}>
                {props.vote + props.voteMode === 0
                  ? 'vote'
                  : numFormatter(props.vote + props.voteMode)}
              </Skeleton>
            </Box>
            <Box
              width="24px"
              height="24px"
              bg="transparent"
              border="none"
              color="inherit"
              cursor="pointer"
              padding="inherit"
            >
              <Box
                border="2px solid transparent"
                cursor="pointer"
                color={props.voteMode === -1 ? 'downvoteBlue' : props.iconColor}
                display="inline-block"
                overflow="hidden"
                h="24px"
                w="24px"
                fontSize="16px"
                lineHeight="24px"
                _hover={{
                  bg: props.iconBg,
                  color: 'downvoteBlue',
                }}
                _focus={{
                  outline: 'none',
                }}
                onClick={() => {
                  props.setVoteMode(props.voteMode === -1 ? 0 : -1);
                  props.handleVote(props.voteMode === -1 ? 0 : -1);
                }}
              >
                <Icon
                  width="20px"
                  height="20px"
                  fontSize="20px"
                  fontWeight="400"
                  as={props.voteMode === -1 ? ImArrowDown : BiDownvote}
                />
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Skeleton>

      <Box bg={props.mainBg} position="relative">
        <Flex position="relative" padding="8px 8px 0">
          {/* Post image */}
          <Flex flex="0 0 96px" height="72px" borderRadius="4px">
            <Flex flex="0 0 96px" height="72px" borderRadius="4px" backgroundColor={props.shadow}>
              <Box
                borderRadius="4px"
                flex="1"
                height="100%"
                overflow="hidden"
                position="relative"
                verticalAlign="bottom"
              >
                {props.post?.content ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                  >
                    <Icon as={BsFileText} h="20px" w="20px" alignSelf="center" />
                  </Box>
                ) : (
                  <Box
                    borderColor={props.border2}
                    backgroundImage={`url(${props?.post?.link})`}
                    transition="filter .5s"
                    height="72px"
                    width="96px"
                    border="none"
                    borderRadius="4px"
                    backgroundPosition="50% top"
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    flex="1"
                  >
                    {/* <Image alt="xxx" /> */}
                  </Box>
                )}
              </Box>
            </Flex>
          </Flex>

          {/* Post content */}
          <Box ml="8px" flex="1 1 100%" position="relative" wordBreak="break-word">
            {/* post title */}
            <Box margin="0 8px" onClick={props.onOpen}>
              <Skeleton isLoaded={!props.loading}>
                {' '}
                {/* flair */}
                {props.type === 'subPlebbit' && props?.post?.flair?.text ? (
                  <Tag
                    bg={props?.post?.flair?.color}
                    borderRadius="20px"
                    padding="2px 8px"
                    size="sm"
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="16px"
                    mr="5px"
                    ml="0"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    display="inline-block"
                    verticalAlign="text-bottom"
                  >
                    {props.post?.flair?.text}
                  </Tag>
                ) : (
                  ''
                )}
                <Text
                  display="inline"
                  color={props.inactiveSubTitle}
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  paddingRight="5px"
                  textDecor="none"
                  wordBreak="break-word"
                >
                  {props?.post?.title}
                  {!props.post?.content ? (
                    <Link
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      margin="4px 8px"
                      color="mainBlue"
                      href={props?.post?.link}
                    >
                      <span>{props?.post?.link.substring(0, 20) + '...'}</span>
                      <Icon
                        as={FiExternalLink}
                        verticalAlign="middle"
                        fontWeight="400"
                        width="20px"
                        height="20px"
                        fontSize="12px"
                        paddingLeft="4px"
                      />
                    </Link>
                  ) : (
                    ''
                  )}
                </Text>
                {props.type !== 'subPlebbit' && props?.post?.flair?.text ? (
                  <Tag
                    bg={props?.post?.flair?.color}
                    borderRadius="20px"
                    padding="2px 8px"
                    size="sm"
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="16px"
                    ml="5px"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    display="inline-block"
                    verticalAlign="text-bottom"
                  >
                    {props.post?.flair?.text}
                  </Tag>
                ) : (
                  ''
                )}
              </Skeleton>
            </Box>
            {/* Post head */}
            <Flex
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
              flexFlow="row nowrap"
              alignItem="start"
              margin="0 8px 8px"
              position="relative"
            >
              <Skeleton mb="8px" isLoaded={!props.loading}>
                <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                  <Flex
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    alignItems="center"
                    flexFlow="row wrap"
                  >
                    <Link
                      as={ReactLink}
                      to={`/p/${props.post?.subplebbitAddress}`}
                      color={props.subPledditTextColor}
                      fontSize="12px"
                      fontWeight="700"
                      display="inline"
                      lineHeight="20px"
                      textDecoration="none"
                      mr="3px"
                    >
                      {`p/${props.post?.subplebbitAddress}`}
                    </Link>
                    <Text color={props.misCol} flex="0 0 auto" mr="3px">
                      Posted by
                    </Text>
                    {/* User Badge */}{' '}
                    <Flex
                      alignItems="center"
                      display="inline-flex"
                      justifyContent="center"
                      verticalAlign="middle"
                      mr="4px"
                    >
                      <Image
                        h="24px"
                        verticalAlign="middle"
                        src="https://picsum.photos/200?random=1"
                      />
                    </Flex>
                    <Flex
                      alignItems="center"
                      display="inline-flex"
                      justifyContent="center"
                      verticalAlign="middle"
                      mr="4px"
                    >
                      <Image
                        h="24px"
                        verticalAlign="middle"
                        src="https://picsum.photos/200?random=2"
                      />
                    </Flex>
                    {/* User Name */}
                    <Box display="inline-block" flex="0 0 auto">
                      <Box>
                        <Text
                          _hover={{
                            textDecoration: 'underline',
                          }}
                          color={props.misCol}
                          fontWeight="700"
                          mr="3px"
                          textDecor="none"
                          fontSize="12px"
                          lineHeight="16px"
                        >
                          {`u/${props.post?.author?.displayName}`}
                        </Text>
                      </Box>
                    </Box>
                    {/* status */}
                    <Box display="inline" verticalAlign="text-top">
                      <Text
                        bg={props.statusBg}
                        color={props.statusColor}
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="16px"
                        borderRadius="2px"
                        display="inline-block"
                        mr="5px"
                        overflow="hidden"
                        isTruncated
                        padding="0 4px"
                      >
                        texting Text
                      </Text>
                    </Box>
                    {/* tips */}
                    <Tooltip
                      fontSize="10px"
                      label={`Tip ${props?.post?.author?.displayName} with Moons`}
                      aria-label="tip tooltip"
                    >
                      <Flex
                        cursor="pointer"
                        alignItems="center"
                        display="inline-flex"
                        margin="-2px 0 0 4px"
                        verticalAlign="middle"
                      >
                        <Icon
                          color={props.iconColor}
                          as={RiCopperCoinLine}
                          height="16px"
                          width="16px"
                          _hover={{
                            color: '#cc3700',
                          }}
                        />
                        <Text
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          color={props.subPlebbitSubTitle}
                          ml="5px"
                          _hover={{
                            textDecoration: 'underline',
                          }}
                        >
                          3.2k
                        </Text>
                        <Box
                          verticalAlign="middle"
                          color={props.subPlebbitSubTitle}
                          fontSize="6px"
                          lineHeight="20px"
                          margin="0 4px"
                        >
                          •
                        </Box>
                      </Flex>
                    </Tooltip>
                    {/* date/time */}
                    <Tooltip
                      fontSize="10px"
                      label={props?.post?.timestamp * 1000}
                      aria-label="date tooltip"
                      placement="top"
                    >
                      <Text
                        color={props.misCol}
                        mr="3px"
                        textDecor="none"
                        display="inline-block"
                        flex="0 0 auto"
                      >
                        {dateToNow(parseInt(props?.post?.timestamp * 1000))}
                      </Text>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Skeleton>
            </Flex>
            {/* Post footer */}
            <Flex alignItems="center" height="40px" paddingRight="10px" overflowY="visible">
              <Flex
                fontSize="12px"
                fontWeight="700"
                lineHeight="16px"
                alignItems="stretch"
                overflow="hidden"
                padding="0 8px 0 4px"
                flexGrow="1"
              >
                {props.post?.content ? (
                  <Flex
                    padding="8px"
                    wordBreak="normal"
                    mr="4px"
                    alignItems="center"
                    borderRadius="2px"
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="16px"
                    boxSizing="border-box"
                    _hover={{
                      backgroundColor: props.inputBg,
                    }}
                    onClick={() => props.setShowContent(!props.showContent)}
                  >
                    <Icon
                      as={props.showContent ? CgCompressLeft : CgArrowsExpandLeft}
                      width="20px"
                      height="20px"
                      verticalAlign="middle"
                      fontWeight="400"
                      mr="6px"
                    />
                  </Flex>
                ) : (
                  <Flex
                    padding="8px"
                    wordBreak="normal"
                    mr="4px"
                    alignItems="center"
                    borderRadius="2px"
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="16px"
                    boxSizing="border-box"
                    _hover={{
                      backgroundColor: props.inputBg,
                    }}
                  >
                    <Icon
                      as={VscLinkExternal}
                      width="20px"
                      height="20px"
                      verticalAlign="middle"
                      fontWeight="400"
                      mr="6px"
                    />
                  </Flex>
                )}
                <Flex
                  padding="8px"
                  wordBreak="normal"
                  mr="4px"
                  alignItems="center"
                  borderRadius="2px"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  boxSizing="border-box"
                  _hover={{
                    backgroundColor: props.inputBg,
                  }}
                >
                  <Icon
                    as={BsChat}
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                    fontWeight="400"
                    mr="6px"
                  />
                  <Text
                    display="inline-block"
                    lineHeight={1}
                    textTransform="capitalize"
                    verticalAlign="middle"
                  >
                    {props?.post?.replyCount} comments
                  </Text>
                </Flex>
                <Flex
                  padding="8px"
                  wordBreak="normal"
                  mr="4px"
                  alignItems="center"
                  borderRadius="2px"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  boxSizing="border-box"
                  _hover={{
                    backgroundColor: props.inputBg,
                  }}
                >
                  <Icon
                    as={GoGift}
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                    fontWeight="400"
                    mr="6px"
                  />
                  <Text
                    display="inline-block"
                    lineHeight={1}
                    textTransform="capitalize"
                    verticalAlign="middle"
                  >
                    Award
                  </Text>
                </Flex>
                <Flex
                  padding="8px"
                  wordBreak="normal"
                  mr="4px"
                  alignItems="center"
                  borderRadius="2px"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  boxSizing="border-box"
                  _hover={{
                    backgroundColor: props.inputBg,
                  }}
                >
                  <Icon
                    as={FaShare}
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                    fontWeight="400"
                    mr="6px"
                  />
                  <Text
                    display="inline-block"
                    lineHeight={1}
                    textTransform="capitalize"
                    verticalAlign="middle"
                  >
                    Share
                  </Text>
                </Flex>
                <Flex
                  padding="8px"
                  wordBreak="normal"
                  mr="4px"
                  alignItems="center"
                  borderRadius="2px"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  boxSizing="border-box"
                  _hover={{
                    backgroundColor: props.inputBg,
                  }}
                >
                  <Icon
                    as={BsBookmark}
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                    fontWeight="400"
                    mr="6px"
                  />
                  <Text
                    display="inline-block"
                    lineHeight={1}
                    textTransform="capitalize"
                    verticalAlign="middle"
                  >
                    Save
                  </Text>
                </Flex>
                <Flex
                  padding="8px"
                  wordBreak="normal"
                  mr="4px"
                  alignItems="center"
                  borderRadius="2px"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  boxSizing="border-box"
                  _hover={{
                    backgroundColor: props.inputBg,
                  }}
                >
                  <Icon
                    as={BsEyeSlash}
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                    fontWeight="400"
                    mr="6px"
                  />
                  <Text
                    display="inline-block"
                    lineHeight={1}
                    textTransform="capitalize"
                    verticalAlign="middle"
                  >
                    Hide
                  </Text>
                </Flex>
                <Flex
                  padding="8px"
                  wordBreak="normal"
                  mr="4px"
                  alignItems="center"
                  borderRadius="2px"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  boxSizing="border-box"
                  _hover={{
                    backgroundColor: props.inputBg,
                  }}
                >
                  <Icon
                    as={BsFlag}
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                    fontWeight="400"
                    mr="6px"
                  />
                  <Text
                    display="inline-block"
                    lineHeight={1}
                    textTransform="capitalize"
                    verticalAlign="middle"
                  >
                    Report
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        {props.showContent ? (
          <Box padding="5px 16px 5px 8px" maxWidth="800px">
            <Box
              color={props.voteColor}
              fontSize="14px"
              fontWeight="400"
              lineHeight="21px"
              wordBreak="break-word"
              overflow="auto"
              paddingBottom="1px"
              marginBottom="-1px"
            >
              {props?.post?.content}
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};

const CompactPost = (props) => {
  return (
    <Box
      color={props.iconColor}
      fill={props.iconColor}
      cursor="pointer"
      maxW="100%"
      overflow="hidden"
      bg={props.postTransBg}
      position="relative"
      border={`thin solid transparent`}
    >
      <Flex alignItems="normal">
        {/* vote Bar */}
        <Flex>
          <Flex
            borderColor="transparent"
            boxSizing="border-box"
            borderLeftWidth="4px"
            borderLeftStyle="solid"
            flex="0 0 36px"
          >
            <Flex alignItems="center" margin="0" padding="0 2px" mt="9px">
              <Box
                width="24px"
                height="24px"
                bg="transparent"
                border="none"
                color="inherit"
                cursor="pointer"
                padding="initial"
                textAlign="center"
              >
                <Box
                  borderRadius="2px"
                  cursor="pointer"
                  display="inline-block"
                  overflow="hidden"
                  h="24px"
                  w="24px"
                  fontSize="16px"
                  lineHeight="24px"
                  _hover={{
                    bg: props.iconBg,
                    color: 'upvoteOrange',
                  }}
                  _focus={{
                    outline: 'none',
                  }}
                  onClick={() => {
                    props.setVoteMode(props.voteMode === 1 ? 0 : 1);
                    props.handleVote(props.voteMode === 1 ? 0 : 1);
                  }}
                  color={props.voteMode === 1 ? 'upvoteOrange' : props.iconColor}
                >
                  <Icon
                    width="20px"
                    height="20px"
                    fontSize="20px"
                    fontWeight="400"
                    as={props.voteMode === 1 ? ImArrowUp : BiUpvote}
                  />
                </Box>
              </Box>
              <Box
                color={props.voteColor}
                margin="0 1px"
                fontSize="12px"
                fontWeight="700"
                lineHeight="15px"
                pointerEvents="none"
                wordBreak="normal"
                textAlign="center"
                width="32px"
              >
                <Skeleton isLoaded={!props.loading}>
                  {props.vote + props.voteMode === 0
                    ? 'vote'
                    : numFormatter(props.vote + props.voteMode)}
                </Skeleton>
              </Box>
              <Box
                textAlign="center"
                width="24px"
                height="24px"
                bg="transparent"
                border="none"
                color="inherit"
                cursor="pointer"
                padding="initial"
              >
                <Box
                  borderRadius="2px"
                  cursor="pointer"
                  color={props.voteMode === -1 ? 'downvoteBlue' : props.iconColor}
                  display="inline-block"
                  overflow="hidden"
                  h="24px"
                  w="24px"
                  fontSize="16px"
                  lineHeight="24px"
                  _hover={{
                    bg: props.iconBg,
                    color: 'downvoteBlue',
                  }}
                  _focus={{
                    outline: 'none',
                  }}
                  onClick={() => {
                    props.setVoteMode(props.voteMode === -1 ? 0 : -1);
                    props.handleVote(props.voteMode === -1 ? 0 : -1);
                  }}
                >
                  <Icon
                    width="20px"
                    height="20px"
                    fontSize="20px"
                    fontWeight="400"
                    as={props.voteMode === -1 ? ImArrowDown : BiDownvote}
                  />
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Box
          bg={props.mainBg}
          borderLeft={`1px solid ${props.border2}`}
          flex="1 1 auto"
          minW="0"
          padding="3px 0"
          position="relative"
        >
          <Flex alignItems="center">
            {props.post?.content ? (
              <Link
                display="flex"
                flex="0 0 36px"
                margin="0 8px"
                alignSelf="center"
                alignItems="center"
                borderRadius="2px"
                justifyContent="center"
                height="36px"
                width="36px"
                _hover={{
                  bg: props.iconBg,
                }}
                onClick={() => props.setShowContent(!props.showContent)}
              >
                <Icon
                  as={props.showContent ? CgCompressLeft : CgArrowsExpandLeft}
                  position="absolute"
                  width="20px"
                  height="20px"
                  verticalAlign="middle"
                />
              </Link>
            ) : (
              <Box
                display="flex"
                flex="0 0 36px"
                margin="0 8px"
                alignSelf="center"
                alignItems="center"
                borderRadius="2px"
                justifyContent="center"
                height="36px"
                width="36px"
                _hover={{
                  bg: props.iconBg,
                }}
              >
                <Icon
                  as={BsFileText}
                  position="absolute"
                  width="20px"
                  height="20px"
                  verticalAlign="middle"
                />
              </Box>
            )}
            <Box flex="1 1 100%" mt="2px" minW="150px" overflow="hidden" wordWrap="brak-word">
              {/* post title */}
              <Box margin="0 8px" onClick={props.onOpen}>
                <Skeleton isLoaded={!props.loading}>
                  {' '}
                  {/* flair */}
                  {props.type === 'subPlebbit' && props?.post?.flair?.text ? (
                    <Tag
                      bg={props?.post?.flair?.color}
                      borderRadius="20px"
                      padding="2px 8px"
                      size="sm"
                      fontSize="12px"
                      fontWeight="500"
                      lineHeight="16px"
                      mr="5px"
                      ml="0"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      display="inline-block"
                      verticalAlign="text-bottom"
                    >
                      {props.post?.flair?.text}
                    </Tag>
                  ) : (
                    ''
                  )}
                  <Text
                    display="inline"
                    color={props.inactiveSubTitle}
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    paddingRight="5px"
                    textDecor="none"
                    wordBreak="break-word"
                  >
                    {props?.post?.title}
                    {!props.post?.content ? (
                      <Link
                        fontSize="12px"
                        fontWeight="400"
                        lineHeight="16px"
                        margin="4px 8px"
                        color="mainBlue"
                        href="https://www.coindesk.com/business/2022/04/13/jack-dorseys-first-tweet-nft-went-on-sale-for-48m-it-ended-with-a-top-bid-of-just-280/"
                      >
                        <span>{props?.post?.link.substring(0, 20) + '...'}</span>
                        <Icon
                          as={FiExternalLink}
                          verticalAlign="middle"
                          fontWeight="400"
                          width="20px"
                          height="20px"
                          fontSize="12px"
                          paddingLeft="4px"
                        />
                      </Link>
                    ) : (
                      ''
                    )}
                  </Text>
                  {props.type !== 'subPlebbit' && props?.post?.flair?.text ? (
                    <Tag
                      bg={props.post?.flair?.backgroundColor}
                      color="#fff"
                      borderRadius="20px"
                      padding="2px 8px"
                      size="sm"
                      fontSize="12px"
                      fontWeight="500"
                      lineHeight="16px"
                      ml="5px"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      display="inline-block"
                      verticalAlign="text-bottom"
                    >
                      {props.post?.flair?.text}
                    </Tag>
                  ) : (
                    ''
                  )}
                </Skeleton>
              </Box>
              {/* Post head */}
              <Flex
                fontSize="12px"
                fontWeight="400"
                lineHeight="16px"
                flexFlow="row nowrap"
                alignItem="start"
                margin="0 8px 8px"
                position="relative"
              >
                <Skeleton mb="8px" isLoaded={!props.loading}>
                  <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                    <Flex
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      alignItems="center"
                      flexFlow="row wrap"
                    >
                      {props.type !== 'subPlebbit' ? (
                        <>
                          <Link
                            color={props.subPledditTextColor}
                            fontSize="12px"
                            fontWeight="700"
                            display="inline"
                            lineHeight="20px"
                            textDecoration="none"
                          >
                            {`p/${props.post?.subplebbitAddress}`}
                          </Link>
                          <Box
                            verticalAlign="middle"
                            color={props.subPlebbitSubTitle}
                            fontSize="6px"
                            lineHeight="20px"
                            margin="0 4px"
                          >
                            •
                          </Box>
                        </>
                      ) : (
                        ''
                      )}
                      <Link
                        as={ReactLink}
                        to={`/p/${props.post?.subplebbitAddress}`}
                        color={props.subPledditTextColor}
                        fontSize="12px"
                        fontWeight="700"
                        display="inline"
                        lineHeight="20px"
                        textDecoration="none"
                        mr="3px"
                      >
                        {`p/${props.post?.subplebbitAddress}`}
                      </Link>
                      <Text color={props.misCol} flex="0 0 auto" mr="3px">
                        Posted by
                      </Text>
                      {/* User Badge */}{' '}
                      <Flex
                        alignItems="center"
                        display="inline-flex"
                        justifyContent="center"
                        verticalAlign="middle"
                        mr="4px"
                      >
                        <Image
                          h="14px"
                          verticalAlign="middle"
                          src="https://picsum.photos/200?random=1"
                        />
                      </Flex>
                      <Flex
                        alignItems="center"
                        display="inline-flex"
                        justifyContent="center"
                        verticalAlign="middle"
                        mr="4px"
                      >
                        <Image
                          h="14px"
                          verticalAlign="middle"
                          src="https://picsum.photos/200?random=2"
                        />
                      </Flex>
                      {/* User Name */}
                      <Box display="inline-block" flex="0 0 auto">
                        <Box>
                          <Link
                            _hover={{
                              textDecoration: 'underline',
                            }}
                            color={props.misCol}
                            fontWeight="700"
                            mr="3px"
                            textDecor="none"
                            fontSize="12px"
                            lineHeight="16px"
                          >
                            {`u/${props.post?.author?.displayName}`}
                          </Link>
                        </Box>
                      </Box>
                      {/* date/time */}
                      <Tooltip
                        fontSize="10px"
                        label={props?.post?.timestamp * 1000}
                        aria-label="date tooltip"
                        placement="top"
                      >
                        <Text
                          color={props.misCol}
                          mr="3px"
                          textDecor="none"
                          display="inline-block"
                          flex="0 0 auto"
                        >
                          {dateToNow(parseInt(props?.post?.timestamp * 1000))}
                        </Text>
                      </Tooltip>
                    </Flex>
                  </Flex>
                </Skeleton>
              </Flex>
            </Box>
            <Flex
              alignItems="center"
              flex="0 0 72px"
              justifyContent="flex-end"
              height="100%"
              ml="4px"
              paddingRight="4px"
            >
              <Link
                width="max-content"
                borderRadius="2px"
                fontSize="12px"
                fontWeight="700"
                lineHeight="16px"
                padding="4px"
                boxSizing="border-box"
                _hover={{
                  bg: props.inputBg,
                }}
              >
                <Icon
                  as={BsChat}
                  width="20px"
                  height="20px"
                  verticalAlign="middle"
                  fontWeight="400"
                  mr="6px"
                />
                <span>{props?.post?.replyCount}</span>
              </Link>
              <Box>
                <Box
                  borderRadius="2px"
                  height="24px"
                  display="inline-block"
                  verticalAlign="middle"
                  cursor="pointer"
                  lineHeight="0"
                  padding="0 4px"
                  width="100%"
                  bg="transparent"
                  border="none"
                  color="inherit"
                  _hover={{
                    bg: props.inputBg,
                  }}
                >
                  <Icon alignSelf="middle" as={FiMoreHorizontal} width="20px" height="20px" />
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {props.showContent ? (
        <Box bg={props.mainBg} height="100%">
          <Box padding="5px 16px 5px 8px" maxWidth="800px">
            <Box
              color={props.voteColor}
              fontSize="14px"
              fontWeight="400"
              lineHeight="21px"
              wordBreak="break-word"
              overflow="auto"
              paddingBottom="1px"
              marginBottom="-1px"
            >
              {props?.post?.content}
            </Box>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

const Post = ({ type, post, mode, loading }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const inactiveSubTitle = useColorModeValue('lightText', 'darkText1');
  const subPledditTextColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const postTransBg = useColorModeValue('lightPostTransBg', 'darkPostTransBg');
  const voteColor = useColorModeValue('lightVoteText', 'darkVoteTest');
  const iconBg = useColorModeValue('lightIconBg', 'darkIconBg');
  const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
  const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
  const shadow = useColorModeValue('lightShadow', 'darkShadow2');
  const statusColor = useColorModeValue('lightVoteText', 'fff');
  const [vote] = useState(+post?.upvoteCount - +post?.downvoteCount);
  const [voteMode, setVoteMode] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const toast = useToast();
  const { publishVote } = useAccountsActions();

  const getChallengeAnswersFromUser = async (challenges) => {
    const { value } = await Swal.fire({
      background: '#eff4f7',
      input: 'text',
      text: 'Complete the challenge',
      imageUrl: `data:image/png;base64,  ${challenges?.challenges[0].challenge}`,
      imageWidth: '80%',
    });
    if (value) {
      return value;
    }
  };

  const onChallengeVerification = (challengeVerification, comment) => {
    // if the challengeVerification fails, a new challenge request will be sent automatically
    // to break the loop, the user must decline to send a challenge answer
    // if the subplebbit owner sends more than 1 challenge for the same challenge request, subsequents will be ignored
    toast({
      title: 'Accepted.',
      description: 'Action accepted',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    console.log('challenge verified', challengeVerification, comment);
  };
  const onChallenge = async (challenges, comment) => {
    let challengeAnswers = [];

    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      console.log(error);
      toast({
        title: 'Declined.',
        description: 'Action Declined',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    console.log(challengeAnswers, comment);
    if (challengeAnswers) {
      await comment.publishChallengeAnswers(challengeAnswers);
    }
  };

  const handleVote = (vote) => {
    publishVote({
      vote,
      commentCid: post?.cid,
      subplebbitAddress: post?.subplebbitAddress,
      onChallenge,
      onChallengeVerification,
    });
  };

  return (
    <Box>
      <Box>
        {/* card */}
        {mode === 'card' && (
          <CardPost
            mainBg={mainBg}
            subPlebbitSubTitle={subPlebbitSubTitle}
            inactiveSubTitle={inactiveSubTitle}
            subPledditTextColor={subPledditTextColor}
            border1={border1}
            inputBg={inputBg}
            iconColor={iconColor}
            postTransBg={postTransBg}
            voteColor={voteColor}
            iconBg={iconBg}
            misCol={misCol}
            statusBg={statusBg}
            statusColor={statusColor}
            vote={vote}
            voteMode={voteMode}
            setVoteMode={setVoteMode}
            type={type}
            post={post}
            loading={loading}
            onOpen={onOpen}
            handleVote={handleVote}
          />
        )}
        {/* classic */}
        {mode === 'classic' && (
          <ClassicPost
            mainBg={mainBg}
            subPlebbitSubTitle={subPlebbitSubTitle}
            inactiveSubTitle={inactiveSubTitle}
            border1={border1}
            border2={border2}
            inputBg={inputBg}
            iconColor={iconColor}
            postTransBg={postTransBg}
            voteColor={voteColor}
            iconBg={iconBg}
            misCol={misCol}
            statusBg={statusBg}
            shadow={shadow}
            statusColor={statusColor}
            vote={vote}
            voteMode={voteMode}
            setVoteMode={setVoteMode}
            showContent={showContent}
            setShowContent={setShowContent}
            type={type}
            post={post}
            loading={loading}
            onOpen={() => onOpen()}
            handleVote={handleVote}
          />
        )}
        {/* compact */}
        {mode === 'compact' && (
          <CompactPost
            mainBg={mainBg}
            subPlebbitSubTitle={subPlebbitSubTitle}
            inactiveSubTitle={inactiveSubTitle}
            border2={border2}
            inputBg={inputBg}
            iconColor={iconColor}
            postTransBg={postTransBg}
            voteColor={voteColor}
            iconBg={iconBg}
            misCol={misCol}
            statusBg={statusBg}
            statusColor={statusColor}
            vote={vote}
            voteMode={voteMode}
            setVoteMode={setVoteMode}
            showContent={showContent}
            setShowContent={setShowContent}
            type={type}
            post={post}
            loading={loading}
            onOpen={onOpen}
            handleVote={handleVote}
          />
        )}
      </Box>
      {isOpen && <PostDetail isOpen={isOpen} onOpen={onOpen} onClose={onClose} post={post} />}
    </Box>
  );
};
export default Post;
