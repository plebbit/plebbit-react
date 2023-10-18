import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { LockedMessage } from '../../components/Card/ModMessage';
import getUserName from '../../utils/getUserName';
import Editor from '../../components/Editor';
import { EditorState } from 'draft-js';
import usePublishComment from '../../hooks/usePublishComment';
import { MdClose } from 'react-icons/md';
import { useAccount, useAuthorAvatar } from '@plebbit/plebbit-react-hooks';
import useStore from '../../store/useStore';
import Avatar from '../../components/Avatar';

const AddComment = ({ detail, subplebbit, showFullComments, setShowFullComments, isReply }) => {
  const borderColor2 = useColorModeValue('#d3d6da', '#545452');
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { device } = useStore((state) => state);
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showMEditor, setShowMEditor] = useState(false);

  const { publishComment } = usePublishComment(content, detail);

  const handlePublishPost = async () => {
    await publishComment(
      () => {
        setContent('');
        setEditorState(EditorState.createEmpty());
      },
      () => {}
    );
  };

  return (
    <>
      {device !== 'mobile' ? (
        <Box>
          {detail?.locked ? (
            <LockedMessage subplebbit={subplebbit} />
          ) : (
            <>
              <Box fontSize="12px" fontWeight="400" lineHeight="18px" mb="4px">
                Comment as {getUserName(profile?.author)}
              </Box>
              <Box
                borderRadius="4px"
                overflow="hidden auto"
                padding="8px 0px"
                resize="none"
                minH="200px"
              >
                <Editor
                  setValue={setContent}
                  editorState={editorState}
                  setEditorState={setEditorState}
                  showSubmit
                  handleSubmit={handlePublishPost}
                  value={content}
                />
              </Box>
            </>
          )}

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
          {!showFullComments && isReply ? (
            <Box
              fontSize="12px"
              fontWeight="700"
              my="8px"
              _hover={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => setShowFullComments(!showFullComments)}
            >
              View all comments
            </Box>
          ) : null}
        </Box>
      ) : (
        <>
          {detail?.locked ? (
            <LockedMessage />
          ) : (
            <>
              {showMEditor ? (
                <Box>
                  <Flex backgroundColor="inherit" color="inherit" margin="0" borderWidth="0">
                    <Box width="100%">
                      <Editor
                        setValue={setContent}
                        editorState={editorState}
                        setEditorState={setEditorState}
                        showSubmit
                        handleSubmit={handlePublishPost}
                        submitBtnText="Add Comment"
                        value={content}
                        otherBtn={
                          <Button mr="auto" onClick={() => setShowMEditor(false)}>
                            <MdClose />
                          </Button>
                        }
                      />
                    </Box>
                  </Flex>
                </Box>
              ) : (
                <Flex alignItems="center" flexFlow="row nowrap" paddingTop="8px" width="100%">
                  <Avatar
                    width={24}
                    height={24}
                    avatar={authorAvatarImageUrl}
                    verticalAlign="middle"
                    alt="user-icon"
                    color="transparent"
                    style={{
                      marginRight: '8px',
                      color: 'transparent',
                      verticalAlign: 'middle',
                    }}
                  />
                  <Button
                    border={`1px solid ${borderColor2}`}
                    color="#818384"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    borderRadius="15px"
                    flex="1"
                    fontSize="14px"
                    height="30px"
                    lineHeight="17px"
                    textAlign="left"
                    padding="0 8px"
                    justifyContent="flex-start"
                    onClick={() => setShowMEditor(true)}
                  >
                    Leave a comment
                  </Button>
                </Flex>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AddComment;
