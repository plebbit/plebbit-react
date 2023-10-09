import React from 'react';
import styles from '../settings.module.css';
import Header, { SubHeader } from '../../../../components/Text/Header';
import Input, { RadioGroup, Switch, SwitchInput, TextArea } from '../../../../components/Input';
import { Link } from 'react-router-dom';

const GeneralSettings = ({
  data,
  setData,
  loading,
  allowedSpecial,
  resolveEnsError,
  resolveEnsState,
  resolvedAddress,
}) => {
  return (
    <>
      <Header title="Subplebbit Settings" />
      <SubHeader title="Subplebbit profile" />
      <Input
        title="Subplebbit name"
        placeholder="Enter subplebbit Name"
        maxLength={100}
        value={data?.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        disabled={loading || !allowedSpecial}
      />
      <TextArea
        title="Subplebbit description"
        placeholder="Add description for subplebbit"
        subTitle="This is how new members come to understand your subplebbit"
        maxLength={500}
        value={data?.description}
        disabled={loading || !allowedSpecial}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />
      <Input
        title="Subplebbit address"
        placeholder="Add an ens address for Subplebbit"
        maxLength={500}
        value={data?.address}
        disabled={loading || !allowedSpecial}
        onChange={(e) => setData({ ...data, address: e.target.value })}
        customMessage={
          <div className={styles.settings_options_input}>
            {' '}
            {resolveEnsState === 'failed' ? (
              <div
                className={styles.settings_options_input_count}
                style={{
                  color: 'red',
                }}
              >
                {`Failed resolving address:  
                ${data?.address} , ${resolveEnsError?.message}`}
              </div>
            ) : resolveEnsState === 'succeeded' ? (
              <div
                className={styles.settings_options_input_count}
                style={{
                  color: 'green',
                }}
              >
                your ens address is set correctly :{resolvedAddress}
              </div>
            ) : resolveEnsState === 'resolving' ? (
              <div
                className={styles.settings_options_input_count}
                style={{
                  color: 'green',
                }}
              >
                your ens address is set correctly
              </div>
            ) : (
              'Resolving address from chain provider URL'
            )}
            <p>Steps to register an ens (.eth) address </p>
            <ol role="list">
              <li>
                Go to {` `}
                <Link to={`https://app.ens.domains/${data?.address}.eth/register`} target="_blank">
                  {' '}
                  https://app.ens.domains/
                  {data?.address}.eth/register{' '}
                </Link>
              </li>
              <li>Connect your wallet if it is not connected</li>
              <li>Click ADD/EDIT RECORD</li>
              <li>
                Select "text", write in "key": "subplebbit-address", write in next field:{' '}
                <b>{data?.signer?.address}</b>
              </li>
            </ol>
          </div>
        }
      />
      <Input
        title="Language"
        placeholder="Add language for subplebbit"
        value={data?.suggested?.language}
        disabled={loading || !allowedSpecial}
        onChange={(e) =>
          setData({ ...data, suggested: { ...data?.suggested, language: e.target.value } })
        }
      />
      <SubHeader title="Subplebbit type" />
      <RadioGroup value="Public" options={['Public', 'Restricted', 'Private']} title="Radio" />

      <SwitchInput
        title={
          <div>
            <Header title="18+ year old community" />
            <SubHeader
              style={{
                border: 'none',
              }}
              title="Your subplebbit will be flagged as an 18+ subplebbit"
            />
          </div>
        }
        checked={!data?.features?.safeForWork}
        onClick={() =>
          setData({
            ...data,
            features: { ...data?.features, safeForWork: !data?.features?.safeForWork },
          })
        }
        radioWrapperClass={styles.nsfw_wrap}
      />
    </>
  );
};

export default GeneralSettings;
