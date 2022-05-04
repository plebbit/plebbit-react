import React from 'react';
import { Box, Flex, Icon, Image, Input, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import Button from '../../components/Button';
import { FaBell } from 'react-icons/fa';
import { RiFireFill } from 'react-icons/ri';
import { TiStarburstOutline } from 'react-icons/ti';
import { BsBoxArrowUp } from 'react-icons/bs';

import {
  MdOutlineViewStream,
  MdViewAgenda,
  MdOutlineTableRows,
  MdOutlineViewHeadline,
} from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import { LinkIcon } from '@chakra-ui/icons';
import DropDown from '../../components/DropDown';
import Posts from '../../components/Post/index2';

const SubPlebbit = () => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const subPlebbitBorder = useColorModeValue('borderLight1', 'borderDark1');
  const inactiveSubTitle = useColorModeValue('lightText1', 'darkText1');
  const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const inputText = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const activeFilterText = useColorModeValue('lightText', 'bodyTextDark');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');

  return (
    <Box width="100%">
      <Box
        minW="260px"
        margin="0 auto"
        padding="8px 16px"
        height="145px"
        background={`url("https://styles.redditmedia.com/t5_2wlj3/styles/bannerBackgroundImage_bx1bi0qmmcg61.jpg?width=4000&format=pjpg&s=8fbb510f1bae6b0fdd98d075458022e98e4910f4") center center / cover no-repeat rgb(55, 60, 63)`}
      />
      <Box bg={mainBg} display="block" width="100%">
        <Flex
          maxWidth="984px"
          flexDir="column"
          alignItems="flex-start"
          justifyContent="space-between"
          margin="0 auto"
          padding="0 16px 0 24px"
        >
          <Flex marginTop="-14px" marginBottom="12px" alignItems="flex-start">
            <Image
              src="https://styles.redditmedia.com/t5_2wlj3/styles/communityIcon_7jxh2j4ouky41.png?width=256&s=59ea46d93492e9d0951b43d7c580f72982a86974"
              backgroundColor="#fff"
              backgroundSize="cover"
              borderRadius="100%"
              border="4px solid #fff"
              display="inline-block"
              height="76px"
              width="76px"
            />
            <Flex
              boxSizing="border-box"
              alignContent="flex-start"
              flex="1"
              paddingLeft="16px"
              marginTop="24px"
              justifyContent="space-between"
              width="calc(100% - 80px)"
            >
              <Box paddingRight="24px" box-sizing="border-box">
                <Text
                  flex="1"
                  fontSize="28px"
                  fontWeight="700"
                  lineHeight="32px"
                  overflow="hidden"
                  padding="0 2px 4px 0"
                  width="100%"
                  text-overflow="ellipsis"
                >
                  Cryptocurrency News & Discussion
                </Text>
                <Text fontSize="14px" fontWeight="500" lineHeight="18px" color={subPlebbitSubTitle}>
                  p/CryptoCurrency
                </Text>
              </Box>
              <Flex>
                <Box width="96px">
                  <Button
                    bg="transparent"
                    content="Joined"
                    padding="4px 16px"
                    minW="32px"
                    minH="32px"
                  />
                </Box>
                <Box>
                  <Button
                    content={<Icon verticalAlign="middle" width="20px" height="20px" as={FaBell} />}
                    padding="5px"
                    borderRadius="100%"
                    height="32px"
                    width="33px"
                    bg="transparent"
                  />
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Box bg="inherit">
            <Flex
              mb="2px"
              maxW="1200px"
              minW="260px"
              alignItems="center"
              color={subPlebbitSubTitle}
            >
              <Box
                borderBottom={`3px solid`}
                borderColor={subPlebbitBorder}
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Posts
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
                color={inactiveSubTitle}
              >
                Polls
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
                display="flex"
                alignItems="center"
              >
                Prediction
                <Tag
                  fontSize="10px"
                  padding="1px 4px"
                  bg="#ea0027"
                  borderRadius="full"
                  fontWeight="700"
                  color="#fff"
                  ml="4px"
                  lineHeight="12px"
                  textTransform="uppercase"
                  size="small"
                >
                  live
                </Tag>
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Wiki
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Plebbit Talk
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Our Network
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Wiki
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Official Discord
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Flex maxW="100%" padding="20px 24px" justifyContent="center" margin="0 auto">
        <Box
          width="100%"
          // width="640px"
          minWidth="0"
        >
          {/* Create Post Bar */}
          <Flex
            bg={mainBg}
            borderRadius="4px"
            border={`1px solid ${border1}`}
            mb="16px"
            padding="8px"
          >
            <Box
              border="1px solid"
              borderColor={border2}
              flexBasis="38px"
              mr="8px"
              borderRadius="50%"
              width="38px"
              height="38px"
            >
              <Box position="relative">
                <Box borderRadius="50%" width="38px" height="38px" position="relative">
                  <Box width="100%" height="100%" borderRadius="50%" bg={border2} />
                  <Box width="100%" position="absolute" bottom="0">
                    <Image
                      src={`https://robohash.org/${Math.round(
                        Math.random() * (5 - 1 + 1) + 1
                      )}?set=set${Math.floor(Math.random() * (5 - 1 + 1) + 1)}`}
                      width="100%"
                      transformOrigin="bottom center"
                      display="block"
                      transform="scale(1.3)"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Input
              placeholder="Create Post"
              bg={inputBg}
              border={`1px solid ${border2}`}
              boxShadow="none"
              boxSizing="border-box"
              color={inputText}
              display="block"
              flexGrow="1"
              height="38px"
              mr="8px"
              outline="none"
              padding="0 16px"
              fontSize="14px"
              lineHeight="21px"
              fontWeight="400"
              fontFamily="inherit"
            />
            <Box
              borderRadius="4px"
              position="relative"
              border="1px solid transparent"
              color={iconColor}
              fill={iconColor}
              _hover={{
                background: inputBg,
              }}
              minH="40px"
              minW="40px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="auto"
            >
              <LinkIcon height="20px" width="20px" />
            </Box>
          </Flex>
          {/* feed filter bar */}
          <Flex
            alignItems="center"
            bg={mainBg}
            border={`1px solid ${border2}`}
            borderRadius="4px"
            flexFlow="nowrap"
            justifyContent="flex-start"
            mb="16px"
            padding="10px 12px"
          >
            <Flex alignItems="center" cursor="pointer">
              <Box
                bg={inputBg}
                color={activeFilterText}
                cursor="default"
                fill={activeFilterText}
                mr="8px"
                textTransform="capitalize"
                position="relative"
                border="1px solid transparent"
                minH="unset"
                minW="unset"
                padding="6px 8px"
                borderRadius="20px"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="unset"
                lineHeight="17px"
                width="auto"
                display="flex"
                alignItems="center"
              >
                <Icon width="20px" mr="8px" height="20px" as={RiFireFill} />
                Hot
              </Box>
              <Box
                bg="transparent"
                color={iconColor}
                cursor="default"
                fill={iconColor}
                mr="8px"
                textTransform="capitalize"
                position="relative"
                border="1px solid transparent"
                minH="unset"
                minW="unset"
                padding="6px 8px"
                borderRadius="20px"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="unset"
                lineHeight="17px"
                width="auto"
                display="flex"
                alignItems="center"
                _hover={{
                  background: inputBg,
                }}
              >
                <Icon width="20px" mr="8px" height="20px" as={TiStarburstOutline} />
                New
              </Box>
              <Box
                bg="transparent"
                color={iconColor}
                cursor="default"
                fill={iconColor}
                mr="8px"
                textTransform="capitalize"
                position="relative"
                border="1px solid transparent"
                minH="unset"
                minW="unset"
                padding="6px 8px"
                borderRadius="20px"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="unset"
                lineHeight="17px"
                width="auto"
                display="flex"
                alignItems="center"
                _hover={{
                  background: inputBg,
                }}
              >
                <Icon width="20px" mr="8px" height="20px" as={BsBoxArrowUp} />
                Top
              </Box>
            </Flex>
            <Flex alignItems="center" cursor="pointer" display="flex">
              <Flex alignItems="center" borderRadius="4px">
                <Box
                  borderRadius="20px"
                  color={iconColor}
                  outLine="none"
                  padding="8px"
                  bg="transparent"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  _hover={{
                    background: inputBg,
                  }}
                >
                  <Icon as={FiMoreHorizontal} width="20px" height="20px" />
                </Box>
              </Flex>
            </Flex>
            <DropDown
              caret
              inputBg={inputBg}
              dropDownTitle={
                <>
                  {' '}
                  <Flex color={iconColor} alignItems="center">
                    <Icon as={MdOutlineViewStream} height={6} width={6} />
                  </Flex>
                </>
              }
              content={
                <>
                  {' '}
                  <Flex
                    color={activeFilterText}
                    fill={activeFilterText}
                    alignItems="center"
                    position="relative"
                    outline="none"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    padding="8px"
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                    _hover={{
                      background: inputBg,
                    }}
                  >
                    <Icon mr="4px" as={MdViewAgenda} width={6} height={6} />
                    <Box>Card</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    position="relative"
                    outline="none"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    padding="8px"
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                    _hover={{
                      background: inputBg,
                    }}
                    borderWidth="1"
                    borderColor={border2}
                  >
                    <Icon mr="4px" as={MdOutlineTableRows} width={6} height={6} />
                    <Box>Classic</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    position="relative"
                    outline="none"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    padding="8px"
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                    _hover={{
                      background: inputBg,
                    }}
                    borderY={`1px solid ${border2}`}
                  >
                    <Icon mr="4px" as={MdOutlineViewHeadline} width={6} height={6} />
                    <Box>Compact</Box>
                  </Flex>
                </>
              }
            />
          </Flex>
          {/* feed list */}
          <Box minH="1000px" width="100%">
            {/* single feed */}
            {<Posts type="subPlebbit" />}
          </Box>
        </Box>
        {/* side bar */}
        <Box
          width="312px"
          flex="0 0 312px"
          display="none"
          ml="24px"
          margin="0"
          sx={{
            '@media (min-width: 960px)': {
              display: 'block',
            },
          }}
        ></Box>
      </Flex>
    </Box>
  );
};

export default SubPlebbit;
