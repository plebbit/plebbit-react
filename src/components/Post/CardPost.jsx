import React, { useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Skeleton,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { RiCopperCoinLine } from 'react-icons/ri';
import {
  BsChat,
  BsBookmark,
  BsEyeSlash,
  BsPencil,
  BsChatSquare,
  BsShield,
  BsPinAngleFill,
} from "react-icons/bs";
import { GoGift } from "react-icons/go";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FiMoreHorizontal, FiExternalLink } from "react-icons/fi";
import DropDown from "../../components/DropDown";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FiShare } from "react-icons/fi";
import { Link as ReactLink, useHistory } from "react-router-dom";
import dateToFromNowDaily from "../../utils/formatDate";
import numFormatter from "../../utils/numberFormater";
import { ProfileContext } from "../../store/profileContext";
import getUserName, { getSubName } from "../../utils/getUserName";
import Marked from "../Editor/marked";
import Avatar from "../Avatar";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { HiLockClosed, HiOutlineCheckCircle } from "react-icons/hi";

const CardPost = ({
  post,
  handleVoting,
  vote,
  postVotes,
  loading,
  type,
  detail,
  handleOption,
  location,
  copied,
  isOnline,
  subPlebbit: sub,
  handleCopy,
  pending,
  detailRoute,
  allowedSpecial,
  openRemovalModal,
  owner,
  showSpoiler,
  setShowSpoiler,
  mediaInfo,
}) => {
  const mainBg = useColorModeValue("lightBody", "darkBody");
  const subPlebbitSubTitle = useColorModeValue("metaTextLight", "metaTextDark");
  const inactiveSubTitle = useColorModeValue("lightText", "darkText1");
  const subPledditTextColor = useColorModeValue(
    "bodyTextLight",
    "bodyTextDark"
  );
  const border1 = useColorModeValue("#ccc", "#343536");
  const inputBg = useColorModeValue("lightInputBg", "darkInputBg");
  const iconColor = useColorModeValue("lightIcon", "darkIcon");
  const postTransBg = useColorModeValue("lightPostTransBg", "darkPostTransBg");
  const voteColor = useColorModeValue("lightVoteText", "darkVoteTest");
  const iconBg = useColorModeValue("lightIconBg", "darkIconBg");
  const approveColor = useColorModeValue("pastelGreen", "pastelGreen");
  const removeColor = useColorModeValue("persimmon", "persimmon");
  const lockColor = useColorModeValue("brightSun", "brightSun");
  const misCol = useColorModeValue("rgb(120, 124, 126)", "rgb(129, 131, 132)");
  const statusBg = useColorModeValue("rgb(237, 239, 241);", "rgb(52, 53, 54)");
  const statusColor = useColorModeValue("lightVoteText", "fff");
  const mobileMainColor = useColorModeValue(
    "lightMobileText",
    "darkMobileText"
  );
  const mainMobileBg = useColorModeValue("white", "black");
  const postHeadColor = useColorModeValue("#1a1a1b", "#0079d3");
  const border2 = useColorModeValue("#edeff1", "#343536");
  const mobileIconColor = useColorModeValue(
    "lightMobileIcon2",
    "darkMobileIcon"
  );
  const postBg = useColorModeValue(
    "lightCommunityThemePost",
    "darkCommunityThemePost"
  );
  const history = useHistory();
  const subPlebbit = sub || { address: post?.subplebbitAddress };

  const { device } = useContext(ProfileContext);
  return (
    <>
      { device !== "mobile" ? (
        <Box
          borderRadius="4px"
          paddingLeft="40px"
          cursor="pointer"
          transition="color .5s,fill .5s,box-shadow .5s"
          mb="10px"
          border={ `1px solid ${border1}` }
          bg={ postTransBg }
          color={ iconColor }
          position="relative"
          _hover={ { border: "1px solid #898989" } }
        >
          {/* Vote Bar */ }
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
                  _hover={ {
                    bg: iconBg,
                    color: "upvoteOrange",
                  } }
                  _focus={ {
                    outline: "none",
                  } }
                  onClick={ () => {
                    handleVoting(vote === 1 ? 0 : 1);
                  } }
                  color={ vote === 1 ? "upvoteOrange" : iconColor }
                >
                  <Icon
                    width="20px"
                    height="20px"
                    fontSize="20px"
                    fontWeight="400"
                    as={ vote === 1 ? ImArrowUp : BiUpvote }
                  />
                </Box>
              </Box>
              <Box
                color={ voteColor }
                margin="4px 0"
                fontSize="12px"
                fontWeight="700"
                lineHeight="16px"
                pointerEvents="none"
                wordBreak="normal"
              >
                <Skeleton isLoaded={ !loading }>
                  { postVotes === 0 ? "vote" : numFormatter(postVotes) }
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
                  color={ vote === -1 ? "downvoteBlue" : iconColor }
                  display="inline-block"
                  overflow="hidden"
                  h="24px"
                  w="24px"
                  fontSize="16px"
                  lineHeight="24px"
                  _hover={ {
                    bg: iconBg,
                    color: "downvoteBlue",
                  } }
                  _focus={ {
                    outline: "none",
                  } }
                  onClick={ () => {
                    handleVoting(vote === -1 ? 0 : -1);
                  } }
                >
                  <Icon
                    width="20px"
                    height="20px"
                    fontSize="20px"
                    fontWeight="400"
                    as={ vote === -1 ? ImArrowDown : BiDownvote }
                  />
                </Box>
              </Box>
            </Flex>
          </Flex>

          <Box bg={ mainBg } position="relative" paddingTop="8px">
            <ReactLink
              textDecoration="none"
              sx={ {
                textDecoration: "none !important",
              } }
              to={ detailRoute }
            >
              <Flex paddingBottom="8px">
                <Flex
                  flexDir="column"
                  flex="1 1 100%"
                  paddingBottom="22px"
                  position="relative"
                  wordBreak="break-word"
                >
                  {/* Pin Head */ }
                  { post?.pinned && (
                    <Flex
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      flexFlow="row nowrap"
                      alignItems="start"
                      margin="0 8px 8px"
                      position="relative"
                    >
                      <Skeleton mb="8px" isLoaded={ !loading }>
                        <Flex
                          alignItems="center"
                          flexWrap="wrap"
                          flex="1 1 auto"
                          overflow="hidden"
                        >
                          <Flex
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                            alignItems="center"
                            flexFlow="row wrap"
                          >
                            <Icon
                              width="20px"
                              height="20px"
                              as={ BsPinAngleFill }
                              mr="4px"
                            />
                            <Text
                              fontWeight="700"
                              fontSize="10px"
                              lineHeight="12px"
                              letterSpacing=".5px"
                              color={ misCol }
                              flex="0 0 auto"
                              mr="3px"
                            >
                              PINNED BY MODERATORS
                            </Text>{ " " }
                          </Flex>
                        </Flex>
                      </Skeleton>
                    </Flex>
                  ) }{ " " }
                  {/* Post Head */ }
                  <Flex
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    flexFlow="row nowrap"
                    alignItems="start"
                    margin="0 8px 8px"
                    position="relative"
                  >
                    <Skeleton mb="8px" isLoaded={ !loading }>
                      <Flex
                        alignItems="center"
                        flexWrap="wrap"
                        flex="1 1 auto"
                        overflow="hidden"
                      >
                        <Flex
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          alignItems="center"
                          flexFlow="row wrap"
                        >
                          { type !== "subPlebbit" ? (
                            <>
                              <Avatar
                                avatar={ subPlebbit?.avatar }
                                width={ 24 }
                                height={ 24 }
                                mr="8px"
                                badge
                                isOnline={ isOnline }
                                mb="5px"
                              />

                              <Link
                                as={ ReactLink }
                                to={ `p/${post?.subplebbitAddress}` }
                                color={ subPledditTextColor }
                                fontSize="12px"
                                fontWeight="700"
                                display="inline"
                                lineHeight="20px"
                                textDecoration="none"
                              >
                                { getSubName(subPlebbit) }
                              </Link>
                              <Box
                                verticalAlign="middle"
                                color={ subPlebbitSubTitle }
                                fontSize="6px"
                                lineHeight="20px"
                                margin="0 5px"
                              />
                            </>
                          ) : (
                            ""
                          ) }
                          <Text color={ misCol } flex="0 0 auto" mr="3px">
                            Posted by
                          </Text>

                          {/* User Name */ }
                          <Text
                            as={ ReactLink }
                            _hover={ {
                              textDecoration: "underline",
                            } }
                            color={ misCol }
                            fontWeight="400"
                            mr="3px"
                            textDecoration="none"
                            fontSize="12px"
                            lineHeight="16px"
                            overflow="hidden"
                          >
                            { getUserName(post?.author) }
                          </Text>
                          {/* status */ }
                          { post?.author?.flair && (
                            <Box display="inline" verticalAlign="text-top">
                              <Text
                                bg={ statusBg }
                                color={ statusColor }
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
                                { post?.author?.flair?.text }
                              </Text>
                            </Box>
                          ) }

                          {/* tips */ }

                          {/* date/time */ }
                          <Tooltip
                            fontSize="10px"
                            label={ dateToFromNowDaily(
                              parseInt(post?.timestamp * 1000)
                            ) }
                            aria-label="date tooltip"
                            placement="top"
                          >
                            <Text
                              color={ misCol }
                              mr="3px"
                              textDecor="none"
                              display="inline-block"
                              flex="0 0 auto"
                            >
                              { dateToFromNowDaily(
                                parseInt(post?.timestamp * 1000)
                              ) }
                            </Text>
                          </Tooltip>
                          { post?.locked && (
                            <Icon as={ HiLockClosed } color={ lockColor } />
                          ) }
                          { post?.removed && (
                            <Flex
                              cursor="pointer"
                              color={ removeColor }
                              alignItems="center"
                              onClick={ () =>
                                post?.moderatorReason ? openRemovalModal() : {}
                              }
                            >
                              <Icon as={ TiDeleteOutline } />
                              { !post?.moderatorReason ? (
                                allowedSpecial && (
                                  <Box>Add A removal reason</Box>
                                )
                              ) : (
                                <Tooltip
                                  fontSize="10px"
                                  label="removal reason"
                                  aria-label="removal reason"
                                  placement="top"
                                >
                                  <Text
                                    color={ misCol }
                                    mr="3px"
                                    textDecor="none"
                                    display="inline-block"
                                    flex="0 0 auto"
                                  >
                                    { post?.moderatorReason }
                                  </Text>
                                </Tooltip>
                              ) }
                            </Flex>
                          ) }
                        </Flex>
                      </Flex>
                    </Skeleton>
                  </Flex>{ " " }
                  {/* Post Title */ }
                  <Box
                    margin="0 8px"
                    onClick={ () => history.push(detailRoute, []) }
                  >
                    <Skeleton isLoaded={ !loading }>
                      {/* flair */ }
                      { type === "subPlebbit" && post?.flair?.text.length ? (
                        <Tag
                          bg={ post?.flair?.backgroundColor }
                          color={ post?.flair?.textColor }
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
                          { post?.flair?.text }
                        </Tag>
                      ) : (
                        ""
                      ) }
                      <Text
                        display="inline"
                        color={ inactiveSubTitle }
                        fontSize="18px"
                        fontWeight="500"
                        lineHeight="22px"
                        paddingRight="5px"
                        textDecor="none"
                        wordBreak="break-word"
                      >
                        { post?.title }
                      </Text>
                      { type !== "subPlebbit" && post?.flair?.text ? (
                        <Tag
                          bg={ post?.flair?.backgroundColor }
                          color={ post?.flair?.textColor }
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
                          { post?.flair?.text }
                        </Tag>
                      ) : (
                        ""
                      ) }
                      { post?.spoiler && (
                        <Tag
                          borderRadius="2px"
                          p="1px 8px"
                          mr="5px"
                          variant="outline"
                          colorScheme="blackAlpha"
                        >
                          SPOILER
                        </Tag>
                      ) }

                      { pending && (
                        <Skeleton isLoaded={ !loading }>
                          <Tag size="sm" colorScheme="yellow" variant="outline">
                            Pending
                          </Tag>
                        </Skeleton>
                      ) }
                    </Skeleton>
                  </Box>
                  {/* Post Body */ }
                  <Box mt="8px">
                    { post?.content && (
                      <Box
                        maxH="250px"
                        overflow="hidden"
                        padding="5px 8px 10px"
                        sx={ {
                          maskImage:
                            "linear-gradient(180deg, #000 60%, transparent)",
                        } }
                      >
                        <Skeleton mt="20px" isLoaded={ !loading }>
                          <Box
                            color={ voteColor }
                            fontFamily="Noto sans, Arial, sans-serif"
                            fontSize="14px"
                            fontWeight="400"
                            lineHeight="21px"
                            wordBreak="break-word"
                            paddingBottom="1px"
                            marginBottom="-1px"
                          >
                            { post?.spoiler ? (
                              ""
                            ) : post?.removed ? (
                              "[removed]"
                            ) : (
                              <Marked content={ post?.content } />
                            ) }
                          </Box>
                        </Skeleton>
                      </Box>
                    ) }
                    {/* Post url */ }

                    <Flex mt="0">
                      { post?.link && post?.thumbnailUrl && (
                        <Link
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          margin="4px 8px"
                          whiteSpace="nowrap"
                          color="mainBlue"
                          display="flex"
                          href={ post?.link }
                          alignItems="flex-end"
                          isExternal
                        >
                          <Box>{ post?.link?.substring(0, 20) + "..." }</Box>
                          <Icon
                            as={ FiExternalLink }
                            verticalAlign="middle"
                            fontWeight="400"
                            width="20px"
                            height="20px"
                            fontSize="12px"
                            paddingLeft="4px"
                          />
                        </Link>
                      ) }
                    </Flex>

                    { mediaInfo?.type === "image" && (
                      <Image
                        maxH="512px"
                        margin="0 auto"
                        maxW="100%"
                        overflow="hidden"
                        bg={ postBg }
                        src={ post?.link }
                        onError={ (event) =>
                          (event.target.style.display = "none")
                        }
                      />
                    ) }

                    { mediaInfo?.type === "video" && (
                      <Box
                        bg="black"
                        maxHeight="512px"
                        width="100%"
                        maxW="100%"
                        color="#fff"
                      >
                        <video
                          autoPlay
                          playsInline
                          preload="auto"
                          controls
                          style={ {
                            objectFit: "contain",
                            width: "100% !important",
                            overflowClipMargin: "content-box",
                            overflow: "clip",
                          } }
                          onError={ (event) =>
                            (event.target.style.display = "none")
                          }
                          muted
                        >
                          <source src={ post?.link } />
                        </video>
                      </Box>
                    ) }

                    { mediaInfo?.type === "audio" && (
                      <Box maxW="100%" color="#fff" margin="4px 8px">
                        <audio
                          preload="auto"
                          src={ post?.link }
                          onError={ (event) =>
                            (event.target.style.display = "none")
                          }
                          controls
                          style={ {
                            width: "100%",
                          } }
                        >
                          <source src={ post?.link } />
                        </audio>
                      </Box>
                    ) }
                  </Box>
                </Flex>
                {/* Post thumbnail */ }
                { post?.thumbnailUrl && (
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
                      <Skeleton isLoaded={ !loading }>
                        { " " }
                        <Link href={ post?.link }>
                          <Image
                            fallbackSrc={ require("../../assets/images/fallback.png") }
                            borderColor="mainBlue"
                            border="1px solid #0079d3;"
                            src={ post?.thumbnailUrl }
                            width="100%"
                            height="100%"

                          />
                        </Link>
                      </Skeleton>
                    </Box>
                  </Flex>
                ) }
              </Flex>
            </ReactLink>

            {/* Post Footer */ }
            { pending ? (
              !loading && <Flex />
            ) : /* <Flex alignItems="center" height="40px" paddingRight="10px" overflowY="visible">
                  <Flex
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="16px"
                    alignItems="stretch"
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
                        backgroundColor: inputBg,
                      }}
                      onClick={() => handleOption('Edit')}
                    >
                      <Icon
                        as={BsPencil}
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
                        Edit
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
                        backgroundColor: inputBg,
                      }}
                      onClick={() => handleOption('Delete')}
                    >
                      <Icon
                        as={TiDeleteOutline}
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
                        Delete
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
                        backgroundColor: inputBg,
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
                  </Flex>
                </Flex> */

              allowedSpecial ? (
                <Flex
                  alignItems="center"
                  height="40px"
                  paddingRight="10px"
                  overflowY="visible"
                >
                  <Flex
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="16px"
                    alignItems="stretch"
                    padding="0 8px 0 4px"
                    flexGrow="1"
                  >
                    <ReactLink to={ detailRoute }>
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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                      >
                        <Icon
                          as={ BsChatSquare }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          { post?.replyCount }
                        </Text>
                      </Flex>
                    </ReactLink>
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
                      _hover={ {
                        backgroundColor: inputBg,
                      } }
                    >
                      <Icon
                        as={ GoGift }
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                        fontWeight="400"
                        mr="6px"
                      />
                      <Text
                        display="inline-block"
                        lineHeight={ 1 }
                        textTransform="capitalize"
                        verticalAlign="middle"
                      >
                        Award
                      </Text>
                    </Flex>
                    <CopyToClipboard text={ location } onCopy={ handleCopy }>
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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                      >
                        <Icon
                          as={ FaShare }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          { copied ? "copied" : "Share" }
                        </Text>
                      </Flex>
                    </CopyToClipboard>

                    { post?.removed ? (
                      <Flex
                        _hover={ {
                          bg: inputBg,
                        } }
                        alignItems="center"
                        mr="4px"
                        margin="4px 8px 4px 0"
                        padding="4px"
                        borderRadius="2px"
                        cursor="pointer"
                        color={ approveColor }
                        onClick={ () => handleOption({ id: "approved" }) }
                      >
                        <Icon
                          height="20px"
                          width="20px"
                          as={ HiOutlineCheckCircle }
                        />
                        <Box ml="4px">Approve</Box>
                      </Flex>
                    ) : (
                      <Flex
                        _hover={ {
                          bg: inputBg,
                        } }
                        alignItems="center"
                        mr="4px"
                        margin="4px 8px 4px 0"
                        padding="4px"
                        borderRadius="2px"
                        cursor="pointer"
                        color={ removeColor }
                        onClick={ () => handleOption({ id: "removed" }) }
                      >
                        <Icon height="20px" width="20px" as={ TiDeleteOutline } />
                        <Box ml="4px">Remove</Box>
                      </Flex>
                    ) }

                    <Flex justifyContent="center">
                      <DropDown
                        onChange={ handleOption }
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
                            _hover={ {
                              backgroundColor: inputBg,
                            } }
                          >
                            <Icon
                              as={ BsShield }
                              color={ iconColor }
                              h="20px"
                              w="20px"
                            />
                          </Flex>
                        }
                        options={ [
                          {
                            label: "Sticky Post",
                            icon: post?.pinned
                              ? MdCheckBox
                              : MdCheckBoxOutlineBlank,
                            id: "pinned",
                          },
                          {
                            label: "Lock Comments",
                            icon: post?.locked
                              ? MdCheckBox
                              : MdCheckBoxOutlineBlank,
                            id: "locked",
                          },
                          {
                            label: "Mark As Spoiler",
                            icon: post?.spoiler
                              ? MdCheckBox
                              : MdCheckBoxOutlineBlank,
                            id: "spoiler",
                          },
                        ] }
                        rightOffset={ 0 }
                        leftOffset="none"
                        topOffset="34px"
                      />
                    </Flex>
                    <Flex justifyContent="center">
                      <DropDown
                        onChange={ handleOption }
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
                            _hover={ {
                              backgroundColor: inputBg,
                            } }
                          >
                            <Icon
                              as={ FiMoreHorizontal }
                              color={ iconColor }
                              h="20px"
                              w="20px"
                            />
                          </Flex>
                        }
                        options={ [
                          {
                            label: "Block author",
                            icon: BsEyeSlash,
                            id: "block",
                            disabled: owner,
                          },
                          {
                            label: "Delete",
                            icon: MdOutlineDeleteOutline,
                            id: "delete",
                            disabled: !owner,
                          },
                        ] }
                        rightOffset={ 0 }
                        leftOffset="none"
                        topOffset="34px"
                      />
                    </Flex>
                  </Flex>
                </Flex>
              ) : (
                <Flex
                  alignItems="center"
                  height="40px"
                  paddingRight="10px"
                  overflowY="visible"
                >
                  <Flex
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="16px"
                    alignItems="stretch"
                    padding="0 8px 0 4px"
                    flexGrow="1"
                  >
                    <ReactLink to={ detailRoute }>
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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                      >
                        <Icon
                          as={ BsChat }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          { post?.replyCount } comment
                          { post?.replyCount === 1 ? "" : "s" }
                        </Text>
                      </Flex>
                    </ReactLink>
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
                      _hover={ {
                        backgroundColor: inputBg,
                      } }
                    >
                      <Icon
                        as={ GoGift }
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                        fontWeight="400"
                        mr="6px"
                      />
                      <Text
                        display="inline-block"
                        lineHeight={ 1 }
                        textTransform="capitalize"
                        verticalAlign="middle"
                      >
                        Award
                      </Text>
                    </Flex>
                    <CopyToClipboard text={ location } onCopy={ handleCopy }>
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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                      >
                        <Icon
                          as={ FaShare }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          { copied ? "copied" : "Share" }
                        </Text>
                      </Flex>
                    </CopyToClipboard>

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
                      _hover={ {
                        backgroundColor: inputBg,
                      } }
                    >
                      <Icon
                        as={ BsBookmark }
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                        fontWeight="400"
                        mr="6px"
                      />
                      <Text
                        display="inline-block"
                        lineHeight={ 1 }
                        textTransform="capitalize"
                        verticalAlign="middle"
                      >
                        Save
                      </Text>
                    </Flex>
                    <Flex justifyContent="center">
                      <DropDown
                        onChange={ handleOption }
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
                            _hover={ {
                              backgroundColor: inputBg,
                            } }
                          >
                            <Icon
                              as={ FiMoreHorizontal }
                              color={ iconColor }
                              h="20px"
                              w="20px"
                            />
                          </Flex>
                        }
                        options={ [
                          {
                            label: "Block author",
                            icon: BsEyeSlash,
                            id: "block",
                            disabled: owner,
                          },
                          {
                            label: "Delete",
                            icon: MdOutlineDeleteOutline,
                            id: "delete",
                            disabled: !owner,
                          },
                        ] }
                      />
                    </Flex>
                  </Flex>
                </Flex>
              ) }
          </Box>
        </Box>
      ) : (
        <Box>
          <Box position="relative" bg={ mainMobileBg }>
            {/* Background link */ }
            <Link
              as={ ReactLink }
              to={ detailRoute }
              bottom="0"
              left="0"
              pointerEvents="all"
              position="absolute"
              right="0"
              top="0"
            />
            {/*Header */ }
            <Box pointerEvents={ detail ? "all" : "none" } position="relative">
              <Box paddingTop="0">
                <Flex alignItems="center">
                  <Box
                    color="#a5a4a4"
                    maxW="100%"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    position="relative"
                    verticalAlign="middle"
                    flex="1 0"
                    _after={ {
                      background:
                        "linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff 70%)",
                      content: `""`,
                      top: "0",
                      right: "0",
                      bottom: "0",
                      width: "3em",
                    } }
                    mr="auto"
                  >
                    <Box
                      color="#798389"
                      fontSize="14px"
                      lineHeight="18px"
                      paddingBottom="4px"
                      overflow="hidden"
                      paddingRight="3em"
                      padding="8px 16px"
                    >
                      <Flex alignItems="center" flexWrap="wrap">
                        <Flex
                          alignItems="center"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="18px"
                          color={ postHeadColor }
                          mb="4px"
                        >
                          <Avatar
                            avatar={ subPlebbit?.avatar }
                            width={ 24 }
                            height={ 24 }
                            mr="8px"
                            badge
                            isOnline={ isOnline }
                          />
                          <Skeleton isLoaded={ !loading }>
                            { getSubName(
                              subPlebbit || { address: post?.subplebbitAddress }
                            ) }
                          </Skeleton>
                        </Flex>

                        <Box mx="4px" mb="4px">
                          <Skeleton isLoaded={ !loading }>
                            { dateToFromNowDaily(post?.timestamp * 1000) }
                          </Skeleton>
                        </Box>
                        { pending && (
                          <Skeleton isLoaded={ !loading }>
                            <Tag
                              mb="4px"
                              size="sm"
                              colorScheme="yellow"
                              variant="outline"
                            >
                              Pending
                            </Tag>
                          </Skeleton>
                        ) }
                      </Flex>
                    </Box>
                  </Box>
                  <Flex alignItems="center" alignSelf="flex-start">
                    <Flex
                      padding="10px 2px"
                      flex="0 0 auto"
                      alignSelf="flex-start"
                      whiteSpace="nowrap"
                      ml="auto"
                    >
                      { post?.pinned && (
                        <Icon as={ BsPinAngleFill } color={ approveColor } />
                      ) }
                      { post?.locked && (
                        <Icon as={ HiLockClosed } color={ lockColor } />
                      ) }
                      { post?.removed && (
                        <Icon as={ AiTwotoneDelete } color={ removeColor } />
                      ) }
                    </Flex>
                    { !pending && (
                      <Box pointerEvents="all">
                        <DropDown
                          onChange={ handleOption }
                          rightOffset="10px"
                          leftOffset="none"
                          dropDownTitle={
                            <Box
                              pointerEvents="all"
                              color="#565758"
                              padding="8px 16px 8px 2px"
                              verticalAlign="middle"
                            >
                              <Icon
                                as={ FiMoreHorizontal }
                                verticalAlign="inherit"
                                height={ 5 }
                                w={ 5 }
                              />
                            </Box>
                          }
                          options={ [
                            {
                              label: "Edit",
                              icon: BsPencil,
                              id: "edit",
                              disabled: !(owner && detail),
                            },
                            {
                              label: "Approve",
                              icon: HiOutlineCheckCircle,
                              id: "approved",
                              disabled: !(allowedSpecial && post?.removed),
                              color: approveColor,
                            },
                            {
                              label: "Remove",
                              icon: TiDeleteOutline,
                              id: "removed",
                              disabled: !(allowedSpecial && !post?.removed),
                              color: removeColor,
                            },
                            {
                              label: "Block Author",
                              icon: BsEyeSlash,
                              id: "block",
                              disabled: owner,
                            },
                            {
                              label: "Delete",
                              icon: MdOutlineDeleteOutline,
                              id: "delete",
                              disabled: !owner,
                            },
                          ] }
                        />
                      </Box>
                    ) }
                  </Flex>
                </Flex>
                <Box padding="0 16px 8px">
                  { post?.spoiler && (
                    <Tag
                      borderRadius="2px"
                      p="1px 8px"
                      mr="5px"
                      variant="solid"
                      colorScheme="blackAlpha"
                    >
                      SPOILER
                    </Tag>
                  ) }
                </Box>
                <Box
                  color={ mobileMainColor }
                  fontSize="16px"
                  fontWeight="500"
                  margin="0"
                  overflowX="hidden"
                  padding="0 16px"
                >
                  <Skeleton isLoaded={ !loading }>{ post?.title }</Skeleton>
                </Box>
                { detail && <Box padding="0 16px 8px">
                  { post?.flair?.text ? (
                    <Tag
                      borderRadius="20px"
                      p="2px 8px"
                      mr="5px"
                      background={ post?.flair?.backgroundColor }
                      color={ post?.flair?.textColor }
                    >
                      { post?.flair.text }
                    </Tag>
                  ) : null }
                </Box> }
              </Box>
            </Box>
            <Box marginTop="8px" >
              <>
                { detail ?
                  <>
                    {
                      (showSpoiler ? (
                        <Flex alignItems="center" justifyContent="center">
                          <Button
                            variant="outline"
                            colorScheme="blackAlpha"
                            padding="10px 20px"
                            onClick={ () => setShowSpoiler(false) }
                            borderRadius="none"
                            fontWeight="400"
                            my="10px"
                          >
                            CLICK TO SEE SPOILER
                          </Button>
                        </Flex>
                      ) : (
                        <Box
                          color={ subPledditTextColor }
                          padding="5px 8px 10px"
                          fontFamily="Noto sans, Arial, sans-serif"
                          fontSize="14px"
                          fontWeight="400"
                          lineHeight="21px"
                          wordBreak="break-word"
                          overflow="hidden"
                        >
                          { post?.content ? (
                            <Marked content={ post?.content } />
                          ) : (
                            <Skeleton isLoaded={ !loading }>
                              <Box pt="10%" >
                                {
                                  post?.thumbnailUrl && post?.link &&
                                  <Box
                                    maxH="318px"
                                    margin="0 auto"
                                    maxW="100%"
                                    pos="relative"
                                  >
                                    <Box height="100%" width="100%">
                                      <Image
                                        maxH="318px"
                                        objectFit="cover"
                                        maxW="100%"
                                        overflow="hidden"
                                        bg={ postBg }
                                        src={ post?.thumbnailUrl }
                                        onError={ (event) =>
                                          (event.target.style.display = "none")
                                        }
                                        fallbackSrc={ require("../../assets/images/fallback.png") }


                                      />

                                    </Box>

                                    <Link href={ post?.link } isExternal color="#fff" padding="5px 12px" fontSize="12px" left="0" bottom="0" right="0" background="rgba(0,0,0,.7)" position="absolute" >{ post?.link?.substring(0, 20) + "..." }</Link>

                                  </Box>
                                }
                                { mediaInfo?.type === "image" && (
                                  <Image
                                    maxH="320px"
                                    margin="0 auto"
                                    maxW="100%"
                                    overflow="hidden"
                                    bg={ postBg }
                                    src={ post?.link }
                                    onError={ (event) =>
                                      (event.target.style.display = "none")
                                    }
                                  />
                                ) }

                                { mediaInfo?.type === "video" && (
                                  <Box
                                    bg="black"
                                    maxHeight="320px"
                                    width="100%"
                                    maxW="100%"
                                    color="#fff"
                                  >
                                    <video
                                      autoPlay
                                      playsInline
                                      preload="auto"
                                      controls
                                      style={ {
                                        objectFit: "contain",
                                        width: "100% !important",
                                        overflowClipMargin: "content-box",
                                        overflow: "clip",
                                      } }
                                      onError={ (event) =>
                                        (event.target.style.display = "none")
                                      }
                                      muted
                                    >
                                      <source src={ post?.link } />
                                    </video>
                                  </Box>
                                ) }

                                { mediaInfo?.type === "audio" && (
                                  <Box maxW="100%" color="#fff" margin="4px 8px">
                                    <audio
                                      preload="auto"
                                      src={ post?.link }
                                      onError={ (event) =>
                                        (event.target.style.display = "none")
                                      }
                                      controls
                                      style={ {
                                        width: "100%",
                                      } }
                                    >
                                      <source src={ post?.link } />
                                    </audio>
                                  </Box>
                                ) }
                              </Box>
                            </Skeleton>
                          ) }
                        </Box>
                      ))
                    }
                  </> : <>
                    <Box pt="10%" >
                      {
                        post?.thumbnailUrl && post?.link &&
                        <Box
                          maxH="318px"
                          margin="0 auto"
                          maxW="100%"
                          pos="relative"
                        >
                          <Box height="100%" width="100%">
                            <Image
                              maxH="318px"
                              objectFit="cover"
                              width="100%"
                              bg={ postBg }
                              src={ post?.thumbnailUrl }
                              onError={ (event) =>
                                (event.target.style.display = "none")
                              }
                              fallbackSrc={ require("../../assets/images/fallback.png") }


                            />

                          </Box>

                          <Link href={ post?.link } isExternal color="#fff" padding="5px 12px" fontSize="12px" left="0" bottom="0" right="0" background="rgba(0,0,0,.7)" position="absolute" >{ post?.link?.substring(0, 20) + "..." }</Link>

                        </Box>
                      }
                      { mediaInfo?.type === "image" && (
                        <Image
                          maxH="320px"
                          margin="0 auto"
                          maxW="100%"
                          overflow="hidden"
                          bg={ postBg }
                          src={ post?.link }
                          onError={ (event) =>
                            (event.target.style.display = "none")
                          }
                        />
                      ) }

                      { mediaInfo?.type === "video" && (
                        <Box
                          bg="black"
                          maxHeight="320px"
                          width="100%"
                          maxW="100%"
                          color="#fff"
                        >
                          <video
                            autoPlay
                            playsInline
                            preload="auto"
                            controls
                            style={ {
                              objectFit: "contain",
                              width: "100% !important",
                              overflowClipMargin: "content-box",
                              overflow: "clip",
                            } }
                            onError={ (event) =>
                              (event.target.style.display = "none")
                            }
                            muted
                          >
                            <source src={ post?.link } />
                          </video>
                        </Box>
                      ) }

                      { mediaInfo?.type === "audio" && (
                        <Box maxW="100%" color="#fff" margin="4px 8px">
                          <audio
                            preload="auto"
                            src={ post?.link }
                            onError={ (event) =>
                              (event.target.style.display = "none")
                            }
                            controls
                            style={ {
                              width: "100%",
                            } }
                          >
                            <source src={ post?.link } />
                          </audio>
                        </Box>
                      ) }
                    </Box>
                  </>
                }
              </>
            </Box>
            {/* Footer */ }
            { pending ? (
              !loading && (
                <Box
                  paddingBottom="12px"
                  paddingTop="8px"
                  padding="8px 16px"
                  borderBottom={ `8px solid ${border2}` }
                  pointerEvents="none"
                  _before={ {
                    content: `" "`,
                    display: "table",
                  } }
                  _after={ {
                    clear: "both",
                    content: `" "`,
                    display: "table",
                  } }
                />
              )
            ) : allowedSpecial ? (
              <Box
                paddingBottom="12px"
                paddingTop="8px"
                padding="8px 16px"
                borderBottom={ `8px solid ${border2}` }
                pointerEvents="none"
                _before={ {
                  content: `" "`,
                  display: "table",
                } }
                _after={ {
                  clear: "both",
                  content: `" "`,
                  display: "table",
                } }
              >
                <Flex
                  flex="1"
                  float="none"
                  top="0"
                  position="relative"
                  pointerEvents="none"
                >
                  {/* vote button */ }
                  <Flex
                    border={ `1px solid ${border2}` }
                    alignItems="center"
                    borderRadius="16px"
                    flexShrink="0"
                    fontWeight="0"
                    height="32px"
                    justifyContent="center"
                    minWidth="32px"
                    fontSize="12px"
                    marginRight="10px"
                    maxWidth="110px"
                    width="auto"
                    pointerEvents="all"
                  >
                    <Flex
                      alignItems="center"
                      borderRadius="16px"
                      flexShrink="0"
                      fontWeight="500"
                      height="32px"
                      justifyContent="center"
                      width="32px"
                      minW="32px"
                      fontSize="12px"
                      fill={ vote === 1 ? "upvoteOrange" : mobileIconColor }
                      color={ vote === 1 ? "upvoteOrange" : mobileIconColor }
                      lineHeight="24px"
                      onClick={ () => {
                        handleVoting(vote === 1 ? 0 : 1);
                      } }
                    >
                      <Icon
                        fill={ vote === 1 ? "upvoteOrange" : mobileIconColor }
                        color={ vote === 1 ? "upvoteOrange" : mobileIconColor }
                        as={ vote === 1 ? ImArrowUp : BiUpvote }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                      />
                    </Flex>
                    <Box
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      fontSize="12px"
                      paddingTop="2px"
                      minW="16px"
                      lineHeight="14px"
                      textAlign="center"
                      verticalAlign="middle"
                    >
                      <Skeleton isLoaded={ !loading }>
                        { !loading
                          ? postVotes === 0
                            ? "vote"
                            : numFormatter(postVotes)
                          : "vote" }
                      </Skeleton>
                    </Box>
                    <Flex
                      alignItems="center"
                      borderRadius="16px"
                      flexShrink="0"
                      fontWeight="500"
                      height="32px"
                      justifyContent="center"
                      width="32px"
                      minW="32px"
                      fontSize="12px"
                      fill={ vote === -1 ? "downvoteBlue" : mobileIconColor }
                      color={ vote === -1 ? "downvoteBlue" : mobileIconColor }
                      lineHeight="24px"
                      onClick={ () => {
                        handleVoting(vote === -1 ? 0 : -1);
                      } }
                    >
                      <Icon
                        fill={ vote === -1 ? "downvoteBlue" : mobileIconColor }
                        color={ vote === -1 ? "downvoteBlue" : mobileIconColor }
                        as={ vote === -1 ? ImArrowDown : BiDownvote }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                      />
                    </Flex>
                  </Flex>
                  {/* award button */ }
                  <Flex
                    color={ mobileIconColor }
                    border={ `1px solid ${border2}` }
                    alignItems="center"
                    fontWeight="500"
                    height="32px"
                    justifyContent="center"
                    minW="32px"
                    width="auto"
                    fontSize="12px"
                    flexShrink="1"
                    marginRight="10px"
                    overflowX="scroll"
                    padding="0"
                    borderRadius="16px"
                    pointerEvents="all"
                  >
                    <Flex
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      alignItems="center"
                      justifyContent="center"
                      padding="1px 7px"
                    >
                      <Icon as={ GoGift } height="16px" width="16px" />
                    </Flex>
                  </Flex>
                  {/* comment button */ }
                  <Link as={ ReactLink } to={ detailRoute }>
                    <Flex
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      border={ `1px solid ${border2}` }
                      alignItems="center"
                      borderRadius="16px"
                      flexShrink="0"
                      fontWeight="500"
                      height="32px"
                      justifyContent="center"
                      minW="32px"
                      marginRight="10px"
                      padding="2px 8px 0"
                      maxW="100px"
                      pointerEvents="all"
                    >
                      <Icon
                        as={ BsChat }
                        color={ mobileIconColor }
                        fill={ mobileIconColor }
                        height="16px"
                        width="16px"
                        mr="4px"
                        flex="0 0 16px"
                      />
                      <Skeleton isLoaded={ !loading }>
                        { post?.replyCount }
                      </Skeleton>
                    </Flex>
                  </Link>
                  {/* mod button */ }
                  <Box pointerEvents="all" ml="auto">
                    <DropDown
                      onChange={ handleOption }
                      dropDownTitle={
                        <Flex
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          alignItems="center"
                          justifyContent="center"
                          padding="1px 7px"
                        >
                          <Icon as={ BsShield } height="16px" width="16px" />
                        </Flex>
                      }
                      options={ [
                        {
                          label: "Sticky Post",
                          icon: post?.pinned
                            ? MdCheckBox
                            : MdCheckBoxOutlineBlank,
                          id: "pinned",
                        },
                        {
                          label: "Lock Comments",
                          icon: post?.locked
                            ? MdCheckBox
                            : MdCheckBoxOutlineBlank,
                          id: "locked",
                        },
                        {
                          label: "Mark As Spoiler",
                          icon: post?.spoiler
                            ? MdCheckBox
                            : MdCheckBoxOutlineBlank,
                          id: "spoiler",
                        },
                      ] }
                      rightOffset={ 0 }
                      leftOffset="none"
                      topOffset="34px"
                    />
                  </Box>
                </Flex>
              </Box>
            ) : (
              <Box
                paddingBottom="12px"
                paddingTop="8px"
                padding="8px 16px"
                borderBottom={ `8px solid ${border2}` }
                pointerEvents="none"
                _before={ {
                  content: `" "`,
                  display: "table",
                } }
                _after={ {
                  clear: "both",
                  content: `" "`,
                  display: "table",
                } }
              >
                <Flex
                  flex="1"
                  float="none"
                  top="0"
                  position="relative"
                  pointerEvents="none"
                >
                  {/* vote button */ }
                  <Flex
                    border={ `1px solid ${border2}` }
                    alignItems="center"
                    borderRadius="16px"
                    flexShrink="0"
                    fontWeight="0"
                    height="32px"
                    justifyContent="center"
                    minWidth="32px"
                    fontSize="12px"
                    marginRight="10px"
                    maxWidth="110px"
                    width="auto"
                    pointerEvents="all"
                  >
                    <Flex
                      alignItems="center"
                      borderRadius="16px"
                      flexShrink="0"
                      fontWeight="500"
                      height="32px"
                      justifyContent="center"
                      width="32px"
                      minW="32px"
                      fontSize="12px"
                      fill={ vote === 1 ? "upvoteOrange" : mobileIconColor }
                      color={ vote === 1 ? "upvoteOrange" : mobileIconColor }
                      lineHeight="24px"
                      onClick={ () => {
                        handleVoting(vote === 1 ? 0 : 1);
                      } }
                    >
                      <Icon
                        fill={ vote === 1 ? "upvoteOrange" : mobileIconColor }
                        color={ vote === 1 ? "upvoteOrange" : mobileIconColor }
                        as={ vote === 1 ? ImArrowUp : BiUpvote }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                      />
                    </Flex>
                    <Box
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      fontSize="12px"
                      paddingTop="2px"
                      minW="16px"
                      lineHeight="14px"
                      textAlign="center"
                      verticalAlign="middle"
                    >
                      <Skeleton isLoaded={ !loading }>
                        { !loading
                          ? postVotes === 0
                            ? "vote"
                            : numFormatter(postVotes)
                          : "vote" }
                      </Skeleton>
                    </Box>
                    <Flex
                      alignItems="center"
                      borderRadius="16px"
                      flexShrink="0"
                      fontWeight="500"
                      height="32px"
                      justifyContent="center"
                      width="32px"
                      minW="32px"
                      fontSize="12px"
                      fill={ vote === -1 ? "downvoteBlue" : mobileIconColor }
                      color={ vote === -1 ? "downvoteBlue" : mobileIconColor }
                      lineHeight="24px"
                      onClick={ () => {
                        handleVoting(vote === -1 ? 0 : -1);
                      } }
                    >
                      <Icon
                        fill={ vote === -1 ? "downvoteBlue" : mobileIconColor }
                        color={ vote === -1 ? "downvoteBlue" : mobileIconColor }
                        as={ vote === -1 ? ImArrowDown : BiDownvote }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                      />
                    </Flex>
                  </Flex>
                  {/* award button */ }
                  <Flex
                    color={ mobileIconColor }
                    border={ `1px solid ${border2}` }
                    alignItems="center"
                    fontWeight="500"
                    height="32px"
                    justifyContent="center"
                    minW="32px"
                    width="auto"
                    fontSize="12px"
                    flexShrink="1"
                    marginRight="10px"
                    overflowX="scroll"
                    padding="0"
                    borderRadius="16px"
                  >
                    <Flex
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      alignItems="center"
                      justifyContent="center"
                      padding="1px 7px"
                    >
                      <Icon as={ GoGift } height="16px" width="16px" />
                    </Flex>
                  </Flex>
                  {/* comment button */ }
                  <Link as={ ReactLink } to={ detailRoute }>
                    <Flex
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      border={ `1px solid ${border2}` }
                      alignItems="center"
                      borderRadius="16px"
                      flexShrink="0"
                      fontWeight="500"
                      height="32px"
                      justifyContent="center"
                      minW="32px"
                      marginRight="10px"
                      padding="2px 8px 0"
                      maxW="100px"
                    >
                      <Icon
                        as={ BsChat }
                        color={ mobileIconColor }
                        fill={ mobileIconColor }
                        height="16px"
                        width="16px"
                        mr="4px"
                        flex="0 0 16px"
                      />
                      <Skeleton isLoaded={ !loading }>
                        { post?.replyCount }
                      </Skeleton>
                    </Flex>
                  </Link>
                  {/* share button */ }
                  <CopyToClipboard text={ location } onCopy={ handleCopy }>
                    <Flex
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      border={ `1px solid ${border2}` }
                      alignItems="center"
                      borderRadius="16px"
                      flexShrink="0"
                      fontWeight="500"
                      height="32px"
                      justifyContent="center"
                      minW="32px"
                      width="auto"
                      marginRight="10px"
                      marginLeft="auto"
                      padding="1px 8px 0"
                      maxW="85px"
                    >
                      <Icon
                        as={ FiShare }
                        color={ mobileIconColor }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                        overflow="hidden"
                        mr="4px"
                      />
                      { copied ? "copied" : "Share" }
                    </Flex>
                  </CopyToClipboard>
                </Flex>
              </Box>
            ) }
          </Box>
        </Box>
      ) }
    </>
  );
};

export default CardPost;
