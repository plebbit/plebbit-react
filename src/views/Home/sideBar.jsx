import React from 'react';
import {
  Box,
  Text,
  List,
  ListItem,
  Flex,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';
import Button from '../../components/Button';

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
}) => {
  const color = useColorModeValue('darkText', 'lightText');
  const Bg = useColorModeValue('#F8F9FA', '');
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
  };

  return (
    <Box
      marginLeft={ml || '24px'}
      marginTop={mt || '28px'}
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
        <Box borderRadius="4px" overflow="visible" wordBreak="break-word" bg={Bg}>
          <Box
            maxHeight="none"
            bgImg="https://source.unsplash.com/user/c_v_r"
            backgroundPosition="50%"
            backgroundRepeat="no-repeat"
            borderTopRadius="4px"
            h="80px"
            pos="relative"
            backgroundColor="#a4a4a4"
          >
            <Text
              fontSize="16px"
              fontWeight="500"
              lineHeight="20px"
              bottom="8px"
              color="#fff"
              left="16px"
              position="absolute"
            >
              Top Gaming Communities
            </Text>
          </Box>
          <List>
            <ListItem
              display="flex"
              alignItems="center"
              padding="0 12px"
              height="48px"
              justifyContent="space-between"
              borderBottom="thin solid #edeff1"
            >
              <Flex>
                <Box
                  width="20px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  1
                </Box>
                <Box ml="8px" display="flex" alignItems="center" justifyContent="center">
                  <ChevronUpIcon
                    fontSize="20px"
                    fontWeight="400"
                    h="20px"
                    lineHeight="20px"
                    color="#46d160"
                  />
                </Box>
                <Avatar
                  borderRadius="50%"
                  margin="0 8px"
                  height="32px"
                  width="32px"
                  backgroundColor="#a4a4a4"
                  name="pokemon"
                  src="https://b.thumbs.redditmedia.com/bt5Bgfbu7g5OCCganJwwo7mJBTWBqZsEXwFY_joajMk.png"
                />
                <Box alignSelf="center" fontSize="14px" fontWeight="500" lineHeight="18px">
                  p/pokemon
                </Box>
              </Flex>
              <Button content="Join" bg="#a4a4a4" height="24px" color={color} />
            </ListItem>

            <ListItem
              display="flex"
              alignItems="center"
              padding="0 12px"
              height="48px"
              justifyContent="space-between"
              borderBottom="thin solid #edeff1"
            >
              <Flex>
                <Box
                  width="20px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  2
                </Box>
                <Box ml="8px" display="flex" alignItems="center" justifyContent="center">
                  <ChevronUpIcon
                    fontSize="20px"
                    fontWeight="400"
                    h="20px"
                    lineHeight="20px"
                    color="#46d160"
                  />
                </Box>
                <Avatar
                  borderRadius="50%"
                  margin="0 8px"
                  height="32px"
                  width="32px"
                  backgroundColor="#a4a4a4"
                  name="pokemon"
                  src="https://styles.redditmedia.com/t5_2t1bl/styles/communityIcon_lghtgov0ev981.png"
                />
                <Box alignSelf="center" fontSize="14px" fontWeight="500" lineHeight="18px">
                  p/RainBow6
                </Box>
              </Flex>
              <Button content="Join" bg="#a4a4a4" height="24px" color={color} />
            </ListItem>

            <ListItem
              display="flex"
              alignItems="center"
              padding="0 12px"
              height="48px"
              justifyContent="space-between"
              borderBottom="thin solid #edeff1"
            >
              <Flex>
                <Box
                  width="20px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  3
                </Box>
                <Box ml="8px" display="flex" alignItems="center" justifyContent="center">
                  <ChevronUpIcon
                    fontSize="20px"
                    fontWeight="400"
                    h="20px"
                    lineHeight="20px"
                    color="#46d160"
                  />
                </Box>
                <Avatar
                  borderRadius="50%"
                  margin="0 8px"
                  height="32px"
                  width="32px"
                  backgroundColor="#a4a4a4"
                  name="pokemon"
                  src="https://styles.redditmedia.com/t5_2u9wz/styles/communityIcon_bk9nbiv8v2t21.jpg?format=pjpg&s=17da880c4329f5d7947d63b6d15792caa9802e50"
                />
                <Box alignSelf="center" fontSize="14px" fontWeight="500" lineHeight="18px">
                  p/StarWarsBattle
                </Box>
              </Flex>
              <Button content="Join" bg="#a4a4a4" height="24px" color={color} />
            </ListItem>

            <ListItem
              display="flex"
              alignItems="center"
              padding="0 12px"
              height="48px"
              justifyContent="space-between"
              borderBottom="thin solid #edeff1"
            >
              <Flex>
                <Box
                  width="20px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  4
                </Box>
                <Box ml="8px" display="flex" alignItems="center" justifyContent="center">
                  <ChevronUpIcon
                    fontSize="20px"
                    fontWeight="400"
                    h="20px"
                    lineHeight="20px"
                    color="#46d160"
                  />
                </Box>
                <Avatar
                  borderRadius="50%"
                  margin="0 8px"
                  height="32px"
                  width="32px"
                  backgroundColor="#a4a4a4"
                  name="pokemon"
                  src="https://styles.redditmedia.com/t5_2rrlp/styles/communityIcon_06pablpo0le21.png"
                />
                <Box alignSelf="center" fontSize="14px" fontWeight="500" lineHeight="18px">
                  p/PS4
                </Box>
              </Flex>
              <Button content="Join" bg="#a4a4a4" height="24px" color={color} />
            </ListItem>

            <ListItem
              display="flex"
              alignItems="center"
              padding="0 12px"
              height="48px"
              justifyContent="space-between"
              borderBottom="thin solid #edeff1"
            >
              <Flex>
                <Box
                  width="20px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  5
                </Box>
                <Box ml="8px" display="flex" alignItems="center" justifyContent="center">
                  <ChevronUpIcon
                    fontSize="20px"
                    fontWeight="400"
                    h="20px"
                    lineHeight="20px"
                    color="#46d160"
                  />
                </Box>
                <Avatar
                  borderRadius="50%"
                  margin="0 8px"
                  height="32px"
                  width="32px"
                  backgroundColor="#a4a4a4"
                  name="pokemon"
                  src="https://styles.redditmedia.com/t5_2qio8/styles/communityIcon_g5felady0d561.png"
                />
                <Box alignSelf="center" fontSize="14px" fontWeight="500" lineHeight="18px">
                  p/Wow
                </Box>
              </Flex>
              <Button content="Join" bg="#a4a4a4" height="24px" color={color} />
            </ListItem>
          </List>
          <Box padding="12px">
            <Button color={color} content="View All" bg="#a4a4a4" height="34px" width="100%" />
          </Box>
          <Flex alignItems="center" padding="0 8px 12px" justifyContent="flex-start">
            <Button
              content="Top"
              bg="rgba(164, 164, 164, 0.1)"
              color="#a4a4a4"
              height="24px"
              padding="4px 8px"
              fontSize="12px"
              border="none"
              margin="4px"
            />
            <Button
              content="Near You"
              bg="rgba(164, 164, 164, 0.1)"
              color="#a4a4a4"
              height="24px"
              padding="4px 8px"
              fontSize="12px"
              border="none"
              margin="4px"
            />
            <Button
              content="Gaming"
              bg="rgba(164, 164, 164, 0.1)"
              color="#a4a4a4"
              height="24px"
              padding="4px 8px"
              fontSize="12px"
              border="none"
              margin="4px"
            />
            <Button
              content="Sports"
              bg="rgba(164, 164, 164, 0.1)"
              color="#a4a4a4"
              height="24px"
              padding="4px 8px"
              fontSize="12px"
              border="none"
              margin="4px"
            />
          </Flex>
        </Box>
        <Box marginTop="16px" width="312px">
          <Box borderRadius="4px" overflow="hidden" wordBreak="break-word" bg={Bg}>
            <Accordion maxHeight="none" allowToggle>
              <AccordionItem>
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
                      Popular Communities
                    </Box>
                    <AccordionIcon color="#a4a4a4" />
                  </AccordionButton>
                </Box>
                <AccordionPanel padding="12px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
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
                      Gaming
                    </Box>
                    <AccordionIcon color="#a4a4a4" />
                  </AccordionButton>
                </Box>
                <AccordionPanel padding="12px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
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
                      Sport
                    </Box>
                    <AccordionIcon color="#a4a4a4" />
                  </AccordionButton>
                </Box>
                <AccordionPanel padding="12px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <Box>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="10px"
                      fontWeight="700"
                      lineHeight="12px"
                      textTransform="uppercase"
                    >
                      Tv
                    </Box>
                    <AccordionIcon color="#a4a4a4" />
                  </AccordionButton>
                </Box>
                <AccordionPanel padding="12px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <Box>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="10px"
                      fontWeight="700"
                      lineHeight="12px"
                      textTransform="uppercase"
                    >
                      Fashion
                    </Box>
                    <AccordionIcon color="#a4a4a4" />
                  </AccordionButton>
                </Box>
                <AccordionPanel padding="12px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <Box>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="10px"
                      fontWeight="700"
                      lineHeight="12px"
                      textTransform="uppercase"
                    >
                      Travel
                    </Box>
                    <AccordionIcon color="#a4a4a4" />
                  </AccordionButton>
                </Box>
                <AccordionPanel padding="12px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <Box>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="10px"
                      fontWeight="700"
                      lineHeight="12px"
                      textTransform="uppercase"
                    >
                      Health
                    </Box>
                    <AccordionIcon color="#a4a4a4" />
                  </AccordionButton>
                </Box>
                <AccordionPanel padding="12px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
        <Box flex="1 1 auto" width="inherit" position="relative">
          <Box>
            <Box marginTop="16px" background={Bg}>
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
