import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  useColorModeValue,
  useDisclosure,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { AiOutlineInfoCircle, AiOutlineTag } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import FlairList from '../../../components/Flair';
import { ProfileContext } from '../../../store/profileContext';
import FlairSettings from './modal/flairSettings';

const PostFlair = ({ role, subPlebbit, handleSubPlebbitedit, loading }) => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const { device } = useContext(ProfileContext);
  const [showAdd, setShowAdd] = useState(false);
  const {
    isOpen: showSettings,
    onOpen: OpenSettings,
    onClose: closeSettings,
  } = useDisclosure(false);

  return (
    <Box>
      <Flex
        alignItems="center"
        background={border1}
        height="48px"
        justifyContent={device !== 'mobile' ? 'flex-end' : 'flex-start'}
        left={device !== 'mobile' ? '280px' : '0'}
        padding={device !== 'mobile' ? '0 24px' : '5px 24px'}
        position="fixed"
        right="0"
        zIndex="3"
      >
        <Button
          variant="outline"
          colorScheme="blackAlpha"
          mr="8px"
          position="relative"
          fontSize="14px"
          fontWeight="700"
          lineHeight="17px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width="max-content"
          borderRadius="999px"
          padding="4px 16px"
          height={device !== 'mobile' ? '32px' : '24px'}
          onClick={OpenSettings}
          mt={device === 'mobile' && '6px'}
          disabled={role !== ('owner' || 'moderators')}
          color={mainColor}
        >
          Post flair settings
        </Button>
        <Button
          colorScheme="blackAlpha"
          position="relative"
          fontSize="14px"
          fontWeight="700"
          lineHeight="17px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width="auto"
          borderRadius="999px"
          padding="4px 16px"
          height={device !== 'mobile' ? '32px' : '24px'}
          onClick={() => {}}
          mt={device === 'mobile' && '6px'}
          disabled={role !== ('owner' || 'moderators')}
          color={mainColor}
        >
          Reorder
        </Button>
        <Button
          variant="outline"
          colorScheme="blackAlpha"
          mr="8px"
          position="relative"
          fontSize="14px"
          fontWeight="700"
          lineHeight="17px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width="max-content"
          borderRadius="999px"
          padding="4px 16px"
          height={device !== 'mobile' ? '32px' : '24px'}
          onClick={() => setShowAdd(true)}
          mt={device === 'mobile' && '6px'}
          disabled={
            role !== ('owner' || 'moderators') || !subPlebbit?.features?.postFlairs || showAdd
          }
          color={mainColor}
        >
          Add Flair
        </Button>
      </Flex>

      <Box ml="24px" mr="24px" paddingTop="64px" borderRadius="0 0 4px 4px" overflow="hidden">
        {!subPlebbit?.features?.postFlairs && (
          <Alert mb="8px" status="warning" variant="left-accent">
            <AlertIcon />
            Post flairs will not be visible until feature is enabled
          </Alert>
        )}
        <Flex
          fontSize="18px"
          fontWeight="500"
          lineHeight="22px"
          color={mainColor}
          marginBottom="16px"
          alignItems="center"
        >
          <Box>Post flair management </Box>
          <Icon as={AiOutlineInfoCircle} ml="4px" verticalAlign="text-top" />
        </Flex>

        <Flex
          bg={border1}
          alignItems="center"
          borderRadius="4px 4px 0 0"
          boxSizing="border-box"
          justifyContent="space-between"
          padding="8px 16px"
        >
          <Flex alignItems="center">
            <Input
              placeholder="Search for a user"
              width="248px"
              bg={mainBg}
              border={`1px solid ${border1}`}
              color={mainColor}
              borderRadius="4px 0 0 4px"
              boxSizing="border-box"
              height="32px"
              padding="8px"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '21px',
              }}
            />
            <Button bg={iconColor} borderRadius="0 4px 4px 0" height="32px" width="40px">
              <Icon as={FiSearch} color={mainBg} />
            </Button>
          </Flex>
        </Flex>
        <Flex
          border={`1px solid ${border1}`}
          borderRadius="0 4px 4px 0"
          boxSizing="border-box"
          marginBottom="36px"
          overflow="hidden"
          flexDir="column"
        >
          <TableContainer>
            <Table>
              <Thead>
                <Tr
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="16px"
                  bg={inputBg}
                  borderBottom={`1px solid ${border1}`}
                  boxSizing="border-box"
                  color={iconColor}
                  height="48px"
                  padding="16px 42px 16px 24px"
                >
                  <Th>USER FLAIR PREVIEW</Th>
                  <Th>
                    <Flex alignItems="center" paddingRight="16px">
                      <Box
                        padding="4px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        SETTINGS
                      </Box>
                      <Icon as={AiOutlineInfoCircle} ml="4px" verticalAlign="text-top" />
                    </Flex>
                  </Th>
                  <Th>
                    <Flex alignItems="center">
                      <Box
                        padding="4px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        FLAIR ID
                      </Box>
                      <Icon as={AiOutlineInfoCircle} ml="4px" verticalAlign="text-top" />
                    </Flex>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {subPlebbit?.flairs?.post?.map((flair, index) => (
                  <FlairList
                    key={flair?.id || index}
                    mode="edit"
                    handleSubPlebbitedit={handleSubPlebbitedit}
                    type="post"
                    flairs={subPlebbit?.flairs}
                    data={flair}
                  />
                ))}
                {showAdd && (
                  <FlairList
                    mode="create"
                    setShowAdd={setShowAdd}
                    handleSubPlebbitedit={handleSubPlebbitedit}
                    type="post"
                    flairs={subPlebbit?.flairs}
                  />
                )}
              </Tbody>
            </Table>
            <Flex borderRadius="0 0 4px 4px" bg={border1} />
          </TableContainer>
          {!subPlebbit?.flairs?.post && (
            <Flex alignItems="center" bg={mainBg} flexDir="column" padding="90px 0">
              <Icon as={AiOutlineTag} width={8} height={8} color={iconColor} mb="16px" />
              <Box fontSize="18px" fontWeight="500" lineHeight="22px" mb="8px">
                You do not have any post flair
              </Box>
              <Box>Create post flair in your community today</Box>
            </Flex>
          )}
          <Flex padding="8px 16px" bg={border1} height="48px" />
        </Flex>
      </Box>
      {showSettings && (
        <FlairSettings
          isOpen={showSettings}
          onClose={closeSettings}
          title="Post flair settings"
          type="post"
          subPlebbit={subPlebbit}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
        />
      )}
    </Box>
  );
};

export default PostFlair;
