import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { setAccount } from '@plebbit/plebbit-react-hooks/dist/stores/accounts/accounts-actions';
import logger from '../../../utils/logger';
import { useAccount } from '@plebbit/plebbit-react-hooks';
import Modal from '../../../components/Modal';
import styles from './modal.module.css';
import { BiLinkExternal } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AddAvatar = ({ isOpen, setIsOpen }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const { colorMode } = useColorMode();
  const profile = useAccount();
  const [data, setData] = useState({
    domainSeparator: 'plebbit-author-avatar',
    authorAddress: profile?.author?.address,
  });
  const [timestamp, setTimeStamp] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [type, setType] = useState('eip191');
  const [chainTicker, setChainTicker] = useState('');
  const [userProfile, setUserProfile] = useState(profile);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleMessage = (val) => {
    setTimeStamp(val);
    setMessage(
      JSON.stringify({
        domainSeparator: data?.domainSeparator,
        authorAddress: data?.authorAddress,
        timestamp: val,
        tokenAddress: data?.tokenAddress,
        tokenId: data?.tokenId,
      })
    );
  };

  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} header="Add Nft Avatar">
      <div className={styles.wrapper}>
        <div className={styles.wrapper2}>
          <label className={styles.input_group}>
            <span>Token address</span>
            <input
              placeholder="Input token address"
              onChange={(e) => {
                setMessage('');
                setData({ ...data, tokenAddress: e.target.value });
              }}
              value={data?.tokenAddress}
            />
          </label>
          <label className={styles.input_group}>
            <span>Token Id</span>
            <input
              placeholder="Input token id"
              onChange={(e) => {
                setMessage('');
                setData({ ...data, tokenId: e.target.value });
              }}
              value={data?.tokenId}
            />
          </label>
          {message ? (
            <label className={styles.input_group}>
              <span>Message</span>
              <h3 className={styles.message}>{message}</h3>
            </label>
          ) : (
            ''
          )}
          {message?.length ? (
            <label className={styles.input_group}>
              <div>
                <CopyToClipboard
                  text={message}
                  onCopy={() => {
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 3000);
                  }}
                >
                  <button className={styles.avatar_copy} disabled={copied}>
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </CopyToClipboard>
              </div>
              <h3 className={styles.message_info}>
                copy the message in the box above and sign it on{' '}
                <Link
                  target="_blank"
                  to="https://etherscan.io/verifiedSignatures"
                  color={linkColor}
                  fontSize="12px"
                  fontStyle="italic"
                >
                  https://etherscan.io/verifiedSignatures
                  <BiLinkExternal />
                </Link>
              </h3>
            </label>
          ) : (
            ''
          )}
          {message ? (
            <label className={styles.input_group}>
              <span>Chain Ticker</span>
              <input
                value={chainTicker}
                onChange={(e) => {
                  setUserProfile({
                    ...userProfile,
                    author: {
                      ...userProfile?.author,
                      avatar: {
                        ...userProfile?.author?.avatar,
                        chainTicker: e.target.value,
                      },
                    },
                  });
                  setChainTicker(e.target.value?.toLowerCase());
                }}
                mb="10px"
                placeholder="input ticker of the chain, like eth, avax, sol, matic, etc"
              />

              <label>
                <input
                  type="radio"
                  value="eip191"
                  checked
                  style={{
                    marginRight: '6px',
                  }}
                />
                eip191
              </label>
              {/* <Radio isDisabled value="rsa">
                      rsa
                    </Radio> */}

              <span>Signature</span>
              <textarea
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                placeholder="Input signature"
                value={signature}
                onChange={(e) => {
                  setUserProfile({
                    ...userProfile,
                    author: {
                      ...userProfile?.author,
                      avatar: {
                        ...userProfile?.author?.avatar,
                        chainTicker: chainTicker,
                        address: data?.tokenAddress,
                        id: data?.tokenId,
                        timestamp,
                        signature: {
                          ...userProfile?.author?.avatar?.signature,
                          signature: e.target.value,
                          type: type,
                          signedPropertyNames: Object.keys(data),
                        },
                      },
                    },
                  });
                  setSignature(e.target.value);
                }}
              />
              <h3 className={styles.message_info}>
                paste the signature hash gotten from{' '}
                <Link to="https://etherscan.io/verifiedSignatures" target="_blank">
                  https://etherscan.io/verifiedSignatures
                  <BiLinkExternal mx="2px" />
                </Link>{' '}
                after publishing in the box above
              </h3>
            </label>
          ) : (
            ''
          )}
        </div>

        <div className={styles.footer}>
          <button
            onClick={() =>
              signature
                ? setTimeout(async () => {
                    if (signature) {
                      try {
                        const res = await setAccount(userProfile);
                        logger('account:update', res);
                        toast({
                          title: `changes saved`,
                          variant: 'left-accent',
                          status: 'success',
                          isClosable: true,
                        });
                        onClose();
                      } catch (error) {
                        logger('account:update', error, 'error');
                        toast({
                          title: `Account update`,
                          variant: 'left-update',
                          description: error?.toString(),
                          status: 'error',
                          isClosable: true,
                        });
                      }
                    }
                  }, 300)
                : data?.tokenId &&
                  data?.tokenAddress &&
                  handleMessage(Number(Math.round(Date.now() / 1000)))
            }
            style={{
              display: !message ? 'block' : message && signature ? 'block' : 'none',
              color: '#0079d3',
              border: '1px solid currentColor',
              backgroundColor: 'transparent',
            }}
          >
            {!message ? 'Create message' : message && signature ? 'Save' : ''}
          </button>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddAvatar;
