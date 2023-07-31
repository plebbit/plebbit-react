import { Box, Button, Checkbox, Flex, Icon, Skeleton, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineInfoCircle, AiOutlineUnorderedList } from 'react-icons/ai';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import {
  MdOutlineTableRows,
  MdOutlineViewHeadline,
  MdOutlineViewStream,
  MdTableRows,
  MdViewAgenda,
  MdViewHeadline,
} from 'react-icons/md';
import { RiSpamLine } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import Avatar from '../../../components/Avatar';
import DropDown from '../../../components/DropDown';
import numFormatter from '../../../utils/numberFormater';
import { useAccount, useAuthorAvatar } from '@plebbit/plebbit-react-hooks';
import useStore from '../../../store/useStore';

const ModQueue = () => {
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('lightIconBg', 'darkIconBg');
  const transparent20 = useColorModeValue('lightTransparent20', 'darkTransparent20');
  const activeFilterText = useColorModeValue('lightText', 'bodyTextDark');
  const metaText = useColorModeValue(' metaTextLight', 'metaTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const voteColor = useColorModeValue('lightVoteText', 'darkVoteTest');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { postStyle, setPostStyle } = useStore(state => state);
  const [selectedFilter, setSelectedFilter] = useState('Newest First');
  const [selectedType, setSelectedType] = useState('Posts And Comments');
  const vote = 0;
  const loading = false;
  const postVotes = 0;

  return (
    <Box
      width="640px"
      margin="0 auto"
      paddingTop="24px"
      borderRAdius="0 0 4px 4px"
      overflow="hidden"
      height="100vh"
    >
      <Flex alignItems="center">
        <Flex alignItems="center" fontSize="18px" fontWeight="500" lineHeight="22px" mb="16px">
          Mod Queue
          <Icon color={ linkColor } ml="4px" as={ AiOutlineInfoCircle } />
        </Flex>
        <Flex
          height="100%"
          alignItems="center"
          ml="auto"
          padding="4px"
          borderRadius="4px"
          mb="16px"
        >
          <Avatar width={ 24 } height={ 24 } avatar={ authorAvatarImageUrl } />
        </Flex>
      </Flex>
      <Flex alignItems="center" height="40px">
        {/*filter*/ }
        <Box mr="12px">
          <DropDown
            caret
            options={ [
              { label: 'Newest First', id: 'new' },
              { label: 'Oldest First', id: 'old' },
              { label: 'Most Reported First', id: 'most' },
            ] }
            dropDownTitle={ selectedFilter.toUpperCase() }
            onChange={ (val) => setSelectedFilter(val?.label) }
            getSelected={ (val) => val?.label }
            selected={ selectedFilter }
            labelStyle={ {
              fontSize: '12px',
              fontWeight: '700',
              marginRight: '12px',
            } }
            iconStyle={ {
              height: '20px',
              width: '20px',
            } }
            menuSx={ {
              paddingLeft: '0px',
            } }
          />
        </Box>
        {/*types*/ }
        <Box>
          <DropDown
            caret
            options={ [
              { label: 'Posts And Comments', id: 'both' },
              { label: 'Posts', id: 'posts' },
              { label: 'Comments', id: 'comments' },
            ] }
            dropDownTitle={ selectedType.toUpperCase() }
            onChange={ (val) => setSelectedType(val?.label) }
            getSelected={ (val) => val?.label }
            selected={ selectedType }
            labelStyle={ {
              fontSize: '12px',
              fontWeight: '700',
              marginRight: '12px',
            } }
            iconStyle={ {
              height: '20px',
              width: '20px',
            } }
            menuSx={ {
              paddingLeft: '0px',
            } }
          />
        </Box>
        {/* post view*/ }
        <Box ml="auto">
          <DropDown
            caret
            inputBg={ inputBg }
            dropDownTitle={
              <>
                { ' ' }
                <Flex color={ iconColor } alignItems="center">
                  <Icon
                    as={
                      postStyle === 'card'
                        ? MdOutlineViewStream
                        : postStyle === 'classic'
                          ? MdOutlineTableRows
                          : MdOutlineViewHeadline
                    }
                    height={ 6 }
                    width={ 6 }
                  />
                </Flex>
              </>
            }
            content={
              <>
                { ' ' }
                <Flex
                  color={ postStyle === 'card' && activeFilterText }
                  fill={ postStyle === 'card' && activeFilterText }
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={ {
                    background: inputBg,
                  } }
                  onClick={ () => setPostStyle('card') }
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={ postStyle === 'card' ? MdViewAgenda : MdOutlineViewStream }
                    width={ 6 }
                    height={ 6 }
                  />
                  <Box>Card</Box>
                </Flex>
                <Flex
                  color={ postStyle === 'classic' && activeFilterText }
                  fill={ postStyle === 'classic' && activeFilterText }
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={ {
                    background: inputBg,
                  } }
                  borderTop={ `1px solid ${border2}` }
                  onClick={ () => setPostStyle('classic') }
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={ postStyle === 'classic' ? MdTableRows : MdOutlineTableRows }
                    width={ 6 }
                    height={ 6 }
                  />
                  <Box>Classic</Box>
                </Flex>
                <Flex
                  color={ postStyle === 'compact' && activeFilterText }
                  fill={ postStyle === 'compact' && activeFilterText }
                  alignItems="center"
                  position="relative"
                  outline="none"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  _hover={ {
                    background: inputBg,
                  } }
                  borderTop={ `1px solid ${border2}` }
                  onClick={ () => setPostStyle('compact') }
                  cursor="pointer"
                >
                  <Icon
                    mr="4px"
                    as={ postStyle === 'compact' ? MdViewHeadline : MdOutlineViewHeadline }
                    width={ 6 }
                    height={ 6 }
                  />
                  <Box>Compact</Box>
                </Flex>
              </>
            }
            rightOffset={ 0 }
            leftOffset="none"
            topOffset="35px"
          />
        </Box>
      </Flex>
      <Box>
        {/* head */ }
        <Flex
          fontSize="12px"
          fontWeight="700"
          lineHeight="16px"
          background={ transparent20 }
          color={ iconColor }
          height="32px"
          mb="5px"
          padding="2px"
          alignItems="center"
        >
          <Box borderRight={ `1px solid ${border2}` }>
            <DropDown
              disableTitleClick
              caret
              inputBg={ inputBg }
              titleHover={ {
                bg: '',
              } }
              leftOffset={ 0 }
              rightOffset="none"
              topOffset="35px"
              dropDownTitle={
                <>
                  <Flex
                    alignItems="center"
                    width="20px"
                    height="20px"
                    border="1px solid"
                    borderColor={ iconColor }
                    justifyContent="center"
                    mr="4px"
                  >
                    <Checkbox colorScheme="gray" />
                  </Flex>
                </>
              }
              options={ [
                { label: 'Span filtered' },
                { label: 'Has Reports' },
                { label: 'Self Posts' },
                { label: 'Posts with Flair' },
                { label: 'Posts With Flair' },
                { label: 'Posts' },
                { label: 'Comments' },
              ] }
            />
          </Box>
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
          >
            <Icon height="20px" width="20px" as={ HiOutlineCheckCircle } />
            <Box ml="4px">Approve</Box>
          </Flex>
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
          >
            <Icon color={ iconColor } height="20px" width="20px" as={ TiDeleteOutline } />
            <Box ml="4px">Remove</Box>
          </Flex>
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
          >
            <Icon color={ iconColor } height="20px" width="20px" as={ RiSpamLine } />
            <Box ml="4px">Spam</Box>
          </Flex>
          <Box>
            <DropDown
              inputBg={ inputBg }
              titleHover={ {
                bg: '',
              } }
              leftOffset={ 0 }
              rightOffset="none"
              topOffset="35px"
              dropDownTitle={
                <>
                  <Icon width="20px" height="20px" as={ AiOutlineUnorderedList } />
                </>
              }
              options={ [
                { label: 'Ignore Reports' },
                { label: 'Unignore Reports' },
                { label: 'Lock' },
                { label: 'Unlock' },
                { label: 'Mark as SPoiler' },
                { label: 'Unmark as SPoiler' },
                { label: 'Mark as NSFW' },
                { label: 'Unmark as NSFW' },
              ] }
            />
          </Box>
          <Box margin="0 5px 0 auto" justifyContent="center" alignItem="center">
            Items 1-25 • 25 selected
          </Box>
        </Flex>
        <Box>
          <Box borderRadius="4px" overflow="hidden">
            <Box
              backgroundColor={ mainBg }
              color={ iconColor }
              fill="currentColor"
              cursor="pointer"
              position="relative"
              transition="color .5s,fill .5s"
              marginBottom="10px"
            >
              {/* vote Bar */ }
              <Flex
                width="40px"
                borderLeft="4px solid transparent"
                alignItems="center"
                flexDirection="column"
                padding="8px 4px 8px 0"
                position="absolute"
              >
                <Box mb="8px">
                  <Checkbox colorScheme="gray" />
                </Box>
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
                        color: 'upvoteOrange',
                      } }
                      _focus={ {
                        outline: 'none',
                      } }
                      onClick={ () => { } }
                      color={ vote === 1 ? 'upvoteOrange' : iconColor }
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
                      { postVotes === 0 ? 'vote' : numFormatter(postVotes) }
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
                      color={ vote === -1 ? 'downvoteBlue' : iconColor }
                      display="inline-block"
                      overflow="hidden"
                      h="24px"
                      w="24px"
                      fontSize="16px"
                      lineHeight="24px"
                      _hover={ {
                        bg: iconBg,
                        color: 'downvoteBlue',
                      } }
                      _focus={ {
                        outline: 'none',
                      } }
                      onClick={ () => { } }
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
              {/* body */ }
              <Box ml="40px">
                <Box padding="8px">
                  {/* head */ }
                  <Box mb="4px">
                    <Flex
                      mb="8px"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      paddingTop="4px"
                      alignItems="center"
                    >
                      <Flex alignItems="center">
                        <Box mr="4px">
                          <Avatar width={ 20 } height={ 20 } />
                        </Box>
                        <Box color={ iconColor } lineHeight="16px">
                          r/plebbitairdrop
                        </Box>{ ' ' }
                      </Flex>
                      <Flex color={ metaText } ml="3px" alignItems="center">
                        <Box color={ iconColor } lineHeight="16px">
                          Commented by
                        </Box>
                        <Flex
                          ml="3px"
                          alignItems="center"
                          flexWrap="wrap"
                          lineHeight="20px"
                          transition="opacity .2s"
                        >
                          <Box mr="4px" flex="0 0 auto" color={ mainColor }>
                            Test User
                          </Box>
                          <Box flex="0 0 auto" color={ metaText }>
                            1 month
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                    {/* title */ }
                    <Box color={ metaText } fontSize="15px" lineHeight="22px">
                      Experimental Reddit airdrop
                    </Box>
                  </Box>
                  {/* content */ }
                  <Box
                    borderLeft="1px"
                    borderLeftColor={ metaText }
                    borderLeftStyle="dashed"
                    paddingLeft="8px"
                  >
                    <Box padding="2px 8px 2px 0">
                      <Box
                        fontSize="14px"
                        fontWeight="400"
                        lineHeight="21px"
                        wordBreak="break-word"
                        overflow="auto"
                        paddingBottom="1px"
                        marginBottom="-1px"
                        color={ mainColor }
                      >
                        No way, I love this piece! Discord: dlann#1517 Twitter: dlann5501 Done!
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Flex width="calc(100% - 8px)" ml="8px" flexDir="column">
                  <Flex alignItems="center" margin="12px 0" gap="12px">
                    <Button
                      minH="32px"
                      padding="4px 16px"
                      minW="32px"
                      borderRadius="9999px"
                      variant="outline"
                      fontWeight="700"
                      lineHeight="17px"
                      width="auto"
                      fontSize="12px"
                      display="flex"
                      alignItem="center"
                    >
                      Approve
                    </Button>
                    <Button
                      minH="32px"
                      padding="4px 16px"
                      minW="32px"
                      borderRadius="9999px"
                      variant="outline"
                      fontWeight="700"
                      lineHeight="17px"
                      width="auto"
                      fontSize="12px"
                    >
                      Remove
                    </Button>
                    <Button
                      padding="4px 16px"
                      minH="32px"
                      minW="32px"
                      borderRadius="9999px"
                      variant="ghost"
                    >
                      <Icon as={ FiMoreHorizontal } />
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ModQueue;
