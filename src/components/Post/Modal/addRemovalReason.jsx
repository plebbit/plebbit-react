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
  Box,
  Textarea,
  Switch,
  FormControl,
  FormLabel,
  Flex,
  FormHelperText,
} from '@chakra-ui/react';

const AddRemovalReason = ({ onClose, isOpen, handleRemove, post }) => {
  const border1 = useColorModeValue('#edeff1', '#343536');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const [data, setData] = useState({
    pinned: post?.pinned || false,
    removed: post?.removed || false,
    locked: post?.locked || false,
    spoiler: post?.spoiler || false,
    reason: post?.reason || '',
  });

  return (
    <Modal trapFocus={false} onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Add Moderation options</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="16px"
          fontSize="14px"
          fontWeight="400"
          color={mainColor}
          lineHeight="21px"
        >
          <FormControl>
            <Flex flexFlow="row wrap" marginBottom="32px">
              <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                <Box>
                  <FormLabel
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="20px"
                    color={mainColor}
                    marginBottom="4px"
                    htmlFor="pinned"
                  >
                    Pinned
                  </FormLabel>
                </Box>
                <Box>
                  <FormHelperText
                    fontWeight="400"
                    color={metaColor}
                    fontSize="12px"
                    lineHeight="16px"
                  >
                    This means that this post will remain at the top of the subplebbit, even as new
                    posts are submitted.
                  </FormHelperText>
                </Box>
              </Flex>
              <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                <Switch
                  id="pinned"
                  checked={data?.pinned}
                  onChange={() => setData({ ...data, pinned: !data?.pinned })}
                />
              </Flex>
            </Flex>
            <Flex flexFlow="row wrap" marginBottom="32px">
              <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                <Box>
                  <FormLabel
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="20px"
                    color={mainColor}
                    marginBottom="4px"
                    htmlFor="removed"
                  >
                    Removed
                  </FormLabel>
                </Box>
                <Box>
                  <FormHelperText
                    fontWeight="400"
                    color={metaColor}
                    fontSize="12px"
                    lineHeight="16px"
                  >
                    The post will no longer visible to other users, but the person who posted it can
                    still see it in their own account.
                  </FormHelperText>
                </Box>
              </Flex>
              <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                <Switch
                  id="removed"
                  checked={data?.removed}
                  onChange={() => setData({ ...data, removed: !data?.removed })}
                />
              </Flex>
            </Flex>
            <Flex flexFlow="row wrap" marginBottom="32px">
              <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                <Box>
                  <FormLabel
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="20px"
                    color={mainColor}
                    marginBottom="4px"
                    htmlFor="locked"
                  >
                    Locked
                  </FormLabel>
                </Box>
                <Box>
                  <FormHelperText
                    fontWeight="400"
                    color={metaColor}
                    fontSize="12px"
                    lineHeight="16px"
                  >
                    Locking a post allows users to still see the content, but they cannot add any
                    new comments or replies to it.
                  </FormHelperText>
                </Box>
              </Flex>
              <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                <Switch
                  id="locked"
                  checked={data?.locked}
                  onChange={() => setData({ ...data, locked: !data?.locked })}
                />
              </Flex>
            </Flex>
            <Flex flexFlow="row wrap" marginBottom="32px">
              <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                <Box>
                  <FormLabel
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="20px"
                    color={mainColor}
                    marginBottom="4px"
                    htmlFor="spoiler"
                  >
                    Spoiler
                  </FormLabel>
                </Box>
                <Box>
                  <FormHelperText
                    fontWeight="400"
                    color={metaColor}
                    fontSize="12px"
                    lineHeight="16px"
                  >
                    this will mark this with a "spoiler" tag or warning to alert others of the
                    potential spoilers contained within. This gives people who haven't seen or read
                    the material a chance to avoid the post and enjoy the content for themselves
                    without any surprises being spoiled.
                  </FormHelperText>
                </Box>
              </Flex>
              <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                <Switch
                  id="spoiler"
                  checked={data?.spoiler}
                  onChange={() => setData({ ...data, spoiler: !data?.spoiler })}
                />
              </Flex>
            </Flex>
            <Box mb="16px">
              <FormLabel
                fontSize="18px"
                fontWeight="500"
                lineHeight="20px"
                color={mainColor}
                marginBottom="4px"
                htmlFor="spoiler"
              >
                Reason
              </FormLabel>
              <Textarea
                placeholder="Enter Reason"
                h="36px"
                padding="0 8px"
                border={`1px solid ${border1}`}
                borderColor={border1}
                fontSize="14px"
                onChange={(e) => setData({ ...data, reason: e.targe.value })}
                value={data?.reason}
                id="reason"
              />
              <FormHelperText fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                Help people become better posters by giving a short reason why their post was
                removed.
              </FormHelperText>
            </Box>
          </FormControl>
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
            onClick={() => handleRemove(data, onClose())}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRemovalReason;
