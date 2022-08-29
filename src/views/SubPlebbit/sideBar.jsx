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
} from '@chakra-ui/react';
import { FiMail, FiShield } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GiCakeSlice } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { BsEye } from 'react-icons/bs';
import CreatableMulti from '../../components/DropDown/creatableMulti';
import { Link, useHistory } from 'react-router-dom';
import truncateString from '../../utils/truncateString';
import { dateFormater } from '../../utils/formatDate';
import BottomSideBar from '../../components/sidebar/bottomSideBar';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';

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
  loading,
  handleSaveChanges,
  role,
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
  const [showAddSubtopic, hideSubTopic] = useState(false);
  const [showAddDescription, hideAddDescription] = useState(false);
  const [showComOptions, hideComOptions] = useState(false);
  const history = useHistory();

  return (
    <Box
      marginLeft={ml || '24px'}
      marginTop={mt}
      border={border}
      borderColor={borderColor}
      margin={margin}
      width={width || '312px'}
      padding={padding}
      borderRadius={borderRadius}
      top={top}
      right={right}
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
          bg={mainBg}
          color={color}
          border={`1px solid ${bordercolor}`}
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
            backgroundColor={headerBg}
            borderRadius="3px 3px 0 0"
            color={headerColor}
            padding="0 12px 12px"
            alignItems="center"
          >
            <Box padding="12px 0 0" fontSize="16px" fontWeight="500" lineHeight="20px">
              <Box fontSize="14px" fontWeight="700" lineHeight="18px" textTransform="none">
                About Community
              </Box>
            </Box>

            {role === ('owner' || 'moderator') && (
              <Box
                margin="auto 0 auto auto"
                paddingTop="10px"
                verticalAlign="middle"
                cursor="pointer"
              >
                <Link to={`/p/${subPlebbit?.address}/about/moderators`}>
                  <Flex borderRadius="2px" padding="4px" alignItems="center" fontWeight="400">
                    <Icon as={FiShield} width={5} height={5} mr="4px" />
                    <Box>Mod tools</Box>
                  </Flex>
                </Link>
              </Box>
            )}
          </Flex>
          <Box maxH="none" padding="12px">
            <Box mb="8px" pos="relative">
              {subPlebbit?.description && (
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="21px"
                  sx={{
                    wordWrap: 'break-word',
                  }}
                >
                  {subPlebbit?.description}
                </Box>
              )}
              {showAddDescription && (
                <Flex
                  flexDir="column"
                  border={`1px solid `}
                  borderColor={linkColor}
                  borderRadius="4px"
                  padding="8px"
                >
                  <Textarea
                    border="none"
                    mb="5px"
                    bg={inputBg}
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    disabled={loading}
                    noOfLines={1}
                    value={data?.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                  />
                  <Flex alignItems="center" justifyContent="space-between">
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
                        onClick={() => hideAddDescription(false)}
                      >
                        cancel
                      </Box>
                      <Box
                        onClick={() => {
                          handleSaveChanges();
                          hideAddDescription(false);
                        }}
                        color="#0079D3"
                        fontSize="14px"
                        fontWeight="500"
                        cursor="pointer"
                      >
                        save
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Box>
            {!showAddDescription && (
              <Button
                tabIndex={0}
                transition="all .1s linear 0s"
                bg={inputBg}
                borderRadius="4px"
                padding="8px"
                marginBottom="12px"
                marginTop="8px"
                border={`1px solid ${border2}`}
                cursor="pointer"
                onClick={() => hideAddDescription(true)}
                width="100%"
                justifyContent="flex-start"
                isLoading={loading}
              >
                <Box fontSize="12px" fontWeight="700" lineHeight="16px">
                  Add description
                </Box>
              </Button>
            )}
            <Grid gap="12px" templateColumns="auto auto 42px">
              <GridItem w="100%">
                <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                  1
                </Box>
                <Box fontSize="12px" lineHeight="16px" fontWeight="500" wordBreak="break-word">
                  Members
                </Box>
              </GridItem>
              <GridItem w="100%">
                <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                  3
                </Box>
                <Box fontSize="12px" lineHeight="16px" fontWeight="500" wordBreak="break-word">
                  Online
                </Box>
              </GridItem>
              <GridItem w="100%" />
            </Grid>
            <hr
              style={{
                margin: '16px 0',
              }}
            />
            <Box>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                flexFlow="row nowrap"
                alignItems="center"
              >
                <Icon as={GiCakeSlice} margin="-2px 8px 0 0" />
                <Box>Created {dateFormater(subPlebbit?.createdAt * 1000)}</Box>
              </Flex>
            </Box>
            <Box mt="8px" />
            <Box borderTop={`1px solid ${border1}`} marginTop="16px" paddingTop="16px">
              <Flex
                alignItems="center"
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                marginBottom="4px"
              >
                <Box>Community topics</Box>
                <Icon as={AiOutlineInfoCircle} ml="4px" />
              </Flex>
              <Box>
                <Select
                  disabled
                  variant="flushed"
                  border="none"
                  defaultValue={subPlebbit?.pubsubTopic}
                >
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
              <Box tabIndex="-1" borderRadius="4px" border={`1px solid ${border1}`}>
                {!showAddSubtopic && (
                  <Flex
                    ml="8px"
                    mt="8px"
                    padding="2px 12px 2px 6px"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
                    background={inputBg}
                    borderRadius="12px"
                    cursor="pointer"
                    textAlign="center"
                    mb="8px"
                    mr="4px"
                    alignItems="center"
                    width="max-content"
                    onClick={() => hideSubTopic(true)}
                  >
                    <Icon as={MdAdd} height="22px" width="22px" mr="4px" />
                    <Box> Add Subtopics</Box>
                  </Flex>
                )}
                {showAddSubtopic && <CreatableMulti disabled />}

                {showAddSubtopic && (
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
                        onClick={() => hideSubTopic(false)}
                      >
                        cancel
                      </Box>
                      <Box color="#0079D3" fontSize="14px" fontWeight="500" cursor="pointer">
                        save
                      </Box>
                    </Flex>
                  </Flex>
                )}
              </Box>
            </Box>
            <Box marginTop="12px">
              <Button
                height="32px"
                padding="4px 16px"
                borderRadius="999px"
                width="100%"
                bg={headerBg}
                color={headerColor}
                onClick={() => history.push(`/p/${subPlebbit?.address}/submit`)}
              >
                Create Post
              </Button>
            </Box>
            <Box borderTop={`1px solid ${border1}`} marginTop="16px" paddingTop="16px">
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
                onClick={() => hideComOptions(!showComOptions)}
              >
                <Flex width="100%" alignItems="center" justifyContent="space-between">
                  <Box>Community options</Box>
                  <Icon as={BiChevronDown} w="20px" h="20px" />
                </Flex>
              </Button>
              {showComOptions && (
                <Box m="0" padding="0">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center" fontSize="14px" fontWeight="400" lineHeight="21px">
                      <Icon as={BsEye} mr="4px" />
                      <Box>Community theme</Box>
                    </Flex>
                    <Switch colorScheme="gray" size="sm" />
                  </Flex>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box marginTop="16px" width="312px">
          <Box
            bg={mainBg}
            color={color}
            border={`1px solid ${bordercolor}`}
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
              backgroundColor={headerBg}
              borderRadius="3px 3px 0 0"
              color={headerColor}
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
                {subPlebbit
                  ? subPlebbit?.flairs?.post?.map((flair, index) => (
                      <Tag
                        key={index}
                        maxW="100%"
                        mr="5px"
                        mb="3px"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        borderRadius="20px"
                        padding="7px 12px"
                        bg={flair?.backgroundColor}
                        color={flair?.textColor}
                      >
                        {flair?.text}
                      </Tag>
                    ))
                  : ''}
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box marginTop="16px" width="312px">
          <Box
            bg={mainBg}
            color={color}
            border={`1px solid ${bordercolor}`}
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
              backgroundColor={headerBg}
              borderRadius="3px 3px 0 0"
              color={headerColor}
              padding="0 12px 12px"
              alignItems="center"
            >
              <Box padding="12px 0 0" fontSize="16px" fontWeight="500" lineHeight="20px">
                <Box fontSize="14px" fontWeight="700" lineHeight="18px" textTransform="none">
                  Moderators
                </Box>
              </Box>
            </Flex>
            <Box maxH="none" padding="12px">
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
                border={`1px solid`}
                width="auto"
                cursor="pointer"
              >
                <Icon as={FiMail} mr="4px" width="20px" height="20px" />
                <Box>Message the mods</Box>
              </Flex>
              {subPlebbit?.roles &&
                Object.keys(subPlebbit?.roles)?.map((item, index) => (
                  <Flex
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="16px"
                    marginBottom="16px"
                    width="100%"
                    key={index}
                    alignItems="center"
                  >
                    <Link>
                      <Box maxWidth="100%" color={linkColor}>{`u/${truncateString(item, 25)}`}</Box>
                    </Link>
                    <Tag
                      textOverflow="ellipsis"
                      overflow="hidden"
                      fontSize="12px"
                      fontWeight="500"
                      whiteSpace="pre"
                    >
                      {subPlebbit?.roles[item]?.role}
                    </Tag>
                  </Flex>
                ))}
              <Flex padding="0 12px 12px" overflow="hidden" justifyContent="flex-end">
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
                    color={linkColor}
                  >
                    View All Moderators
                  </Box>
                </Link>
              </Flex>
            </Box>
          </Box>
        </Box>

        <Box marginTop="16px" width="312px">
          <Box borderRadius="4px" overflow="hidden" wordBreak="break-word" bg={bg || Bg}>
            <Flex
              fontSize="10px"
              fontWeight="400"
              letterSpacing=".5px"
              lineHeight="12px"
              textTransform="uppercase"
              backgroundColor={headerBg}
              borderRadius="3px 3px 0 0"
              color={headerColor}
              padding="0 12px 12px"
              alignItems="center"
            >
              <Box padding="12px 0 0" fontSize="16px" fontWeight="500" lineHeight="20px">
                <Box fontSize="14px" fontWeight="700" lineHeight="18px" textTransform="none">
                  {`p/${truncateString(subPlebbit?.address, 14)} `} rules
                </Box>
              </Box>
            </Flex>
            <Accordion maxHeight="none" allowToggle>
              {subPlebbit?.rules?.map((item, index) => (
                <AccordionItem key={item}>
                  <Box>
                    <AccordionButton padding="12px">
                      <Box
                        flex="1"
                        textAlign="left"
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="12px"
                        textTransform="uppercase"
                      >
                        {`${index + 1}. ${truncateString(item, 20)}`}
                      </Box>
                      <AccordionIcon color="#a4a4a4" />
                    </AccordionButton>
                  </Box>
                  <AccordionPanel padding="12px">{item}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Box>
        <Box flex="1 1 auto" width="inherit" position="relative">
          <BottomSideBar />
          <BacktoTopButton />
        </Box>
      </Flex>
    </Box>
  );
};

export default SideBar;
