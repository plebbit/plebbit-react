import React from 'react';
import { Flex, Box, Input, Icon, Textarea, Checkbox } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdStickyNote2 } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../../../../components/Button';
import SideBar from './createPostSideBar';

const CreatePost = () => {
  return (
    <Flex
      maxWidth="1248px"
      sx={{
        '@media (min-width: 640px)': {
          padding: '20px 24px',
        },
      }}
      justifyContent="center"
      margin="0 auto"
    >
      <Box
        flex="1 1 100%"
        sx={{
          '@media (min-width: 960px)': {
            maxWidth: '740px',
            width: '640px',
          },
          '@media (max-width: 960px)': {
            width: '100%',
            minWidth: '0',
          },
        }}
      >
        <Flex flexDirection="column">
          <Flex justifyContent="space-between" margin="16px 0" borderBottom="1px solid">
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
              backgroundColor="#fff"
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
          <Box bg="#fff" marginBottom="15px" borderRadius="5px">
            <Box margin="0 0 12px" overflow="auto">
              <Flex alignItems="stretch">
                <Flex
                  color="#a4a4a4"
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
                    placeholder="title"
                    rows="1"
                    overflowX="hidden"
                    overflowWrap="break-word"
                    height="39px"
                    color="#000"
                    padding="8px 68px 8px 16px"
                    border="1px solid #a4a4a4"
                    backgroundColor="transparent"
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
                    color="#a4a4a4"
                    position="absolute"
                    right="12px"
                    pointerEvents="none"
                  >
                    0/300
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box borderRadius="4px" border="1px solid #EDEFF1" position="relative">
                  <Flex
                    borderTopLeftRadius="4px"
                    borderTopRightRadius="4px"
                    boxSizing="border-box"
                    height="40px"
                    padding="8px 16px"
                    alignItems="center"
                    justifyContent="space-between"
                    backgroundColor="#f6f7f8"
                  >
                    <Flex alignItems="center">
                      <Box fontSize="14px" fontWeight="500" lineHeight="18px">
                        Markdown
                      </Box>
                      <Box marginLeft="8px">
                        <Icon as={BiHelpCircle} fill="#a4a4a4" width="12px" height="12px" />
                      </Box>
                    </Flex>
                    {/* <Flex></Flex> */}
                  </Flex>
                  <Box
                    borderRadius="4px"
                    minH="122px"
                    overflow="hidden auto"
                    padding="8px 16px"
                    resize="vertical"
                  >
                    <Textarea
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
                      outLine="none"
                      resize="none"
                      padding="2px"
                    />
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
                      backgroundColor="#3293db"
                      color="rgba(255,255,255,0.5)"
                      fill="rgba(255,255,255,0.5)"
                      width="100%"
                      disabled
                      sx={{
                        tabIndex: '0',
                        filter: 'grayscale(1)',
                      }}
                      content="Post"
                    />
                  </Flex>
                  <Flex>
                    <Button
                      border="1px solid rgba(0,121,211,0.5)"
                      color="rgba(0,121,211,0.5)"
                      width="100%"
                      disabled
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
              backgroundColor="#F6F7F8"
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
                          color="#1c1c1c"
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
                          color="#1c1c1c"
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
      <SideBar />
    </Flex>
  );
};

export default CreatePost;
