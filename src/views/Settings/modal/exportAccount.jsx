import React, { useContext, useEffect, useState } from 'react';
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
  useColorModeValue,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { ProfileContext } from '../../../store/profileContext';

const ExportAccount = ({ isOpen, onClose }) => {
  const { exportAccount } = useContext(ProfileContext);
  const navBorder = useColorModeValue('#edeff1', '#343536');

  const [account, setAccount] = useState();

  useEffect(async () => {
    const exportedAccount = await exportAccount();
    setAccount(exportedAccount);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Textarea
            flexDir="column"
            border={`1px solid ${navBorder}`}
            padding="10px"
            overflow="scroll"
            value={account}
            height="100%"
          />

          <Flex width="100%">
            <Text fontWeight="400" color="red" fontSize="12px" lineHeight="16px" paddingTop="5px">
              copy this text in the box above and store in a safe place
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter mt={3}>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExportAccount;
