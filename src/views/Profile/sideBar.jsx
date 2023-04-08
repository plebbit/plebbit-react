import React, { useState } from 'react';
import { Box, Flex, useColorModeValue, Icon, useDisclosure } from '@chakra-ui/react';
import { BsCamera } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { SiInformatica } from 'react-icons/si';
import { RiTShirtFill } from 'react-icons/ri';
import { GiMoebiusStar } from 'react-icons/gi';
import Button from '../../components/Button';
import numFormatter from '../../utils/numberFormater';
import { useHistory } from 'react-router-dom';
import AddAvatar from '../Settings/modal/addAvatar';
import BottomSideBar from '../../components/sidebar/bottomSideBar';
import Image from '../../components/Image';

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
  const Bg = useColorModeValue('#F8F9FA', '');

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      marginLeft={ ml || '24px' }
      marginTop={ mt }
      border={ border }
      borderColor={ borderColor }
      margin={ margin }
      width={ width }
      padding={ padding }
      borderRadius={ borderRadius }
      top={ top }
      right={ right }
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
            bg={ bg || Bg }
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
              onClick={ onOpen }
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
                  <Icon as={ BsCamera } height="20px" color="#33a8ff" width="20px" />
                </Flex>
              </Box>
            </Box>
            <Box height="160px" width="160px" textAlign="center" position="relative" margin="auto">
              <Image

                position="relative"
                zIndex="1"
                src={ avatar }
                width="100%"
                height="100%"
              />
            </Box>
            <Box padding="4px" position="absolute" right="12px" mt="-76px">
              <Icon
                onClick={ () => history.push('/settings', []) }
                as={ AiOutlineSetting }
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
              <Box> { profile?.author?.displayName || profile?.name }</Box>
              <Icon as={ SiInformatica } fill="#ff4500" ml="4px" />
            </Flex>
            <Box
              fontSize="12px"
              fontWeight="500"
              lineHeight="16px"
              textAlign="center"
              color="#7c7c7c"
              my="4px"
            >
              { `u/${profile?.author?.address}` }
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
                  <Icon as={ RiTShirtFill } ml="0" />
                  <Box flex="1" textAlign="center">
                    Style Avatar
                  </Box>
                </Flex>
              }
            />
            <Flex flexWrap="wrap">
              <Flex cursor="default" flex="1 1 50%" mb="12px">
                <Box fontSize="14px" fontWeight="500" lineHeight="18px">
                  Karma
                </Box>
                <Flex alignItems="center" mt="2px">
                  <Icon width="12px" height="12px" color="#24a0ed" as={ GiMoebiusStar } />
                  <Box ml="4px" fontSize="12px" fontWeight="400" lineHeight="16px">
                    { numFormatter(profile?.karma?.score) }
                  </Box>
                </Flex>
              </Flex>
              {/* <Flex cursor="default" flex="1 1 50%" mb="12px" flexDir="column">
                <Box fontSize="14px" fontWeight="500" lineHeight="18px">
                  Cake Day
                </Box>
                <Flex alignItems="center" mt="2px">
                  <Icon width="12px" height="12px" color="#24a0ed" as={GiCakeSlice} />
                  <Box ml="4px" fontSize="12px" fontWeight="400" lineHeight="16px">
                    June 29, 2021
                  </Box>
                </Flex>
              </Flex> */}
            </Flex>
            <Button
              content="New Post"
              width="100%"
              mt="10px"
              padding="4px 15px"
              bg="#0079d3"
              border="none"
              color="#fff"
              onClick={ () => history.push('/submit', []) }
            />
            { showMoreOptions && (
              <Flex flexDir="column">
                <Button
                  content="Profile Moderation"
                  border="none"
                  bg="transparent"
                  color="#0079d3"
                  mt="8px"
                  padding="4px 8px"
                  sx={ {
                    fontSize: '12px',
                    fontWeight: '700',
                    lineHeight: '16px',
                    justifyContent: 'left',
                  } }
                />
                <Button
                  content="Add to Custom Feed"
                  border="none"
                  bg="transparent"
                  color="#0079d3"
                  mt="8px"
                  padding="4px 8px"
                  sx={ {
                    fontSize: '12px',
                    fontWeight: '700',
                    lineHeight: '16px',
                    justifyContent: 'left',
                  } }
                />
                <Button
                  content="Invite Someone to Chat"
                  border="none"
                  bg="transparent"
                  color="#0079d3"
                  mt="8px"
                  padding="4px 8px"
                  sx={ {
                    fontSize: '12px',
                    fontWeight: '700',
                    lineHeight: '16px',
                    justifyContent: 'left',
                  } }
                />
              </Flex>
            ) }
            <Flex justifyContent="flex-end" mt="12px">
              <Button
                content={ showMoreOptions ? 'Fewer Options' : 'More Options' }
                border="none"
                bg="transparent"
                color="#0079d3"
                onClick={ () => setShowMoreOptions(!showMoreOptions) }
                sx={ {
                  fontSize: '14p',
                  fontWeight: '700',
                  lineHeight: '17px',
                } }
              />
            </Flex>
          </Box>
        </Box>
        <BottomSideBar />
      </Flex>
      { isOpen ? <AddAvatar isOpen={ isOpen } onClose={ onClose } /> : '' }
    </Box>
  );
};

export default SideBar;
