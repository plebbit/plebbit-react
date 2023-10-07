import React, { useState } from 'react';
import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { RiFireFill } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { TiStarburstOutline } from 'react-icons/ti';
import { BsBoxArrowUp, BsChevronDown } from 'react-icons/bs';
import {
  MdOutlineViewStream,
  MdViewAgenda,
  MdOutlineTableRows,
  MdOutlineViewHeadline,
  MdTableRows,
  MdViewHeadline,
} from 'react-icons/md';
import DropDown from '../../DropDown';
import useVisible from '../../../hooks/useVisible';
import Link from '../../Link';
import useStore from '../../../store/useStore';
import { useLocation, useParams } from 'react-router-dom';

const FeedSort = ({ hideControl, subplebbitColor }) => {
  const { postStyle, setPostStyle, device } = useStore((state) => state);
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');

  const sortType = useParams()?.sortType ?? 'hot';
  const location = useLocation();

  const mainBg = useColorModeValue('lightBody', 'darkBody');
  // const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const activeFilterText = useColorModeValue(
    subplebbitColor || 'lightText',
    subplebbitColor || 'bodyTextDark'
  );
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const mainMobileBg = useColorModeValue('white', 'black');
  const iconMobileColor = useColorModeValue('lightMobileIcon', 'darkMobileIcon');
  const [mobileSort, setMobileSort] = useState(false);
  const [viewSelect, setViewSelect] = useState(false);
  const { ref } = useVisible(setMobileSort);
  const { ref: ref2 } = useVisible(setViewSelect);

  const path = location?.pathname?.split('/')?.slice(0, -1).join('/');
  return (
    <>
      {device !== 'mobile' ? (
        <>
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
              <Link
                bg={sortType === 'hot' ? inputBg : 'transparent'}
                color={sortType === 'hot' ? activeFilterText : iconColor}
                cursor="default"
                fill={sortType === 'hot' ? activeFilterText : iconColor}
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
                  background: sortType === 'hot' ? '' : inputBg,
                }}
                as={Link}
                to={`${path}/hot`}
              >
                <Icon width="20px" mr="8px" height="20px" as={RiFireFill} />
                Hot
              </Link>
              <Box
                bg={sortType === 'new' ? inputBg : 'transparent'}
                color={sortType === 'new' ? activeFilterText : iconColor}
                cursor="default"
                fill={sortType === 'new' ? activeFilterText : iconColor}
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
                  background: sortType === 'new' ? '' : inputBg,
                }}
                as={Link}
                to={`${path}/new`}
              >
                <Icon width="20px" mr="8px" height="20px" as={TiStarburstOutline} />
                New
              </Box>
              <Box
                bg={sortType === 'topAll' ? inputBg : 'transparent'}
                color={sortType === 'topAll' ? activeFilterText : iconColor}
                cursor="default"
                fill={sortType === 'topAll' ? activeFilterText : iconColor}
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
                  background: sortType === 'topAll' ? '' : inputBg,
                }}
                as={Link}
                to={`${path}/topAll`}
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
                  outline="none"
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
            {!hideControl && (
              <DropDown
                caret
                inputBg={inputBg}
                dropDownTitle={
                  <>
                    {' '}
                    <Flex color={iconColor} alignItems="center">
                      <Icon
                        as={
                          postStyle === 'card'
                            ? MdOutlineViewStream
                            : postStyle === 'classic'
                            ? MdOutlineTableRows
                            : MdOutlineViewHeadline
                        }
                        height={6}
                        width={6}
                      />
                    </Flex>
                  </>
                }
                content={
                  <>
                    {' '}
                    <Flex
                      color={postStyle === 'card' && activeFilterText}
                      fill={postStyle === 'card' && activeFilterText}
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
                      onClick={() => setPostStyle('card')}
                      cursor="pointer"
                    >
                      <Icon
                        mr="4px"
                        as={postStyle === 'card' ? MdViewAgenda : MdOutlineViewStream}
                        width={6}
                        height={6}
                      />
                      <Box>Card</Box>
                    </Flex>
                    <Flex
                      color={postStyle === 'classic' && activeFilterText}
                      fill={postStyle === 'classic' && activeFilterText}
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
                      borderTop={`1px solid ${border2}`}
                      onClick={() => setPostStyle('classic')}
                      cursor="pointer"
                    >
                      <Icon
                        mr="4px"
                        as={postStyle === 'classic' ? MdTableRows : MdOutlineTableRows}
                        width={6}
                        height={6}
                      />
                      <Box>Classic</Box>
                    </Flex>
                    <Flex
                      color={postStyle === 'compact' && activeFilterText}
                      fill={postStyle === 'compact' && activeFilterText}
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
                      borderTop={`1px solid ${border2}`}
                      onClick={() => setPostStyle('compact')}
                      cursor="pointer"
                    >
                      <Icon
                        mr="4px"
                        as={postStyle === 'compact' ? MdViewHeadline : MdOutlineViewHeadline}
                        width={6}
                        height={6}
                      />
                      <Box>Compact</Box>
                    </Flex>
                  </>
                }
              />
            )}
          </Flex>
        </>
      ) : (
        <Flex
          borderBottom={`1px solid ${border2}`}
          borderBottomWidth="4px"
          minH="52px"
          bg={mainMobileBg}
          justifyContent="space-between"
          lineHeight="32px"
          padding="8px 16px"
          maxWidth="1000px"
          margin="0 auto"
          position="relative"
          sx={{
            touchAction: 'manipulation',
          }}
        >
          <Flex flex="1" justifyContent="space-between" overflow="hidden" lineHeight="32px">
            <Box flex="1" overflow="hidden">
              <Box marginRight="16px" maxW="calc(100% - 2 * 8px)" ref={ref}>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  onClick={() => {
                    setMobileSort(!mobileSort);
                  }}
                >
                  <Icon
                    as={RiFireFill}
                    color={iconMobileColor}
                    w="24px"
                    h="24px"
                    flex="0 0 24px"
                    verticalAlign="middle"
                  />
                  <Box
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    color="#a5a4a4"
                    marginRight="8px"
                    textTransform="capitalize"
                  >
                    {sortType}
                  </Box>
                  <Icon
                    as={BsChevronDown}
                    color={iconMobileColor}
                    width="16px"
                    height="16px"
                    flex="0 0 16px"
                    verticalAlign="middle"
                  />
                </Flex>

                {mobileSort ? (
                  <Box position="fixed" zIndex="20">
                    <Box
                      position="fixed"
                      borderWidth="1px"
                      borderStyle="solid"
                      bg="white"
                      zIndex="1000"
                      top="149px"
                      left="8px"
                      right="8px"
                      width="auto"
                      borderColor={border2}
                    >
                      <Box
                        position="fixed"
                        width="0"
                        height="0"
                        zIndex="1001"
                        left="43.6484px"
                        borderLeft="8px solid transparent"
                        borderRight="8px solid transparent"
                        top="142px"
                        borderBottomWidth="8px"
                        borderBottomStyle="solid"
                        borderBottomColor="inherit"
                      />
                      <Box
                        position="fixed"
                        width="0"
                        height="0"
                        zIndex="1001"
                        left="44.6484px"
                        borderLeft="7px solid transparent"
                        borderRight="7px solid transparent"
                        top="143px"
                        borderBottom="7px solid #fff"
                        borderTopColor="7px solid #fff !important"
                      />
                      <Box width="100%" height="100%" overflow="auto">
                        <Box
                          bg={mainMobileBg}
                          color="#a5a4a4"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          padding="8px 8px 0"
                          fontSize="10px"
                          lineHeight="24px"
                          letterSpacing="1.5"
                          fontWeight="700"
                          textTransform="uppercase"
                        >
                          Sort post by:
                          <Box
                            borderTopColor={iconMobileColor}
                            borderTopStyle="solid"
                            borderTopWidth="1px"
                            marginTop="8px"
                          />
                        </Box>
                        <Flex
                          bg={mainMobileBg}
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={() => {
                            setMobileSort(false);
                          }}
                          as={Link}
                          to={`${path}/hot`}
                        >
                          <Icon
                            as={RiFireFill}
                            w="50px"
                            flex="0 0 5opx"
                            color={sortType === 'hot' ? activeFilterText : iconMobileColor}
                            textAlign="center"
                            lineHeight="22px"
                          />
                          <Box
                            overflow="hidden"
                            textOverflow="ellipsis"
                            lineHeight="22px"
                            maxHeight="44px"
                            whiteSpace="normal"
                            fontSize="16px"
                          >
                            Hot
                          </Box>
                        </Flex>
                        <Flex
                          bg={mainMobileBg}
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={() => {
                            setMobileSort(false);
                          }}
                          as={Link}
                          to={`${path}/new`}
                        >
                          <Icon
                            as={RiFireFill}
                            w="50px"
                            flex="0 0 5opx"
                            color={sortType === 'new' ? activeFilterText : iconMobileColor}
                            textAlign="center"
                            lineHeight="22px"
                          />
                          <Box
                            overflow="hidden"
                            textOverflow="ellipsis"
                            lineHeight="22px"
                            maxHeight="44px"
                            whiteSpace="normal"
                            fontSize="16px"
                          >
                            New
                          </Box>
                        </Flex>
                        <Flex
                          bg={mainMobileBg}
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={() => {
                            setMobileSort(false);
                          }}
                          as={Link}
                          to={`${path}/topAll`}
                        >
                          <Icon
                            as={RiFireFill}
                            w="50px"
                            flex="0 0 5opx"
                            color={sortType === 'topAll' ? activeFilterText : iconMobileColor}
                            textAlign="center"
                            lineHeight="22px"
                          />
                          <Box
                            overflow="hidden"
                            textOverflow="ellipsis"
                            lineHeight="22px"
                            maxHeight="44px"
                            whiteSpace="normal"
                            fontSize="16px"
                          >
                            Top
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ''
                )}
              </Box>
            </Box>
            {!hideControl && (
              <Box ref={ref2}>
                <Flex
                  alignItems="center"
                  color="#a5a4a4"
                  fill="#a5a4a4"
                  height="32px"
                  onClick={() => {
                    setViewSelect(!viewSelect);
                  }}
                >
                  <Icon
                    as={postStyle === 'card' ? MdViewAgenda : MdTableRows}
                    width="24px"
                    height="24px"
                    verticalAlign="middle"
                    color={iconMobileColor}
                    fill={iconMobileColor}
                  />
                  <Icon
                    as={BsChevronDown}
                    width="24px"
                    height="24px"
                    verticalAlign="middle"
                    color={iconMobileColor}
                    fill={iconMobileColor}
                    marginLeft="8px"
                  />
                </Flex>
                {viewSelect ? (
                  <Box position="fixed" zIndex="20">
                    <Box
                      position="fixed"
                      borderWidth="1px"
                      borderStyle="solid"
                      bg="white"
                      zIndex="1000"
                      top="149px"
                      left="0"
                      right="8px"
                      width="auto"
                      borderColor={border2}
                    >
                      <Box
                        position="fixed"
                        width="0"
                        height="0"
                        zIndex="1001"
                        left="506px"
                        borderLeft="8px solid transparent"
                        borderRight="8px solid transparent"
                        top="142px"
                        borderBottomWidth="8px"
                        borderBottomStyle="solid"
                        borderBottomColor="inherit"
                      />
                      <Box
                        position="fixed"
                        width="0"
                        height="0"
                        zIndex="1001"
                        left="507px"
                        borderLeft="7px solid transparent"
                        borderRight="7px solid transparent"
                        top="143px"
                        borderBottom="7px solid #fff"
                        borderTopColor="7px solid #fff !important"
                      />
                      <Box width="100%" height="100%" overflow="auto">
                        <Box
                          bg={mainMobileBg}
                          color="#a5a4a4"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          padding="8px 8px 0"
                          fontSize="10px"
                          lineHeight="24px"
                          letterSpacing="1.5"
                          fontWeight="700"
                          textTransform="uppercase"
                        >
                          View post in:
                          <Box
                            borderTopColor={iconMobileColor}
                            borderTopStyle="solid"
                            borderTopWidth="1px"
                            marginTop="8px"
                          />
                        </Box>
                        <Flex
                          bg={mainMobileBg}
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={() => {
                            setViewSelect(false);
                            setPostStyle('classic');
                          }}
                        >
                          <Icon
                            as={postStyle === 'classic' ? MdTableRows : MdOutlineTableRows}
                            w="50px"
                            flex="0 0 5opx"
                            color={postStyle === 'classic' ? activeFilterText : iconMobileColor}
                            textAlign="center"
                            lineHeight="22px"
                          />
                          <Box
                            overflow="hidden"
                            textOverflow="ellipsis"
                            lineHeight="22px"
                            maxHeight="44px"
                            whiteSpace="normal"
                            fontSize="16px"
                          >
                            Classic View
                          </Box>
                        </Flex>
                        <Flex
                          bg={mainMobileBg}
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={() => {
                            setViewSelect(false);
                            setPostStyle('card');
                          }}
                        >
                          <Icon
                            as={postStyle === 'card' ? MdViewAgenda : MdOutlineViewStream}
                            w="50px"
                            flex="0 0 5opx"
                            color={postStyle === 'card' ? activeFilterText : iconMobileColor}
                            textAlign="center"
                            lineHeight="22px"
                          />
                          <Box
                            overflow="hidden"
                            textOverflow="ellipsis"
                            lineHeight="22px"
                            maxHeight="44px"
                            whiteSpace="normal"
                            fontSize="16px"
                          >
                            Card View
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ''
                )}
              </Box>
            )}
          </Flex>
          {mobileSort || viewSelect ? (
            <Box
              background="rgba(0,0,0,.4)"
              position="fixed"
              top="0"
              bottom="0"
              left="0"
              right="0"
              cursor="pointer"
              zIndex="10"
            />
          ) : (
            ''
          )}
        </Flex>
      )}
    </>
  );
};

export default FeedSort;
