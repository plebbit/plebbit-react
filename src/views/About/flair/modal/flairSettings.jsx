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
  Flex,
  FormLabel,
  Switch,
} from '@chakra-ui/react';

const FlairSettings = ({
  onClose,
  isOpen,
  title,
  subPlebbit,
  type,
  handleSubPlebbitedit,
  loading,
}) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const bool = (val) => Boolean(val);
  const [data, setData] = useState(subPlebbit);

  return (
    <Modal trapFocus={false} onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={`1px solid ${border1}`}>{title || 'Flair Settings'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="16px"
          fontSize="14px"
          fontWeight="400"
          color={mainColor}
          lineHeight="21px"
        >
          <Flex mb="12px" justifyContent="space-between" alignItems="center">
            <FormLabel>Enable {title} flair in this community</FormLabel>
            <Switch
              isChecked={
                type === 'user' ? data?.features?.authorFlairs : data?.features?.postFlairs
              }
              onChange={() => {
                setData({
                  ...data,
                  features: {
                    ...data?.features,
                    [type === 'user' ? 'authorFlairs' : 'postFlairs']: !bool(
                      type === 'user' ? data?.features?.authorFlairs : data?.features?.postFlairs
                    ),
                  },
                });
              }}
            />
          </Flex>
          <Flex mb="6px" justifyContent="space-between" alignItems="center">
            <FormLabel>Allow users to assign their own</FormLabel>
            <Switch
              isChecked={
                type === 'user' ? data?.features?.authorFlairs : data?.features?.postFlairs
              }
              onChange={() => {
                setData({
                  ...data,
                  features: {
                    ...data?.features,
                    [type === 'user' ? 'authorFlairs' : 'postFlairs']: !bool(
                      type === 'user' ? data?.features?.authorFlairs : data?.features?.postFlairs
                    ),
                  },
                });
              }}
            />
          </Flex>
          This will let users select, edit, and clear user flair for their usernames in this
          community. This does not allow users to select or edit mod-only user flair.
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
            onClick={() => handleSubPlebbitedit({ features: data?.features })}
            h="32px"
            borderRadius="999px"
            colorScheme="blackAlpha"
            _loading={loading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FlairSettings;
