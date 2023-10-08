import React, { useState } from 'react';
import styles from './about.module.css';
import {
  useAccountSubplebbits,
  usePublishSubplebbitEdit,
  useSubplebbit,
} from '@plebbit/plebbit-react-hooks';
import useStore from '../../store/useStore';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import Layout from '../../components/layout';
import Avatar from '../../components/Avatar';
import { getAddress } from '../../utils/getUserName';
import SideBar from './sideBar';
import Content from './content';

const About = () => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const { device } = useStore((state) => state);
  const location = useLocation();
  const { subplebbitAddress } = useParams();
  const subPlebbit = useSubplebbit({ subplebbitAddress: subplebbitAddress });
  const page = location.pathname.split('/')[4];
  const [showSidebar, setShowSideBar] = useState(false);
  const role = accountSubplebbits[subPlebbit?.address]?.role?.role;
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';

  const onChallengeVerification = (challengeVerification, subplebbitEdit) => {
    // if the challengeVerification fails, a new challenge request will be sent automatically
    // to break the loop, the user must decline to send a challenge answer
    // if the subplebbit owner sends more than 1 challenge for the same challenge request, subsequents will be ignored
    toast({
      title: 'Accepted.',
      description: 'Action accepted',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setLoading(false);
    logger('challenge verified', { challengeVerification, subplebbitEdit }, 'error');
  };
  const onChallenge = async (challenges, subplebbitEdit) => {
    let challengeAnswers = [];
    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('decline challenge', error, 'trace');
      toast({
        title: 'Declined.',
        description: error?.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (challengeAnswers) {
      await subplebbitEdit.publishChallengeAnswers(challengeAnswers);
    }
  };

  const editSubplebbitOptions = {
    // ...data,
    onChallenge,
    onChallengeVerification,
  };

  const { publishSubplebbitEdit } = usePublishSubplebbitEdit(editSubplebbitOptions);

  const handleSubPlebbitedit = async () => {
    try {
      setLoading(true);
      await publishSubplebbitEdit();
      setLoading(false);
    } catch (error) {
      logger('editSubplebbit', error, 'error');
      toast({
        title: 'Declined.',
        description: error?.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Layout
      name={{
        label: subPlebbit?.title || getAddress(subPlebbit?.address),
        value: location?.pathname,
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Avatar width={20} height={20} mr="8px" />
          <Link to={`/p/${subPlebbit?.address}/`}>
            {subPlebbit?.title || getAddress(subPlebbit?.address)}
          </Link>
          /{' '}
          {page === 'modqueue'
            ? 'mod queue'
            : page === 'scheduledposts'
            ? 'Scheduled posts'
            : page === 'eventposts'
            ? 'event posts'
            : page === 'edit'
            ? 'Community settings'
            : page?.toUpperCase()}
        </div>
        <div className={styles.container}>
          <SideBar page={page} subPlebbit={subPlebbit} />
          <Content
            page={page}
            subPlebbit={subPlebbit}
            allowedSpecial={allowedSpecial}
            role={role}
            handleSubPlebbitedit={handleSubPlebbitedit}
            loading={loading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
