import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useCreateSubplebbit } from '@plebbit/plebbit-react-hooks';
import React, { useEffect, useState } from 'react';
import logger from '../../../../utils/logger';
import { useHistory } from 'react-router-dom';

const CreateSubPlebbit = ({ isOpen, onClose }) => {
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const [value, setValue] = useState({ title: '', type: 'public' });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const toast = useToast();



  const { createdSubplebbit, createSubplebbit, error, errors } = useCreateSubplebbit({ value })

  console.log({ createdSubplebbit, error, errors })


  useEffect(() => {
    if (createdSubplebbit?.address) {
      history.push(`/p/${createdSubplebbit?.address}`, []);
      logger('created-sub', createdSubplebbit);
      setLoading(false);
      onClose();
    }
  }, [createdSubplebbit?.address])

  if (error) {
    logger('create-sub', error, 'error');
    setLoading(false);
    toast({
      title: 'Create Subplebbit.',
      description: error?.stack.toString(),
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }


  const handleCreateSubPlebbit = async () => {
    setLoading(true);
    await createSubplebbit();

  };

  return (
    <Modal
      trapFocus={ false }
      scrollBehavior="inside"
      isOpen={ isOpen }
      onClose={ onClose }
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          borderBottomColor={ navBorder }
          borderBottomStyle="solid"
          borderBottomWidth="1px"
        >
          Create a community
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" mb="30px">
            <Box mb="4px" fontSize="16px" fontWeight="500" lineHeight="20px">
              Title
            </Box>
            <InputGroup mt="12px" mb="8px">
              <Input
                disabled={ loading }
                value={ value?.title }
                onChange={ (e) => setValue({ ...value, title: e.target.value }) }
                placeholder="input subplebbit title"
              />
            </InputGroup>
            <Box fontSize="12px" lineHeight="16px">
              21 Characters remaining
            </Box>
          </Flex>

          <Flex flexDirection="column">
            <Box fontSize="16px" fontWeight="500" lineHeight="20px" mb="4px">
              Community type
            </Box>
            <Flex flexDirection="column" mt="12px" alignItems="flex-start">
              <RadioGroup onChange={ (x) => setValue({ ...value, type: x }) } value={ value?.type }>
                <Stack direction="column">
                  <Radio value="public" colorScheme="gray" color="gray">
                    <Flex alignItems="center">
                      <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                        Public
                      </Box>
                      <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                        Anyone can view, post, and comment to this community
                      </Box>
                    </Flex>
                  </Radio>
                  <Radio value="private" colorScheme="gray" color="gray">
                    <Flex alignItems="center">
                      <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                        Private
                      </Box>
                      <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                        Only approved users can view and submit to this community
                      </Box>
                    </Flex>
                  </Radio>
                  <Radio value="restricted" colorScheme="gray" color="gray">
                    <Flex alignItems="center">
                      <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                        Restricted
                      </Box>
                      <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                        Anyone can view this community, but only approved users can post
                      </Box>
                    </Flex>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter
          sx={ {
            bg: navBorder,
          } }
        >
          <Button
            variant="outline"
            colorScheme="blue"
            ml={ 8 }
            mr={ 3 }
            onClick={ onClose }
            borderRadius="999px"
            padding="4px 16px"
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            borderRadius="999px"
            padding="4px 16px"
            onClick={ handleCreateSubPlebbit }
            isLoading={ loading }
          >
            Create a community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateSubPlebbit;
