import Label from '.'
import React from 'react'
import EditStatus from '../Post/Modal/editStatus'
import { useDisclosure } from '@chakra-ui/react'
import { useEditedComment } from '@plebbit/plebbit-react-hooks'

const EditLabel = (props) => {
    const { editLabel, post } = props
    const {
        onClose, onOpen, isOpen
    } = useDisclosure();
    const editedComment = useEditedComment({ comment: post })

    console.log({ editedComment })

    return (
        <>

            {
                editLabel ? (
                    <Label
                        onClick={ onOpen }

                        variant='outline' colorScheme={ editLabel?.color } text={ editLabel?.text } />

                ) : null
            }
            {

            }
            { isOpen && (
                <EditStatus

                    isOpen={ isOpen }
                    onClose={ onClose }
                    post={ editedComment }
                />
            ) }
        </>
    )
}

export default EditLabel