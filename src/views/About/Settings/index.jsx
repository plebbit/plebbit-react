import React, { useEffect, useState } from 'react';
import styles from './settings.module.css';
import { Button2 } from '../../../components/Button';
import { useLocation, useParams } from 'react-router-dom';
import GeneralSettings from './GeneralSettings';
import {
  useAccountSubplebbits,
  usePublishSubplebbitEdit,
  useResolvedSubplebbitAddress,
  useSubplebbit,
} from '@plebbit/plebbit-react-hooks';
import { useToast } from '@chakra-ui/react';

const SubSettings = ({ subPlebbit: subplebbit }) => {
  const { subplebbitAddress } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const pageValue = queryParams.get('page')?.split('/')[0];
  const [data, setData] = useState({ address: subplebbitAddress, ...subplebbit });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {
    resolvedAddress,
    state: resolveEnsState,
    error: resolveEnsError,
  } = useResolvedSubplebbitAddress({
    subplebbitAddress: data ? data?.address : '',
    cache: false,
  });
  const { accountSubplebbits } = useAccountSubplebbits();

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
    title: data?.title,
    description: data?.description,
    address: data?.address,
    onChallenge,
    onChallengeVerification,
  };
  const { publishSubplebbitEdit } = usePublishSubplebbitEdit(editSubplebbitOptions);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await publishSubplebbitEdit();
      setLoading(false);
    } catch (error) {
      logger('editComment', error, 'error');
      toast({
        title: 'Declined.',
        description: error?.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const role = accountSubplebbits[subplebbit?.address]?.role?.role;
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';

  useEffect(() => {
    setData({ ...subplebbit });
  }, [subplebbit]);

  return (
    <>
      <div className={styles.content_top2}>
        <Button2 disabled={loading || !allowedSpecial} onClick={handleSaveChanges}>
          Save changes
        </Button2>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.wrapper2}>
          {pageValue === 'community' ? (
            <GeneralSettings
              data={data}
              setData={setData}
              allowedSpecial={allowedSpecial}
              resolveEnsState={resolveEnsState}
              resolveEnsError={resolveEnsError}
              resolvedAddress={resolvedAddress}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default SubSettings;
