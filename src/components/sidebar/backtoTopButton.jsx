import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Button from '../Button';

const BacktoTopButton = () => {
  const color = useColorModeValue('lightText', 'darkText');

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
        content="Back to Top"
        width="128px"
        position="relative"
        bg="#a4a4a4"
        color={color}
        fontSize="14px"
        fontWeight="700"
        onClick={scrollToTop}
      />
    </Flex>
  );
};

export default BacktoTopButton;
