import React, { useEffect, useState } from 'react';
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
  Textarea,
} from '@chakra-ui/react';

const AddRules = ({ onClose, isOpen, rules, mode, data, handleSubPlebbitedit, loading }) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');

  const [rule, setRule] = useState();

  useEffect(() => {
    mode === 'create' ? setRule('') : setRule(data);
    return () => {
      setRule('');
    };
  }, []);

  const handleSave = async () => {
    const oldVal = rules?.filter((x) => x !== data);
    const newVal = [...oldVal, rule];
    mode === 'create'
      ? await handleSubPlebbitedit({ rules: rules ? [rule, ...rules] : [rule] })
      : await handleSubPlebbitedit({
          rules: newVal,
        });

    onClose();
  };
  const handleDelete = async () => {
    const oldVal = rules?.filter((x) => x !== rule);
    await handleSubPlebbitedit({ rules: oldVal });
    onClose();
  };

  return (
    <Modal trapFocus={false} onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={`1px solid ${border1}`}>Add Rule</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="16px"
          fontSize="14px"
          fontWeight="400"
          color={mainColor}
          lineHeight="21px"
        >
          <Textarea
            placeholder="Enter Rule"
            h="36px"
            padding="12px 8px"
            border={`1px solid ${border1}`}
            borderColor={border1}
            bg={inputBg}
            fontSize="14px"
            onChange={(e) => setRule(e.target.value)}
            value={rule}
          />
        </ModalBody>
        <ModalFooter bg={border1}>
          <Button borderRadius="999px" mr="auto" colorScheme="red" onClick={handleDelete} h="32px">
            Delete
          </Button>
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
            isLoading={loading}
            h="32px"
            borderRadius="999px"
            colorScheme="blackAlpha"
            onClick={handleSave}
          >
            {mode === 'edit' ? 'Edit rule' : 'Add new rule'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRules;
