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
} from '@chakra-ui/react';
import useCommentEdit from '../../../hooks/useCommentEdit';

const ConfirmDelete = ({ onClose, isOpen, post, title, message, cancelText, confirmText }) => {
    const border1 = useColorModeValue('#edeff1', '#343536');
    const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
    const data = {
        deleted: true
    }

    const { commentEdit } = useCommentEdit((data), post);


    const handleEditComment = async () => {
        await commentEdit(() => onClose());
    };




    return (
        <Modal
            scrollBehavior="inside"
            trapFocus={ false }
            onClose={ onClose }
            size='md'
            isOpen={ isOpen }
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="16px" fontWeight="500" lineHeight='20px'> { title || 'Delete Post?' }</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    padding="16px"
                    fontSize="14px"
                    fontWeight="400"
                    color={ mainColor }
                    lineHeight="21px"
                >
                    <Box>
                        { message || `Are you sure you want to delete your post? You can't undo this.` }                    </Box>

                </ModalBody>
                <ModalFooter bg={ border1 }>
                    <Button
                        borderRadius="999px"
                        mr="8px"
                        variant="outline"
                        colorScheme="blue"
                        onClick={ onClose }
                        h="32px"
                        fontSize="14px"
                        fontWeight='700'
                    >
                        { cancelText || 'Cancel' }
                    </Button>
                    <Button
                        borderRadius="999px"
                        mr="8px"
                        variant='solid'
                        colorScheme="blue"
                        onClick={ handleEditComment }
                        h="32px"
                        fontSize="14px"
                    >
                        { confirmText || 'Delete' }
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmDelete;
