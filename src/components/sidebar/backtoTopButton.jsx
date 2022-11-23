import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const BacktoTopButton = () => {
  const color = useColorModeValue('darkText1', 'darkText1');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Flex
      top="calc(100vh - 8px)"
      position="sticky"
      marginTop="45px"
      justifyContent="center"
      textAlign="center"
      transform="translateY(-100%)"
    >
      <Button
        border="none"
        width="128px"
        position="relative"
        bg="#a4a4a4"
        color={color}
        fontSize="14px"
        fontWeight="700"
        onClick={scrollToTop}
        borderRadius="999px"
      >
        Back to Top
      </Button>
    </Flex>
  );
};

export default BacktoTopButton;
