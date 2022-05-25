import { Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';
import swal from 'sweetalert';

const Challenge = (challenges) => {
  swal({
    buttons: {
      cancel: 'Close',
      confirm: true,
    },
    content: (
      <Flex flexDir="column" justifyContent="center" alignItems="center" bg="#ccc" padding="40px">
        <Text fontWeight="bold" mb="10px">
          Complete the challenge
        </Text>
        <Image
          margin="auto"
          width="80%"
          src={`data:image/png;base64, ${challenges?.challenges[0].challenge}`}
          mb="20px"
        />
      </Flex>
    ),
  });
};

export default Challenge;
