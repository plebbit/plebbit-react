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
import onChallenge from '../../../utils/onChallenge';
import onChallengeVerification from '../../../utils/onChallengeVerification';
import onError from '../../../utils/onError';

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

  const editSubplebbitOptions = {
    title: data?.title,
    description: data?.description,
    address: data?.address,
    suggested: { ...data?.suggested, language: data?.suggested?.language },
    features: {
      ...data?.features,
      language: data?.suggested?.safeForWork,
    },
    onChallenge,
    onChallengeVerification: (challengeVerification, comment) =>
      onChallengeVerification(
        challengeVerification,
        comment,
        () => {
          setData({});
          setLoading(false);
        },
        () => {
          setData({});
          setLoading(false);
        }
      ),
    onError,
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
