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
} from '@chakra-ui/react';

const LeaveMod = ({ onClose, isOpen }) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={`1px solid ${border1}`}>Leave as mod</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="16px"
          fontSize="14px"
          fontWeight="400"
          color={mainColor}
          lineHeight="21px"
        >
          Once you leave as a mod, you will lose mod permissions and will be unable to access any
          mod tools for this community. Are you sure you wish to leave as a mod of this community?
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
            Cancel
          </Button>
          <Button h="32px" borderRadius="999px" colorScheme="blackAlpha" onClick={() => {}}>
            Leave
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeaveMod;
