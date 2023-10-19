import { BiCake } from 'react-icons/bi';
import { Button2 } from '../../components/Button';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';
import {
  useAccountSubplebbits,
  useSubplebbit,
  useSubplebbitStats,
  useSubscribe,
} from '@plebbit/plebbit-react-hooks';
import { dateFormater } from '../../utils/formatDate';
import getIsOnline from '../../utils/getIsOnline';
import Avatar from '../../components/Avatar';
import { getAddress, getSubName } from '../../utils/getUserName';
import { Link, useParams } from 'react-router-dom';
import { SideBarWrap } from '../../components/container/FeedContent';
import styles from './subplebbit.module.css';
import { MdOutlineMoreHoriz, MdOutlineShield } from 'react-icons/md';

const SubplebbitSideBar = ({ subPlebbit: subs }) => {
  const { subplebbitAddress } = useParams();
  const sub = useSubplebbit({ subplebbitAddress });
  const subPlebbit = { ...subs, sub };

  return (
    <SideBarWrap>
      <AboutSubSideBar subPlebbit={subPlebbit} hideSub />
      {subPlebbit?.rules && <SubRulesSideBar subPlebbit={subPlebbit} />}
      <SubModeratorSideBar subPlebbit={subPlebbit} />
      <BacktoTopButton />
    </SideBarWrap>
  );
};

export default SubplebbitSideBar;

export const AboutSubSideBar = ({ subPlebbit, hideSub, hideBtn }) => {
  const { subplebbitAddress } = useParams();
  const stats = useSubplebbitStats({ subplebbitAddress });
  const loading = subPlebbit === undefined || stats.state === 'fetching-ipfs';
  const { accountSubplebbits } = useAccountSubplebbits();
  const role = accountSubplebbits[subplebbitAddress]?.role?.role;
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';
  const { subscribe, unsubscribe, subscribed } = useSubscribe({
    subplebbitAddress,
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
  return (
    <div className={styles.pd_top}>
      <div className={styles.pd_top2}>
        <div
          className={styles.pd_top_banner}
          style={{
            backgroundImage: `url(${subPlebbit?.suggested?.bannerUrl})`,
            backgroundColor: subPlebbit?.suggested?.primaryColor,
          }}
        >
          {hideSub && (
            <>
              <h2 className={styles.pd_top_banner_title}>About Subplebbit</h2>
              <div className={styles.pd_top_banner_mod}>
                {allowedSpecial && (
                  <Link to={`/p/${subplebbitAddress}/about`}>
                    <MdOutlineShield />
                    MOD TOOLS
                  </Link>
                )}
                <button>
                  <MdOutlineMoreHoriz />
                </button>
              </div>
            </>
          )}
        </div>
        {!hideSub && (
          <div className={styles.pd_top_sub}>
            <Avatar
              avatar={subPlebbit?.suggested?.avatarUrl}
              width={54}
              height={54}
              badge
              isOnline={getIsOnline(subPlebbit?.updatedAt)}
              style={{
                marginRight: '8px',
              }}
            />
            <div className={styles.pd_top_subname}>
              <Link to={`/p/${subplebbitAddress}/`}>{getSubName(subPlebbit)}</Link>
            </div>
          </div>
        )}

        <div className={styles.pd_top_sub_desc}>
          <div className={styles.pd_top_sub_desc2}>{subPlebbit?.description}</div>
        </div>
        <div className={styles.pd_top_sub_created}>
          <BiCake />
          <span>
            Created {subPlebbit?.createdAt && dateFormater(subPlebbit?.createdAt * 1000)}{' '}
          </span>
        </div>
        <hr className={styles.ruler} />

        <div className={styles.pt_sub_info}>
          <div className={styles.pt_sub_info_item}>
            <div className={styles.pt_info_title}> {stats?.allActiveUserCount || 0}</div>
            <p>members</p>
          </div>
          <div className={styles.pt_sub_info_item}>
            <div> {stats?.hourActiveUserCount || 0}</div>
            <p>online</p>
          </div>
        </div>
        <hr className={styles.ruler} />
        {!hideBtn && (
          <Link to={hideSub && `/p/${subplebbitAddress}/submit`} className={styles.join_sub}>
            {hideSub ? (
              <Button2
                style={{
                  width: '100%',
                  color: subPlebbit?.suggested?.secondaryColor,
                }}
                onClick={subscribed ? handleUnSubscribe : handleSubscribe}
                disabled={loading}
              >
                Create Post
              </Button2>
            ) : (
              <Button2
                style={{
                  width: '100%',
                  color: subPlebbit?.suggested?.secondaryColor,
                }}
                onClick={subscribed ? handleUnSubscribe : handleSubscribe}
                disabled={loading}
              >
                {subscribed ? 'Joined' : 'Join'}
              </Button2>
            )}
          </Link>
        )}
        <hr className={styles.ruler} />
      </div>
    </div>
  );
};

export const SubModeratorSideBar = ({ subPlebbit }) => {
  const { subplebbitAddress } = useParams();
  const { accountSubplebbits } = useAccountSubplebbits();
  const role = accountSubplebbits[subplebbitAddress]?.role?.role;
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';

  return (
    <div
      className={styles.pd_top}
      style={{
        marginTop: '16px',
      }}
    >
      <div className={styles.pd_top2}>
        <div
          className={styles.pd_top_banner}
          style={{
            backgroundColor: subPlebbit?.suggested?.primaryColor,
          }}
        >
          <h2 className={styles.pd_top_banner_title}>Moderators</h2>
        </div>
        {subPlebbit?.roles &&
          Object.keys(subPlebbit?.roles)?.map((item, index) => (
            <div
              className={styles.pd_sub_roles}
              key={index}
              style={{
                color: subPlebbit?.suggested?.secondaryColor,
              }}
            >
              {getAddress(item)}
            </div>
          ))}
        <div className={styles.view_mods}>
          <Link
            to={
              Object.keys(subPlebbit?.roles || {}) && allowedSpecial
                ? `/p/${subplebbitAddress}/about/moderators`
                : `/p/${subplebbitAddress}/moderators`
            }
            style={{
              color: subPlebbit?.suggested?.secondaryColor,
            }}
          >
            View All Moderators
          </Link>
        </div>
      </div>
    </div>
  );
};
export const SubRulesSideBar = ({ subPlebbit }) => {
  return (
    <div
      className={styles.pd_top}
      style={{
        marginTop: '16px',
      }}
    >
      <div className={styles.pd_top2}>
        <div
          className={styles.pd_top_banner}
          style={{
            backgroundColor: subPlebbit?.suggested?.primaryColor,
          }}
        >
          <h2 className={styles.pd_top_banner_title}>{getSubName(subPlebbit)}</h2>
        </div>
        {subPlebbit?.rules &&
          subPlebbit?.rules?.map((item, index) => (
            <div className={styles.side_top_communities_link2}>
              <span className={styles.sn}>{index + 1}</span>

              <div className={styles.comm_add}> {item}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
