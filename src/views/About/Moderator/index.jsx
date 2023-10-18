import { Box, Button, Flex, Icon, Input, useColorModeValue } from '@chakra-ui/react';
import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import Layout from '../../../components/layout';
import { PlebLogo } from '../../../components/svgs';
import { getAddress } from '../../../utils/getUserName';

const Moderators = ({ match }) => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const location = useLocation();

  const subPlebbit = useSubplebbit({ subplebbitAddress: match?.params?.subplebbitAddress });
  return (
    <Layout
      name={{
        label: subPlebbit?.title || getAddress(subPlebbit?.address),
        value: location?.pathname,
      }}
    >
      <Box>
        <Flex
          fontSize="12px"
          fontWeight="700"
          letterSpacing="0.5px"
          textTransform="uppercase"
          lineHeight="24px"
          alignItems="center"
          bg={mainBg}
          height="40px"
          paddingLeft="24px"
          position="fixed"
          width="100%"
          zIndex="30"
        >
          <Avatar
            width={20}
            height={20}
            style={{
              marginRight: '8px',
            }}
          />
          <Link to={`/p/${subPlebbit?.address}/`}>
            <Flex alignItems="center" color={linkColor} mr="4px">
              {subPlebbit?.title || getAddress(subPlebbit?.address)} {'  '}
              <Box color={mainColor}>/ MODERATORS</Box>
            </Flex>
          </Link>
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
            <Box>Moderators of {subPlebbit?.title}</Box>
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
                    <Box>
                      <Flex flex="0 0 auto" alignItems="center">
                        <Box h="32px" width="32px" mr="6px" verticalAlign="middle">
                          <Box height="100%" position="relative">
                            <Box borderRadius="4px" width="100%" height="100%" position="relative">
                              <Box bg={border1} width="100%" height="100%" borderRadius="50%" />
                              <Box width="100%" position="absolute" bottom="0">
                                <Box
                                  width="100%"
                                  border={`1px solid ${border1}`}
                                  borderRadius="50%"
                                >
                                  <PlebLogo />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box>{getAddress(user)}</Box>
                      </Flex>
                    </Box>
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
                    <Box
                      padding="4px"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      Everything
                    </Box>
                  </Flex>
                </Flex>
              ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Moderators;
