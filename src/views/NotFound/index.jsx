import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { PlebLogo } from '../../components/svgs';

const NotFound = () => {
  return (
    <Flex
      flexDir="column"
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="200px" borderRadius="full" height="200xp">
        <PlebLogo />
      </Box>
      <Box fontWeight="700" mt="10px">
        <h3>Something went wrong</h3>
      </Box>
      <Link to="/">
        <Box textDecor="underline" color="blue">
          Go Home
        </Box>
      </Link>
    </Flex>
  );
};

export default NotFound;
