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
  Input,
  Box,
  Checkbox,
  Text,
  useToast,
} from '@chakra-ui/react';
import getChallengeAnswersFromUser from '../../../utils/getChallengeAnswersFromUser';
import { useAccountsActions } from '@plebbit/plebbit-react-hooks';

const ModRole = ({ onClose, isOpen, subPlebbit }) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const { publishSubplebbitEdit } = useAccountsActions();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [data, setData] = useState({ ...subPlebbit });

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
        description: 'Action Declined',
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

    await publishSubplebbitEdit(subPlebbit?.address, {
      roles: data?.roles,
      onChallenge,
      onChallengeVerification,
    });
  };

  console.log(subPlebbit);

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={`1px solid ${border1}`}>Add Moderator</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="16px"
          fontSize="14px"
          fontWeight="400"
          color={mainColor}
          lineHeight="21px"
        >
          <Box mb="16px">
            <Input
              placeholder="Enter Username"
              h="36px"
              padding="0 8px"
              border={`1px solid ${border1}`}
              borderColor={border1}
              fontSize="14px"
              onChange={(e) =>
                setData({
                  ...data,
                  roles: { ...data?.roles, [e.target.value]: { role: 'moderator' } },
                })
              }
            />
          </Box>
          <Box fontSize="16px" fontWeight="500" lineHeight="20px" color={mainColor}>
            Give them access to...
          </Box>
          <Box mt="16px">
            <Checkbox disabled borderColor="gray.300" colorScheme="gray" defaultChecked>
              <Text color={mainColor} fontSize="12px" fontWeight="700" lineHeight="16px">
                Everything
              </Text>
            </Checkbox>
            <Box
              margin="2px 0 0 24px"
              color={metaColor}
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
            >
              Full access including the ability to manage moderator access and permissions.
            </Box>
            <hr
              style={{
                margin: '16px 0 0',
              }}
            />
          </Box>
          <Box mt="16px">
            <Checkbox disabled borderColor="gray.300" colorScheme="gray" defaultChecked>
              <Text color={mainColor} fontSize="12px" fontWeight="700" lineHeight="16px">
                Manage Users
              </Text>
            </Checkbox>
            <Box
              margin="2px 0 0 24px"
              color={metaColor}
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
            >
              Access mod notes, ban and mute users, and approve submitters*.
            </Box>
          </Box>
          <Box mt="16px">
            <Checkbox disabled borderColor="gray.300" colorScheme="gray" defaultChecked>
              <Text color={mainColor} fontSize="12px" fontWeight="700" lineHeight="16px">
                Manage Settings
              </Text>
            </Checkbox>
            <Box
              margin="2px 0 0 24px"
              color={metaColor}
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
            >
              Manage community settings, appearance, emojis, rules, and AutoMod*.
            </Box>
          </Box>
          <Box mt="16px">
            <Checkbox disabled borderColor="gray.300" colorScheme="gray" defaultChecked>
              <Text color={mainColor} fontSize="12px" fontWeight="700" lineHeight="16px">
                Manage Mod Mail
              </Text>
            </Checkbox>
            <Box
              margin="2px 0 0 24px"
              color={metaColor}
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
            >
              Read and respond to modmail and mute users*.
            </Box>
          </Box>
          <Box mt="16px">
            <Checkbox disabled borderColor="gray.300" colorScheme="gray" defaultChecked>
              <Text color={mainColor} fontSize="12px" fontWeight="700" lineHeight="16px">
                Manage Flair
              </Text>
            </Checkbox>
            <Box
              margin="2px 0 0 24px"
              color={metaColor}
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
            >
              Create and manage user and post flair.{' '}
            </Box>
          </Box>
          <Box mt="16px">
            <Checkbox disabled borderColor="gray.300" colorScheme="gray" defaultChecked>
              <Text color={mainColor} fontSize="12px" fontWeight="700" lineHeight="16px">
                Manage Posts & Comments
              </Text>
            </Checkbox>
            <Box
              margin="2px 0 0 24px"
              color={metaColor}
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
            >
              Access queues, take action on content, and manage collections and events.
            </Box>
          </Box>
          <Box mt="16px">
            <Checkbox disabled borderColor="gray.300" colorScheme="gray" defaultChecked>
              <Text color={mainColor} fontSize="12px" fontWeight="700" lineHeight="16px">
                Manage Wiki Pages
              </Text>
            </Checkbox>
            <Box
              margin="2px 0 0 24px"
              color={metaColor}
              fontSize="12px"
              fontWeight="400"
              lineHeight="16px"
            >
              Create and manage wiki pages and AutoMod*.
            </Box>
          </Box>
          <Box margin="16px 0" color={metaColor} fontSize="12px" fontWeight="400" lineHeight="16px">
            *Note: To manage AutoMod, mods must have access to Wiki Pages and Manage Settings. To
            mute users, mods must have access to Mod Mail and Manage Users.
          </Box>
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
            h="32px"
            borderRadius="999px"
            colorScheme="blackAlpha"
            onClick={handleSaveChanges}
            isLoading={loading}
          >
            Invite
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModRole;
