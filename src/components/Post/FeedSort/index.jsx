import React, { useContext, useState } from 'react';
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
import { ProfileContext } from '../../../store/profileContext';
import DropDown from '../../DropDown';
import useVisible from '../../../hooks/useVisible';
import Link from '../../Link';

const FeedSort = ({ hideControl, subplebbitColor }) => {
  const { postStyle, setPostStyle, feedSort, setFeedSort, device } = useContext(ProfileContext);
  const inputBg = useColorModeValue(('lightInputBg'), 'darkInputBg');

  const mainBg = useColorModeValue(('lightBody'), 'darkBody');
  // const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const activeFilterText = useColorModeValue((subplebbitColor || 'lightText'), (subplebbitColor || 'bodyTextDark'));
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const mainMobileBg = useColorModeValue('white', 'black');
  const iconMobileColor = useColorModeValue('lightMobileIcon', 'darkMobileIcon');
  const [mobileSort, setMobileSort] = useState(false);
  const [viewSelect, setViewSelect] = useState(false);
  const { ref, showComponent, setShowComponent } = useVisible(false);
  const {
    ref: ref2,
    showComponent: showComponent2,
    setShowComponent: setShowComponent2,
  } = useVisible(false);




  return (
    <>
      { device !== 'mobile' ? (
        <>

          <Flex
            alignItems="center"
            bg={ mainBg }
            border={ `1px solid ${border2}` }
            borderRadius="4px"
            flexFlow="nowrap"
            justifyContent="flex-start"
            mb='16px'
            padding="10px 12px"

          >
            <Flex alignItems="center" cursor="pointer">
              <Box
                bg={ feedSort === 'hot' ? inputBg : 'transparent' }
                color={ feedSort === 'hot' ? activeFilterText : iconColor }
                cursor="default"
                fill={ feedSort === 'hot' ? activeFilterText : iconColor }
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
                _hover={ {
                  background: feedSort === 'hot' ? '' : inputBg,
                } }
                onClick={ () => setFeedSort('hot') }
                as={ Link }
                to='hot'
              >
                <Icon width="20px" mr="8px" height="20px" as={ RiFireFill } />
                Hot
              </Box>
              <Box
                bg={ feedSort === 'new' ? inputBg : 'transparent' }
                color={ feedSort === 'new' ? activeFilterText : iconColor }
                cursor="default"
                fill={ feedSort === 'new' ? activeFilterText : iconColor }
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
                _hover={ {
                  background: feedSort === 'new' ? '' : inputBg,
                } }
                onClick={ () => setFeedSort('new') }
                as={ Link }
                to='new'
              >
                <Icon width="20px" mr="8px" height="20px" as={ TiStarburstOutline } />
                New
              </Box>
              <Box
                bg={ feedSort === 'topAll' ? inputBg : 'transparent' }
                color={ feedSort === 'topAll' ? activeFilterText : iconColor }
                cursor="default"
                fill={ feedSort === 'topAll' ? activeFilterText : iconColor }
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
                _hover={ {
                  background: feedSort === 'topAll' ? '' : inputBg,
                } }
                onClick={ () => setFeedSort('topAll') }
                as={ Link }
                to='top'
              >
                <Icon width="20px" mr="8px" height="20px" as={ BsBoxArrowUp } />
                Top
              </Box>
            </Flex>
            <Flex alignItems="center" cursor="pointer" display="flex">
              <Flex alignItems="center" borderRadius="4px">
                <Box
                  borderRadius="20px"
                  color={ iconColor }
                  outline="none"
                  padding="8px"
                  bg="transparent"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  _hover={ {
                    background: inputBg,
                  } }
                >
                  <Icon as={ FiMoreHorizontal } width="20px" height="20px" />
                </Box>
              </Flex>
            </Flex>
            { !hideControl && (
              <DropDown
                caret
                inputBg={ inputBg }
                dropDownTitle={
                  <>
                    { ' ' }
                    <Flex color={ iconColor } alignItems="center">
                      <Icon
                        as={
                          postStyle === 'card'
                            ? MdOutlineViewStream
                            : postStyle === 'classic'
                              ? MdOutlineTableRows
                              : MdOutlineViewHeadline
                        }
                        height={ 6 }
                        width={ 6 }
                      />
                    </Flex>
                  </>
                }
                content={
                  <>
                    { ' ' }
                    <Flex
                      color={ postStyle === 'card' && activeFilterText }
                      fill={ postStyle === 'card' && activeFilterText }
                      alignItems="center"
                      position="relative"
                      outline="none"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      padding="8px"
                      textTransform="capitalize"
                      whiteSpace="nowrap"
                      _hover={ {
                        background: inputBg,
                      } }
                      onClick={ () => setPostStyle('card') }
                      cursor="pointer"
                    >
                      <Icon
                        mr="4px"
                        as={ postStyle === 'card' ? MdViewAgenda : MdOutlineViewStream }
                        width={ 6 }
                        height={ 6 }
                      />
                      <Box>Card</Box>
                    </Flex>
                    <Flex
                      color={ postStyle === 'classic' && activeFilterText }
                      fill={ postStyle === 'classic' && activeFilterText }
                      alignItems="center"
                      position="relative"
                      outline="none"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      padding="8px"
                      textTransform="capitalize"
                      whiteSpace="nowrap"
                      _hover={ {
                        background: inputBg,
                      } }
                      borderTop={ `1px solid ${border2}` }
                      onClick={ () => setPostStyle('classic') }
                      cursor="pointer"
                    >
                      <Icon
                        mr="4px"
                        as={ postStyle === 'classic' ? MdTableRows : MdOutlineTableRows }
                        width={ 6 }
                        height={ 6 }
                      />
                      <Box>Classic</Box>
                    </Flex>
                    <Flex
                      color={ postStyle === 'compact' && activeFilterText }
                      fill={ postStyle === 'compact' && activeFilterText }
                      alignItems="center"
                      position="relative"
                      outline="none"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      padding="8px"
                      textTransform="capitalize"
                      whiteSpace="nowrap"
                      _hover={ {
                        background: inputBg,
                      } }
                      borderTop={ `1px solid ${border2}` }
                      onClick={ () => setPostStyle('compact') }
                      cursor="pointer"
                    >
                      <Icon
                        mr="4px"
                        as={ postStyle === 'compact' ? MdViewHeadline : MdOutlineViewHeadline }
                        width={ 6 }
                        height={ 6 }
                      />
                      <Box>Compact</Box>
                    </Flex>
                  </>
                }
              />
            ) }
          </Flex>



        </>
      ) : (
        <Flex
          borderBottom={ `1px solid ${border2}` }
          borderBottomWidth="4px"
          minH="52px"
          bg={ mainMobileBg }
          justifyContent="space-between"
          lineHeight="32px"
          padding="8px 16px"
          maxWidth="1000px"
          margin="0 auto"
          position="relative"
          sx={ {
            touchAction: 'manipulation',
          } }
        >
          <Flex flex="1" justifyContent="space-between" overflow="hidden" lineHeight="32px">
            <Box flex="1" overflow="hidden">
              <Box marginRight="16px" maxW="calc(100% - 2 * 8px)">
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  onClick={ () => {
                    setMobileSort(!mobileSort);
                    setShowComponent(!mobileSort);
                  } }
                >
                  <Icon
                    as={ RiFireFill }
                    color={ iconMobileColor }
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
                    { feedSort }
                  </Box>
                  <Icon
                    as={ BsChevronDown }
                    color={ iconMobileColor }
                    width="16px"
                    height="16px"
                    flex="0 0 16px"
                    verticalAlign="middle"
                  />
                </Flex>

                { mobileSort && showComponent ? (
                  <Box position="fixed" zIndex="20" ref={ ref }>
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
                      borderColor={ border2 }
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
                          bg={ mainMobileBg }
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
                            borderTopColor={ iconMobileColor }
                            borderTopStyle="solid"
                            borderTopWidth="1px"
                            marginTop="8px"
                          />
                        </Box>
                        <Flex
                          bg={ mainMobileBg }
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={ () => {
                            setMobileSort(false);
                            setShowComponent(false);
                            setFeedSort('hot');
                          } }
                        >
                          <Icon
                            as={ RiFireFill }
                            w="50px"
                            flex="0 0 5opx"
                            color={ feedSort === 'hot' ? activeFilterText : iconMobileColor }
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
                          bg={ mainMobileBg }
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={ () => {
                            setMobileSort(false);
                            setShowComponent(false);
                            setFeedSort('new');
                          } }
                        >
                          <Icon
                            as={ RiFireFill }
                            w="50px"
                            flex="0 0 5opx"
                            color={ feedSort === 'new' ? activeFilterText : iconMobileColor }
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
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ''
                ) }
              </Box>
            </Box>
            { !hideControl && (
              <Box>
                <Flex
                  alignItems="center"
                  color="#a5a4a4"
                  fill="#a5a4a4"
                  height="32px"
                  onClick={ () => {
                    setViewSelect(!viewSelect);
                    setShowComponent2(!viewSelect);
                  } }
                >
                  <Icon
                    as={ postStyle === 'card' ? MdViewAgenda : MdTableRows }
                    width="24px"
                    height="24px"
                    verticalAlign="middle"
                    color={ iconMobileColor }
                    fill={ iconMobileColor }
                  />
                  <Icon
                    as={ BsChevronDown }
                    width="24px"
                    height="24px"
                    verticalAlign="middle"
                    color={ iconMobileColor }
                    fill={ iconMobileColor }
                    marginLeft="8px"
                  />
                </Flex>
                { viewSelect && showComponent2 ? (
                  <Box position="fixed" zIndex="20" ref={ ref2 }>
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
                      borderColor={ border2 }
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
                          bg={ mainMobileBg }
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
                            borderTopColor={ iconMobileColor }
                            borderTopStyle="solid"
                            borderTopWidth="1px"
                            marginTop="8px"
                          />
                        </Box>
                        <Flex
                          bg={ mainMobileBg }
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={ () => {
                            setViewSelect(false);
                            setShowComponent2(false);
                            setPostStyle('classic');
                          } }
                        >
                          <Icon
                            as={ postStyle === 'classic' ? MdTableRows : MdOutlineTableRows }
                            w="50px"
                            flex="0 0 5opx"
                            color={ postStyle === 'classic' ? activeFilterText : iconMobileColor }
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
                          bg={ mainMobileBg }
                          alignItems="flex-start"
                          minH="50px"
                          padding="14px 0"
                          onClick={ () => {
                            setViewSelect(false);
                            setShowComponent2(false);
                            setPostStyle('card');
                          } }
                        >
                          <Icon
                            as={ postStyle === 'card' ? MdViewAgenda : MdOutlineViewStream }
                            w="50px"
                            flex="0 0 5opx"
                            color={ postStyle === 'card' ? activeFilterText : iconMobileColor }
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
                ) }
              </Box>
            ) }
          </Flex>
          { (mobileSort && showComponent) || (viewSelect && showComponent2) ? (
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
          ) }
        </Flex>
      ) }
    </>
  );
};

export default FeedSort;
