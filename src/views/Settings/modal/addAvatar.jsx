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
  Flex,
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';

const AddAvatar = ({ isOpen, onClose }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex flexDir="column">
            <FormControl>
              <FormLabel>Token address</FormLabel>
              <Input
                backgroundColor={mainBg}
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                placeholder="Input token address"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Token Id</FormLabel>
              <Input
                backgroundColor={mainBg}
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                placeholder="Input token id"
              />
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button mr={3}>Sign</Button>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAvatar;
