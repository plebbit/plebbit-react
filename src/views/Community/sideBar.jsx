import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = ({ page, device }) => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  return (
    <>
      {device !== 'mobile' ? (
        <Box
          bg={inputBg}
          bottom="0"
          boxSizing="border-box"
          color={mainColor}
          overflow="auto"
          paddingTop="16px"
          paddingBottom="32px"
          position="fixed"
          top="88px"
          width="280px"
          zIndex="30"
        >
          <Box
            mb="10px"
            _after={{
              borderBottom: `1px solid ${border1}`,
              content: `" "`,
              margin: '0 24px',
            }}
          >
            <Link to="modqueue">
              <Flex
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                alignItems="center"
                padding="0 24px 10px"
                color={mainColor}
              >
                <Icon as={FaChevronLeft} mr="4px" />
                <Box>Back to mod tools</Box>
              </Flex>
            </Link>
          </Box>
          <Link to="edit?page=community">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'community' && `4px solid #1a1a1b `}
              bg={page === 'community' && border1}
            >
              Community
            </Flex>
          </Link>
          <Link to="edit?page=safety">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'safety' && `4px solid #1a1a1b `}
              bg={page === 'safety' && border1}
            >
              Safety and Privacy
            </Flex>
          </Link>
          <Link to="edit?page=posts">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'posts' && `4px solid #1a1a1b `}
              bg={page === 'posts' && border1}
            >
              Posts and Comments
            </Flex>
          </Link>
          <Link to="edit?page=wikis">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'wikis' && `4px solid #1a1a1b `}
              bg={page === 'wikis' && border1}
            >
              Wikis
            </Flex>
          </Link>
          <Link to="edit?page=notifications">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'notifications' && `4px solid #1a1a1b `}
              bg={page === 'notifications' && border1}
            >
              Notifications
            </Flex>
          </Link>
        </Box>
      ) : (
        <Box
          bg={inputBg}
          bottom="0"
          boxSizing="border-box"
          color={mainColor}
          overflow="auto"
          paddingTop="16px"
          paddingBottom="32px"
          position="fixed"
          top="88px"
          width="280px"
          zIndex="28"
        >
          <Box
            mb="10px"
            _after={{
              borderBottom: `1px solid ${border1}`,
              content: `" "`,
              margin: '0 24px',
            }}
          >
            <Link to="modqueue">
              <Flex
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                alignItems="center"
                padding="0 24px 10px"
                color={mainColor}
              >
                <Icon as={FaChevronLeft} mr="4px" />
                <Box>Back to mod tools</Box>
              </Flex>
            </Link>
          </Box>
          <Link to="edit?page=community">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'community' && `4px solid #1a1a1b `}
              bg={page === 'community' && border1}
            >
              Community
            </Flex>
          </Link>
          <Link to="edit?page=safety">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'safety' && `4px solid #1a1a1b `}
              bg={page === 'safety' && border1}
            >
              Safety and Privacy
            </Flex>
          </Link>
          <Link to="edit?page=posts">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'posts' && `4px solid #1a1a1b `}
              bg={page === 'posts' && border1}
            >
              Posts and Comments
            </Flex>
          </Link>
          <Link to="edit?page=wikis">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'wikis' && `4px solid #1a1a1b `}
              bg={page === 'wikis' && border1}
            >
              Wikis
            </Flex>
          </Link>
          <Link to="edit?page=notifications">
            <Flex
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              alignItems="center"
              padding="8px 24px"
              borderLeft={page === 'notifications' && `4px solid #1a1a1b `}
              bg={page === 'notifications' && border1}
            >
              Notifications
            </Flex>
          </Link>
        </Box>
      )}
    </>
  );
};

export default SideBar;
