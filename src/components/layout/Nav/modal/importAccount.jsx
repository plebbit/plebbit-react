import React, { useContext, useState } from 'react';
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
  useColorMode,
  Textarea,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ProfileContext } from '../../../../store/profileContext';

const ImportAccount = ({ isOpen, onClose }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const { colorMode } = useColorMode();
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const [account, setAccount] = useState();
  const { importAccount } = useContext(ProfileContext);
  const toast = useToast();

  const handleImportAccount = async () => {
    await importAccount(account);

    toast({
      title: 'Import Account.',
      description: 'Account Imported Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex flexDir="column" marginRight="8px" maxW="80%">
            <Text
              fontSize="16px"
              fontWeight="500"
              lineHeight="20px"
              color={mainColor}
              marginBottom="4px"
            >
              Account Details (json)
            </Text>
          </Flex>
          <Flex
            alignItems="flex-start"
            marginTop="12px"
            flexDir="column"
            flexGrow="1"
            justifyContent="flex-end"
          >
            <Textarea
              backgroundColor={mainBg}
              placeholder="paste Account details"
              color={mainColor}
              boxSizing="border-box"
              marginBottom="0px"
              border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
              borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
              height="48px"
              borderRadius="4px"
              padding="8px"
              width="100%"
              resize="both"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </Flex>
        </ModalBody>

        <ModalFooter mt={3}>
          <Button mr={3} onClick={handleImportAccount}>
            Import Account
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImportAccount;
