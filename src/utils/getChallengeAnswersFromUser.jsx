import React, { useEffect } from "react";
import GetChallengesModal from "../components/Modal/getChallengesModal";
import { useDisclosure } from "@chakra-ui/react";

const GetChallengeAnswersFromUser = ({ challenges, comment, onComplete }) => {
  const { onClose, isOpen, onOpen } = useDisclosure()


  const handleSubmit = (values) => {
    const answers = Object.values(values);
    onComplete(answers);
    onClose()
  };

  useEffect(() => {
    onOpen()

    return () => {
      onClose()
    }
  }, [])





  return (
    <>

      { isOpen && <GetChallengesModal
        handleSubmit={ handleSubmit }
        post={ comment }
        challenges={ challenges?.challenges }
        onClose={ onClose }
        isOpen={ isOpen }
        onOpen={ onOpen }
      /> }
    </>
  );
};

export default GetChallengeAnswersFromUser;
