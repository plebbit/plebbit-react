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
} from '@chakra-ui/react';
import Button from '../../components/Button';
import { FiMail, FiShield } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GiCakeSlice } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { BsEye } from 'react-icons/bs';
import CreatableMulti from '../../components/DropDown/creatableMulti';
import { Link } from 'react-router-dom';
import truncateString from '../../utils/truncateString';
import { dateFormater } from '../../utils/formatDate';

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
  const [showComOptions, hideComOptions] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
  };

  console.log(subPlebbit);

  return (
    <Box
      marginLeft={ml || '24px'}
      marginTop={mt}
      border={border}
      borderColor={borderColor}
      margin={margin}
      width={width}
      padding={padding}
      borderRadius={borderRadius}
      top={top}
      right={right}
      sx={
        sx || {
          '@media (min-width: 960px)': {
            display: 'block',
          },
          '@media (max-width: 960px)': {
            display: 'none',
            width: '312px',
            flex: '0 0 312px',
          },
        }
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
            <Box
              margin="auto 0 auto auto"
              paddingTop="10px"
              verticalAlign="middle"
              cursor="pointer"
            >
              <Flex borderRadius="2px" padding="4px" alignItems="center" fontWeight="400">
                <Icon as={FiShield} width={5} height={5} mr="4px" />
                <Box>Mod tools</Box>
              </Flex>
            </Box>
          </Flex>
          <Box maxH="none" padding="12px">
            <Box
              tabIndex={0}
              transition="all .1s linear 0s"
              bg={inputBg}
              borderRadius="4px"
              padding="8px"
              marginBottom="12px"
              marginTop="8px"
              border={`1px solid ${border2}`}
              cursor="pointer"
            >
              <Box fontSize="12px" fontWeight="700" lineHeight="16px">
                Add description
              </Box>
            </Box>
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
                <Box>Created {dateFormater(subPlebbit?.createdAt)}</Box>
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
                <Select variant="flushed" border="none" defaultValue={subPlebbit?.pubsubTopic}>
                  <option value="activism">Activism</option>
                  <option value="addictionSupport">Addiction Support</option>
                  <option value="animals">Animals And Pet</option>
                  <option value="anime">Anime</option>
                  <option value="art">Art</option>
                  <option value="beauty">Beauty and Makeup</option>
                  <option value="crypto">Crypto</option>
                  <option value="food">Food</option>
                  <option value="option3">None Of These Topics</option>
                  <option value={subPlebbit?.pubsubTopic}>
                    {truncateString(subPlebbit?.pubsubTopic, 14)}
                  </option>
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
                {showAddSubtopic && <CreatableMulti />}

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
              <Button width="100%" bg={headerBg} color={headerColor}>
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
              >
                <Icon as={FiMail} mr="4px" width="20px" height="20px" />
                <Box>Message the mods</Box>
              </Flex>
              {subPlebbit?.moderatorAddresses?.map((item, index) => (
                <Flex
                  fontSize="12px"
                  fontWeight="500"
                  lineHeight="16px"
                  marginBottom="16px"
                  width="100%"
                  key={index}
                >
                  <Link>
                    <Box color={linkColor}>{`u/${truncateString(item, 25, '...')}`}</Box>
                  </Link>
                </Flex>
              ))}
              <Flex padding="0 12px 12px" overflow="hidden" justifyContent="flex-end">
                <Link>
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
                  {`p/${truncateString(subPlebbit?.address, 14, '...')} `} rules
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
                        {`${index + 1}. ${truncateString(item, 20, '...')}`}
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
          <Box position="sticky" top="57px">
            <Box marginTop="16px" background={bg || Bg}>
              <Box maxHeight="none">
                <Flex padding="12px 8px">
                  <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Help
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Plebbit Coins
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Plebbit Premium
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Communities
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      RePlebbit
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Topics
                    </Box>
                  </Flex>
                  <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      About
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Careers
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Press
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Advertise
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Blog
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Content Policy
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Privacy Policy
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Mod Policy
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  padding="12px"
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="16px"
                  marginTop="3px"
                  marginBottom="3px"
                  display="inline-block"
                  textTransform="capitalize"
                >
                  Plebbit Inc © {new Date().getFullYear()} . All rights reserved
                </Flex>
              </Box>
            </Box>
          </Box>
          <Flex
            top="calc(100vh - 8px)"
            position="sticky"
            marginTop="45px"
            justifyContent="center"
            textAlign="center"
            transform="translateY(-100%)"
          >
            <Button
              border="none"
              content="Back to Top"
              width="128px"
              position="relative"
              bg="#a4a4a4"
              color={color}
              fontSize="14px"
              fontWeight="700"
              onClick={scrollToTop}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SideBar;
