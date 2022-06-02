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
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
  useColorMode,
  Text,
  Link,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ProfileContext } from '../../../store/profileContext';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useAccountsActions } from '@plebbit/plebbit-react-hooks';

const AddAvatar = ({ isOpen, onClose }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const { colorMode } = useColorMode();
  const { setAccount } = useAccountsActions();
  const { profile } = useContext(ProfileContext);
  const [data, setData] = useState({
    domainSeparator: 'plebbit-author-avatar',
    authorAddress: profile?.author?.address,
  });
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [userProfile, setUserProfile] = useState(profile);
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Nft Avatar</ModalHeader>
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
                onChange={(e) => {
                  setMessage('');
                  setData({ ...data, tokenAddress: e.target.value });
                }}
                value={data?.tokenAddress}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Token Id</FormLabel>
              <Input
                backgroundColor={mainBg}
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                placeholder="Input token id"
                onChange={(e) => {
                  setMessage('');
                  setData({ ...data, tokenId: e.target.value });
                }}
                value={data?.tokenId}
              />
            </FormControl>
            {message ? (
              <FormControl mt="15px">
                <FormLabel>Message</FormLabel>
                <Text
                  border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                  borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                  padding="10px"
                >
                  {message}
                </Text>
              </FormControl>
            ) : (
              ''
            )}
            {message?.length ? (
              <FormControl>
                <Text fontSize="13px" fontWeight="bold" color="red">
                  copy the message in the box above and sign it on{' '}
                  <Link
                    color={linkColor}
                    href="https://etherscan.io/verifiedSignatures"
                    isExternal
                    fontSize="12px"
                    fontStyle="italic"
                  >
                    https://etherscan.io/verifiedSignatures
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
              </FormControl>
            ) : (
              ''
            )}
            {message ? (
              <FormControl mt="15px">
                <FormLabel>Signature</FormLabel>
                <Textarea
                  border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                  borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                  placeholder="Input signature"
                  value={signature}
                  onChange={(e) => {
                    setUserProfile({
                      ...userProfile,
                      author: {
                        ...userProfile?.author,
                        avatar: {
                          ...userProfile?.author?.avatar,
                          signature: {
                            ...userProfile?.author?.avatar?.signature,
                            signature: e.target.value,
                            type: 'eip191',
                            signedPropertyNames: Object.keys(data),
                          },
                        },
                      },
                    });
                    setSignature(e.target.value);
                  }}
                />
                <Text fontSize="10px" fontWeight="bold">
                  paste the signature gotten from{' '}
                  <Link
                    color={linkColor}
                    href="https://etherscan.io/verifiedSignatures"
                    isExternal
                    fontSize="12px"
                    fontStyle="italic"
                  >
                    https://etherscan.io/verifiedSignatures
                    <ExternalLinkIcon mx="2px" />
                  </Link>{' '}
                  in the box above
                </Text>
              </FormControl>
            ) : (
              ''
            )}
          </Flex>
        </ModalBody>

        <ModalFooter mt={3}>
          <Button
            mr={3}
            onClick={() =>
              signature
                ? setTimeout(async () => {
                    if (signature) {
                      await setAccount(userProfile);
                      toast({
                        title: `changes saved`,
                        variant: 'left-accent',
                        status: 'success',
                        isClosable: true,
                      });
                    }
                  }, 300)
                : data?.tokenId &&
                  data?.tokenAddress &&
                  setMessage(
                    JSON.stringify({
                      domainSeparator: data?.domainSeparator,
                      tokenAddress: data?.tokenAddress,
                      tokenId: data?.tokenId,
                      authorAddress: data?.authorAddress,
                    })
                  )
            }
          >
            {!message ? 'Create message' : message && signature ? 'Save' : ''}
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAvatar;
