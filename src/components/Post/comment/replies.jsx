import { Flex } from '@chakra-ui/react';
import React from 'react';
import Comment from '.';

const Replies = ({ parent, reply }) => {
  return (
    <Flex flexDir="column">
      <Comment
        comment={parent}
        type={reply === undefined ? 'singleComment' : 'child'}
        key={parent?.cid}
        parentCid={parent?.parentCid}
        singleComment={reply}
      />
    </Flex>
  );
};

export default Replies;
