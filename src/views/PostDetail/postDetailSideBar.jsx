import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  Icon,
  Skeleton,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { BiCake } from 'react-icons/bi';
import Button, { Button2 } from '../../components/Button';
import BottomSideBar from '../../components/sidebar/bottomSideBar';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';
import {
  useAccountSubplebbits,
  useSubplebbit,
  useSubplebbitStats,
} from '@plebbit/plebbit-react-hooks';
import { dateFormater } from '../../utils/formatDate';
import getIsOnline from '../../utils/getIsOnline';
import Avatar from '../../components/Avatar';
import { getAddress, getSubName } from '../../utils/getUserName';
import { Link, useParams } from 'react-router-dom';
import { SideBarWrap } from '../../components/container/FeedContent';
import styles from './post-detail.module.css';

const PostDetailSideBar2 = ({
  mt,
  borderRadius,
  ml,
  margin,
  width,
  padding,
  top,
  right,
  sx,
  border,
  borderColor,
  bg,
  detail,
  handleUnSubscribe,
  handleSubscribe,
  subLoading,
  subplebbit: subs,
  subscribed,
}) => {
  const color = useColorModeValue('darkText', 'lightText');
  const Bg = useColorModeValue('#F8F9FA', '#1A1A1B');
  const sub = useSubplebbit({ subplebbitAddress: detail?.subplebbitAddress });
  const subPlebbit = sub || subs;
  const stats = useSubplebbitStats({ subplebbitAddress: detail?.subplebbitAddress });
  const loading = subPlebbit === undefined || stats.state === 'fetching-ipfs';
  const role = accountSubplebbits[subplebbitAddress]?.role?.role;

  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';

  return (
    <Box
      marginLeft={ml || '24px'}
      marginTop={mt || '28px'}
      border={border}
      borderColor={borderColor}
      margin={margin}
      width={width}
      padding={padding}
      borderRadius={borderRadius}
      top={top}
      right={right}
      sx={
        sx || {
          '@media (min-width: 960px)': {
            display: 'block',
          },
          '@media (max-width: 960px)': {
            display: 'none',
            width: '312px',
            flex: '0 0 312px',
          },
        }
      }
    >
      <Flex flexDirection="column" height="100%" width="inherit">
        <Box borderRadius="4px" overflow="visible" wordBreak="break-word" bg={bg || Bg}>
          <Box
            maxHeight="none"
            backgroundPosition="50%"
            backgroundRepeat="no-repeat"
            borderTopRadius="4px"
            h="40px"
            pos="relative"
            backgroundColor="#a4a4a4"
          >
            <Text
              fontSize="16px"
              fontWeight="500"
              lineHeight="20px"
              bottom="8px"
              color="#fff"
              left="16px"
              position="absolute"
            />
          </Box>
          <Flex width="100" padding="12px" alignItems="center" mb="8px">
            <Skeleton borderRadius="50%" width="54px" height="54px" mr="8px" isLoaded={!loading}>
              <Avatar
                avatar={subPlebbit?.suggested?.avatarUrl}
                width={54}
                height={54}
                badge
                isOnline={getIsOnline(subPlebbit?.updatedAt)}
                mr="8px"
              />
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <Box
                cursor="pointer"
                as={Link}
                to={`/p/${detail?.subplebbitAddress}/`}
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                text-overflow="ellipsis"
              >
                {getSubName(subPlebbit)}
              </Box>
            </Skeleton>
          </Flex>
          <Box marginBottom="8px" position="relative" padding="12px">
            {subPlebbit?.about}
          </Box>

          <Box padding="12px">
            <Grid gap="12px" templateColumns="auto auto 42px">
              <GridItem w="100%">
                <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                  {stats?.allActiveUserCount || 0}
                </Box>
                <Box fontSize="12px" lineHeight="16px" fontWeight="500" wordBreak="break-word">
                  Members
                </Box>
              </GridItem>
              <GridItem w="100%">
                <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                  {stats?.hourActiveUserCount || 0}
                </Box>
                <Box fontSize="12px" lineHeight="16px" fontWeight="500" wordBreak="break-word">
                  Online
                </Box>
              </GridItem>
              <GridItem w="100%" />
            </Grid>
          </Box>

          <Box padding="12px">
            <hr />
          </Box>
          <Box>
            <Flex
              alignItems="center"
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              flexFlow="row nowrap"
              padding="12px"
            >
              <Icon as={BiCake} margin="-2px 8px 0 0" w={6} h={6} color="inherit" />
              <Box>
                Created {subPlebbit?.createdAt && dateFormater(subPlebbit?.createdAt * 1000)}{' '}
              </Box>
            </Flex>
          </Box>

          <Box padding="12px">
            <Button
              color={color}
              content={subscribed ? 'Joined' : 'Join'}
              bg="#a4a4a4"
              height="34px"
              width="100%"
              onClick={subscribed ? handleUnSubscribe : handleSubscribe}
              loading={subLoading}
            />
          </Box>
        </Box>

        <Box flex="1 1 auto" width="inherit" position="relative">
          <BottomSideBar bg={bg} />
          <BacktoTopButton />
        </Box>
      </Flex>
    </Box>
  );
};

const PostDetailSideBar = ({
  detail,
  handleUnSubscribe,
  handleSubscribe,
  subLoading,
  subplebbit: subs,
  subscribed,
}) => {
  const { subplebbitAddress } = useParams();
  const { accountSubplebbits } = useAccountSubplebbits();
  const role = accountSubplebbits[subplebbitAddress]?.role?.role;
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';
  const sub = useSubplebbit({ subplebbitAddress });
  const subPlebbit = sub || subs;
  const stats = useSubplebbitStats({ subplebbitAddress });
  const loading = subPlebbit === undefined || stats.state === 'fetching-ipfs';

  return (
    <SideBarWrap>
      <div className={styles.pd_top}>
        <div className={styles.pd_top2}>
          <div
            className={styles.pd_top_banner}
            style={{
              backgroundImage: `url(${subPlebbit?.suggested?.bannerUrl})`,
              backgroundColor: subPlebbit?.suggested?.primaryColor,
            }}
          />
          <div className={styles.pd_top_sub}>
            <Avatar
              avatar={subPlebbit?.suggested?.avatarUrl}
              width={54}
              height={54}
              badge
              isOnline={getIsOnline(subPlebbit?.updatedAt)}
              mr="8px"
            />
            <div className={styles.pd_top_subname}>
              <Link to={`/p/${subplebbitAddress}/`}>{getSubName(subPlebbit)}</Link>
            </div>
          </div>

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
          <div className={styles.join_sub}>
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
          </div>
          <hr className={styles.ruler} />
        </div>
      </div>
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
            Moderators
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
                subPlebbit?.roles && allowedSpecial
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
      <BacktoTopButton />
    </SideBarWrap>
  );
};

export default PostDetailSideBar;
