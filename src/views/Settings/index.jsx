import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  deleteCaches,
  setAccount,
  useAccount,
  useAuthorAvatar,
  useResolvedAuthorAddress,
} from '@plebbit/plebbit-react-hooks';
import useStore from '../../store/useStore';
import logger from '../../utils/logger';
import onError from '../../utils/onError';
import Swal from 'sweetalert2';
import styles from './settings.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import AddAvatar from './modal/addAvatar';
import ExportAccount from './modal/exportAccount';
import AddBlockProvide from './modal/addBlockProvider';
import Image from '../../components/Image';
import placeholder from '../../assets/images/fallback.png';
import { toast } from 'react-toastify';

const Settings = () => {
  const [bPLoading, setBpLoading] = useState(false);
  const view = useParams()?.view ?? 'settings';
  const location = useLocation();
  const profile = useAccount();
  const [isOpen, setIsClose] = useState(false);
  const [isExportOpen, setIsExportClose] = useState(false);
  const [isBlockOpen, setBlockClose] = useState(false);
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { device } = useStore((state) => state);
  const [loader, setLoader] = useState(false);
  const tabs = [
    { label: 'Account', link: 'account' },
    { label: 'Profile', link: 'profile', optional: 'settings' },
    { label: 'Plebbit Options', link: 'plebbit-options' },
    { label: 'Safety & Privacy', link: 'plebbit-privacy' },
    { label: 'Feed Settings', link: 'feed' },
    { label: 'Notifications', link: 'notifications' },
    { label: 'Chat & Messaging', link: 'messaging' },
  ];
  const [userProfile, setUserProfile] = useState(profile);

  const { resolvedAddress: resolvedAuthorAddress, error } = useResolvedAuthorAddress({
    author: userProfile ? userProfile?.author?.address : '',
    cache: false,
  });
  logger('resolvedAddress', resolvedAuthorAddress, 'trace');

  useEffect(() => {
    setUserProfile({ ...profile });
  }, [profile]);

  if (error) {
    onError(error);
  }

  const handleConfirm = (warning, callback) => {
    Swal.fire({
      title: warning,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      icon: 'warning',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await callback();
      }
    });
  };

  const handleDelete = async (val) => {
    await delete userProfile?.plebbitOptions?.chainProviders[val];
    try {
      await setAccount(userProfile);
      toast({
        title: `changes saved`,
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `Account update`,
        variant: 'left-update',
        description: error?.toString(),
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleSaveChainProvider = async (data) => {
    try {
      setBpLoading(true);
      await setAccount({
        ...userProfile,
        plebbitOptions: {
          ...userProfile?.plebbitOptions,
          chainProviders: {
            ...userProfile?.plebbitOptions?.chainProviders,
            [data?.chainTicker]: {
              ...data,
            },
          },
        },
      });
      setBpLoading(false);
      onBlockClose();
      toast({
        title: `changes saved`,
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      setBpLoading(false);
      toast.error(error?.toString());
    }
  };

  const handleDeleteAccount = async () => {
    setLoader(true);
    try {
      await deleteAccount();
      toast({
        title: `Account deleted`,
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      });
      setTimeout(() => {
        setLoader(false);
      }, 500);
    } catch (error) {
      setLoader(false);
      toast.error(error?.toString());
    }
  };
  const handleResetPlebbitOptions = async () => {
    setLoader(true);
    try {
      await setAccount({
        ...userProfile,
        plebbitOptions: window.defaultPlebbitOptions,
      });
      toast.success(`Account updated`, {
        autoClose: 500,
      });
      setTimeout(() => {
        setLoader(false);
      }, 500);
    } catch (error) {
      setLoader(false);
      toast.error(error?.toString());
    }
  };

  const handleSave = async () => {
    try {
      await setAccount(userProfile);
      toast.success(`changes saved`, {
        autoClose: 5000,
      });
    } catch (error) {
      logger('setting:update', error, 'error');
      toast.error(error?.toString());
    }
  };

  const handleClearDb = async () => {
    await deleteCaches();
    toast.success(`db-cleared`);
  };
  return (
    <Layout name={{ label: 'Plebbit Settings', value: location?.pathname }}>
      {isOpen ? <AddAvatar isOpen={isOpen} setIsOpen={setIsClose} /> : ''}
      {isExportOpen ? <ExportAccount isOpen={isExportOpen} setIsOpen={setIsExportClose} /> : ''}
      {isBlockOpen ? (
        <AddBlockProvide
          isOpen={isBlockOpen}
          setIsOpen={setBlockClose}
          handleSave={handleSaveChainProvider}
          loading={bPLoading}
        />
      ) : (
        ''
      )}
      <div className={styles.wrapper}>
        <div className={styles.settings_top}>
          <div className={styles.settings_top_wrap}>
            <h3>User Settings</h3>
            <button
              onClick={async () => {
                await handleSave();
              }}
            >
              Save
            </button>
          </div>
          <div role="tablist" className={styles.settings_tablist}>
            {tabs?.map((tab, index) => (
              <Link
                to={`/settings/${tab?.link}/`}
                key={index}
                role="tab"
                className={styles.settings_tablist_link}
                aria-selected={String(tab?.optional === view || tab.link === view)}
              >
                {tab?.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.settings_content}>
          <div className={styles.settings_content2}>
            {view === 'account' && (
              <>
                <div className={styles.settings_head}>
                  <h2>Account Settings</h2>
                </div>
                <h3 className={styles.settings_title}>Account preferences</h3>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3>Account name (optional)</h3>
                    <p>Set a Account name.</p>
                  </div>
                  <div className={styles.settings_options_input}>
                    <input
                      value={userProfile?.name}
                      maxLength={30}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          name: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Account name (optional)"
                    />
                    <div className={styles.settings_options_input_count}>
                      {30 - +userProfile?.name?.length} Characters remaining
                    </div>
                  </div>
                </div>
                <h3 className={styles.settings_title}>Delete Account</h3>
                <div className={styles.settings_options}>
                  <div className={styles.setting_account_del}>
                    <button
                      onClick={() =>
                        handleConfirm('Do you want to delete this Account?', handleDeleteAccount)
                      }
                    >
                      <RiDeleteBinLine />
                      DELETE ACCOUNT
                    </button>
                  </div>
                </div>
              </>
            )}

            {(view === 'settings' || view === 'profile') && (
              <>
                <div className={styles.settings_head}>
                  <h2>Customize profile</h2>
                </div>
                <div className={styles.settings_head}>
                  <button
                    onClick={() => setIsExportClose(true)}
                    style={{
                      background: '#EDF2F7',
                      border: '1px solid #EDF2F7',
                      color: '#1c1c1c',
                      marginBottom: '32px',
                    }}
                  >
                    Export Account
                  </button>
                </div>
                <h3 className={styles.settings_title}>PROFILE INFORMATION</h3>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3>Display name (optional)</h3>
                    <p>Set a display name. This does not change your username.</p>
                  </div>
                  <div className={styles.settings_options_input}>
                    <input
                      value={userProfile?.author?.displayName || ''}
                      maxLength={30}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          author: {
                            ...userProfile?.author,
                            displayName: e.target.value,
                          },
                        })
                      }
                      type="text"
                      placeholder="Display name (optional)"
                    />
                    <div className={styles.settings_options_input_count}>
                      {30 - (+userProfile?.displayName?.length || 0)} Characters remaining
                    </div>
                  </div>
                </div>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3> Address</h3>
                  </div>
                  <div className={styles.settings_options_input}>
                    <input value={userProfile?.signer?.address || ''} disabled type="text" />
                  </div>
                  <div className={styles.settings_options_title}>
                    <h3>Ens Address</h3>
                    <p> Set an ens Address for your profile.</p>
                  </div>
                  <div className={styles.settings_options_input}>
                    <input
                      value={userProfile?.author?.address || ''}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          author: {
                            ...userProfile?.author,
                            address: e.target.value,
                          },
                        })
                      }
                      type="text"
                      placeholder="Ens name (optional)"
                    />

                    {resolvedAuthorAddress !== userProfile?.signer?.address ? (
                      <div
                        className={styles.settings_options_input_count}
                        style={{
                          color: 'red',
                        }}
                      >
                        {userProfile?.author?.address} has not been acquired by you yet !!!
                      </div>
                    ) : (
                      <div
                        className={styles.settings_options_input_count}
                        style={{
                          color: 'green',
                        }}
                      >
                        your ens address is set correctly
                      </div>
                    )}
                    <p>Steps to register an ens (.eth) address </p>
                    <ol role="list">
                      <li>
                        Go to {` `}
                        <Link
                          to={`https://app.ens.domains/${userProfile?.author?.address}.eth/register`}
                          target="_blank"
                        >
                          {' '}
                          https://app.ens.domains/
                          {userProfile?.author?.address}.eth/register{' '}
                        </Link>
                      </li>
                      <li>Connect your wallet if it is not connected</li>
                      <li>Click ADD/EDIT RECORD</li>
                      <li>
                        Select "text", write in "key": "plebbit-author-address", write in next
                        field: <b>{userProfile?.signer?.address}</b>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3>About (optional)</h3>
                    <p>A brief description of yourself shown on your profile.</p>
                  </div>
                  <div className={styles.settings_options_input}>
                    <textarea
                      resize="both"
                      value={userProfile?.author?.about || ''}
                      maxLength={200}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          author: {
                            ...userProfile?.author,
                            about: e.target.value,
                          },
                        })
                      }
                      type="text"
                      placeholder="About (optional)"
                      style={{
                        minHeight: '80px',
                      }}
                    />
                    <div className={styles.settings_options_input_count}>
                      {200 - (+userProfile?.author?.about?.length || 0)} Characters remaining
                    </div>
                  </div>
                </div>
                <h3 className={styles.settings_title}>IMAGES</h3>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3>Avatar image</h3>
                    <p>Image must be an nft</p>
                  </div>
                  <div className={styles.profile_avatar_wrap}>
                    <div className={styles.profile_avatar}>
                      <label>
                        <span>
                          <div className={styles.profile_avatar2}>
                            <div className={styles.profile_avatar3}>
                              <div className={styles.profile_avatar_bg} />
                              <div className={styles.profile_avatar_1}>
                                <Image
                                  style={{
                                    transformOrigin: 'bottom center',
                                    clipPath:
                                      'polygon(0 68.22%,12.12% 68.22%,12.85% 71.49%,13.86% 74.69%,15.14% 77.79%,16.69% 80.77%,18.49% 83.6%,20.54% 86.26%,22.8% 88.73%,25.28% 91%,27.94% 93.04%,30.77% 94.85%,33.75% 96.4%,36.85% 97.68%,40.05% 98.69%,43.32% 99.42%,46.65% 99.85%,50% 100%,53.35% 99.85%,56.68% 99.42%,59.95% 98.69%,63.15% 97.68%,66.25% 96.4%,69.23% 94.85%,72.06% 93.04%,74.72% 91%,77.2% 88.73%,79.46% 86.26%,81.51% 83.6%,83.31% 80.77%,84.86% 77.79%,86.14% 74.69%,87.15% 71.49%,87.88% 68.22%,100% 68.22%,100% 0,0 0)',
                                  }}
                                  src={authorAvatarImageUrl || placeholder}
                                  onClick={() => setIsClose(true)}
                                />
                              </div>
                            </div>
                          </div>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {view === 'plebbit-options' && (
              <>
                <div className={styles.settings_head}>
                  <h2>Customize plebbit Options</h2>

                  <div className={styles.settings_head_wrap}>
                    <Link to="http://localhost:5001/webui" target="_blank">
                      <button
                        style={{
                          border: '1px solid transparent',
                        }}
                      >
                        View IPFS web ui
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        handleConfirm(
                          'Do you want to reset Plebbit Options back to default?',
                          handleResetPlebbitOptions
                        )
                      }
                      style={{
                        color: 'red',
                        border: '1px solid currentColor',
                        marginLeft: '4px',
                      }}
                    >
                      Reset back to default
                    </button>
                  </div>
                </div>
                <h3 className={styles.settings_title}>PLEBBIT OPTIONS</h3>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3> IPFS Gateway URLs (optional)</h3>
                    <p> Optional URLs of an IPFS gateways</p>
                  </div>
                  <div className={styles.settings_options_input}>
                    <textarea
                      resize="both"
                      value={userProfile?.plebbitOptions?.ipfsGatewayUrls?.join('\r\n')}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          plebbitOptions: {
                            ...userProfile?.plebbitOptions,
                            ipfsGatewayUrls: e.target.value.split(/\r?\n/),
                          },
                        })
                      }
                      type="text"
                      placeholder="IPFS Gateway URLs"
                      style={{
                        minHeight: '80px',
                      }}
                    />
                  </div>
                </div>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3> IPFS Http Clients Options (optional)</h3>
                    <p>
                      Optional URLs of an IPFS API or IPFS Http Clients Options,{' '}
                      <strong
                        style={{
                          color: '#0079d3',
                        }}
                      >
                        http://localhost:5001
                      </strong>{' '}
                      to use a local IPFS node{' '}
                    </p>
                  </div>
                  <div className={styles.settings_options_input}>
                    <textarea
                      resize="both"
                      value={userProfile?.plebbitOptions?.ipfsHttpClientsOptions?.join('\r\n')}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          plebbitOptions: {
                            ...userProfile?.plebbitOptions,
                            ipfsHttpClientsOptions: e.target.value.split(/\r?\n/),
                          },
                        })
                      }
                      type="text"
                      placeholder="IPFS Http Clients Options (optional)"
                      style={{
                        minHeight: '80px',
                      }}
                    />
                  </div>
                </div>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3> Pubsub Http Clients Options (optional)</h3>
                    <p>
                      Optional URLs or Ipfs Http Clients Options used for pubsub publishing when
                      IPFS Http Clients Options isn't available, like in the browser
                    </p>
                  </div>
                  <div className={styles.settings_options_input}>
                    <textarea
                      resize="both"
                      value={userProfile?.plebbitOptions?.pubsubHttpClientsOptions?.join('\r\n')}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          plebbitOptions: {
                            ...userProfile?.plebbitOptions,
                            pubsubHttpClientsOptions: e.target.value.split(/\r?\n/),
                          },
                        })
                      }
                      type="text"
                      placeholder="Pub Sub Http Clients Options (optional)"
                      style={{
                        minHeight: '80px',
                      }}
                    />
                  </div>
                </div>
                <div className={styles.settings_options}>
                  <div className={styles.settings_options_title}>
                    <h3>Data Path (optional)</h3>
                    <p>
                      (Node only) Optional folder path to create/resume the user and subplebbit
                      databases
                    </p>
                  </div>
                  <div className={styles.settings_options_input}>
                    <input
                      value={userProfile?.plebbitOptions?.dataPath}
                      maxLength={30}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          plebbitOptions: {
                            ...userProfile?.plebbitOptions,
                            dataPath: e.target.value,
                          },
                        })
                      }
                      type="text"
                      disabled
                      placeholder=" dataPath (optional)"
                    />
                  </div>
                </div>
                <h3 className={styles.settings_title}>PLEBBIT Cache</h3>
                <div className={styles.settings_options}>
                  <div className={styles.setting_account_del}>
                    <button
                      onClick={() => handleConfirm('Do you want to Clear Cache?', handleClearDb)}
                    >
                      <RiDeleteBinLine />
                      CLEAR CACHE
                    </button>
                  </div>
                </div>
                <h3 className={styles.settings_title}>Chain Providers</h3>
                <div className={styles.settings_options}>
                  <div className={styles.setting_account_del}>
                    <button
                      onClick={() => setBlockClose(true)}
                      style={{
                        color: '#0079d3',
                      }}
                    >
                      Add Custom
                    </button>
                  </div>
                </div>

                {Object?.keys(userProfile?.plebbitOptions?.chainProviders || {})?.map((val) => (
                  <div className={styles.settings_options} key={val}>
                    <div className={styles.chain_option_wrap}>
                      <div className={styles.settings_options_title}>
                        <h3> {val}</h3>
                        <p>ChainTicker of the provider RPC</p>
                      </div>
                      <button
                        onClick={() =>
                          handleConfirm(
                            'Do you want to delete this Block Provider?',
                            handleDelete(val)
                          )
                        }
                      >
                        X
                      </button>
                    </div>

                    <div className={styles.settings_options_input}>
                      <input
                        value={val}
                        type="text"
                        placeholder="ChainProvider Chain Ticker"
                        disabled
                      />
                    </div>

                    <div className={styles.settings_options_title}>
                      <h3>URLs</h3>
                      <p>URLs of the provider RPC</p>
                    </div>
                    <div className={styles.settings_options_input}>
                      <textarea
                        resize="both"
                        value={userProfile?.plebbitOptions?.chainProviders[val]?.urls?.join('\r\n')}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            plebbitOptions: {
                              ...userProfile?.plebbitOptions,
                              chainProviders: {
                                ...userProfile?.plebbitOptions?.chainProviders,
                                [val]: {
                                  ...userProfile?.plebbitOptions?.chainProviders[val],
                                  urls: e.target.value.split(/\r?\n/),
                                },
                              },
                            },
                          })
                        }
                        type="text"
                        placeholder="ChainProvider URLs"
                        style={{
                          minHeight: '80px',
                        }}
                      />
                    </div>
                    <div className={styles.settings_options_title}>
                      <h3>chainId</h3>
                      <p>ID of the EVM chain if any</p>
                    </div>
                    <div className={styles.settings_options_input}>
                      <input
                        type="number"
                        value={userProfile?.plebbitOptions?.chainProviders[val]?.chainId}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            plebbitOptions: {
                              ...userProfile?.plebbitOptions,
                              chainProviders: {
                                ...userProfile?.plebbitOptions?.chainProviders,
                                [val]: {
                                  ...userProfile?.plebbitOptions?.chainProviders[val],
                                  chainId: e.target.value,
                                },
                              },
                            },
                          })
                        }
                        placeholder="ChainProvider chainId"
                      />
                    </div>

                    <hr
                      style={{
                        marginTop: '20px',
                        marginBottom: '20px',
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
