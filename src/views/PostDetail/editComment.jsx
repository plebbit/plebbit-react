import React, { useState, useContext } from 'react'
import { ProfileContext } from '../../store/profileContext';
import {
    Box,
    Flex,
    useColorModeValue,
    Icon,
    Button,
    Textarea,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import {
    MdStickyNote2,
} from 'react-icons/md';
import Editor from '../../components/Editor';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import useCommentEdit from '../../hooks/useCommentEdit';

const EditComment = ({ detail, setEdit }) => {
    const {
        device,
    } = useContext(ProfileContext);
    const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
    const [editMode, setEditMode] = useState(detail?.content ? 'post' : 'link');
    const [editPost, setEditPost] = useState(editMode === 'post' ? detail?.content : detail?.link);
    const data = {
        link: editMode === 'link' ? editPost : undefined,
        content: editMode === 'post' ? editPost : undefined,
    }
    const [postEditorState, setPostEditorState] = useState(
        EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML(`<p>${editPost}</p>`))
        )
    );

    const { commentEdit } = useCommentEdit((data), detail);


    const handleEditComment = async () => {
        await commentEdit(() => setEdit(false));
    };


    return (
        <>
            { device !== 'mobile' ?
                <Box marginTop="8px" padding="10px">
                    <Flex alignItems="stretch">
                        <Flex
                            color={ color }
                            fontSize="14px"
                            fontWeight="700"
                            lineHeight="18px"
                            cursor="pointer"
                            outline="none"
                            zIndex="1"
                            width="25%"
                            position="relative"
                            textAlign="center"
                            borderColor="#a4a4a4"
                            borderStyle="solid"
                            borderWidth="0 1px 1px 0"
                            borderRadius="0"
                            justifyContent="center"
                            alignItems="center"
                            whiteSpace="nowrap"
                            padding="15px 17px"
                            borderBottom={ editMode === 'post' && '3px solid #a4a4a4' }
                            onClick={ () => {
                                setEditMode('post');
                            } }
                        >
                            <Icon
                                as={ MdStickyNote2 }
                                fontSize="20px"
                                fontWeight="400"
                                height="20px"
                                lineHeight="20px"
                                verticalAlign="middle"
                                width="20px"
                                marginRight="8px"
                            />
                            Post
                        </Flex>
                        <Flex
                            color={ color }
                            fontSize="14px"
                            fontWeight="700"
                            lineHeight="18px"
                            cursor="pointer"
                            outline="none"
                            zIndex="1"
                            width="25%"
                            position="relative"
                            textAlign="center"
                            borderColor="#a4a4a4"
                            borderStyle="solid"
                            borderWidth="0 1px 1px 0"
                            borderBottom={ editMode === 'link' && '3px solid #a4a4a4' }
                            borderRadius="0"
                            justifyContent="center"
                            alignItems="center"
                            whiteSpace="nowrap"
                            padding="15px 17px"
                            onClick={ () => {
                                setEditMode('link');
                            } }
                        >
                            <LinkIcon
                                fontSize="20px"
                                fontWeight="400"
                                height="20px"
                                lineHeight="20px"
                                verticalAlign="middle"
                                width="20px"
                                marginRight="8px"
                            />
                            Link
                        </Flex>
                    </Flex>
                    { editMode === 'post' ? (
                        <Editor
                            editorState={ postEditorState }
                            setEditorState={ setPostEditorState }
                            setValue={ setEditPost }
                        />
                    ) : (
                        <Textarea
                            placeholder="Url"
                            onChange={ (e) => setEditPost(e.target.value) }
                            value={ editPost }
                            color={ color }
                        />
                    ) }
                    <Flex alignItems="center" mt="8px" justifyContent="flex-end">
                        <Button
                            borderRadius="999px"
                            border="transparent"
                            bg="transparent"
                            onClick={ () => setEdit(false) }
                        >
                            Cancel
                        </Button>
                        <Button
                            borderRadius="999px"
                            padding="5px 10px"
                            minW="90px"
                            minH="27px"
                            onClick={ handleEditComment }
                        >
                            Save
                        </Button>
                    </Flex>
                </Box>
                :
                <Box marginTop="8px" padding="10px">
                    { editMode === 'post' ? (
                        <Editor
                            editorState={ postEditorState }
                            setEditorState={ setPostEditorState }
                            setValue={ setEditPost }
                        />
                    ) : (
                        <Textarea
                            placeholder="Url"
                            onChange={ (e) => setEditPost(e.target.value) }
                            value={ editPost }
                            color={ color }
                        />
                    ) }
                    <Flex alignItems="center" mt="8px" justifyContent="flex-end">
                        <Button
                            borderRadius="999px"
                            border="transparent"
                            bg="transparent"
                            onClick={ () => setEdit(false) }
                        >
                            Cancel
                        </Button>
                        <Button
                            borderRadius="999px"
                            padding="5px 10px"
                            minW="90px"
                            minH="27px"
                            onClick={ handleEditComment }
                        >
                            Save
                        </Button>
                    </Flex>
                </Box>

            }
        </>
    )
}

export default EditComment