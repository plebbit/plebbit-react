import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { GiBlackHoleBolas } from 'react-icons/gi';
import numFormatter from '../../../utils/numberFormater';
import { ProfileContext } from '../../../store/profileContext';
import Avatar from '../../Avatar';

const NDDown = ({ onClick }) => {
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const { profile, authorAvatarImageUrl } = useContext(ProfileContext);

  return (
    <Box onClick={onClick}>
      <Box
        alignItems="center"
        textAlign="left"
        width="100%"
        borderRadius="4px"
        padding="2px 0"
        border="1px solid transparent"
        minH="32px"
        marginLeft="8px"
        background="transparent"
        _hover={{
          background: 'transparent',
          border: `1px solid ${navBorder}`,
        }}
      >
        <Flex>
          <Flex width="175px" alignItems="center" ml="8px" textAlign="left">
            <Avatar avatar={authorAvatarImageUrl} width={24} height={24} mr="5px" />
            <Box>
              <Box
                fontSize="12px"
                fontWeight="500"
                lineHeight="16px"
                color={mainColor}
                whiteSpace="nowrap"
              >
                {profile?.author?.displayName || profile?.name}
              </Box>
              <Box fontSize="12px" fontWeight="500" lineHeight="16px" color="#a8aaab">
                <Icon as={GiBlackHoleBolas} mr="1px" />
                {`${numFormatter(profile?.karma?.score)} karma`}
              </Box>
            </Box>
          </Flex>
          <ChevronDownIcon
            h={6}
            w={6}
            fontSize="20px"
            fontWeight="400"
            verticalAlign="middle"
            lineHeight="20px"
            color={iconColor}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default NDDown;
