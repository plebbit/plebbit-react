import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const PopOver = ({ title, header, content, footer }) => {
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');

  return (
    <Popover gutter={ 20 } >
      <PopoverTrigger>
        <Flex alignItems="center" ml="8px">
          { title }
        </Flex>
      </PopoverTrigger>
      <PopoverContent borderColor="transparent" width="375px"  >
        <PopoverArrow />
        <PopoverHeader>{ header }</PopoverHeader>

        <PopoverBody paddingX="0px" maxH="60vh" overflowY="scroll" >
          <Box>{ content }</Box>
        </PopoverBody>
        <PopoverFooter bg={ inputBg }>{ footer }</PopoverFooter>
      </PopoverContent>

    </Popover>
  );
};

export default PopOver;
