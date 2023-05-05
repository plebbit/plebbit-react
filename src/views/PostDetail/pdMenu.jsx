import React, { useState } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { FiMoreHorizontal, FiLink } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { PlebLogo } from '../../../assets/svgs/svg';

const PdMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <Icon
        as={FiMoreHorizontal}
        sx={{
          '@media (min-width: 1280px)': {
            display: 'none',
          },
          '@media (max-width: 1120px)': {},
        }}
        height="16px"
        width="16px"
        position="relative"
        onClick={() => setShowMenu(true)}
      />
      {showMenu ? (
        <Box
          top="50%"
          transform="translateY(-50%)"
          position="fixed"
          boxShadow="rgba(0, 0, 0, 0.3) 0px 2px 15px 0px, 0 0 0 max(100vw, 100vh) #0000004d"
          zIndex="100"
          padding="0 "
          width="95%"
          margin="auto"
          maxW="100vw"
          maxH="100vh"
          left="0"
          right="0"
          borderRadius="4px"
          sx={{
            '@media (min-width: 1280px)': {
              display: 'none',
            },
            '@media (max-width: 1120px)': {},
          }}
        >
          <Flex
            flexDir="column"
            width="100%"
            paddingLeft="0px"
            fontSize="16px"
            boxSizing="border-box"
            borderRadius="4px"
            margin="0px"
            borderBottom="0px"
            bg="#1a1a1b"
            padding="0 0 10px"
          >
            <Flex
              alignItems="center"
              borderBlockEnd="1px solid #272729"
              padding="1rem"
              whiteSpace="break-spaces"
            >
              <Icon fontSize="24px" mr="0.5rem" as={FiLink} />
              <Box>Share</Box>
            </Flex>
            <Flex
              alignItems="center"
              borderBlockEnd="1px solid #272729"
              padding="1rem"
              whiteSpace="break-spaces"
            >
              {/* <Icon fontSize="24px" mr="0.5rem" as={FaHeadset} /> */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  marginRight: '0.5rem',
                }}
              >
                <PlebLogo bg="none" outline="#a4a4a4" />
              </div>
              <Box>More from p/Plebbit</Box>
            </Flex>
            <Flex
              alignItems="center"
              borderBlockEnd="1px solid #272729"
              padding="1rem"
              whiteSpace="break-spaces"
            >
              <Icon fontSize="24px" mr="0.5rem" as={FaRegUser} />
              <Box>Abydin's profile</Box>
            </Flex>
            <Flex
              alignItems="center"
              padding="1rem"
              whiteSpace="break-spaces"
              justifyContent="center"
              onClick={() => setShowMenu(false)}
            >
              <Box>close</Box>
            </Flex>
          </Flex>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default PdMenu;
