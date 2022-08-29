import { useToast } from '@chakra-ui/react';

const onError = (error) => {
  const toast = useToast();
  return toast({
    title: 'Declined.',
    description: error?.message,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
};

export default onError;
