import { Flex, Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { TiStarburst } from 'react-icons/ti';
import { RiFireLine } from 'react-icons/ri';
import { BsBoxArrowUp } from 'react-icons/bs';

const Profile = () => {
  return (
    <Flex flexDir="column">
      <Flex alignItems="center" justifyContent="center" bg="#fff">
        <Flex alignItems="center" justifyContent="center" height="40px" textTransform="uppercase">
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              margin="0 5px"
              padding="0 8px"
              height="100%"
            >
              Overview
            </Box>
          </Link>
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              m="0 5px"
              padding="0 8px"
              height="100%"
            >
              Posts
            </Box>
          </Link>
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              m="0 5px"
              padding="0 8px"
              height="100%"
            >
              Comments
            </Box>
          </Link>
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              m="0 5px"
              padding="0 8px"
              height="100%"
            >
              Saved
            </Box>
          </Link>
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              m="0 5px"
              padding="0 8px"
              height="100%"
            >
              Hidden
            </Box>
          </Link>
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              m="0 5px"
              padding="0 8px"
              height="100%"
            >
              Upvoted
            </Box>
          </Link>
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              m="0 5px"
              padding="0 8px"
              height="100%"
            >
              Downvoted
            </Box>
          </Link>
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              m="0 5px"
              padding="0 8px"
              height="100%"
            >
              Award Recieved
            </Box>
          </Link>
          <Link>
            <Box
              fontSize="14px"
              fontWeight="500"
              lignHeight="18px"
              cursor="default"
              m="0 5px"
              padding="0 8px"
              height="100%"
            >
              Award Given
            </Box>
          </Link>
        </Flex>
      </Flex>

      <Flex width="70%" marginX="auto" justifyContent="space-between" padding="15px">
        <Flex width="66%">
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="flex-start"
            bg="#fff"
            padding="10px 12px"
            marginBottom="16px"
            borderRadius="4px"
            flexFlow="nowrap"
          >
            <Link>
              <Flex
                alignItems="center"
                borderRadius="20px"
                padding="6px 8px"
                mr="8px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="17px"
              >
                <Icon as={TiStarburst} padding="0 8px 0 0" height={8} width={8} fontWeight="400" />
                <Box>New</Box>
              </Flex>
            </Link>
            <Link>
              <Flex
                alignItems="center"
                borderRadius="20px"
                padding="6px 8px"
                mr="8px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="17px"
              >
                <Icon as={RiFireLine} padding="0 8px 0 0" height={8} width={8} fontWeight="400" />
                <Box>Hot</Box>
              </Flex>
            </Link>
            <Link>
              <Flex
                alignItems="center"
                borderRadius="20px"
                padding="6px 8px"
                mr="8px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="17px"
              >
                <Icon as={BsBoxArrowUp} padding="0 8px 0 0" height={8} width={8} fontWeight="400" />
                <Box>Top</Box>
              </Flex>
            </Link>
          </Flex>

          <Flex>
            <Flex cursor="pointer" borderRadius="5px" border="none" mb="10px" bg="#fff">
              <Flex
                borderTopLeftRadius="4px"
                borderTopRightRadius="4px"
                borderTopWidth="1px"
              ></Flex>
              <Flex></Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex flex="1" marginLeft="24px" bg="#fff">
          aa
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
