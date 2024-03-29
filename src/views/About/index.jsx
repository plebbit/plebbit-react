import React, { useState } from 'react';
import styles from './about.module.css';
import {
  useAccountSubplebbits,
  usePublishSubplebbitEdit,
  useSubplebbit,
} from '@plebbit/plebbit-react-hooks';
import { Link, useLocation, useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import Avatar from '../../components/Avatar';
import { getAddress } from '../../utils/getUserName';
import SideBar from './sideBar';
import Content from './content';
import onChallenge from '../../utils/onChallenge';
import onChallengeVerification from '../../utils/onChallengeVerification';
import onError from '../../utils/onError';
import { toast } from 'react-toastify';
import useAppTitle from '../../hooks/useAppTitle';

const About = () => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const location = useLocation();
  const { subplebbitAddress, page } = useParams();
  const role = accountSubplebbits[subplebbitAddress]?.role?.role;
  const subPlebbit = useSubplebbit({ subplebbitAddress: subplebbitAddress });
  const [loading, setLoading] = useState(false);
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';
  const [data, setData] = useState({});

  const editSubplebbitOptions = {
    ...data,
    subplebbitAddress: subplebbitAddress,
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

  const handleSubPlebbitedit = async () => {
    try {
      setLoading(true);
      await publishSubplebbitEdit();
      setLoading(false);
    } catch (error) {
      logger('editSubplebbit', error, 'error');
      toast.error(error?.toString());
      setLoading(false);
    }
  };

  useAppTitle(
    {
      label: subPlebbit?.title || getAddress(subplebbitAddress),
      value: location?.pathname,
    },
    subPlebbit
  );

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Avatar
            width={20}
            height={20}
            style={{
              marginRight: '8px',
            }}
          />
          <Link to={`/p/${subplebbitAddress}/`}>
            {subPlebbit?.title || getAddress(subplebbitAddress)}
          </Link>
          /{' '}
          {page === 'modqueue'
            ? 'mod queue'
            : page === 'scheduledposts'
            ? 'Scheduled posts'
            : page === 'eventposts'
            ? 'event posts'
            : page === 'edit'
            ? 'Subplebbit settings'
            : page?.toUpperCase()}
        </div>
        <div className={styles.container}>
          <SideBar />
          <Content
            subPlebbit={subPlebbit}
            allowedSpecial={allowedSpecial}
            role={role}
            data={data}
            setData={setData}
            handleSubPlebbitedit={handleSubPlebbitedit}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default About;
