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
  Flex,
  useColorModeValue,
  Text,
  Input,
  useColorMode,
} from '@chakra-ui/react';

const AddBlockProvide = ({ isOpen, onClose, handleSave, loading }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const { colorMode } = useColorMode();

  const [data, setData] = useState({});

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Block Provider</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
            <Flex justifyContent="space-between">
              <Flex flexDir="column" marginRight="8px">
                <Text
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="20px"
                  color={mainColor}
                  marginBottom="4px"
                >
                  ChainTicker
                </Text>
                <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                  ChainTicker of the provider RPC
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems="flex-start"
              marginTop="12px"
              flexDir="column"
              flexGrow="1"
              justifyContent="flex-end"
            >
              <Input
                placeholder="BlockchainProvider Chain Ticker"
                backgroundColor={mainBg}
                color={mainColor}
                boxSizing="border-box"
                marginBottom="8px"
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                height="48px"
                borderRadius="4px"
                padding="12px 24px 4px 12px"
                width="100%"
                value={data?.chainTicker}
                onChange={(e) => setData({ ...data, chainTicker: e.target.value.toLowerCase() })}
                name="chainTicker"
                disabled={loading}
              />
            </Flex>
          </Flex>
          <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
            <Flex flexDir="column" marginRight="8px">
              <Text
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                color={mainColor}
                marginBottom="4px"
              >
                url
              </Text>
              <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                URL of the provider RPC
              </Text>
            </Flex>
            <Flex
              alignItems="flex-start"
              marginTop="12px"
              flexDir="column"
              flexGrow="1"
              justifyContent="flex-end"
            >
              <Input
                placeholder="BlockchainProvider Url"
                backgroundColor={mainBg}
                color={mainColor}
                boxSizing="border-box"
                marginBottom="8px"
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                height="48px"
                borderRadius="4px"
                padding="12px 24px 4px 12px"
                width="100%"
                value={data?.url}
                onChange={(e) => setData({ ...data, url: e.target.value })}
                name="url"
                disabled={loading}
              />
            </Flex>
          </Flex>
          <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
            <Flex flexDir="column" marginRight="8px">
              <Text
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                color={mainColor}
                marginBottom="4px"
              >
                chainId
              </Text>
              <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                ID of the EVM chain if any
              </Text>
            </Flex>
            <Flex
              alignItems="flex-start"
              marginTop="12px"
              flexDir="column"
              flexGrow="1"
              justifyContent="flex-end"
            >
              <Input
                placeholder="BlockchainProvider chainId"
                backgroundColor={mainBg}
                color={mainColor}
                boxSizing="border-box"
                marginBottom="8px"
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                height="48px"
                borderRadius="4px"
                padding="12px 24px 4px 12px"
                width="100%"
                type="number"
                value={data?.chainId}
                onChange={(e) => setData({ ...data, chainId: e.target.value })}
                name="chainId"
                disabled={loading}
              />
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter mt={3}>
          <Button isLoading={loading} onClick={() => handleSave(data)} mr="10px">
            save
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBlockProvide;
