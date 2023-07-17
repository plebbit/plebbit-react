import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdOutlineClose } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import ColorPicker from '../../components/ColorPicker';
import Link from '../../components/Link';
import { useNavigate } from 'react-router-dom';

const SubStyleSide = () => {
  const bg = useColorModeValue('lightBody', 'darkBody');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const border = useColorModeValue('#edeff1', '#343536');
  const [selected, setSelected] = useState('');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        bg={ bg }
        width="284px"
        boxSizing="border-box"
        boxShadow="0 1px 3px rgba(0,0,0,.08)"
        height="100%"
        overflow="auto"
        position="fixed"
        left="0"
        top="0"
        zIndex="85"
      >
        <Box
          cursor="pointer"
          onClick={ () => navigate(-1) }
          position="absolute"
          top="18px"
          right="12px"
        >
          <Icon as={ MdOutlineClose } height="16px" width="16px" color={ iconColor } />
        </Box>
        <Box>
          <Box padding="12px 12px 40px">
            <Flex
              fontSize="16px"
              fontWeight="500"
              lineHeight="20px"
              mb="40px"
              paddingTop="4px"
              textAlign="left"
              marginRight="28px"
              alignItems="center"
              cursor="pointer"
              onClick={ () => (selected === '' ? navigate(-1) : setSelected('')) }
            >
              <Icon as={ MdArrowBackIos } />
              <Box>Back to Mod tools</Box>
            </Flex>
            { selected === '' && (
              <>
                <Box mb="32px">
                  <Text
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="22px"
                    as="h1"
                    borderBottom={ `2px solid ${border}` }
                    mb="8px"
                    pb="8px"
                  >
                    Appearance
                  </Text>
                  <Box borderBottom={ `1px solid ${border}` }>
                    <Flex
                      cursor="pointer"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      padding="12px 0"
                      onClick={ () => setSelected('color') }
                    >
                      <Box flex="1 1 100%">Color theme</Box>
                      <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                        <Icon as={ MdArrowForwardIos } />
                      </Box>
                    </Flex>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` }>
                    <Flex
                      cursor="pointer"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      padding="12px 0"
                      onClick={ () => setSelected('name') }
                    >
                      <Box flex="1 1 100%">Name & icon</Box>
                      <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                        <Icon as={ MdArrowForwardIos } />
                      </Box>
                    </Flex>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` }>
                    <Flex
                      cursor="pointer"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      padding="12px 0"
                      onClick={ () => setSelected('banner') }
                    >
                      <Box flex="1 1 100%">Banner</Box>
                      <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                        <Icon as={ MdArrowForwardIos } />
                      </Box>
                    </Flex>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` }>
                    <Flex
                      cursor="pointer"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      padding="12px 0"
                      onClick={ () => setSelected('menu') }
                    >
                      <Box flex="1 1 100%">Menu</Box>
                      <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                        <Icon as={ MdArrowForwardIos } />
                      </Box>
                    </Flex>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` }>
                    <Flex
                      cursor="pointer"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      padding="12px 0"
                      onClick={ () => setSelected('posts') }
                    >
                      <Box flex="1 1 100%">Posts</Box>
                      <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                        <Icon as={ MdArrowForwardIos } />
                      </Box>
                    </Flex>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` }>
                    <Flex
                      cursor="pointer"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      padding="12px 0"
                      onClick={ () => setSelected('css') }
                    >
                      <Box flex="1 1 100%">Css</Box>
                      <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                        <Icon as={ MdArrowForwardIos } />
                      </Box>
                    </Flex>
                  </Box>
                  <Box
                    fontSize="12px"
                    fontWeight="700"
                    borderRadius="9999px"
                    border="1px solid transparent"
                    color={ linkColor }
                    letterSpacing=".5px"
                    lineHeight="24px"
                    my="12px"
                    textAlign="right"
                  >
                    RESET TO DEFAULTS
                  </Box>
                </Box>
                <Box mb="32px">
                  <Text
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="22px"
                    as="h1"
                    borderBottom={ `2px solid ${border}` }
                    mb="8px"
                    pb="8px"
                  >
                    Structure
                  </Text>
                  <Box borderBottom={ `1px solid ${border}` }>
                    <Flex
                      cursor="pointer"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      padding="12px 0"
                      onClick={ () => setSelected('menuLink') }
                    >
                      <Box flex="1 1 100%">Menu links</Box>
                      <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                        <Icon as={ MdArrowForwardIos } />
                      </Box>
                    </Flex>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` }>
                    <Flex
                      cursor="pointer"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      padding="12px 0"
                      onClick={ () => setSelected('sideBarWidget') }
                    >
                      <Box flex="1 1 100%">Sidebar widgets</Box>
                      <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                        <Icon as={ MdArrowForwardIos } />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </>
            ) }
            { selected === 'color' && (
              <>
                <Box mb="32px">
                  <Flex flexDir="column" borderBottom={ `2px solid ${border}` } mb="8px" pb="8px">
                    <Text fontSize="18px" fontWeight="500" lineHeight="22px" as="h1">
                      Color theme
                    </Text>
                    <Flex
                      alignItems="flex-end"
                      padding="4px 0 0"
                      cursor="default"
                      color={ linkColor }
                    >
                      <Icon
                        pr="4px"
                        fontWeight="400px"
                        fontSize="20px"
                        height="20px"
                        as={ BsInfoCircle }
                        width="20px"
                        lineHeight="20px"
                      />
                      <Text fontWeight="500" lineHeight="16px" fontSize="12px">
                        Color theme
                      </Text>
                    </Flex>
                  </Flex>
                  <Text color={ metaColor } fontWeight="500" fontSize="12px" lineHeight="16px">
                    These community styling options will also display in plebbit apps.
                  </Text>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Theme colors
                    </Text>
                    <>
                      <SubItem title="Base" />
                      <SubItem title="Highlight" />
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Body Background
                    </Text>
                    <>
                      <SubItem title="Color" />
                      <Flex flexDir="column">
                        <Box>
                          <SubItem title="Image" side={ <Box /> } />
                        </Box>
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input
                            fontSize="12px"
                            border="none"
                            placeholder="input background image url here"
                          />
                        </Box>
                      </Flex>
                    </>
                  </Box>
                  <Flex flexDir="column">
                    <Button
                      padding="4px 32px"
                      h="32px"
                      borderRadius="999px"
                      my="8px"
                      colorScheme="blue"
                    >
                      Save
                    </Button>
                    <Button
                      padding="4px 32px"
                      h="32px"
                      colorScheme="blue"
                      variant="outline"
                      borderRadius="999px"
                    >
                      cancel
                    </Button>
                  </Flex>
                </Box>
              </>
            ) }
            { selected === 'name' && (
              <>
                <Box mb="32px">
                  <Flex flexDir="column" borderBottom={ `2px solid ${border}` } mb="8px" pb="8px">
                    <Text fontSize="18px" fontWeight="500" lineHeight="22px" as="h1">
                      Name & icon
                    </Text>
                    <Flex
                      alignItems="flex-end"
                      padding="4px 0 0"
                      cursor="default"
                      color={ linkColor }
                    >
                      <Icon
                        pr="4px"
                        fontWeight="400px"
                        fontSize="20px"
                        height="20px"
                        as={ BsInfoCircle }
                        width="20px"
                        lineHeight="20px"
                      />
                      <Text fontWeight="500" lineHeight="16px" fontSize="12px">
                        Name & icon
                      </Text>
                    </Flex>
                  </Flex>

                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Community Name Format
                    </Text>
                    <>
                      <RadioGroup defaultValue="1" my="8px">
                        <Stack>
                          <Radio color={ iconColor } value="1">
                            <Box lineHeight="18px" fontSize="12px">
                              p/server_name
                            </Box>
                          </Radio>
                          <Radio color={ iconColor } value="2">
                            <Box lineHeight="18px" fontSize="12px">
                              server_name
                            </Box>
                          </Radio>
                          <Radio color={ iconColor } value="3">
                            <Box lineHeight="18px" fontSize="12px">
                              hide
                            </Box>
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Community Icon
                    </Text>
                    <>
                      <Flex flexDir="column">
                        <Box>
                          <SubItem title="Custom Image" side={ <Box /> } />
                        </Box>
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input fontSize="12px" border="none" placeholder="input icon  url here" />
                        </Box>
                        <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                          Required Size: 256x256px
                        </Text>
                      </Flex>
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Community Icon
                    </Text>
                    <>
                      <Flex flexDir="column">
                        <Box>
                          <SubItem title="Custom Image" side={ <Box /> } />
                        </Box>
                        <Switch mt="8px" mb="4px" size="sm" lineHeight="18px" fontSize="12px">
                          Hide Community Icon in Banner
                        </Switch>
                        <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                          Your Community Icon will still display in other areas of plebbit
                        </Text>
                      </Flex>
                    </>
                  </Box>
                  <Flex flexDir="column">
                    <Button
                      padding="4px 32px"
                      h="32px"
                      borderRadius="999px"
                      my="8px"
                      colorScheme="blue"
                    >
                      Save
                    </Button>
                    <Button
                      padding="4px 32px"
                      h="32px"
                      colorScheme="blue"
                      variant="outline"
                      borderRadius="999px"
                    >
                      cancel
                    </Button>
                  </Flex>
                </Box>
              </>
            ) }
            { selected === 'banner' && (
              <>
                <Box mb="32px">
                  <Flex flexDir="column" borderBottom={ `2px solid ${border}` } mb="8px" pb="8px">
                    <Text fontSize="18px" fontWeight="500" lineHeight="22px" as="h1">
                      Banner
                    </Text>
                    <Flex
                      alignItems="flex-end"
                      padding="4px 0 0"
                      cursor="default"
                      color={ linkColor }
                    >
                      <Icon
                        pr="4px"
                        fontWeight="400px"
                        fontSize="20px"
                        height="20px"
                        as={ BsInfoCircle }
                        width="20px"
                        lineHeight="20px"
                      />
                      <Text fontWeight="500" lineHeight="16px" fontSize="12px">
                        Banner
                      </Text>
                    </Flex>
                  </Flex>

                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Height
                    </Text>
                    <>
                      <RadioGroup defaultValue="1" my="8px">
                        <Stack>
                          <Radio color={ iconColor } value="1">
                            <Box lineHeight="18px" fontSize="12px">
                              Small • 64px
                            </Box>
                          </Radio>
                          <Radio color={ iconColor } value="2">
                            <Box lineHeight="18px" fontSize="12px">
                              Medium • 128px
                            </Box>
                          </Radio>
                          <Radio color={ iconColor } value="3">
                            <Box lineHeight="18px" fontSize="12px">
                              Large • 192px
                            </Box>
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Background
                    </Text>
                    <>
                      <SubItem title="Color" />
                      <Flex flexDir="column">
                        <Box>
                          <SubItem title="Image" side={ <Box /> } />
                        </Box>
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input
                            fontSize="12px"
                            border="none"
                            placeholder="input banner image url here"
                          />
                        </Box>
                        <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                          Recommended upload size: 4,000x128px
                        </Text>
                      </Flex>
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Additional Background Image
                    </Text>
                    <>
                      <Flex flexDir="column">
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input fontSize="12px" border="none" placeholder="input icon  url here" />
                        </Box>
                        <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                          Required Size: 256x256px
                        </Text>
                      </Flex>
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Mobile banner image
                    </Text>
                    <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                      This image will override the banner background image on mobile apps. Removing
                      the mobile banner image will display the banner background image on mobile
                      apps.
                    </Text>
                    <>
                      <Flex flexDir="column">
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input fontSize="12px" border="none" placeholder="input icon  url here" />
                        </Box>
                        <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                          Recommended upload size: 1,600x480px
                        </Text>
                      </Flex>
                    </>
                  </Box>

                  <Flex flexDir="column">
                    <Button
                      padding="4px 32px"
                      h="32px"
                      borderRadius="999px"
                      my="8px"
                      colorScheme="blue"
                    >
                      Save
                    </Button>
                    <Button
                      padding="4px 32px"
                      h="32px"
                      colorScheme="blue"
                      variant="outline"
                      borderRadius="999px"
                    >
                      cancel
                    </Button>
                  </Flex>
                </Box>
              </>
            ) }
            { selected === 'menu' && (
              <>
                <Box mb="32px">
                  <Flex flexDir="column" borderBottom={ `2px solid ${border}` } mb="8px" pb="8px">
                    <Text fontSize="18px" fontWeight="500" lineHeight="22px" as="h1">
                      Menu
                    </Text>
                    <Flex
                      alignItems="flex-end"
                      padding="4px 0 0"
                      cursor="default"
                      color={ linkColor }
                    >
                      <Icon
                        pr="4px"
                        fontWeight="400px"
                        fontSize="20px"
                        height="20px"
                        as={ BsInfoCircle }
                        width="20px"
                        lineHeight="20px"
                      />
                      <Text fontWeight="500" lineHeight="16px" fontSize="12px">
                        Menu
                      </Text>
                    </Flex>
                  </Flex>

                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Link Colors
                    </Text>
                    <>
                      <SubItem title="Active Page" />
                      <SubItem title="Inactive Page" />
                      <SubItem title="Hover" />
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Main Menu Background
                    </Text>
                    <>
                      <SubItem title="Color" />
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Submenu Background
                    </Text>
                    <>
                      <RadioGroup defaultValue="1" my="8px">
                        <Stack>
                          <Radio color={ iconColor } value="1">
                            <Box lineHeight="18px" fontSize="12px">
                              Match Main Menu Background
                            </Box>
                          </Radio>
                          <Radio color={ iconColor } value="2">
                            <Box lineHeight="18px" fontSize="12px">
                              Solid Color
                            </Box>
                          </Radio>
                          <SubItem title="Active Page" />
                        </Stack>
                      </RadioGroup>
                    </>
                  </Box>
                  <Flex flexDir="column">
                    <Button
                      padding="4px 32px"
                      h="32px"
                      borderRadius="999px"
                      my="8px"
                      colorScheme="blue"
                    >
                      Save
                    </Button>
                    <Button
                      padding="4px 32px"
                      h="32px"
                      colorScheme="blue"
                      variant="outline"
                      borderRadius="999px"
                    >
                      cancel
                    </Button>
                  </Flex>
                </Box>
              </>
            ) }
            { selected === 'posts' && (
              <>
                <Box mb="32px">
                  <Flex flexDir="column" borderBottom={ `2px solid ${border}` } mb="8px" pb="8px">
                    <Text fontSize="18px" fontWeight="500" lineHeight="22px" as="h1">
                      Posts
                    </Text>
                    <Flex
                      alignItems="flex-end"
                      padding="4px 0 0"
                      cursor="default"
                      color={ linkColor }
                    >
                      <Icon
                        pr="4px"
                        fontWeight="400px"
                        fontSize="20px"
                        height="20px"
                        as={ BsInfoCircle }
                        width="20px"
                        lineHeight="20px"
                      />
                      <Text fontWeight="500" lineHeight="16px" fontSize="12px">
                        Posts
                      </Text>
                    </Flex>
                  </Flex>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Title Color
                    </Text>
                    <>
                      <SubItem title="Color" />
                    </>
                  </Box>

                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Up + Down Vote Icons
                    </Text>
                    <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                      If you want to upload your own vote icons, you'll need to upload an image for
                      each of the indicated icon states.
                    </Text>
                    <>
                      <RadioGroup defaultValue="1" my="8px">
                        <Stack>
                          <Radio color={ iconColor } value="1">
                            <Box lineHeight="18px" fontSize="12px">
                              Standard Plebbit
                            </Box>
                          </Radio>
                          <Radio color={ iconColor } value="2">
                            <Box lineHeight="18px" fontSize="12px">
                              Custom
                            </Box>
                          </Radio>
                        </Stack>
                      </RadioGroup>
                      <>
                        <Flex flexDir="column">
                          <Box>
                            <SubItem title="Inactive upvote" side={ <Box /> } />
                          </Box>
                          <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                            <Input
                              fontSize="12px"
                              border="none"
                              placeholder="input Inactive upvote image url here"
                            />
                          </Box>
                        </Flex>
                        <Flex flexDir="column">
                          <Box>
                            <SubItem title="Active upvote" side={ <Box /> } />
                          </Box>
                          <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                            <Input
                              fontSize="12px"
                              border="none"
                              placeholder="input Active upvote image url here"
                            />
                          </Box>
                          <SubItem title="Upvote count color" />
                        </Flex>
                      </>
                      <>
                        <Flex flexDir="column">
                          <Box>
                            <SubItem title="Inactive downvote" side={ <Box /> } />
                          </Box>
                          <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                            <Input
                              fontSize="12px"
                              border="none"
                              placeholder="input Inactive downvote image url here"
                            />
                          </Box>
                        </Flex>
                        <Flex flexDir="column">
                          <Box>
                            <SubItem title="Active downvote" side={ <Box /> } />
                          </Box>
                          <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                            <Input
                              fontSize="12px"
                              border="none"
                              placeholder="input Active downvote image url here"
                            />
                          </Box>
                          <SubItem title="Downvote count color" />
                        </Flex>
                      </>
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Post Background
                    </Text>
                    <>
                      <SubItem title="Color" />
                      <Flex flexDir="column">
                        <Box>
                          <SubItem title="Image" side={ <Box /> } />
                        </Box>
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input
                            fontSize="12px"
                            border="none"
                            placeholder="input banner image url here"
                          />
                        </Box>
                      </Flex>
                    </>
                  </Box>

                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Link Preview Placeholder Image
                    </Text>
                    <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                      Most of the time, link posts automatically generate a placeholder image;
                      sometimes they don't. Use the Standard Plebbit placeholder, or create your
                      own!
                    </Text>
                    <>
                      <Flex flexDir="column">
                        <Box>
                          <SubItem title="Image" side={ <Box /> } />
                        </Box>
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input
                            fontSize="12px"
                            border="none"
                            placeholder="input image  url here"
                          />
                        </Box>
                      </Flex>
                    </>
                  </Box>

                  <Flex flexDir="column">
                    <Button
                      padding="4px 32px"
                      h="32px"
                      borderRadius="999px"
                      my="8px"
                      colorScheme="blue"
                    >
                      Save
                    </Button>
                    <Button
                      padding="4px 32px"
                      h="32px"
                      colorScheme="blue"
                      variant="outline"
                      borderRadius="999px"
                    >
                      cancel
                    </Button>
                  </Flex>
                </Box>
              </>
            ) }
            { selected === 'menuLink' && (
              <>
                <Box mb="32px">
                  <Flex flexDir="column" borderBottom={ `2px solid ${border}` } mb="8px" pb="8px">
                    <Text fontSize="18px" fontWeight="500" lineHeight="22px" as="h1">
                      Posts
                    </Text>
                    <Flex
                      alignItems="flex-end"
                      padding="4px 0 0"
                      cursor="default"
                      color={ linkColor }
                    >
                      <Icon
                        pr="4px"
                        fontWeight="400px"
                        fontSize="20px"
                        height="20px"
                        as={ BsInfoCircle }
                        width="20px"
                        lineHeight="20px"
                      />
                      <Text fontWeight="500" lineHeight="16px" fontSize="12px">
                        Posts
                      </Text>
                    </Flex>
                  </Flex>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Title Color
                    </Text>
                    <>
                      <SubItem title="Color" />
                    </>
                  </Box>

                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Up + Down Vote Icons
                    </Text>
                    <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                      If you want to upload your own vote icons, you'll need to upload an image for
                      each of the indicated icon states.
                    </Text>
                    <>
                      <RadioGroup defaultValue="1" my="8px">
                        <Stack>
                          <Radio color={ iconColor } value="1">
                            <Box lineHeight="18px" fontSize="12px">
                              Standard Plebbit
                            </Box>
                          </Radio>
                          <Radio color={ iconColor } value="2">
                            <Box lineHeight="18px" fontSize="12px">
                              Custom
                            </Box>
                          </Radio>
                        </Stack>
                      </RadioGroup>
                      <>
                        <Flex flexDir="column">
                          <Box>
                            <SubItem title="Inactive upvote" side={ <Box /> } />
                          </Box>
                          <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                            <Input
                              fontSize="12px"
                              border="none"
                              placeholder="input Inactive upvote image url here"
                            />
                          </Box>
                        </Flex>
                        <Flex flexDir="column">
                          <Box>
                            <SubItem title="Active upvote" side={ <Box /> } />
                          </Box>
                          <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                            <Input
                              fontSize="12px"
                              border="none"
                              placeholder="input Active upvote image url here"
                            />
                          </Box>
                          <SubItem title="Upvote count color" />
                        </Flex>
                      </>
                      <>
                        <Flex flexDir="column">
                          <Box>
                            <SubItem title="Inactive downvote" side={ <Box /> } />
                          </Box>
                          <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                            <Input
                              fontSize="12px"
                              border="none"
                              placeholder="input Inactive downvote image url here"
                            />
                          </Box>
                        </Flex>
                        <Flex flexDir="column">
                          <Box>
                            <SubItem title="Active downvote" side={ <Box /> } />
                          </Box>
                          <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                            <Input
                              fontSize="12px"
                              border="none"
                              placeholder="input Active downvote image url here"
                            />
                          </Box>
                          <SubItem title="Downvote count color" />
                        </Flex>
                      </>
                    </>
                  </Box>
                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Post Background
                    </Text>
                    <>
                      <SubItem title="Color" />
                      <Flex flexDir="column">
                        <Box>
                          <SubItem title="Image" side={ <Box /> } />
                        </Box>
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input
                            fontSize="12px"
                            border="none"
                            placeholder="input banner image url here"
                          />
                        </Box>
                      </Flex>
                    </>
                  </Box>

                  <Box borderBottom={ `1px solid ${border}` } mb="8px" pb="2px">
                    <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" py="8px">
                      Link Preview Placeholder Image
                    </Text>
                    <Text as="h6" fontSize="10px" mb="8px" color={ metaColor }>
                      Most of the time, link posts automatically generate a placeholder image;
                      sometimes they don't. Use the Standard Plebbit placeholder, or create your
                      own!
                    </Text>
                    <>
                      <Flex flexDir="column">
                        <Box>
                          <SubItem title="Image" side={ <Box /> } />
                        </Box>
                        <Box mb="4px" borderRadius="8px" border={ `1px solid ${border}` }>
                          <Input
                            fontSize="12px"
                            border="none"
                            placeholder="input image  url here"
                          />
                        </Box>
                      </Flex>
                    </>
                  </Box>

                  <Flex flexDir="column">
                    <Button
                      padding="4px 32px"
                      h="32px"
                      borderRadius="999px"
                      my="8px"
                      colorScheme="blue"
                    >
                      Save
                    </Button>
                    <Button
                      padding="4px 32px"
                      h="32px"
                      colorScheme="blue"
                      variant="outline"
                      borderRadius="999px"
                    >
                      cancel
                    </Button>
                  </Flex>
                </Box>
              </>
            ) }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStyleSide;

export const SubItem = ({ title, side }) => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');

  return (
    <Flex padding="8px 0" alignItems="center">
      <Box flex="1 1 100%">
        <Text
          as="h3"
          cursor="pointer"
          fontSize="12px"
          lineHeight="16px"
          color={ iconColor }
          fontWeight="500"
        >
          { title }
        </Text>
      </Box>
      <Box flex="0 0">
        { side || (
          <ColorPicker
            popoverStyles={ {
              right: '12px',
            } }
          />
        ) }
      </Box>
    </Flex>
  );
};
