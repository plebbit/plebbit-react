import React, { useState } from 'react';
import { Box, Flex, useColorModeValue, Icon, Image, useDisclosure } from '@chakra-ui/react';
import { BsCamera } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { SiInformatica } from 'react-icons/si';
import { RiTShirtFill } from 'react-icons/ri';
import { GiMoebiusStar, GiCakeSlice } from 'react-icons/gi';
import Button from '../../components/Button';
import numFormatter from '../../utils/numberFormater';
import { useHistory } from 'react-router-dom';
import AddAvatar from '../Settings/modal/addAvatar';

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
  profile,
  avatar,
}) => {
  const color = useColorModeValue('darkText', 'lightText');
  const Bg = useColorModeValue('#F8F9FA', '');
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
  };
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Box position="relative" overflow="hidden" width="312px">
          <Box
            border="1px solid #ccc"
            borderRadius="5px 5px 4px 4px"
            overflow="visible"
            wordBreak="break-word"
            bg={bg || Bg}
            padding="12px"
          >
            <Box
              bgColor="#33a8ff"
              borderRadius="4px 4px 0 0"
              height="94px"
              left="0"
              position="absolute"
              top="0"
              width="100%"
              onClick={onOpen}
            >
              <Box width="100%" height="100%" position="relative">
                <Flex
                  alignItems="center"
                  backgroundColor="#fff"
                  borderRadius="50%"
                  height="36px"
                  width="36px"
                  justifyContent="center"
                  position="absolute"
                  right="8px"
                  bottom="8px"
                >
                  <Icon as={BsCamera} height="20px" color="#33a8ff" width="20px" />
                </Flex>
              </Box>
            </Box>
            <Box height="160px" width="125px" textAlign="center" position="relative" margin="auto">
              <Image
                fallbackSrc={require('../../assets/images/fallback.png')}
                height="160px"
                position="relative"
                zIndex="1"
                src={avatar}
              />
            </Box>
            <Box padding="4px" position="absolute" right="12px" mt="-76px">
              <Icon
                onClick={() => history.push('/settings', [])}
                as={AiOutlineSetting}
                height="20px"
                color="#33a8ff"
                width="20px"
              />
            </Box>
            <Flex
              textAlign="center"
              margin="4px 0"
              fontSize="22px"
              fontWeight="500"
              lineHeight="26px"
              alignItems="center"
              justifyContent="center"
            >
              <Box> {profile?.author?.displayName || profile?.name}</Box>
              <Icon as={SiInformatica} fill="#ff4500" ml="4px" />
            </Flex>
            <Box
              fontSize="12px"
              fontWeight="500"
              lineHeight="16px"
              textAlign="center"
              color="#7c7c7c"
              my="4px"
            >
              {`p/${profile?.author?.address}`} · 9m
            </Box>
            <Button
              width="100%"
              bg="linear-gradient(90deg,#ec0623,#ff8717)"
              color="#fff"
              padding="3px 16px"
              mb="8px"
              mt="8px"
              content={
                <Flex
                  fontSize="14px"
                  fontWeight="700"
                  letterSpacing=".5px"
                  width="100%"
                  alignItems="center"
                  lineHeight="17px"
                >
                  <Icon as={RiTShirtFill} ml="0" />
                  <Box flex="1" textAlign="center">
                    Style Avatar
                  </Box>
                </Flex>
              }
            />
            <Flex flexWrap="wrap">
              <Flex cursor="default" flex="1 1 50%" mb="12px" flexDir="column">
                <Box fontSize="14px" fontWeight="500" lineHeight="18px">
                  Karma
                </Box>
                <Flex alignItems="center" mt="2px">
                  <Icon width="12px" height="12px" color="#24a0ed" as={GiMoebiusStar} />
                  <Box ml="4px" fontSize="12px" fontWeight="400" lineHeight="16px">
                    {numFormatter(profile?.karma?.score)}
                  </Box>
                </Flex>
              </Flex>
              <Flex cursor="default" flex="1 1 50%" mb="12px" flexDir="column">
                <Box fontSize="14px" fontWeight="500" lineHeight="18px">
                  Cake Day
                </Box>
                <Flex alignItems="center" mt="2px">
                  <Icon width="12px" height="12px" color="#24a0ed" as={GiCakeSlice} />
                  <Box ml="4px" fontSize="12px" fontWeight="400" lineHeight="16px">
                    June 29, 2021
                  </Box>
                </Flex>
              </Flex>
            </Flex>
            <Button
              content="New Post"
              width="100%"
              mt="10px"
              padding="4px 15px"
              bg="#0079d3"
              border="none"
              color="#fff"
              onClick={() => history.push('/submit', [])}
            />
            {showMoreOptions && (
              <Flex flexDir="column">
                <Button
                  content="Profile Moderation"
                  border="none"
                  bg="transparent"
                  color="#0079d3"
                  mt="8px"
                  padding="4px 8px"
                  sx={{
                    fontSize: '12px',
                    fontWeight: '700',
                    lineHeight: '16px',
                    justifyContent: 'left',
                  }}
                />
                <Button
                  content="Add to Custom Feed"
                  border="none"
                  bg="transparent"
                  color="#0079d3"
                  mt="8px"
                  padding="4px 8px"
                  sx={{
                    fontSize: '12px',
                    fontWeight: '700',
                    lineHeight: '16px',
                    justifyContent: 'left',
                  }}
                />
                <Button
                  content="Invite Someone to Chat"
                  border="none"
                  bg="transparent"
                  color="#0079d3"
                  mt="8px"
                  padding="4px 8px"
                  sx={{
                    fontSize: '12px',
                    fontWeight: '700',
                    lineHeight: '16px',
                    justifyContent: 'left',
                  }}
                />
              </Flex>
            )}
            <Flex justifyContent="flex-end" mt="12px">
              <Button
                content={showMoreOptions ? 'Fewer Options' : 'More Options'}
                border="none"
                bg="transparent"
                color="#0079d3"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                sx={{
                  fontSize: '14p',
                  fontWeight: '700',
                  lineHeight: '17px',
                }}
              />
            </Flex>
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
      {isOpen ? <AddAvatar isOpen={isOpen} onClose={onClose} /> : ''}
    </Box>
  );
};

export default SideBar;
