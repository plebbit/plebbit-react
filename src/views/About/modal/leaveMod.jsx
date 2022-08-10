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
  useToast,
} from '@chakra-ui/react';
import getChallengeAnswersFromUser from '../../../utils/getChallengeAnswersFromUser';
import { useAccountsActions } from '@plebbit/plebbit-react-hooks';

const LeaveMod = ({ onClose, isOpen, subPlebbit, profile }) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const { publishSubplebbitEdit } = useAccountsActions();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const data = subPlebbit;

  const onChallengeVerification = (challengeVerification, subplebbitEdit) => {
    // if the challengeVerification fails, a new challenge request will be sent automatically
    // to break the loop, the user must decline to send a challenge answer
    // if the subplebbit owner sends more than 1 challenge for the same challenge request, subsequents will be ignored
    toast({
      title: 'Accepted.',
      description: 'Action accepted',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setLoading(false);
    onClose();
    console.log('challenge verified', challengeVerification, subplebbitEdit);
  };

  const onChallenge = async (challenges, subplebbitEdit) => {
    let challengeAnswers = [];
    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      console.log(error);
      toast({
        title: 'Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (challengeAnswers) {
      await subplebbitEdit.publishChallengeAnswers(challengeAnswers);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await publishSubplebbitEdit(subPlebbit?.address, {
        roles: subPlebbit?.roles,
        onChallenge,
        onChallengeVerification,
      });
    } catch (error) {
      toast({
        title: 'Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await delete data?.roles[profile?.author?.address];
    await handleSaveChanges();
  };

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
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
            isLoading={loading}
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
