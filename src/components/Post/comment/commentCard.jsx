import React from 'react';
import getUserName, { getSubName } from '../../../utils/getUserName';
import { dateToNow } from '../../../utils/formatDate';
import FlairLabel from '../../../components/Label/flairLabel';
import styles from './comment.module.css';

const CommentCard = ({ comment }) => {
  const commentParent = useComment({ commentCid: comment?.parentCid });
  const parent = { ...commentParent, address: comment?.subplebbitAddress };
  const parentLoading = commentParent?.state === 'fetching-ipfs' || !commentParent?.timestamp;
  const commentPending = comment?.state === 'pending';

  return (
    <div
      cursor="pointer"
      borderRadius="5px"
      border="none"
      mb="10px"
      bg={bg}
      width="100%"
      flexDir="column"
    >
      <Flex
        borderTopLeftRadius="4px"
        borderTopRightRadius="4px"
        borderTopWidth="1px"
        alignItems="center"
        padding="8px"
        flex="1 1 auto"
        fontSize="12px"
        fontWeight="400"
        lineHeight="16px"
      >
        <Icon as={BsChat} width={5} height={5} fontSize="20px" mr="8px" />
        <Flex alignItems="center" flexWrap="wrap">
          <Box mr="1">{getUserName(comment?.author)}</Box>
          <Box mr="1">commented on</Box>
          <Box mr="1"> {parent?.title} </Box>
          <Box color={misCol}>{dateToNow(parseInt(parent?.timestamp * 1000))}</Box>
          {parent?.flair?.text ? <FlairLabel flair={parent?.flair} /> : null}
          <Box mr="1" fontWeight="700" fontSize="12px" lineHeight="20px">
            {getSubName(parent?.subplebbit)}
          </Box>
          <Box>Posted by {getUserName(parent?.author)}</Box>
        </Flex>
      </Flex>
      <Box width="100%" px="8px">
        <hr
          style={{
            borderTopWidth: '2px',
          }}
        />
      </Box>
      <Flex borderBottomLeftRadius="4px" borderBottomRightRadius="4px" padding="8px 16px">
        <Flex width="100%">
          <Box
            borderLeft={`2px dashed ${colorMode === 'light' ? '#edeff1' : '#343536'}`}
            flex="0 0 1px"
            mr="16px"
          />
          <Flex flexDir="column" mb="8px" padding="4px 8px" bg="rgba(0,121,211,0.05)" width="100%">
            <Flex alignItems="center" fontSize="12px" fontWeight="400" lineHeight="16px">
              <Box mr="1">{getUserName(comment?.author)}</Box>
              {/* <Box mr="1">1 point</Box> */}
              <Box mr="1"> {dateToNow(parseInt(comment?.timestamp * 1000))}</Box>
            </Flex>
            <Flex flexDir="column">
              <Box fontSize="14px" fontWeight="400" lineHeight="21px" wordBreak="break-word">
                {comment?.content}
              </Box>
              <Flex
                alignItems="center"
                fontSize="12px"
                fontWeight="700"
                lineHeight="16px"
                color="#878a8c"
              >
                <Box cursor="pointer" transition="color .1s">
                  Reply
                </Box>
                <Box padding="4px 8px" cursor="pointer" transition="color .1s">
                  Share
                </Box>
                <Box
                  padding="4px 8px"
                  alignSelf="flex-start"
                  cursor="pointer"
                  transition="color .1s"
                >
                  ...
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default CommentCard;
