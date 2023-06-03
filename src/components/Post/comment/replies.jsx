import { Flex } from '@chakra-ui/react';
import React from 'react';
import Comment from '.';

const Replies = ({ parent, reply, loading, disableReplies }) => {
  return (
    <Flex flexDir="column">
      <Comment
        comment={ parent }
        type={ reply === undefined ? 'singleComment' : 'child' }
        key={ parent?.cid }
        singleComment={ reply }
        loading={ loading }
        disableReplies={ disableReplies }
      />
    </Flex>
  );
};

export default Replies;
