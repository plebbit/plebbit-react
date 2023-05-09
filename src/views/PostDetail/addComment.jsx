import { Box } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { LockedMessage } from '../../components/Card/ModMessage'
import getUserName from '../../utils/getUserName'
import { ProfileContext } from '../../store/profileContext'
import Editor from '../../components/Editor'
import { EditorState } from 'draft-js'
import usePublishComment from '../../hooks/usePublishComment'

const AddComment = ({ detail, subplebbit, showFullComments, setShowFullComments, isReply }) => {
    const {
        profile,
    } = useContext(ProfileContext);
    const [content, setContent] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const publishComment = usePublishComment(content, detail)


    const handlePublishPost = async () => {

        await publishComment(() => {
            setContent('');
            setEditorState(EditorState.createEmpty());
        }, () => {

        });


    };

    return (
        <Box padding="24px 40px">
            { detail?.locked ? (
                <LockedMessage subplebbit={ subplebbit } />
            ) : (
                <>
                    <Box fontSize="12px" fontWeight="400" lineHeight="18px" mb="4px">
                        Comment as { getUserName(profile?.author) }
                    </Box>
                    <Box
                        borderRadius="4px"
                        overflow="hidden auto"
                        padding="8px 0px"
                        resize="vertical"
                        minH="200px"
                    >
                        <Editor
                            setValue={ setContent }
                            editorState={ editorState }
                            setEditorState={ setEditorState }
                            showSubmit
                            handleSubmit={ handlePublishPost }
                        />
                    </Box>
                </>
            ) }

            <Box
                fontSize="12px"
                fontWeight="700"
                lineHeight="16px"
                marginTop="16px"
                marginBottom="4px "
            >
                Sort By: Best
            </Box>
            <hr />
            { isReply ? (
                <Box
                    fontSize="12px"
                    fontWeight="700"
                    my="8px"
                    _hover={ {
                        textDecoration: 'underline',
                    } }
                    onClick={ () => setShowFullComments(!showFullComments) }
                >
                    View all comments
                </Box>
            ) : null }
        </Box>
    )
}

export default AddComment