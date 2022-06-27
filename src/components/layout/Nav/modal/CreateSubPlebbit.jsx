import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const CreateSubPlebbit = ({ isOpen, onClose }) => {
  const navBorder = useColorModeValue('#edeff1', '#343536');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          borderBottomColor={navBorder}
          borderBottomStyle="solid"
          borderBottomWidth="1px"
        >
          Create a community
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column">
            <Box>Name</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                p/
              </InputLeftElement>
              <Input />
            </InputGroup>
            <Box>21 Characters remaining</Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="blue"
            ml={8}
            mr={3}
            onClick={onClose}
            borderRadius="999px"
            padding="4px 16px"
          >
            Cancel
          </Button>
          <Button colorScheme="blue" borderRadius="999px" padding="4px 16px">
            Create a community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateSubPlebbit;
