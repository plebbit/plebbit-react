import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
  Flex,
  Box,
  Tag,
  Input,
  RadioGroup,
  Stack,
  Radio,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

const AddFlair = ({ onClose, isOpen }) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');

  return (
    <Modal onClose={onClose} size="sm" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={`1px solid ${border1}`}>Select flair</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="16px"
          fontSize="14px"
          fontWeight="400"
          color={mainColor}
          lineHeight="21px"
        >
          <Flex
            alignItems="center"
            padding="22px 16px"
            fontSize="12px"
            fontWeight="400"
            lineHeight="14px"
          >
            <Box>Post Title</Box>
            <Tag mr="5px" ml="8px">
              Test
            </Tag>
          </Flex>
          <Flex flex="1 1 0%" flexDir="column" padding="16px 0">
            <InputGroup
              boxShadow="none"
              bg={inputBg}
              borderWidth="1px"
              borderColor={navBorder}
              alignItems="center"
              boxSizing="border-box"
              mb="16px"
              borderRadius="4px"
            >
              <InputLeftElement>
                <Icon as={RiSearchLine} color={iconColor} w="20px" h="20px" />
              </InputLeftElement>
              <Input h="48px" borderRadius="4px" />
            </InputGroup>
            <RadioGroup defaultValue="1">
              <Stack>
                <Radio mb="4px" value="1">
                  <Tag>Test</Tag>
                </Radio>
                <Radio mb="4px" value="2">
                  <Tag>Test</Tag>
                </Radio>
                <Radio mb="4px" value="3">
                  <Tag>Test</Tag>
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </ModalBody>
        <ModalFooter bg={border1}>
          <Button
            borderRadius="999px"
            mr="8px"
            variant="outline"
            colorScheme="red"
            onClick={onClose}
            h="32px"
          >
            Clear Flair
          </Button>
          <Button h="32px" borderRadius="999px" colorScheme="blackAlpha" onClick={() => {}}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddFlair;
