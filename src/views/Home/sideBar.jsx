import React, { useContext } from 'react';
import {
  Box,
  Text,
  List,
  ListItem,
  Flex,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  useColorModeValue,
} from '@chakra-ui/react';
// import Button from '../../components/Button';
import BottomSideBar from '../../components/sidebar/bottomSideBar';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';
import { ProfileContext } from '../../store/profileContext';
import { useSubplebbits } from '@plebbit/plebbit-react-hooks';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';

import getIsOnline from '../../utils/getIsOnline';
import { getSubName } from '../../utils/getUserName';
import convertArrToObj from '../../utils/convertArrToObj';
import Sort from '../../utils/sort';

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
}) => {
  const { subPlebbitData } = useContext(ProfileContext);
  const Bg = useColorModeValue('#F8F9FA', '');
  const { subplebbits } = useSubplebbits({ subplebbitAddresses: subPlebbitData?.map((x) => x?.address) });
  const subs = Sort(
    convertArrToObj(
      subplebbits?.includes(undefined)
        ? [...subPlebbitData, subplebbits?.filter((x) => x !== undefined)].flat()
        : subplebbits,
      'address',
      true
    ),
    (x) => getIsOnline(x?.updatedAt),
    true
  );

  return (
    <Box
      marginLeft={ ml || '24px' }
      marginTop={ mt || '28px' }
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
        <Box
          borderRadius="4px"
          overflow="visible"
          wordBreak="break-word"
          bg={ bg || Bg }
          paddingBottom="12px"
        >
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
              Top Communities
            </Text>
          </Box>
          <List>
            { subs?.map((sub, index) => (
              <ListItem
                key={ `${index}${sub?.id}` }
                display="flex"
                alignItems="center"
                padding="0 12px"
                height="48px"
                justifyContent="space-between"
                borderBottom="thin solid #edeff1"
                cursor="pointer"
                as={ Link }
                to={ `/p/${sub?.address}` }
              >
                <Flex alignItems="center">
                  <Box
                    width="20px"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    { index + 1 }
                  </Box>
                  <Avatar
                    width={ 20 }
                    height={ 20 }
                    mx="8px"
                    badge
                    isOnline={ getIsOnline(sub?.updatedAt) }
                  />
                  <Box alignSelf="center" fontSize="14px" fontWeight="500" lineHeight="18px">
                    { getSubName(sub) }
                  </Box>
                </Flex>
                {/* <Button content="Join" bg="#a4a4a4" height="24px" color={color} /> */ }
              </ListItem>
            )) }
          </List>
        </Box>

        <Box marginTop="16px">
          <Box borderRadius="4px" overflow="hidden" wordBreak="break-word" bg={ bg || Bg }>
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
                <AccordionPanel padding="12px" width="312px">
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
                <AccordionPanel padding="12px" width="312px">
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
                <AccordionPanel padding="12px" width="312px">
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
                <AccordionPanel padding="12px" width="312px">
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
                <AccordionPanel padding="12px" width="312px">
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
                <AccordionPanel padding="12px" width="312px">
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
                <AccordionPanel padding="12px" width="312px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
        <Box flex="1 1 auto" width="inherit" position="relative">
          <BottomSideBar bg={ bg } />
          <BacktoTopButton />
        </Box>
      </Flex>
    </Box>
  );
};

export default SideBar;
