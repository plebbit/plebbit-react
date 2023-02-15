import React, { useState } from 'react';
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
  Box,
  Textarea,
} from '@chakra-ui/react';

const AddRemovalReason = ({ onClose, isOpen, handleRemove }) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const [input, setInput] = useState('');

  return (
    <Modal trapFocus={false} onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Add removal reasons</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="16px"
          fontSize="14px"
          fontWeight="400"
          color={mainColor}
          lineHeight="21px"
        >
          <Box mb="16px">
            <Textarea
              placeholder="Enter Reason"
              h="36px"
              padding="0 8px"
              border={`1px solid ${border1}`}
              borderColor={border1}
              fontSize="14px"
              onChange={(e) => setInput(e.targe.value)}
              value={input}
            />
          </Box>
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
          <Button
            h="32px"
            borderRadius="999px"
            colorScheme="blackAlpha"
            onClick={() => handleRemove({ reason: input }, onClose())}
          >
            Add reason
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRemovalReason;
