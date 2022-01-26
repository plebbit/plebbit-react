import React from 'react';
import { Box, Text, List, ListItem, Flex, Avatar } from '@chakra-ui/react';
import PlebSideBarImg from '../../assets/images/plebbitSBImage.png';
import { ChevronUpIcon } from '@chakra-ui/icons';
import Button from '../../components/Button';
const Home = () => {
  return (
    <>
      <Box bg="white" width="640px">
        kkkk
      </Box>
      <Box marginLeft="24px" marginTop="28px" width="312px" flex="0 0 312px">
        <Flex flexDirection="column" height="100%" width="inherit">
          <Box borderRadius="4px" overflow="visible" wordBreak="break-word" bg="#fff">
            <Box
              maxHeight="none"
              bgImg={PlebSideBarImg}
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
                <Button content="Join" bg="#a4a4a4" height="24px" color="#fff" />
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
                <Button content="Join" bg="#a4a4a4" height="24px" color="#fff" />
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
                <Button content="Join" bg="#a4a4a4" height="24px" color="#fff" />
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
                <Button content="Join" bg="#a4a4a4" height="24px" color="#fff" />
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
                <Button content="Join" bg="#a4a4a4" height="24px" color="#fff" />
              </ListItem>
            </List>
            <Box padding="12px">
              <Button color="#fff" content="View All" bg="#a4a4a4" height="34px" width="100%" />
            </Box>
            <Flex alignItems="center">
              <Box display="flex" margin="4px" colorScheme="a4a4a">
                Top
              </Box>
              <Box display="flex" margin="4px" color="a4a4a">
                Near You
              </Box>
              <Box display="flex" margin="4px" color="a4a4a">
                News
              </Box>
              <Box display="flex" margin="4px" color="a4a4a">
                Sports
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
