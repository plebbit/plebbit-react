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
    Flex,
    Input,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import Image from '../Image';

const GetChallengesModal = ({ handleSubmit, post, challenges, isOpen, onClose }) => {

    const [data, setData] = useState({})
    const border1 = useColorModeValue('#edeff1', '#343536');
    const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');

    const [step, setStep] = useState(1)
    const noOfChallenges = challenges.length


    // const isVote = (post.vote !== undefined) && post.cid
    const isVote = post?.constructor.name === "Vote"
    const isReply = post?.parentCid && !post.cid
    const isPost = !post?.parentCid && !post?.cid
    const isCommentEdit = post?.cid && post?.vote === undefined


    const handleClose = () => {
        onClose()
        setData({});
    }






    return (
        <Modal
            scrollBehavior="inside"
            trapFocus={ false }
            onClose={ handleClose }
            size='md'
            isOpen={ isOpen }
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader width="90%" fontSize="16px" fontWeight="500" lineHeight='20px'> Challenge for { isVote ? 'Vote' : isReply ? 'Reply' : isPost ? "Comment" : isCommentEdit ? 'Comment Edit' : '' } { ` ` }{ post?.title || post?.shortCid || post?.parentCid || post?.commentCid } </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    padding="16px"
                    fontSize="14px"
                    fontWeight="400"
                    color={ mainColor }
                    lineHeight="21px"
                >

                    {
                        challenges?.map((challenge, index) => index + 1 === step && <ModalItem item={ challenge } step={ step } data={ data } setData={ setData } />)
                    }

                </ModalBody>
                <ModalFooter bg={ border1 }>
                    { step === noOfChallenges ? <Flex w='100%' alignItems='center' justifyContent='space-between'>
                        <Box>
                            <Text fontSize='14px' lineHeight='16px' fontWeight='500'>Challenge { step } of { noOfChallenges }</Text>
                        </Box>
                        <Box>
                            <Button
                                borderRadius="999px"
                                mr="8px"
                                variant="outline"
                                colorScheme="blue"
                                onClick={ () => step === 1 ? handleClose() : setStep((previous) => previous - 1) }
                                h="32px"
                                fontSize="14px"
                                fontWeight='700'


                            >
                                { step === 1 ? "Cancel" : 'Previous' }
                            </Button>
                            <Button
                                borderRadius="999px"
                                mr="8px"
                                variant='solid'
                                colorScheme="blue"
                                onClick={ () => handleSubmit(data) }
                                h="32px"
                                fontSize="14px"
                                disabled={ Object.values(data)?.length !== noOfChallenges }

                            >
                                Submit
                            </Button>
                        </Box>
                    </Flex> : <Flex w='100%' alignItems='center' justifyContent='space-between'>
                        <Box>
                            <Text fontSize='14px' lineHeight='16px' fontWeight='500'>Challenge { step } of { noOfChallenges }</Text>
                        </Box>
                        <Box>
                            <Button
                                borderRadius="999px"
                                mr="8px"
                                variant="outline"
                                colorScheme="blue"
                                onClick={ () => step === 1 ? handleClose() : setStep((previous) => previous - 1) }
                                h="32px"
                                fontSize="14px"
                                fontWeight='700'

                            >
                                { step === 1 ? 'Cancel' : 'Previous' }
                            </Button>
                            <Button
                                borderRadius="999px"
                                mr="8px"
                                variant='solid'
                                colorScheme="blue"
                                onClick={ () => setStep((previous) => previous + 1) }
                                h="32px"
                                fontSize="14px"
                            >
                                Next
                            </Button>
                        </Box>
                    </Flex> }

                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GetChallengesModal;


const ModalItem = ({ item, step, data, setData }) => {
    const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
    const navBorder = useColorModeValue('#edeff1', '#343536');
    return (
        <Box>

            { item?.type === 'text/plain' ? <Flex justifyContent='center' alignItems='center' fontSize='30px' fontWeight='700' maxHeight='150px'>
                { item?.challenge }
            </Flex> : item?.type === 'image/png' ? <Flex justifyContent='center' alignItems='center' fontSize='30px' fontWeight='700' maxHeight='150px'>
                <Image width='100%' height='100%' src={ `data:image/png;base64,  ${item?.challenge}` } />
            </Flex> : '' }
            <Input
                mt='10px'
                bg={ inputBg }
                borderWidth="1px"
                borderColor={ navBorder }
                placeholder='Complete the challenge above'
                onChange={ (e) => setData({ ...data, [step]: e.target.value }) }
                value={ data[step] }
            />


        </Box>
    )
}
