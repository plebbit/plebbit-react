import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Switch,
  Tag,
  Td,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';

const FlairList = () => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <Tr
        fontSize="12px"
        fontWeight="400"
        lineHeight="16px"
        bg={mainBg}
        borderBottom={`1px solid ${border1}`}
        boxSizing="border-box"
        color={iconColor}
        height="48px"
        padding="16px 42px 16px 24px"
      >
        <Td>
          <Tag bg="red">Test</Tag>
        </Td>
        <Td>Editable, Allows text and up to 10 emojis</Td>
        <Td display="flex" justifyContent="flex-end" alignItems="center">
          <Box
            padding="4px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            onClick={() => setShowEdit(!showEdit)}
            cursor="pointer"
            fontWeight="bold"
            _hover={{
              background: metaColor,
              borderRadius: '3px',
            }}
          >
            EDIT
          </Box>
          <Icon ml="auto" as={RiDeleteBin6Line} verticalAlign="text-top" />
        </Td>
      </Tr>
      {showEdit && (
        <>
          <Tr width="100%" bg={border1}>
            <Td flexDir="column">
              <Box
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                letterSpacing=".5px"
                color={metaColor}
              >
                FLAIR APPEARANCE
              </Box>
              <Flex flexDir="column" marginTop="16px">
                <Box mb="8px" fontSize="14px" fontWeight="500" lineHeight="18px">
                  Flair text
                </Box>
                <Input
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="21px"
                  bg={mainBg}
                  border={`1px solid ${border1}`}
                  borderColor={border1}
                  borderRadius="4px"
                  padding="8px 30px 8px 8px"
                />
                <Box color={metaColor} mt="4px" fontSize="12px" fontWeight="400" lineHeight="16px">
                  15 characters remaining
                </Box>
              </Flex>
              <Flex flexDir="column" marginTop="16px">
                <Box mb="8px" fontSize="14px" fontWeight="500" lineHeight="18px">
                  CSS class
                </Box>
                <Input
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="21px"
                  bg={mainBg}
                  border={`1px solid ${border1}`}
                  borderColor={border1}
                  placeholder="none"
                  borderRadius="4px"
                  padding="8px 30px 8px 8px"
                />
                <Box color={metaColor} mt="4px" fontSize="12px" fontWeight="400" lineHeight="16px">
                  optional
                </Box>
              </Flex>
              <Flex flexDir="column" marginTop="16px">
                <Flex
                  justifyContent="space-between"
                  mb="8px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                >
                  <Box>Add flair background</Box>
                  <Switch />
                </Flex>
              </Flex>
            </Td>
            <Td flexDir="column">
              <Box
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                letterSpacing=".5px"
                color={metaColor}
              >
                FLAIR SETTINGS
              </Box>
              <Flex flexDir="column" marginTop="16px">
                <Flex
                  justifyContent="space-between"
                  mb="8px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                >
                  <Flex alignItems="center">
                    <Box>Mod only</Box>
                    <Icon color={iconColor} as={AiOutlineInfoCircle} size={5} ml="4px" />
                  </Flex>
                  <Switch />
                </Flex>
              </Flex>
              <Flex flexDir="column" marginTop="16px">
                <Flex
                  justifyContent="space-between"
                  mb="8px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                >
                  <Flex alignItems="center">
                    <Box>Allow user edits</Box>
                    <Icon color={iconColor} as={AiOutlineInfoCircle} size={5} ml="4px" />
                  </Flex>
                  <Switch />
                </Flex>
              </Flex>
            </Td>
            <Td />
          </Tr>
          <Tr width="100%" bg={border1}>
            <Td />
            <Td />
            <Td flexDir="column">
              <Button borderRadius="999px" mr="8px" variant="outline" colorScheme="red" h="32px">
                Cancel
              </Button>
              <Button h="32px" borderRadius="999px" colorScheme="blackAlpha">
                Save
              </Button>
            </Td>
          </Tr>
        </>
      )}
    </>
  );
};

export default FlairList;
