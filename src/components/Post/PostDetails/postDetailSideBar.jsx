import React from 'react';
import { Box, Text, Flex, Image, useColorModeValue, Icon } from '@chakra-ui/react';
import { BiCake } from 'react-icons/bi';
import Button from '../../Button';
import BottomSideBar from '../../sidebar/bottomSideBar';
import BacktoTopButton from '../../sidebar/backtoTopButton';
import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import { dateFormater } from '../../../utils/formatDate';

const PostDetailSideBar = ({
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
  subscriptions,
  detail,
  handleUnSubscribe,
  handleSubscribe,
  subLoading,
}) => {
  const color = useColorModeValue('darkText', 'lightText');
  const Bg = useColorModeValue('#F8F9FA', '#1A1A1B');
  const subPlebbit = useSubplebbit(detail?.subplebbitAddress);

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
            <Image
              fallbackSrc={require('../../../assets/images/fallback.png')}
              borderRadius="full"
              boxSize="54px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              mr="8px"
            />
            <Box fontSize="16px" fontWeight="500" lineHeight="20px" text-overflow="ellipsis">
              p/{subPlebbit?.title || subPlebbit?.address}
            </Box>
          </Flex>
          <Box marginBottom="8px" position="relative" padding="12px">
            p/{subPlebbit?.title || subPlebbit?.address} - about blah blah ....
          </Box>
          <Flex marginBottom="8px" padding="12px">
            <Flex flexDirection="column" paddingRight="4px" flex="auto">
              <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                __m
              </Box>
              <Box fontSize="12px" fontWeight="500" lineHeight="16px" wordBreak="break-word">
                Members
              </Box>
            </Flex>
            <Flex flexDirection="column" paddingRight="4px" paddingLeft="16px" flex="auto">
              <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                ___k
              </Box>
              <Box fontSize="12px" fontWeight="500" lineHeight="16px" wordBreak="break-word">
                Online
              </Box>
            </Flex>
            <Flex />
          </Flex>
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
              <Box>Created {dateFormater(subPlebbit?.createdAt * 1000)} </Box>
            </Flex>
          </Box>

          <Box padding="12px">
            <Button
              color={color}
              content={subscriptions?.includes(detail?.subplebbitAddress) ? 'Joined' : 'Join'}
              bg="#a4a4a4"
              height="34px"
              width="100%"
              onClick={
                subscriptions?.includes(detail?.subplebbitAddress)
                  ? handleUnSubscribe
                  : handleSubscribe
              }
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

export default PostDetailSideBar;
