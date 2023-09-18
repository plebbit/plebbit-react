import {
  useAccount,
  useAccountSubplebbits,
  useBlock,
  useFeed,
  usePublishSubplebbitEdit,
  useSubplebbit,
  useSubplebbitStats,
  useSubscribe,
} from '@plebbit/plebbit-react-hooks';
import React, { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import { useLocation, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import getIsOnline from '../../utils/getIsOnline';
import logger from '../../utils/logger';
import GetChallengeAnswersFromUser from '../../utils/getChallengeAnswersFromUser';
import useStateString from '../../hooks/useStateString';
import onError from '../../utils/onError';
import Layout from '../../components/layout';

const Subplebbit = () => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { postStyle, feedSort, device } = useStore((state) => state);
  const params = useParams();
  const { feed, loadMore, hasMore } = useFeed({
    subplebbitAddresses: [params?.subplebbitAddress],
    sortType: feedSort,
  });
  const subPlebbit = useSubplebbit({ subplebbitAddress: params?.subplebbitAddress });
  const feeds = feed;
  const [data, setData] = useState({ address: params?.subplebbitAddress, ...subPlebbit });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const role = accountSubplebbits[subPlebbit?.address]?.role?.role;
  const location = useLocation();
  const isOnline = getIsOnline(subPlebbit?.updatedAt);
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';
  const showStyleBar = location?.search === '?styling=true';
  const stats = useSubplebbitStats({ subplebbitAddress: subPlebbit?.address });
  const { blocked, unblock, block } = useBlock({ address: subPlebbit?.address });

  useEffect(() => {
    setData({ ...data, ...subPlebbit });
  }, [subPlebbit]);

  const onChallengeVerification = (challengeVerification) => {
    if (challengeVerification.challengeSuccess === true) {
      toast({
        title: 'Accepted.',
        description: 'Action accepted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      logger('challengeSuccess', { challengeVerification });
    } else if (challengeVerification.challengeSuccess === false) {
      logger(
        'challengefailed',
        {
          reason: challengeVerification.reason,
          errors: challengeVerification.challengeErrors,
        },
        'error'
      );
      toast({
        title: challengeVerification.reason ? challengeVerification.reason : 'Declined.',
        description: challengeVerification.challengeErrors
          ? challengeVerification.challengeErrors.join(',')
          : 'Challenge Verification Failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onChallenge = async (challenges, subplebbitEdit) => {
    let challengeAnswers = [];
    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await GetChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('failChallenge', error, 'error');
      toast({
        title: 'Declined.',
        description: 'Action Declined',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (challengeAnswers) {
      await subplebbitEdit.publishChallengeAnswers(challengeAnswers);
    }
  };

  const { subscribe, unsubscribe, subscribed } = useSubscribe({
    subplebbitAddress: subPlebbit?.address,
  });

  const handleSubscribe = async () => {
    try {
      await subscribe();
    } catch (error) {
      toast({
        title: 'Subscription failed',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleUnSubscribe = async () => {
    try {
      await unsubscribe();
    } catch (error) {
      toast({
        title: 'Unsubscribed.',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const editSubplebbitOptions = {
    ...data,
    onChallenge,
    onChallengeVerification,
    onError,
  };

  const { publishSubplebbitEdit } = usePublishSubplebbitEdit(editSubplebbitOptions);
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await publishSubplebbitEdit();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Supplebbit Edit declined.',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOption = (val) => {
    if (val?.id === 'mute') {
      blocked ? unblock() : block();
    }
  };

  const stateString = useStateString(subPlebbit);
  return (
    <Layout
      background={
        data?.suggested?.backgroundUrl && `url(${data?.suggested?.backgroundUrl}) repeat center top`
      }
      stateString={feeds?.length ? '' : stateString}
      name={{ label: data?.title || 'Subplebbit', value: location?.pathname }}
    >
      Subplebbit
    </Layout>
  );
};

export default Subplebbit;
