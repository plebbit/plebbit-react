import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import swal from 'sweetalert';
import Image from "../Image"

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
          fallbackSrc={ require('../../assets/images/fallback.png') }
          margin="auto"
          width="80%"
          src={ `data:image/png;base64, ${challenges?.challenges[0].challenge}` }
          mb="20px"
        />
      </Flex>
    ),
  });
};

export default Challenge;
