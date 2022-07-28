import { Box, Button, Flex, Icon, Image, Input, useColorModeValue } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { HiPencil } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import PlebbitLogo from '../../assets/images/plebbit-logo.png';
import { ProfileContext } from '../../store/profileContext';
import truncateString from '../../utils/truncateString';

const Moderators = ({ subPlebbit, openLeaveMod, openRoleMod }) => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const { device, profile } = useContext(ProfileContext);

  useEffect(() => {
    if (subPlebbit?.roles[profile?.author?.id]?.role !== ('admin' || 'owner' || 'moderator')) {
      history.push(`/`);
    }
  }, []);

  return (
    <Box>
      <Flex
        alignItems="center"
        background={border1}
        height="48px"
        justifyContent={device !== 'mobile' ? 'flex-end' : 'flex-start'}
        left={device !== 'mobile' ? '280px' : '0'}
        padding={device !== 'mobile' ? '0 24px' : '5px 24px'}
        position="fixed"
        right="0"
        zIndex="3"
      >
        <Button
          variant="outline"
          colorScheme="blackAlpha"
          mr="8px"
          position="relative"
          fontSize="14px"
          fontWeight="700"
          lineHeight="17px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width="max-content"
          borderRadius="999px"
          padding="4px 16px"
          height={device !== 'mobile' ? '32px' : '24px'}
          onClick={openLeaveMod}
          mt={device === 'mobile' && '6px'}
        >
          Leave as mod
        </Button>
        <Button
          colorScheme="blackAlpha"
          position="relative"
          fontSize="14px"
          fontWeight="700"
          lineHeight="17px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width="auto"
          borderRadius="999px"
          padding="4px 16px"
          height={device !== 'mobile' ? '32px' : '24px'}
          onClick={openRoleMod}
          mt={device === 'mobile' && '6px'}
        >
          Invite user as mod
        </Button>
      </Flex>
      <Box ml="24px" mr="24px" paddingTop="64px" borderRadius="0 0 4px 4px" overflow="hidden">
        <Flex
          fontSize="18px"
          fontWeight="500"
          lineHeight="22px"
          color={mainColor}
          marginBottom="16px"
          alignItems="center"
        >
          <Box>Moderators of p/{subPlebbit?.title}</Box>
          <Icon as={AiOutlineInfoCircle} ml="4px" verticalAlign="text-top" />
        </Flex>
        <Flex
          bg={border1}
          alignItems="center"
          borderRadius="4px 4px 0 0"
          boxSizing="border-box"
          justifyContent="space-between"
          padding="8px 16px"
        >
          <Flex alignItems="center">
            <Input
              placeholder="Search for a user"
              width="248px"
              bg={mainBg}
              border={`1px solid ${border1}`}
              color={mainColor}
              borderRadius="4px 0 0 4px"
              boxSizing="border-box"
              height="32px"
              padding="8px"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '21px',
              }}
            />
            <Button bg={iconColor} borderRadius="0 4px 4px 0" height="32px" width="40px">
              <Icon as={FiSearch} color={mainBg} />
            </Button>
          </Flex>
        </Flex>
        <Box
          border={`1px solid ${border1}`}
          borderRadius="0 4px 4px 0"
          boxSizing="border-box"
          marginBottom="36px"
          overflow="hidden"
        >
          {subPlebbit?.roles &&
            Object.keys(subPlebbit?.roles)?.map((user, index) => (
              <Flex
                key={`${user}${index}`}
                alignItems="center"
                fontSize="12px"
                fontWeight="400"
                lineHeight="16px"
                bg={mainBg}
                borderBottom={`1px solid ${border1}`}
                boxSizing="border-box"
                color={iconColor}
                height="48px"
                padding="8px 16px"
                width="100%"
              >
                <Box
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  color={mainColor}
                  flex="0 0 220px"
                  minW="220px"
                >
                  <Link>
                    <Flex flex="0 0 auto" alignItems="center">
                      <Box h="32px" width="32px" mr="6px" verticalAlign="middle">
                        <Box height="100%" position="relative">
                          <Box borderRadius="4px" width="100%" height="100%" position="relative">
                            <Box bg={border1} width="100%" height="100%" borderRadius="50%" />
                            <Box width="100%" position="absolute" bottom="0">
                              <Image
                                fallbackSrc={require('../../assets/images/fallback.png')}
                                src={PlebbitLogo}
                                width="100%"
                                border={`1px solid ${border1}`}
                                borderRadius="50%"
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box>{truncateString(user, 14, '...')}</Box>
                    </Flex>
                  </Link>
                </Box>
                <Box
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  flex="1 0 100px"
                  lineHeight="normal"
                >
                  4 days ago
                </Box>
                <Flex alignItems="center" ml="auto" minW="0">
                  <Box padding="4px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    Everything
                  </Box>
                </Flex>
              </Flex>
            ))}
        </Box>
        <Box fontSize="14px" fontWeight="500" lineHeight="18px" color={mainColor} mb="8px" ml="4px">
          You can edit these moderators
        </Box>
        <Box
          border={`1px solid ${border1}`}
          borderRadius="0 4px 4px 0"
          boxSizing="border-box"
          marginBottom="36px"
          overflow="hidden"
        >
          {subPlebbit?.roles &&
            Object.keys(subPlebbit?.roles)?.map((user, index) => (
              <Flex
                key={`${user}${index}`}
                alignItems="center"
                fontSize="12px"
                fontWeight="400"
                lineHeight="16px"
                bg={mainBg}
                borderBottom={`1px solid ${border1}`}
                boxSizing="border-box"
                color={iconColor}
                height="48px"
                padding="8px 16px"
                width="100%"
              >
                <Box
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  color={mainColor}
                  flex="0 0 220px"
                  minW="220px"
                >
                  <Link>
                    <Flex flex="0 0 auto" alignItems="center">
                      <Box h="32px" width="32px" mr="6px" verticalAlign="middle">
                        <Box height="100%" position="relative">
                          <Box borderRadius="4px" width="100%" height="100%" position="relative">
                            <Box bg={border1} width="100%" height="100%" borderRadius="50%" />
                            <Box width="100%" position="absolute" bottom="0">
                              <Image
                                fallbackSrc={require('../../assets/images/fallback.png')}
                                src={PlebbitLogo}
                                width="100%"
                                border={`1px solid ${border1}`}
                                borderRadius="50%"
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box>{truncateString(user, 14, '...')}</Box>
                    </Flex>
                  </Link>
                </Box>
                <Box
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  flex="1 0 100px"
                  lineHeight="normal"
                >
                  4 days ago
                </Box>
                <Flex alignItems="center" ml="auto" minW="0">
                  <Box padding="4px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    Everything
                  </Box>
                  <Box cursor="pointer">
                    <Icon as={HiPencil} width="16px" height="16px" />
                  </Box>
                </Flex>
              </Flex>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Moderators;
