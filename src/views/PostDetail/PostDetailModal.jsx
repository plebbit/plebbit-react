import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import PostContent from './PostContent';
import { ProfileContext } from '../../store/profileContext';
import { useHistory } from 'react-router-dom';

function PostDetailModal() {
  const {
    device,
  } = useContext(ProfileContext);
  const [showModal, setShowModal] = useState(true);
  const history = useHistory()
  const { isOpen, onClose } = useDisclosure({
    isOpen: showModal,
    onClose: () => {
      setShowModal(false);
      history.goBack();
    },
  });
  const [detail, setDetail] = useState({})
  const [subplebbit, setSubplebbit] = useState({})
  const detBg = useColorModeValue('#bbbdbf', '#030303');


  return (
    <>
      <Modal size='xl' motionPreset='none' trapFocus={ false } scrollBehavior="outside" isOpen={ isOpen } onClose={ onClose }>
        <ModalOverlay backgroundColor="rgba(28,28,28,.9)" />
        { device !== 'mobile' ? (
          <ModalContent
            maxW="1280px"
            marginTop="48px"
            marginBottom="0"
            borderRadius="none"
            minHeight="calc(100vh - 48px)"
            background={ detBg }
          >
            <PostContent setDetail={ setDetail } setSubplebbit={ setSubplebbit } />
          </ModalContent>
        ) : (
          <ModalContent
            marginTop="48px"
            marginBottom="0"
            borderRadius="none"
            minHeight="calc(100vh - 48px)"
          >
            <PostContent setDetail={ setDetail } setSubplebbit={ setSubplebbit } />
          </ModalContent>
        ) }

      </Modal>
    </>
  );
}

export default PostDetailModal;
