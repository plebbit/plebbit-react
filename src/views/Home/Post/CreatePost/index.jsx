import React from 'react';
import {
  Flex,
  Box,
  Input,
  Icon,
  Textarea,
  useColorMode,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdStickyNote2 } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../../../../components/Button';
import SideBar from './createPostSideBar';
import Editor from '../../../../components/Editor';

const CreatePost = () => {
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const borderColor = useColorModeValue('borderLight', 'borderDark');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const { colorMode } = useColorMode();

  return (
    <Flex
      maxWidth="100%"
      justifyContent="center"
      margin="0 auto !important"
      height="100vh"
      sx={{
        '@media (min-width: 640px)': {
          padding: '20px 24px',
          height: 'auto !important',
        },
        '@media (max-width: 640px)': {
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: '0 auto',
        },
      }}
    >
      <Box
        width="740px"
        sx={{
          '@media (min-width: 960px)': {
            minWidth: '0',
          },
          '@media (max-width: 960px)': {
            width: '640px',
            minWidth: '0',
            display: 'none',
          },
        }}
      >
        <Flex flexDirection="column">
          <Flex
            justifyContent="space-between"
            margin="16px 0"
            borderBottom={
              colorMode === 'light' ? '1px solid #edeff1' : '1px solid rgba(255, 255, 255, 0.16)'
            }
          >
            <Box fontSize="18px" fontWeight="500" lineHeight="22px" flex="1">
              Create Post
            </Box>
            <Flex
              alignItems="center"
              fontSize="12px"
              fontWeight="700"
              letterSpacing=".5px"
              lineHeight="24px"
              textTransform="uppercase"
              marginLeft="10px"
            >
              <Box>DRAFTS</Box>
              <Box
                fontSize="12px"
                fontWeight="400"
                lineHeight="16px"
                background="#ccc"
                borderRadius="2px"
                marginLeft="4px"
                padding="1px 3px"
              >
                0
              </Box>
            </Flex>
          </Flex>
          <Flex marginBottom="8px" alignItems="center">
            <Box
              marginRight="16px"
              minW="300px"
              height="40px"
              borderRadius="4px"
              transition="box-shadow .2s ease"
              boxShadow="0 0 0 0 #a4a4a4"
              backgroundColor={bg}
            >
              <Flex alignItems="center" height="100%" padding="0 8px">
                <Box
                  borderRadius="22px"
                  border="1px dashed #a4a4a4"
                  height="22px"
                  margin="0"
                  width="22px"
                  fontSize="22px"
                  lineHeight="22px"
                />
                <Box flex="1" padding="8px">
                  <Input
                    placeholder="Choose a community"
                    spellCheck="false"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    width="100%"
                    bg="transparent"
                    border="none"
                  />
                </Box>
                <ChevronDownIcon />
              </Flex>
            </Box>
          </Flex>
          <Box bg={bg} marginBottom="15px" borderRadius="5px">
            <Box margin="0 0 12px" overflow="auto">
              <Flex alignItems="stretch">
                <Flex
                  color={color}
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="18px"
                  cursor="pointer"
                  outline="none"
                  zIndex="1"
                  width="25%"
                  position="relative"
                  textAlign="center"
                  borderColor="#a4a4a4"
                  borderStyle="solid"
                  borderWidth="0 1px 1px 0"
                  borderRadius="0"
                  justifyContent="center"
                  alignItems="center"
                  whiteSpace="nowrap"
                  padding="15px 17px"
                  borderBottom="2px solid #a4a4a4"
                >
                  <Icon
                    as={MdStickyNote2}
                    fontSize="20px"
                    fontWeight="400"
                    height="20px"
                    lineHeight="20px"
                    verticalAlign="middle"
                    width="20px"
                    marginRight="8px"
                  />
                  Post
                </Flex>
              </Flex>
            </Box>
            <Box margin="16px">
              <Box marginBottom="8px">
                <Box position="relative">
                  <Textarea
                    maxLength="300"
                    placeholder="Title"
                    rows="1"
                    overflowX="hidden"
                    overflowWrap="break-word"
                    height="39px"
                    color={color}
                    padding="8px 68px 8px 16px"
                    backgroundColor={bg}
                    resize="none"
                    width="100%"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    fontFamily="inherit"
                  />
                  <Box
                    fontSize="10px"
                    fontWeight="700"
                    letterSpacing=".5px"
                    lineHeight="12px"
                    textTransform="uppercase"
                    bottom="12px"
                    color={color}
                    position="absolute"
                    right="12px"
                    pointerEvents="none"
                  >
                    0/300
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  borderRadius="4px"
                  border={
                    colorMode === 'light'
                      ? '1px solid #edeff1'
                      : '1px solid rgba(255, 255, 255, 0.16)'
                  }
                  position="relative"
                >
                  <Box
                    borderRadius="4px"
                    minH="300px"
                    overflow="hidden auto"
                    padding="8px 16px"
                    resize="vertical"
                  >
                    {/* <Textarea
                      placeholder="Text (optional)"
                      row="1"
                      spellCheck="false"
                      overflow="hidden"
                      overflowWrap="break-word"
                      height="122px"
                      opacity=".5"
                      fontSize="13px"
                      fontWeight="400"
                      background="transparent"
                      border="none"
                      boxSizing="border-box"
                      display="block"
                      ouline="none"
                      resize="none"
                      padding="2px"
                    /> */}
                    <Editor />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Flex
              flexDir="column"
              alignItems="flex-start"
              justifyContent="space-between"
              padding="0 16px 16px"
            >
              <Flex flexFlow="column nowrap" maxW="100%" minW="0">
                <Flex flexWrap="wrap" maxWidth="530px" alignItems="center">
                  <Button
                    overflow="visible"
                    mb="8px"
                    mr="4px"
                    zIndex="1"
                    position="relative"
                    border="1px solid #878a8c"
                    color="#878a8c"
                    fill="#878a8c"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17px"
                    minHeight="32px"
                    alignItems="center"
                    borderRadius="30px"
                    justifyContent="center"
                    width="auto"
                    disabled={true}
                    display="flex"
                    sx={{
                      padding: '4px 16px',
                    }}
                    content={
                      <>
                        <Icon
                          as={AiOutlinePlus}
                          display="inline-block"
                          height={8}
                          width={8}
                          fontSize="20px"
                          lineHeight="20px"
                          fontWeight="400"
                          verticalAlign="middle"
                          padding="0 8px 0 0"
                        />
                        <span> OC</span>
                      </>
                    }
                  />
                  <Button
                    overflow="visible"
                    mb="8px"
                    mr="4px"
                    zIndex="1"
                    position="relative"
                    border="1px solid #878a8c"
                    color="#878a8c"
                    fill="#878a8c"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17px"
                    minHeight="32px"
                    alignItems="center"
                    borderRadius="30px"
                    justifyContent="center"
                    width="auto"
                    disabled={true}
                    display="flex"
                    sx={{
                      padding: '4px 16px',
                    }}
                    content={
                      <>
                        <Icon
                          as={AiOutlinePlus}
                          display="inline-block"
                          height={8}
                          width={8}
                          fontSize="20px"
                          lineHeight="20px"
                          fontWeight="400"
                          verticalAlign="middle"
                          padding="0 8px 0 0"
                        />
                        <span> SPOILER</span>
                      </>
                    }
                  />
                  <Button
                    overflow="visible"
                    mb="8px"
                    mr="4px"
                    zIndex="1"
                    position="relative"
                    border="1px solid #878a8c"
                    color="#878a8c"
                    fill="#878a8c"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17px"
                    minHeight="32px"
                    alignItems="center"
                    borderRadius="30px"
                    justifyContent="center"
                    width="auto"
                    display="flex"
                    sx={{
                      padding: '4px 16px',
                    }}
                    content={
                      <>
                        <Icon
                          as={AiOutlinePlus}
                          display="inline-block"
                          height={8}
                          width={8}
                          fontSize="20px"
                          lineHeight="20px"
                          fontWeight="400"
                          verticalAlign="middle"
                          padding="0 8px 0 0"
                        />
                        <span> NSFW</span>
                      </>
                    }
                  />
                  <Button
                    overflow="visible"
                    mb="8px"
                    mr="4px"
                    zIndex="1"
                    position="relative"
                    border="1px solid #878a8c"
                    color="#878a8c"
                    fill="#878a8c"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17px"
                    minHeight="32px"
                    alignItems="center"
                    borderRadius="30px"
                    justifyContent="center"
                    width="auto"
                    disabled={true}
                    display="flex"
                    sx={{
                      padding: '4px 16px',
                    }}
                    content={
                      <>
                        <Icon
                          as={AiOutlinePlus}
                          display="inline-block"
                          height={8}
                          width={8}
                          fontSize="20px"
                          lineHeight="20px"
                          fontWeight="400"
                          verticalAlign="middle"
                          padding="0 8px 0 0"
                        />
                        <span> FLAIR</span>
                      </>
                    }
                  />
                </Flex>
              </Flex>
              <hr width="100%" border="0" borderTop="1px solid #edeff1" />
              <Box position="relative" width="100%" marginTop="8px">
                <Flex flexDir="row-reverse" paddingTop="8px" alignItems="center">
                  <Flex
                    sx={{
                      '@media (min-width: 189px)': {
                        marginLeft: '8px',
                      },
                    }}
                  >
                    <Button
                      backgroundColor={colorMode === 'light' ? '#3293db' : '#dfe1e3'}
                      color={colorMode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,27,0.5)'}
                      fill="rgba(255,255,255,0.5)"
                      width="100%"
                      sx={{
                        tabIndex: '0',
                        filter: 'grayscale(1)',
                      }}
                      content="Post"
                    />
                  </Flex>
                  <Flex>
                    <Button
                      border={borderColor}
                      color={
                        colorMode === 'light' ? 'rgba(0,121,211,0.5)' : 'rgba(215,218,220,0.5)'
                      }
                      width="100%"
                      sx={{
                        tabIndex: '0',
                        filter: 'grayscale(1)',
                      }}
                      content="Save Draft"
                    />
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            <Flex
              backgroundColor={bg}
              borderRadius="0 0 6px 6px"
              flexFlow="column"
              padding="8px 16px 21px"
              position="relative"
            >
              <Flex marginTop="8px" width="100%">
                <Flex flexFlow="column" marginRight="auto" alignSelf="flex-start">
                  <Flex alignItems="center">
                    <Flex
                      marginBottom="8px"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      color="#1c1c1c"
                      cursor="pointer"
                      alignItems="center"
                    >
                      <Checkbox colorScheme="gray" defaultChecked>
                        <Box
                          marginRight="4px"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="18px"
                          color={color}
                        >
                          Send me post reply notifications
                        </Box>
                      </Checkbox>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center">
                    <Flex
                      marginBottom="8px"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      color="#1c1c1c"
                      cursor="pointer"
                      alignItems="center"
                    >
                      <Checkbox colorScheme="gray" defaultChecked>
                        <Box
                          marginRight="4px"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="18px"
                          color={color}
                        >
                          Share this post on Twitter
                        </Box>
                      </Checkbox>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex flexFlow="column"></Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box
        width="740px"
        sx={{
          '@media (min-width: 960px)': {
            minWidth: '0',
            display: 'none',
          },
          '@media (max-width: 960px)': {
            width: '640px',
            minWidth: '0',
          },
        }}
      >
        <Flex flexDirection="column" bg={bg} height="100vh">
          <Flex alignItems="center" padding="0 16px">
            <Box
              width="100%"
              height="40px"
              borderRadius="4px"
              transition="box-shadow .2s ease"
              boxShadow="0 0 0 0 #a4a4a4"
              backgroundColor={bg}
            >
              <Flex alignItems="center" height="100%" padding="0 8px">
                <Box
                  borderRadius="22px"
                  border="1px dashed #a4a4a4"
                  height="22px"
                  margin="0"
                  width="22px"
                  fontSize="22px"
                  lineHeight="22px"
                />
                <Box flex="1" padding="8px">
                  <Input
                    placeholder="Choose a community"
                    spellCheck="false"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    width="100%"
                    bg="transparent"
                    border="none"
                    _focus={{
                      outline: 'none',
                    }}
                  />
                </Box>
                <ChevronDownIcon />
              </Flex>
            </Box>
          </Flex>
          <hr
            style={{
              border: '0',
              borderTop: '1px solid #edeff1',
              margin: '0px 16px',
            }}
          />

          <Box bg={bg} marginBottom="15px" borderRadius="5px">
            <Box margin="16px">
              <Box marginBottom="8px">
                <Box position="relative">
                  <Textarea
                    maxLength="300"
                    placeholder="Add an interesting title"
                    rows="1"
                    overflowX="hidden"
                    overflowWrap="break-word"
                    height="39px"
                    color={color}
                    padding="8px 68px 8px 16px"
                    backgroundColor={bg}
                    resize="none"
                    width="100%"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    fontFamily="inherit"
                  />
                </Box>
              </Box>
              <Box>
                <Box
                  borderRadius="4px"
                  border={
                    colorMode === 'light'
                      ? '1px solid #edeff1'
                      : '1px solid rgba(255, 255, 255, 0.16)'
                  }
                  position="relative"
                >
                  <Flex
                    borderTopLeftRadius="4px"
                    borderTopRightRadius="4px"
                    boxSizing="border-box"
                    height="40px"
                    padding="8px 16px"
                    alignItems="center"
                    justifyContent="space-between"
                    backgroundColor={colorMode === 'light' ? '#f6f7f8' : '#272729'}
                  >
                    <Flex alignItems="center">
                      <Box fontSize="14px" fontWeight="500" lineHeight="18px">
                        Add your text
                      </Box>
                      <Box marginLeft="8px">
                        <Icon as={BiHelpCircle} fill="#a4a4a4" width="12px" height="12px" />
                      </Box>
                    </Flex>
                    {/* <Flex></Flex> */}
                  </Flex>
                  <Box
                    borderRadius="4px"
                    minH="300px"
                    overflow="hidden auto"
                    padding="8px 16px"
                    resize="vertical"
                  >
                    {/* <Textarea
                      placeholder="Text (optional)"
                      row="1"
                      spellCheck="false"
                      overflow="hidden"
                      overflowWrap="break-word"
                      height="122px"
                      opacity=".5"
                      fontSize="13px"
                      fontWeight="400"
                      background="transparent"
                      border="none"
                      boxSizing="border-box"
                      display="block"
                      ouline="none"
                      resize="none"
                      padding="2px"
                    /> */}
                    <Editor hideToolBar={true} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <SideBar />
    </Flex>
  );
};

export default CreatePost;
