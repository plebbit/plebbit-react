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
} from '@chakra-ui/react';

const LeaveMod = ({
  onClose,
  isOpen,
  subPlebbit,
  profile,
  handleSubPlebbitedit,
  loading: loading2,
}) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const [loading, setLoading] = useState(false);
  const data = subPlebbit;

  const handleDelete = async () => {
    setLoading(true);
    await delete data?.roles[profile?.author?.address];
    await handleSubPlebbitedit({ roles: subPlebbit?.roles });
    setLoading(false);
  };

  return (
    <Modal
      trapFocus={false}
      scrollBehavior="outside"
      onClose={onClose}
      size="xl"
      isOpen={isOpen}
      isCentered
    >
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
          <Button
            isLoading={loading || loading2}
            h="32px"
            borderRadius="999px"
            colorScheme="blackAlpha"
            onClick={handleDelete}
          >
            Leave
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeaveMod;

export const RemoveMod = ({
  onClose,
  isOpen,
  subPlebbit,
  address,
  handleSubPlebbitedit,
  loading: loading2,
  setSelected,
}) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const [loading, setLoading] = useState(false);
  const data = subPlebbit;

  const handleDelete = async () => {
    setLoading(true);
    await delete data?.roles[address];
    await handleSubPlebbitedit({ roles: subPlebbit?.roles });
    setSelected('');
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      trapFocus={false}
      scrollBehavior="inside"
      onClose={onClose}
      size="xl"
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={`1px solid ${border1}`}>Remove as a mod</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="16px"
          fontSize="14px"
          fontWeight="400"
          color={mainColor}
          lineHeight="21px"
        >
          Once you remove {address} as a mod, {address} will lose mod permissions and will be unable
          to access any mod tools for this community. Are you sure you want to remove user as a mod
          of this community?
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
            isLoading={loading || loading2}
            h="32px"
            borderRadius="999px"
            colorScheme="blackAlpha"
            onClick={handleDelete}
          >
            remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
