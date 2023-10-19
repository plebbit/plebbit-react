import React, { useEffect, useState } from 'react';
import GetChallengesModal from '../components/Modal/ChallengeModal';

const GetChallengeAnswersFromUser = ({ challenges, comment, onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (values) => {
    const answers = Object.values(values);
    onComplete(answers);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(true);

    return () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <GetChallengesModal
          handleSubmit={handleSubmit}
          post={comment}
          challenges={challenges?.challenges}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      )}
    </>
  );
};

export default GetChallengeAnswersFromUser;
