import React from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { RiCopperCoinLine } from 'react-icons/ri';
import Image from "../Image";
import {
  BsChat,
  BsBookmark,
  BsEyeSlash,
  BsPencil,
  BsChatSquare,
  BsShield,
  BsPinAngleFill,
} from "react-icons/bs";
import { GoGift, GoMute } from "react-icons/go";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FiMoreHorizontal, FiExternalLink } from "react-icons/fi";
import DropDown from "../../components/DropDown";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FiShare } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";
import dateToFromNowDaily from "../../utils/formatDate";
import numFormatter from "../../utils/numberFormater";
import getUserName, { getSubName } from "../../utils/getUserName";
import Marked from "../Editor/marked";
import Avatar from "../Avatar";
import Link from "../Link";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { HiLockClosed, HiOutlineCheckCircle } from "react-icons/hi";
import PostMedia from './PostMedia';
import EditLabel from "../Label/editLabel";
import PendingLabel from "../Label/pendingLabel";
import SpoilerLabel from "../Label/spoilerLabel";
import FlairLabel from "../Label/flairLabel";
import Label from "../Label";
import StateString from "../Label/stateString";
import useStore from "../../store/useStore";
import PostTitle from "./PostTitle";

const CardPost = ({
  post,
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
  hasThumbnail,
  commentCount,
  upVote,
  downVote,
  editLabel,
  authorPath,
  stateString,
  blocked,
  muted

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

  const subPlebbit = sub || { address: post?.subplebbitAddress };

  const { device } = useStore(state => state);
  const getLink = (link) => {
    let val

    try {
      val = (link?.startsWith('https://') || link?.startsWith('https://www.')) ? link.replace(/^https:\/\/(www.)?/, '') : link
      return val
    } catch (error) {

    }
  }
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
                cursor={ post?.locked ? 'not-allowed' : "pointer" }
                padding="inherit"
              >
                <Box
                  border="2px solid transparent"
                  cursor={ post?.locked ? 'not-allowed' : "pointer" }
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
                  onClick={ upVote }
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
                cursor={ post?.locked ? 'not-allowed' : "pointer" }
                padding="inherit"
              >
                <Box
                  border="2px solid transparent"
                  cursor={ post?.locked ? 'not-allowed' : "pointer" }
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
                  onClick={ downVote }
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
            <Link
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

                  position="relative"
                  wordBreak="break-word"
                >
                  {/* Pin Head */ }
                  { post?.pinned && type === "subPlebbit" && (
                    <Flex
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      flexFlow="row nowrap"
                      alignItems="start"
                      margin="0 8px 8px"
                      position="relative"
                    >
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
                          { type !== "subPlebbit" && (
                            <>
                              <Avatar
                                avatar={ subPlebbit?.suggested?.avatarUrl }
                                width={ 24 }
                                height={ 24 }
                                mr="8px"
                                badge
                                isOnline={ isOnline }
                                mb="5px"
                              />

                              <Link
                                to={ `p/${post?.subplebbitAddress}/` }
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
                          ) }
                          <Text color={ misCol } flex="0 0 auto" mr="3px">
                            Posted by
                          </Text>

                          {/* User Name */ }
                          <Link

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
                            to={ authorPath }
                          >
                            { getUserName(post?.author) }
                          </Link>
                          {/* status */ }

                          { post?.author?.flair && (
                            <Box display="inline" verticalAlign="text-top">
                              <Label bg={ statusBg } color={ statusColor } text={ post?.author?.flair?.text }
                                fontSize="12px"
                                fontWeight="500"
                                lineHeight="16px"
                                borderRadius="2px"
                                display="inline-block"
                                mr="5px"
                                overflow="hidden"
                                isTruncated
                                padding="0 4px" />
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
                              ml='4px'
                              cursor="pointer"
                              color={ removeColor }
                              alignItems="center"
                              onClick={ () =>
                                !post?.reason ? openRemovalModal() : {}
                              }
                            >
                              <Icon as={ FcCancel } />
                              { !post?.reason ? (
                                allowedSpecial && (
                                  <Box>Add a removal reason</Box>
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
                                    { post?.reason }
                                  </Text>
                                </Tooltip>
                              ) }
                            </Flex>
                          ) }
                        </Flex>
                      </Flex>
                    </Skeleton>
                    { loading && <StateString stateString={ stateString } /> }
                  </Flex>{ " " }

                  {/* Post Title */ }
                  <Link to={ detailRoute }>
                    <Flex
                      margin="0 8px"
                      alignItems="center"
                      height={ loading && '20px' } flex={ loading && 1 } mb={ loading && "8px" }
                      as={ loading && Skeleton }
                    >

                      <Text
                        display="inline"
                        color={ inactiveSubTitle }
                        fontSize="18px"
                        fontWeight="500"
                        lineHeight="22px"
                        paddingRight="5px"
                        textDecor="none"
                        wordBreak="break-word"
                        verticalAlign='middle'
                      >
                        {/* flair */ }
                        { type === "subPlebbit" && post?.flair?.text.length ? (
                          <FlairLabel flair={ post?.flair } />
                        ) : (
                          ""
                        ) }
                        { post?.title }
                        { ` ` }
                        { type !== "subPlebbit" && post?.flair?.text ? (
                          <FlairLabel flair={ post?.flair } />

                        ) : (
                          ""
                        ) }
                        { post?.spoiler && (

                          <SpoilerLabel />
                        ) }

                        { pending && (
                          <Skeleton isLoaded={ !loading }>
                            <PendingLabel />
                          </Skeleton>
                        ) }
                        {/* edit status */ }
                        <EditLabel editLabel={ editLabel } post={ post } />
                      </Text>


                    </Flex>

                  </Link>
                  <PostTitle post={ post } detailRoute={ detailRoute } editLabel={ editLabel } pending={ pending } type={ type } />
                  {/* Post Body */ }
                  <Skeleton height={ loading && '240px' } mx={ loading && '8px' } mb={ loading && "8px" } isLoaded={ !loading }>
                    <Box mt="8px">
                      {/* text post */ }
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

                        </Box>
                      ) }
                      {/*link post  without media  */ }

                      <Flex mt="0" >
                        { hasThumbnail && (
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
                      {/*link post  with media  */ }

                      <PostMedia post={ post } />
                    </Box>
                  </Skeleton>

                </Flex>
                {/* Post thumbnail */ }
                { (hasThumbnail) && (
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
                      { " " }
                      <Link href={ post?.link } isExternal>
                        <Image

                          borderColor="mainBlue"
                          border="1px solid #0079d3;"
                          src={ post?.thumbnailUrl }
                          width="100%"
                          height="100%"

                        />
                      </Link>

                    </Box>
                  </Flex>
                ) }
              </Flex>
            </Link>

            {/* Post Footer */ }
            { pending ? (
              !loading && <Flex />
            ) :
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
                    <Link to={ detailRoute }>
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
                          { commentCount }
                        </Text>
                      </Flex>
                    </Link>
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
                        color={ iconColor }
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
                        color={ iconColor }
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
                            label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                            icon: GoMute,
                            id: "mute",
                            disabled: type === "subPlebbit"
                          },
                          {
                            label: blocked ? 'Unhide' : "Hide",
                            icon: BsEyeSlash,
                            id: "block",

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
                    <Link to={ detailRoute }>
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
                          { commentCount } comment
                          { commentCount > 1 ? "s" : "" }
                        </Text>
                      </Flex>
                    </Link>
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
                            label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                            icon: GoMute,
                            id: "mute",
                            disabled: type === "subPlebbit"
                          },
                          {
                            label: blocked ? 'Unhide' : "Hide",
                            icon: BsEyeSlash,
                            id: "block",

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
                        {
                          loading ? <SkeletonCircle /> :
                            <Flex
                              alignItems="center"
                              fontSize="14px"
                              fontWeight="500"
                              lineHeight="18px"
                              color={ postHeadColor }
                              mb="4px"

                            >
                              <Avatar
                                avatar={ subPlebbit?.suggested?.avatarUrl }
                                width={ 24 }
                                height={ 24 }
                                mr="8px"
                                badge
                                isOnline={ isOnline }

                              />

                              { getSubName(
                                subPlebbit || { address: post?.subplebbitAddress }
                              ) }

                            </Flex>
                        }

                        <Box as={ loading && Skeleton } flex={ loading && 1 } mx="4px" mb="4px">

                          { dateToFromNowDaily(post?.timestamp * 1000) }

                        </Box>

                        { pending && !loading && (

                          <PendingLabel />

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
                      { (detail || type === "subPlebbit") && post?.pinned && (
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
                            },
                            {
                              label: "Remove",
                              icon: TiDeleteOutline,
                              id: "removed",
                              disabled: !(allowedSpecial && !post?.removed),
                            },
                            {
                              label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                              icon: GoMute,
                              id: "mute",
                              disabled: type === "subPlebbit"
                            },
                            {
                              label: "Hide",
                              icon: BsEyeSlash,
                              id: "block",

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
                { post?.spoiler && (
                  <Box padding="0 16px 8px">
                    <Tag
                      borderRadius="2px"
                      p="1px 8px"
                      mr="5px"
                      variant="solid"
                      colorScheme="blackAlpha"
                    >
                      SPOILER
                    </Tag>
                  </Box>
                ) }
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
                    <FlairLabel flair={ post?.flair } />

                  ) : null }
                </Box> }
                {/* edit status */ }
                { editLabel && <Box padding="0 16px 8px">
                  <EditLabel editLabel={ editLabel } post={ post } />
                </Box> }
              </Box>
            </Box>

            <>
              { detail && !post?.removed ?
                <Box as={ loading && Skeleton }>
                  {
                    (showSpoiler ? (
                      <Flex alignItems="center" mt='8px' justifyContent="center">
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
                        padding="8px 16px"
                        fontFamily="Noto sans, Arial, sans-serif"
                        fontSize="14px"
                        fontWeight="400"
                        lineHeight="21px"
                        wordBreak="break-word"
                        overflow="hidden"
                        marginTop="8px"
                      >
                        {/* post with text */ }
                        { post?.content ? (

                          <Marked content={ post?.content } />

                        ) : (

                          <Box>
                            {
                              hasThumbnail &&
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
                                    width='100%'
                                    overflow="hidden"
                                    bg={ postBg }
                                    src={ post?.thumbnailUrl }
                                    onError={ (event) =>
                                      (event.target.style.display = "none")
                                    }



                                  />

                                </Box>

                                <Box isTruncated href={ post?.link } isExternal color="#fff" padding="5px 12px" fontSize="12px" left="0" bottom="0" right="0" background="rgba(0,0,0,.7)" position="absolute" >{ getLink(post?.link) }</Box>

                              </Box>
                            }
                            <PostMedia post={ post } />
                          </Box>

                        ) }
                      </Box>
                    ))
                  }
                </Box> :
                <Box as={ loading && Skeleton } mx={ loading && '16px' } pt={ hasThumbnail && "10%" } mt={ hasThumbnail && '8px' }>
                  {
                    hasThumbnail &&

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



                        />

                      </Box>

                      <Box as={ Link } isTruncated href={ post?.link } isExternal color="#fff" padding="5px 12px" fontSize="12px" left="0" bottom="0" right="0" background="rgba(0,0,0,.7)" position="absolute" >{ getLink(post?.link) }</Box>

                    </Box>

                  }
                  <PostMedia post={ post } />
                </Box>

              }
            </>

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
                      onClick={ upVote }
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
                      onClick={ downVote }
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

                    <Icon as={ GoGift } height="16px" width="16px" />

                  </Flex>
                  {/* comment button */ }
                  <Link to={ detailRoute }>
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
                        { commentCount }
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
                      onClick={ upVote }
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
                      onClick={ downVote }
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

                    <Icon as={ GoGift } height="16px" width="16px" />

                  </Flex>
                  {/* comment button */ }
                  <Link to={ detailRoute }>
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
                        { commentCount }
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
