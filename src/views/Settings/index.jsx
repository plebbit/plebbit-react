import {
  Box,
  Text,
  useColorModeValue,
  useColorMode,
  Flex,
  Input,
  Textarea,
  Icon,
  Switch,
  useDisclosure,
  useToast,
  UnorderedList,
  ListItem,
  InputGroup,
  Button,
  Spinner,
} from '@chakra-ui/react';
import {
  deleteAccount,
  useAccount,
  useAuthorAvatar,
  useResolvedAuthorAddress,
} from '@plebbit/plebbit-react-hooks';
import { setAccount } from '@plebbit/plebbit-react-hooks/dist/stores/accounts/accounts-actions';
import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import AddAvatar from './modal/addAvatar';
import ExportAccount from './modal/exportAccount';
import logger from '../../utils/logger';
import AddBlockProvide from './modal/addBlockProvider';
import Swal from 'sweetalert2';
import Layout from '../../components/layout';
import { useLocation } from 'react-router-dom';
import { deleteCaches } from '@plebbit/plebbit-react-hooks';
import Image from '../../components/Image';
import Link from '../../components/Link';
import placeholder from '../../assets/images/fallback.png';
import onError from '../../utils/onError';

import useStore from '../../store/useStore';
const Settings = () => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const { colorMode } = useColorMode();
  const [bPLoading, setBpLoading] = useState(false);
  const location = useLocation();
  const view = location.pathname.split('/').at(-2);
  const profile = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const { isOpen: isBlockOpen, onOpen: onBlockOpen, onClose: onBlockClose } = useDisclosure();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { device } = useStore((state) => state);
  const [loader, setLoader] = useState(false);
  const tabs = [
    { label: 'Account', link: 'account' },
    { label: 'Profile', link: 'profile', optional: 'settings' },
    { label: 'Plebbit Options', link: 'plebbit-options' },
    { label: 'Safety & Privacy', link: 'plebbit-privacy' },
    { label: 'Feed Settings', link: 'feed' },
    { label: 'Notifications', link: 'notifications' },
    { label: 'Chat & Messaging', link: 'messaging' },
  ];
  const [userProfile, setUserProfile] = useState(profile);
  const toast = useToast();

  const { resolvedAddress: resolvedAuthorAddress, error } = useResolvedAuthorAddress({
    author: userProfile ? userProfile?.author?.address : '',
    cache: false,
  });
  logger('resolvedAddress', resolvedAuthorAddress, 'trace');

  useEffect(() => {
    setUserProfile({ ...profile });
  }, [profile]);

  if (error) {
    onError(error);
  }

  const handleConfirm = (warning, callback) => {
    Swal.fire({
      title: warning,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      icon: 'warning',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await callback();
      }
    });
  };

  const handleDelete = async (val) => {
    await delete userProfile?.plebbitOptions?.chainProviders[val];
    try {
      await setAccount(userProfile);
      toast({
        title: `changes saved`,
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `Account update`,
        variant: 'left-update',
        description: error?.toString(),
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleSaveChainProvider = async (data) => {
    try {
      setBpLoading(true);
      await setAccount({
        ...userProfile,
        plebbitOptions: {
          ...userProfile?.plebbitOptions,
          chainProviders: {
            ...userProfile?.plebbitOptions?.chainProviders,
            [data?.chainTicker]: {
              ...data,
            },
          },
        },
      });
      setBpLoading(false);
      onBlockClose();
      toast({
        title: `changes saved`,
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      setBpLoading(false);
      toast({
        title: `Account update`,
        variant: 'left-update',
        description: error?.toString(),
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleDeleteAccount = async () => {
    setLoader(true);
    try {
      await deleteAccount();
      toast({
        title: `Account deleted`,
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      });
      setTimeout(() => {
        setLoader(false);
      }, 500);
    } catch (error) {
      setLoader(false);
      toast({
        title: `Account not deleted`,
        variant: 'left-update',
        description: error?.toString(),
        status: 'error',
        isClosable: true,
      });
    }
  };
  const handleResetPlebbitOptions = async () => {
    setLoader(true);
    try {
      await setAccount({
        ...userProfile,
        plebbitOptions: window.defaultPlebbitOptions,
      });
      toast({
        title: `Account updated`,
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      });
      setTimeout(() => {
        setLoader(false);
      }, 500);
    } catch (error) {
      setLoader(false);
      toast({
        title: `Account not updated`,
        variant: 'left-update',
        description: error?.toString(),
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    try {
      await setAccount(userProfile);
      toast({
        title: `changes saved`,
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      logger('setting:update', error, 'error');
      toast({
        title: `Account update`,
        variant: 'left-update',
        description: error?.toString(),
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleClearDb = async () => {
    await deleteCaches();
    toast({
      title: `db-cleared`,
      variant: 'left-update',
      description: 'deleted',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Layout name={{ label: 'User Settings', value: location?.pathname }}>
      <Box
        paddingBottom="40px"
        marginLeft={device !== 'mobile' ? 'calc(100vw - 100%)' : ''}
        background={mainBg}
      >
        {loader && (
          <Flex
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
            zIndex="9999"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        )}
        {isOpen ? <AddAvatar isOpen={isOpen} onClose={onClose} /> : ''}
        {isExportOpen ? <ExportAccount isOpen={isExportOpen} onClose={onExportClose} /> : ''}
        {isBlockOpen ? (
          <AddBlockProvide
            isOpen={isBlockOpen}
            onClose={onBlockClose}
            handleSave={handleSaveChainProvider}
            loading={bPLoading}
          />
        ) : (
          ''
        )}
        <Box boxSizing="border-box" background={mainBg} position="relative">
          <Text
            maxW="1200px"
            fontSize="18px"
            fontWeight="500"
            lineHeight="22px"
            padding="16px 20px 20px"
            margin="0 auto"
            color={mainColor}
            fill="#fff"
          >
            User Settings
          </Text>
          <Flex
            maxW="1200px"
            background={mainBg}
            margin="0 auto"
            padding="0 20px"
            borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
            alignItems="center"
            color={metaColor}
            overflowX="scroll"
          >
            {tabs
              ? tabs.map((tab, index) => (
                  <Box
                    key={index}
                    fontSize="14px"
                    fontWeight="700"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    lineHeight="unset"
                    marginRight="8px"
                    padding="15px 12px 12px"
                    cursor="pointer"
                    borderBottom={
                      (tab?.optional === view || tab.link === view) &&
                      `3px solid ${colorMode === 'light' ? '#343456' : '#d7d7dc'}`
                    }
                    color={(tab?.optional === view || tab.link === view) && mainColor}
                    _hover={{
                      color: mainColor,
                    }}
                    as={Link}
                    to={`/settings/${tab?.link}/`}
                  >
                    {tab?.label}
                  </Box>
                ))
              : ''}
          </Flex>
        </Box>
        {view === 'account' && (
          <Flex maxW="1200px" margin="0 auto" padding="0 16px">
            <Box maxW="688px" flex="1 1 auto">
              <Flex justifyContent="space-between" alignItems="center" my="20px">
                <Text fontSize="20px" fontWeight="500" lineHeight="24px" padding="40px 0">
                  Account settings
                </Text>
                <Button
                  onClick={async () => {
                    await handleSave();
                  }}
                  colorScheme="gray"
                  mr="8px"
                  variant="outline"
                >
                  save
                </Button>
              </Flex>

              <Text
                fontSize="10px"
                fontWeight="700"
                letterSpacing="0.5px"
                marginBottom="32px"
                paddingBottom="6px"
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                color={metaColor}
              >
                ACCOUNT PREFERENCES
              </Text>
              <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
                <Flex flexDir="column" marginRight="8px">
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="20px"
                    color={mainColor}
                    marginBottom="4px"
                  >
                    Account name (optional)
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    Set an account name.
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
                    placeholder="Account name (optional)"
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
                    value={userProfile?.name}
                    maxLength={30}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        name: e.target.value,
                      })
                    }
                  />
                  <Text
                    fontWeight="400"
                    color={metaColor}
                    fontSize="12px"
                    lineHeight="16px"
                    paddingTop="5px"
                  >
                    {30 - +userProfile?.name?.length} Characters remaining
                  </Text>
                </Flex>
              </Flex>

              <Text
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                paddingBottom="6px"
                marginBottom="32px"
              >
                DELETE ACCOUNT
              </Text>
              <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="16.91px"
                  color="red"
                  cursor="pointer"
                  onClick={() =>
                    handleConfirm('Do you want to delete this Account?', handleDeleteAccount)
                  }
                >
                  <Icon as={RiDeleteBinLine} mr="5px" />
                  <Box>DELETE ACCOUNT</Box>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        )}
        {(view === 'profile' || view === 'settings') && (
          <Flex maxW="1200px" margin="0 auto" padding="0 16px">
            <Box maxW="688px" flex="1 1 auto">
              <Flex justifyContent="space-between" alignItems="center" my="40px">
                <Text fontSize="20px" fontWeight="500" lineHeight="24px">
                  Customize profile
                </Text>
                <Button onClick={handleSave} colorScheme="gray" mr="8px" variant="outline">
                  save
                </Button>
              </Flex>
              <Box marginBottom="25px">
                <Button onClick={onExportOpen}>Export Account</Button>
              </Box>
              <Text
                fontSize="10px"
                fontWeight="700"
                letterSpacing="0.5px"
                marginBottom="32px"
                paddingBottom="6px"
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                color={metaColor}
              >
                PROFILE INFORMATION
              </Text>
              <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
                <Flex flexDir="column" marginRight="8px">
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="20px"
                    color={mainColor}
                    marginBottom="4px"
                  >
                    Display name (optional)
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    Set a display name. This does not change your username.
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
                    placeholder="Display name (optional)"
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
                    value={userProfile?.author?.displayName || ''}
                    maxLength={30}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        author: {
                          ...userProfile?.author,
                          displayName: e.target.value,
                        },
                      })
                    }
                  />
                  <Text
                    fontWeight="400"
                    color={metaColor}
                    fontSize="12px"
                    lineHeight="16px"
                    paddingTop="5px"
                  >
                    {30 - (+userProfile?.author?.displayName?.length || 0)} Characters remaining
                  </Text>
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
                    Address
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    Set an Address for your profile.
                  </Text>
                </Flex>
                <Flex
                  alignItems="flex-start"
                  marginTop="12px"
                  flexDir="column"
                  flexGrow="1"
                  justifyContent="flex-end"
                >
                  <InputGroup>
                    <Input
                      placeholder="Input public key (optional)"
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
                      value={userProfile?.author?.address || ''}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          author: {
                            ...userProfile?.author,
                            address: e.target.value,
                          },
                        })
                      }
                    />
                  </InputGroup>

                  {resolvedAuthorAddress !== userProfile?.signer?.address ? (
                    <Text
                      fontWeight="400"
                      color="red"
                      fontSize="12px"
                      lineHeight="16px"
                      paddingTop="5px"
                    >
                      {userProfile?.author?.address} has not been acquired by you yet !!!
                    </Text>
                  ) : (
                    <Text
                      fontWeight="400"
                      color="green"
                      fontSize="12px"
                      lineHeight="16px"
                      paddingTop="5px"
                    >
                      your ens is set correctly
                    </Text>
                  )}
                  <UnorderedList mt={3}>
                    <ListItem fontSize={12}>
                      Go to{' '}
                      <Link
                        color={linkColor}
                        href={`https://app.ens.domains/name/${userProfile?.author?.address}`}
                        isExternal
                      >
                        {' '}
                        https://app.ens.domains/name/
                        {userProfile?.author?.address}{' '}
                      </Link>
                    </ListItem>
                    <ListItem fontSize={12}>Click ADD/EDIT RECORD</ListItem>
                    <ListItem fontSize={12}>
                      Select "text", write in "key": "plebbit-author-address", write in next field:{' '}
                      <b>{userProfile?.signer?.address}</b>
                    </ListItem>
                  </UnorderedList>
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
                    About (optional)
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    A brief description of yourself shown on your profile.
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
                    placeholder="About (optional)"
                    backgroundColor={mainBg}
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
                    value={userProfile?.author?.about || ''}
                    maxLength={200}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        author: {
                          ...userProfile?.author,
                          about: e.target.value,
                        },
                      })
                    }
                  />
                  <Flex width="100%">
                    <Text
                      fontWeight="400"
                      color={metaColor}
                      fontSize="12px"
                      lineHeight="16px"
                      paddingTop="5px"
                    >
                      {200 - (+userProfile?.author?.about?.length || 0)} Characters remaining
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Text
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                paddingBottom="6px"
                marginBottom="32px"
              >
                Images
              </Text>
              <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
                <Flex flexDir="column" marginRight="8px">
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="20px"
                    color={mainColor}
                    marginBottom="4px"
                  >
                    Avatar image
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    nft
                  </Text>
                </Flex>
                <Flex
                  alignItems="flex-start"
                  marginTop="12px"
                  flexDirection="column"
                  flexGrow="1"
                  justifyContent="flex-end"
                >
                  <Flex height="150px" width="100%">
                    <Box
                      borderRadius="8px"
                      overflow="hidden"
                      height="100%"
                      margin="0 12px 0 0"
                      position="relative"
                      width="150px"
                      cursor="pointer"
                      onClick={onOpen}
                    >
                      <Box
                        backgroundColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                        width="100%"
                        height="100%"
                        borderRadius="50%"
                      />
                      <Image
                        position="absolute"
                        top="0"
                        transformOrigin="bottom center"
                        clipPath="polygon(0 68.22%,12.12% 68.22%,12.85% 71.49%,13.86% 74.69%,15.14% 77.79%,16.69% 80.77%,18.49% 83.6%,20.54% 86.26%,22.8% 88.73%,25.28% 91%,27.94% 93.04%,30.77% 94.85%,33.75% 96.4%,36.85% 97.68%,40.05% 98.69%,43.32% 99.42%,46.65% 99.85%,50% 100%,53.35% 99.85%,56.68% 99.42%,59.95% 98.69%,63.15% 97.68%,66.25% 96.4%,69.23% 94.85%,72.06% 93.04%,74.72% 91%,77.2% 88.73%,79.46% 86.26%,81.51% 83.6%,83.31% 80.77%,84.86% 77.79%,86.14% 74.69%,87.15% 71.49%,87.88% 68.22%,100% 68.22%,100% 0,0 0)"
                        src={authorAvatarImageUrl || placeholder}
                        onClick={onOpen}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
              <Text
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                paddingBottom="6px"
                marginBottom="32px"
              >
                PROFILE CATEGORY
              </Text>
              <Flex flexFlow="row wrap" marginBottom="32px">
                <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                  <Box>
                    <Text
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="20px"
                      color={mainColor}
                      marginBottom="4px"
                    >
                      NSFW
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                      This content is NSFW (may contain nudity, pornography, profanity or
                      inappropriate content for those under 18)
                    </Text>
                  </Box>
                </Flex>
                <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                  <Switch />
                </Flex>
              </Flex>
              <Text
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                paddingBottom="6px"
                marginBottom="32px"
              >
                ADVANCED
              </Text>
              <Flex flexFlow="row wrap" marginBottom="32px">
                <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                  <Box>
                    <Text
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="20px"
                      color={mainColor}
                      marginBottom="4px"
                    >
                      Allow people to follow you
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                      Followers will be notified about posts you make to your profile and see them
                      in their home feed.
                    </Text>
                  </Box>
                </Flex>
                <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                  <Switch />
                </Flex>
              </Flex>
              <Flex flexFlow="row wrap" marginBottom="32px">
                <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                  <Box>
                    <Text
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="20px"
                      color={mainColor}
                      marginBottom="4px"
                    >
                      Content visibility
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                      Posts to this profile can appear in p/all and your profile can be discovered
                      in /users
                    </Text>
                  </Box>
                </Flex>
                <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                  <Switch />
                </Flex>
              </Flex>
              <Flex flexFlow="row wrap" marginBottom="32px">
                <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                  <Box>
                    <Text
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="20px"
                      color={mainColor}
                      marginBottom="4px"
                    >
                      Active in communities visibility
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                      Show which communities I am active in on my profile.
                    </Text>
                  </Box>
                </Flex>
                <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                  <Switch />
                </Flex>
              </Flex>
              <Text
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                paddingBottom="6px"
                marginBottom="32px"
              >
                PROFILE MODERATION
              </Text>
              <Box>
                For moderation tools please visit our <br />
                <Box color={linkColor}>Profile Moderation page</Box>
              </Box>
            </Box>
          </Flex>
        )}
        {view === 'plebbit-options' && (
          <Flex maxW="1200px" margin="0 auto" padding="0 16px">
            <Box maxW="688px" flex="1 1 auto">
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="20px" fontWeight="500" lineHeight="24px" padding="40px 0">
                  Customize plebbit Options
                </Text>
                <Flex>
                  <Button
                    onClick={async () => {
                      await handleSave();
                      window.location.reload();
                    }}
                    colorScheme="gray"
                    mr="8px"
                    variant="outline"
                  >
                    save
                  </Button>
                  <Button
                    onClick={() =>
                      handleConfirm(
                        'Do you want to reset Plebbit Options?',
                        handleResetPlebbitOptions
                      )
                    }
                    variant="outline"
                    colorScheme="red"
                  >
                    reset
                  </Button>
                </Flex>
              </Flex>
              <Text
                fontSize="10px"
                fontWeight="700"
                letterSpacing="0.5px"
                marginBottom="32px"
                paddingBottom="6px"
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                color={metaColor}
              >
                PLEBBIT OPTIONS
              </Text>
              <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
                <Flex flexDir="column" marginRight="8px">
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="20px"
                    color={mainColor}
                    marginBottom="4px"
                  >
                    IPFS Gateway URLs (optional)
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    Optional URLs of an IPFS gateways
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
                    placeholder="IPFS Gateway URLs"
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
                    resize="both"
                    value={userProfile?.plebbitOptions?.ipfsGatewayUrls?.join('\r\n')}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        plebbitOptions: {
                          ...userProfile?.plebbitOptions,
                          ipfsGatewayUrls: e.target.value.split(/\r?\n/),
                        },
                      })
                    }
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
                    IPFS Http Clients Options (optional)
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    Optional URLs of an IPFS API or IPFS Http Clients Options,{' '}
                    <strong
                      style={{
                        color: 'blue',
                      }}
                    >
                      http://localhost:5001
                    </strong>{' '}
                    to use a local IPFS node
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
                    placeholder="IPFS Http Clients Options (optional)"
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
                    resize="both"
                    value={userProfile?.plebbitOptions?.ipfsHttpClientsOptions?.join('\r\n')}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        plebbitOptions: {
                          ...userProfile?.plebbitOptions,
                          ipfsHttpClientsOptions: e.target.value.split(/\r?\n/),
                        },
                      })
                    }
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
                    Pubsub Http Clients Options (optional)
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    Optional URLs or Ipfs Http Clients Options used for pubsub publishing when IPFS
                    Http Clients Options isn't available, like in the browser
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
                    placeholder="Pub Sub Http Clients Options (optional)"
                    backgroundColor={mainBg}
                    color={mainColor}
                    boxSizing="border-box"
                    marginBottom="8px"
                    border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                    borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                    height="48px"
                    borderRadius="4px"
                    padding="12px 24px 4px 12px"
                    resize="both"
                    width="100%"
                    value={userProfile?.plebbitOptions?.pubsubHttpClientsOptions?.join('\r\n')}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        plebbitOptions: {
                          ...userProfile?.plebbitOptions,
                          pubsubHttpClientsOptions: e.target.value.split(/\r?\n/),
                        },
                      })
                    }
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
                    Data Path (optional)
                  </Text>
                  <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                    (Node only) Optional folder path to create/resume the user and subplebbit
                    databases
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
                    placeholder=" dataPath (optional)"
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
                    value={userProfile?.plebbitOptions?.dataPath}
                  />
                </Flex>
              </Flex>
              <Text
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                paddingBottom="6px"
                marginBottom="32px"
              >
                CLEAR CACHE
              </Text>
              <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="16.91px"
                  color="red"
                  cursor="pointer"
                  onClick={() => handleConfirm('Do you want to Clear Cache?', handleClearDb)}
                >
                  <Icon as={RiDeleteBinLine} mr="5px" />
                  <Box>CLEAR CACHE</Box>
                </Flex>
              </Flex>
              <Flex
                justifyContent="space-between"
                borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                alignItems="center"
              >
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  lineHeight="12px"
                  paddingBottom="6px"
                  marginBottom="32px"
                >
                  Chain Providers
                </Text>
                <Button
                  fontSize="10px"
                  fontWeight="700"
                  lineHeight="12px"
                  paddingBottom="6px"
                  marginBottom="32px"
                  padding="8px"
                  borderRadius="3px"
                  onClick={onBlockOpen}
                >
                  add custom
                </Button>
              </Flex>
              {Object?.keys(userProfile?.plebbitOptions?.chainProviders || {})?.map((val) => (
                <Box key={val}>
                  <Flex flexDir="column" flexFlow="row-wrap" mt="10px" marginBottom="10px">
                    <Flex justifyContent="space-between">
                      <Flex flexDir="column" marginRight="8px">
                        {/* name Title*/}
                        <Text
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="20px"
                          color={mainColor}
                          marginBottom="4px"
                        >
                          {val}
                        </Text>
                        <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                          ChainTicker of the provider RPC
                        </Text>
                      </Flex>
                      <Button
                        backgroundColor="red"
                        onClick={() =>
                          handleConfirm(
                            'Do you want to delete this Block Provider?',
                            handleDelete(val)
                          )
                        }
                      >
                        X
                      </Button>
                    </Flex>
                    <Flex
                      alignItems="flex-start"
                      marginTop="12px"
                      flexDir="column"
                      flexGrow="1"
                      justifyContent="flex-end"
                    >
                      {/* name Input*/}

                      <Input
                        placeholder="ChainProvider Chain Ticker"
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
                        value={val}
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
                        URLs
                      </Text>
                      <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                        URLs of the provider RPC
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
                        placeholder="ChainProvider URLs"
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
                        resize="both"
                        value={userProfile?.plebbitOptions?.chainProviders[val]?.urls?.join('\r\n')}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            plebbitOptions: {
                              ...userProfile?.plebbitOptions,
                              chainProviders: {
                                ...userProfile?.plebbitOptions?.chainProviders,
                                [val]: {
                                  ...userProfile?.plebbitOptions?.chainProviders[val],
                                  urls: e.target.value.split(/\r?\n/),
                                },
                              },
                            },
                          })
                        }
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
                        placeholder="ChainProvider chainId"
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
                        value={userProfile?.plebbitOptions?.chainProviders[val]?.chainId}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            plebbitOptions: {
                              ...userProfile?.plebbitOptions,
                              chainProviders: {
                                ...userProfile?.plebbitOptions?.chainProviders,
                                [val]: {
                                  ...userProfile?.plebbitOptions?.chainProviders[val],
                                  chainId: e.target.value,
                                },
                              },
                            },
                          })
                        }
                      />
                    </Flex>
                  </Flex>
                  <hr
                    style={{
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Flex>
        )}
      </Box>
    </Layout>
  );
};

export default Settings;
