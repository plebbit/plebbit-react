import Swal from 'sweetalert2';
import logger from './logger';

const getChallengeAnswersFromUser = async (challenges) => {
  console.log({ challenges })
  const { value } = await Swal.fire({
    background: '#eff4f7',
    input: 'text',
    text: 'Complete the challenge',
    imageUrl: `data:image/png;base64,  ${challenges?.challenges[0].challenge}`,
    imageWidth: '80%',
  });
  if (value) {
    logger('getChallenge answer', value, 'trace');
    return value;
  } else {
    return false;
  }
};

export default getChallengeAnswersFromUser;
