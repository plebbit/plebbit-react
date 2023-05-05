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
import Label from '../../Label';

const EditStatus = ({ onClose, isOpen, post }) => {
    const border1 = useColorModeValue('#edeff1', '#343536');
    const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
    const failed = post?.failedEdits
    const pending = post?.pendingEdits
    const success = post?.succeededEdits



    return (
        <Modal
            scrollBehavior="inside"
            trapFocus={ false }
            onClose={ onClose }
            size="sm"
            isOpen={ isOpen }
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> Edit Status</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    padding="16px"
                    fontSize="14px"
                    fontWeight="400"
                    color={ mainColor }
                    lineHeight="21px"
                >
                    <FormControl>
                        { Object?.keys(failed)?.map((val) =>
                            <Flex flexFlow="row wrap" marginBottom="32px">
                                <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                                    <Box>
                                        <FormLabel
                                            fontSize="18px"
                                            fontWeight="500"
                                            lineHeight="20px"
                                            color={ mainColor }
                                            marginBottom="4px"
                                            htmlFor="pinned"
                                        >
                                            { val }
                                        </FormLabel>
                                    </Box>

                                </Flex>
                                <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                                    <Label colorScheme="red" variant="outline" text="failed" />
                                </Flex>
                            </Flex>) }
                        { Object?.keys(pending)?.map((val) =>
                            <Flex flexFlow="row wrap" marginBottom="32px">
                                <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                                    <Box>
                                        <FormLabel
                                            fontSize="18px"
                                            fontWeight="500"
                                            lineHeight="20px"
                                            color={ mainColor }
                                            marginBottom="4px"
                                            htmlFor="pinned"
                                        >
                                            { val }
                                        </FormLabel>
                                    </Box>

                                </Flex>
                                <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                                    <Label colorScheme="orange" variant="outline" text="pending" />
                                </Flex>
                            </Flex>) }
                        { Object?.keys(success)?.map((val) =>
                            <Flex flexFlow="row wrap" marginBottom="32px">
                                <Flex flexDir="column" marginRight="8px" maxWidth="80%">
                                    <Box>
                                        <FormLabel
                                            fontSize="18px"
                                            fontWeight="500"
                                            lineHeight="20px"
                                            color={ mainColor }
                                            marginBottom="4px"
                                            htmlFor="pinned"
                                        >
                                            { val }
                                        </FormLabel>
                                    </Box>

                                </Flex>
                                <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                                    <Label colorScheme="green" variant="outline" text="success" />
                                </Flex>
                            </Flex>) }



                    </FormControl>
                </ModalBody>
                <ModalFooter bg={ border1 }>
                    <Button
                        borderRadius="999px"
                        mr="8px"
                        variant="outline"
                        colorScheme="red"
                        onClick={ onClose }
                        h="32px"
                    >
                        Close
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditStatus;
