import React, { useState } from 'react';
import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  useColorModeValue,
  Icon,
  Grid,
  GridItem,
  Select,
  Switch,
  Tag,
  Textarea,
  Button,
  Text,
} from '@chakra-ui/react';
import { FiMail, FiMoreHorizontal, FiShield } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GiCakeSlice } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { BsEye } from 'react-icons/bs';
import CreatableMulti from '../../components/DropDown/creatableMulti';
import truncateString from '../../utils/truncateString';
import { dateFormater } from '../../utils/formatDate';
import BottomSideBar from '../../components/sidebar/bottomSideBar';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';
import FlairLabel from "../../components/Label/flairLabel"
import Link from "../../components/Link"
import { getSubName } from '../../utils/getUserName';
import { useSubplebbitStats } from '@plebbit/plebbit-react-hooks';
import DropDown from '../../components/DropDown';

const SideBar = ({
  mt,
  borderRadius,
  ml,
  margin,
  width,
  padding,
  top,
  right,
  sx,
  border,
  borderColor,
  bg,
  subPlebbit,
  setData,
  data,
  profile,
  handleSaveChanges,
  allowedSpecial,
  blocked,
  handleOption
}) => {
  const color = useColorModeValue('lightText3', 'darkText1');
  const Bg = useColorModeValue('#F8F9FA', '');
  const bordercolor = useColorModeValue('#ccc', '#474748');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const border2 = useColorModeValue('#DAE0E6', '#030303');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const headerBg = useColorModeValue('darkBody', '');
  const headerColor = useColorModeValue('white', 'darkIcon');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue("lightIcon", "darkIcon");
  const [showAddSubtopic, hideSubTopic] = useState(false);
  const [showAddDescription, hideAddDescription] = useState(false);
  const [showComOptions, hideComOptions] = useState(false);
  const stats = useSubplebbitStats({ subplebbitAddress: subPlebbit?.address })
  const loading = stats.state === 'fetching-ipfs' || subPlebbit === undefined;





  return (
    <Box
      marginLeft={ ml || '24px' }
      marginTop={ mt }
      border={ border }
      borderColor={ borderColor }
      margin={ margin }
      width={ width || '312px' }
      padding={ padding }
      borderRadius={ borderRadius }
      top={ top }
      right={ right }
      sx={
        ({ ...sx },
        {
          '@media (min-width: 960px)': {
            display: 'block',
          },
          '@media (max-width: 960px)': {
            display: 'none',
            width: '312px',
            flex: '0 0 312px',
          },
        })
      }
    >
      <Flex flexDirection="column" height="100%" width="inherit">
        <Box
          bg={ mainBg }
          color={ color }
          border={ `1px solid ${bordercolor}` }
          borderRadius="4px"
          overflow="visible"
          wordBreak="break-word"
        >
          <Flex
            fontSize="10px"
            fontWeight="400"
            letterSpacing=".5px"
            lineHeight="12px"
            textTransform="uppercase"
            backgroundColor={ subPlebbit?.suggested?.primaryColor || headerBg }
            borderRadius="3px 3px 0 0"
            color={ headerColor }
            padding="0 12px 12px"
            alignItems="center"
          >
            <Box padding="12px 0 0" fontSize="16px" fontWeight="500" lineHeight="20px">
              <Box fontSize="14px" fontWeight="700" lineHeight="18px" textTransform="none">
                About Community
              </Box>
            </Box>

            { allowedSpecial && (
              <Box
                margin="auto 0 auto auto"
                paddingTop="10px"
                verticalAlign="middle"
                cursor="pointer"
              >
                <Link to={ `/p/${subPlebbit?.address}/about/moderators/` }>
                  <Flex borderRadius="2px" padding="4px" alignItems="center" fontWeight="400">
                    <Icon as={ FiShield } width={ 5 } height={ 5 } mr="4px" />
                    <Box>Mod tools</Box>
                  </Flex>
                </Link>
              </Box>
            ) }
            <Flex justifyContent="center" alignItems='center' margin="10px 0 auto auto" >
              <DropDown
                onChange={ handleOption }
                dropDownTitle={
                  <Flex
                    borderRadius="2px"
                    height="24px"
                    padding="4px"
                    width="100%"
                    bg="transparent"
                    border="none"
                    alignItems="center"
                    _hover={ {
                      backgroundColor: inputBg,
                      color: color
                    } }
                  >
                    <Icon
                      as={ FiMoreHorizontal }
                      h="20px"
                      w="20px"
                    />
                  </Flex>
                }
                options={ [
                  {
                    label: `${blocked ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                    id: "mute",
                  },

                ] }
                rightOffset={ 0 }
                leftOffset="none"
                topOffset="34px"
              />
            </Flex>
          </Flex>
          <Box maxH="none" padding="12px">
            <Box mb="8px" pos="relative">
              { subPlebbit?.description && (
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="21px"
                  sx={ {
                    wordWrap: 'break-word',
                  } }
                >
                  { subPlebbit?.description }
                </Box>
              ) }
              { showAddDescription && (
                <Flex
                  flexDir="column"
                  border={ `1px solid ` }
                  borderColor={ subPlebbit?.suggested?.secondaryColor || linkColor }
                  borderRadius="4px"
                  padding="8px"
                >
                  <Textarea
                    border="none"
                    mb="5px"
                    bg={ inputBg }
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    disabled={ loading }
                    noOfLines={ 1 }
                    value={ data?.description }
                    onChange={ (e) => setData({ ...data, description: e.target.value }) }

                  />
                  <Flex alignItems="center" justifyContent="space-between">
                    <Box fontSize="12px" lineHeight="14px">
                      { 500 - data?.description?.length } Characters remaining
                    </Box>

                    <Flex>
                      <Box
                        mr="5px"
                        color="red"
                        fontSize="14px"
                        fontWeight="500"
                        cursor="pointer"
                        onClick={ () => hideAddDescription(false) }
                      >
                        cancel
                      </Box>
                      <Box
                        onClick={ () => {
                          handleSaveChanges();
                          hideAddDescription(false);
                        } }
                        color={ subPlebbit?.suggested?.secondaryColor || "#0079D3" }
                        fontSize="14px"
                        fontWeight="500"
                        cursor="pointer"
                      >
                        save
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              ) }
            </Box>
            { (!showAddDescription || allowedSpecial) && (
              <Button
                tabIndex={ 0 }
                transition="all .1s linear 0s"
                bg={ inputBg }
                borderRadius="4px"
                padding="8px"
                marginBottom="12px"
                marginTop="8px"
                border={ `1px solid ${border2}` }
                cursor="pointer"
                onClick={ () => hideAddDescription(true) }
                width="100%"
                justifyContent="flex-start"
                isLoading={ loading }
              >
                <Box fontSize="12px" fontWeight="700" lineHeight="16px" color={ subPlebbit?.suggested?.secondaryColor }>
                  Add description
                </Box>
              </Button>
            ) }
            <Grid gap="12px" templateColumns="auto auto 42px">
              <GridItem w="100%">
                <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                  { stats?.allActiveUserCount || 0 }
                </Box>
                <Box fontSize="12px" lineHeight="16px" fontWeight="500" wordBreak="break-word">
                  Members
                </Box>
              </GridItem>
              <GridItem w="100%">
                <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                  { stats?.hourActiveUserCount || 0 }
                </Box>
                <Box fontSize="12px" lineHeight="16px" fontWeight="500" wordBreak="break-word">
                  Online
                </Box>
              </GridItem>
              <GridItem w="100%" />
            </Grid>
            <hr
              style={ {
                margin: '16px 0',
              } }
            />
            <Box>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                flexFlow="row nowrap"
                alignItems="center"
              >
                <Icon as={ GiCakeSlice } margin="-2px 8px 0 0" />
                <Box>Created { dateFormater(subPlebbit?.createdAt * 1000) }</Box>
              </Flex>
            </Box>
            <Box mt="8px" />
            <Box borderTop={ `1px solid ${border1}` } marginTop="16px" paddingTop="16px">
              <Flex
                alignItems="center"
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                marginBottom="4px"
              >
                <Box>Community topics</Box>
                <Icon as={ AiOutlineInfoCircle } ml="4px" />
              </Flex>
              <Box>
                <Select
                  disabled
                  variant="flushed"
                  border="none"
                  defaultValue={ subPlebbit?.pubsubTopic }
                  color={ subPlebbit?.suggested?.secondaryColor }
                  fontWeight="500"
                  fontSize="16px"
                  lineHeight="20px"

                >
                  <option value="">Add Primary Topic</option>
                  <option value="activism">Activism</option>
                  <option value="addictionSupport">Addiction Support</option>
                  <option value="animals">Animals And Pet</option>
                  <option value="anime">Anime</option>
                  <option value="art">Art</option>
                  <option value="beauty">Beauty and Makeup</option>
                  <option value="crypto">Crypto</option>
                  <option value="food">Food</option>
                  <option value="option3">None Of These Topics</option>
                </Select>
              </Box>
              <Box tabIndex="-1" borderRadius="4px" border={ `1px solid ${border1}` }>
                { !showAddSubtopic && (
                  <Flex
                    ml="8px"
                    mt="8px"
                    padding="2px 12px 2px 6px"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
                    background={ inputBg }
                    borderRadius="12px"
                    cursor="pointer"
                    textAlign="center"
                    mb="8px"
                    mr="4px"
                    alignItems="center"
                    width="max-content"
                    onClick={ () => hideSubTopic(true) }
                    color={ subPlebbit?.suggested?.secondaryColor }
                  >
                    <Icon as={ MdAdd } height="22px" width="22px" mr="4px" />
                    <Box> Add Subtopics</Box>
                  </Flex>
                ) }
                { showAddSubtopic && <CreatableMulti disabled /> }

                { showAddSubtopic && (
                  <Flex alignItems="center" justifyContent="space-between" padding="8px">
                    <Box fontSize="12px" lineHeight="14px">
                      0/25
                    </Box>

                    <Flex>
                      <Box
                        mr="5px"
                        color="red"
                        fontSize="14px"
                        fontWeight="500"
                        cursor="pointer"
                        onClick={ () => hideSubTopic(false) }
                      >
                        cancel
                      </Box>
                      <Box color="#0079D3" fontSize="14px" fontWeight="500" cursor="pointer">
                        save
                      </Box>
                    </Flex>
                  </Flex>
                ) }
              </Box>
            </Box>
            <Box marginTop="12px">
              <Button
                height="32px"
                padding="4px 16px"
                borderRadius="999px"
                width="100%"
                bg={ subPlebbit?.suggested?.secondaryColor || headerBg }
                color={ headerColor }
                as={ Link }
                to={ `/p/${subPlebbit?.address}/submit` }
              >
                Create Post
              </Button>
            </Box>
            <Box borderTop={ `1px solid ${border1}` } marginTop="16px" paddingTop="16px">
              <Button
                fontSize="10px"
                fontWeight="700"
                letterSpacing=".5px"
                lineHeight="12px"
                textTransform="uppercase"
                width="100%"
                border="none"
                background="transparent"
                padding="0 12px"
                onClick={ () => hideComOptions(!showComOptions) }
                color={ subPlebbit?.suggested?.secondaryColor }
              >
                <Flex width="100%" alignItems="center" justifyContent="space-between">
                  <Box>Community options</Box>
                  <Icon as={ BiChevronDown } w="20px" h="20px" />
                </Flex>
              </Button>
              { showComOptions && (
                <Box m="0" padding="0">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center" fontSize="14px" fontWeight="400" lineHeight="21px">
                      <Icon as={ BsEye } mr="4px" />
                      <Box>Community theme</Box>
                    </Flex>
                    <Switch colorScheme='gray' size="sm" />
                  </Flex>
                </Box>
              ) }
            </Box>
          </Box>
        </Box>

        <Box marginTop="16px" width="312px">
          <Box
            bg={ mainBg }
            color={ color }
            border={ `1px solid ${bordercolor}` }
            borderRadius="4px"
            overflow="visible"
            wordBreak="break-word"
          >
            <Flex
              fontSize="10px"
              fontWeight="400"
              letterSpacing=".5px"
              lineHeight="12px"
              textTransform="uppercase"
              backgroundColor={ subPlebbit?.suggested?.primaryColor || headerBg }
              borderRadius="3px 3px 0 0"
              color={ headerColor }
              padding="0 12px 12px"
              alignItems="center"
            >
              <Box padding="12px 0 0" fontSize="16px" fontWeight="500" lineHeight="20px">
                <Box fontSize="14px" fontWeight="700" lineHeight="18px" textTransform="none">
                  Filter by flair
                </Box>
              </Box>
            </Flex>
            <Box maxH="none" padding="12px">
              <Flex flexFlow="row wrap" paddingTop="4px" w="100%">
                { subPlebbit
                  ? subPlebbit?.flairs?.post?.map((flair, index) => (
                    <Box key={ index }>
                      <FlairLabel flair={ flair } />
                    </Box>
                  ))
                  : '' }
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box marginTop="16px" width="312px">
          <Box
            bg={ mainBg }
            color={ color }
            border={ `1px solid ${bordercolor}` }
            borderRadius="4px"
            overflow="visible"
            wordBreak="break-word"
          >
            <Flex
              fontSize="10px"
              fontWeight="400"
              letterSpacing=".5px"
              lineHeight="12px"
              textTransform="uppercase"
              backgroundColor={ subPlebbit?.suggested?.primaryColor || headerBg }
              borderRadius="3px 3px 0 0"
              color={ headerColor }
              padding="0 12px 12px"
              alignItems="center"
            >
              <Box padding="12px 0 0" fontSize="16px" fontWeight="500" lineHeight="20px">
                <Box fontSize="14px" fontWeight="700" lineHeight="18px" textTransform="none">
                  Moderators
                </Box>
              </Box>
            </Flex>
            <Box maxH="none" padding="12px" >
              <Flex
                alignItems="center"
                marginBottom="20px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="17px"
                textTransform="unset"
                minHeight="32px"
                padding="4px 16px"
                borderRadius="999px"
                justifyContent="center"
                border={ `1px solid` }
                width="auto"
                cursor="pointer"
                borderColor={ subPlebbit?.suggested?.secondaryColor }
                color={ subPlebbit?.suggested?.secondaryColor }
              >
                <Icon as={ FiMail } mr="4px" width="20px" height="20px" />
                <Box>Message the mods</Box>
              </Flex>
              { subPlebbit?.roles &&
                Object.keys(subPlebbit?.roles)?.map((item, index) => (
                  <Flex
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="16px"
                    marginBottom="16px"
                    width="100%"
                    key={ index }
                    alignItems="center"
                    color={ subPlebbit?.suggested?.secondaryColor || linkColor }
                  >
                    <Box mr='4px'>
                      <Box maxWidth="100%" >{ `u/${truncateString(item, 25)}` }</Box>
                    </Box>
                    <Tag
                      textOverflow="ellipsis"
                      overflow="hidden"
                      fontSize="12px"
                      fontWeight="500"
                      whiteSpace="pre"
                    >
                      { subPlebbit?.roles[item]?.role }
                    </Tag>
                  </Flex>
                )) }
              <Flex color={ subPlebbit?.suggested?.secondaryColor } padding="0 12px 12px" overflow="hidden" justifyContent="flex-end">
                <Link
                  to={
                    subPlebbit?.roles &&
                      Object.keys(subPlebbit?.roles).includes(profile?.author?.address)
                      ? `/p/${subPlebbit?.address}/about/moderators`
                      : `/p/${subPlebbit?.address}/moderators`
                  }
                >
                  <Box
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="16px"
                    letterSpacing=".5px"
                    textTransform="uppercase"
                    color={ subPlebbit?.suggested?.secondaryColor || linkColor }
                  >
                    View All Moderators
                  </Box>
                </Link>
              </Flex>
            </Box>
          </Box>
        </Box>

        <Box marginTop="16px" width="312px">
          <Box borderRadius="4px" overflow="hidden" wordBreak="break-word" bg={ bg || Bg }>
            <Flex
              fontSize="10px"
              fontWeight="400"
              letterSpacing=".5px"
              lineHeight="12px"
              textTransform="uppercase"
              backgroundColor={ subPlebbit?.suggested?.primaryColor || headerBg }
              borderRadius="3px 3px 0 0"
              color={ headerColor }
              padding="0 12px 12px"
              alignItems="center"
            >
              <Flex padding="12px 0 0" fontSize="16px" fontWeight="500" lineHeight="20px">
                <Text noOfLines={ 1 } fontSize="14px" fontWeight="700" lineHeight="18px" textTransform="none">
                  { getSubName(subPlebbit) }

                </Text>
                <Box width="max-content">

                  <Text noOfLines={ 1 } ml="3px" fontSize="14px" fontWeight="700" lineHeight="18px" textTransform="none">
                    rules
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Accordion maxHeight="none" allowToggle>
              { subPlebbit?.rules?.map((item, index) => (
                <AccordionItem key={ item } color={ subPlebbit?.suggested?.secondaryColor }>
                  <Box>
                    <AccordionButton padding="12px">
                      <Text
                        flex="1"
                        textAlign="left"
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="12px"
                        textTransform="uppercase"
                        noOfLines={ 2 }

                      >


                        { `${index + 1}. ${item}` }

                      </Text>
                      <AccordionIcon color={ subPlebbit?.suggested?.secondaryColor || "#a4a4a4" } />
                    </AccordionButton>
                  </Box>
                  <AccordionPanel padding="12px">{ item }</AccordionPanel>
                </AccordionItem>
              )) }
            </Accordion>
          </Box>
        </Box>
        <Box flex="1 1 auto" width="inherit" position="relative">
          <BottomSideBar />
          <BacktoTopButton bg={ subPlebbit?.suggested?.secondaryColor } />
        </Box>
      </Flex>
    </Box>
  );
};

export default SideBar;
