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
  Textarea,
  useToast,
  Box,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ProfileContext } from '../../../store/profileContext';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { setAccount } from "@plebbit/plebbit-react-hooks/dist/stores/accounts/accounts-actions"
import logger from '../../../utils/logger';

const AddAvatar = ({ isOpen, onClose }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const { colorMode } = useColorMode();
  const { profile } = useContext(ProfileContext);
  const [data, setData] = useState({
    domainSeparator: 'plebbit-author-avatar',
    authorAddress: profile?.author?.address,
  });
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [type, setType] = useState('eip191');
  const [chainTicker, setChainTicker] = useState('');
  const [userProfile, setUserProfile] = useState(profile);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  return (
    <Modal trapFocus={ false } scrollBehavior="inside" isOpen={ isOpen } onClose={ onClose } isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Nft Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={ 6 }>
          <Flex flexDir="column">
            <FormControl>
              <FormLabel>Token address</FormLabel>
              <Input
                backgroundColor={ mainBg }
                border={ `1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}` }
                borderColor={ colorMode === 'light' ? '#edeff1' : '#343456' }
                placeholder="Input token address"
                onChange={ (e) => {
                  setMessage('');
                  setData({ ...data, tokenAddress: e.target.value });
                } }
                value={ data?.tokenAddress }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Token Id</FormLabel>
              <Input
                backgroundColor={ mainBg }
                border={ `1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}` }
                borderColor={ colorMode === 'light' ? '#edeff1' : '#343456' }
                placeholder="Input token id"
                onChange={ (e) => {
                  setMessage('');
                  setData({ ...data, tokenId: e.target.value });
                } }
                value={ data?.tokenId }
              />
            </FormControl>
            { message ? (
              <FormControl mt="15px">
                <FormLabel>Message</FormLabel>
                <Text
                  border={ `1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}` }
                  borderColor={ colorMode === 'light' ? '#edeff1' : '#343456' }
                  padding="10px"
                >
                  { message }
                </Text>
              </FormControl>
            ) : (
              ''
            ) }
            { message?.length ? (
              <FormControl>
                <CopyToClipboard
                  text={ message }
                  onCopy={ () => {
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 3000);
                  } }
                >
                  <Button>{ copied ? 'Copied' : 'Copy' }</Button>
                </CopyToClipboard>
                <Text fontSize="13px" fontWeight="bold" color="red">
                  copy the message in the box above and sign it on{ ' ' }
                  <Box color={ linkColor } fontSize="12px" fontStyle="italic">
                    https://etherscan.io/verifiedSignatures
                    <ExternalLinkIcon mx="2px" />
                  </Box>
                </Text>
              </FormControl>
            ) : (
              ''
            ) }
            { message ? (
              <FormControl mt="15px">
                <FormLabel>Chain Ticker</FormLabel>
                <Input
                  value={ chainTicker }
                  onChange={ (e) => {
                    setUserProfile({
                      ...userProfile,
                      author: {
                        ...userProfile?.author,
                        avatar: {
                          ...userProfile?.author?.avatar,
                          chainTicker: e.target.value,
                        },
                      },
                    });
                    setChainTicker(e.target.value?.toLowerCase());
                  } }
                  mb="10px"
                  placeholder="input ticker of the chain, like eth, avax, sol, matic, etc"
                />
                <RadioGroup onChange={ setType } value={ type }>
                  <Stack mb="10px" direction="row">
                    <Radio value="eip191">eip191</Radio>
                    {/* <Radio isDisabled value="rsa">
                      rsa
                    </Radio> */}
                  </Stack>
                </RadioGroup>
                <FormLabel>Signature</FormLabel>
                <Textarea
                  border={ `1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}` }
                  placeholder="Input signature"
                  value={ signature }
                  onChange={ (e) => {
                    setUserProfile({
                      ...userProfile,
                      author: {
                        ...userProfile?.author,
                        avatar: {
                          ...userProfile?.author?.avatar,
                          chainTicker: chainTicker,
                          address: data?.tokenAddress,
                          id: data?.tokenId,
                          signature: {
                            ...userProfile?.author?.avatar?.signature,
                            signature: e.target.value,
                            type: type,
                            signedPropertyNames: Object.keys(data),
                          },
                        },
                      },
                    });
                    setSignature(e.target.value);
                  } }
                />
                <Text fontSize="10px" fontWeight="bold">
                  paste the signature hash gotten from{ ' ' }
                  <Box color={ linkColor } fontSize="12px" fontStyle="italic">
                    https://etherscan.io/verifiedSignatures
                    <ExternalLinkIcon mx="2px" /> after publishing
                  </Box>{ ' ' }
                  in the box above
                </Text>
              </FormControl>
            ) : (
              ''
            ) }
          </Flex>
        </ModalBody>

        <ModalFooter mt={ 3 }>
          <Button
            mr={ 3 }
            onClick={ () =>
              signature
                ? setTimeout(async () => {
                  if (signature) {
                    try {
                      const res = await setAccount(userProfile);
                      logger('account:update', res);
                      toast({
                        title: `changes saved`,
                        variant: 'left-accent',
                        status: 'success',
                        isClosable: true,
                      });
                      onClose();
                    } catch (error) {
                      logger('account:update', error, 'error');
                      toast({
                        title: `Account update`,
                        variant: 'left-update',
                        description: error?.toString(),
                        status: 'error',
                        isClosable: true,
                      });
                    }
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
            { !message ? 'Create message' : message && signature ? 'Save' : '' }
          </Button>
          <Button colorScheme="red" onClick={ onClose }>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAvatar;
