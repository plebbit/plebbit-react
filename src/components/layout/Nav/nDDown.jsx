import { Box, Flex, Image, Icon, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { GiBlackHoleBolas } from 'react-icons/gi';
import numFormatter from '../../../utils/numberFormater';
import { ProfileContext } from '../../../store/profileContext';

const NDDown = ({ onClick }) => {
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const { profile } = useContext(ProfileContext);
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
            <Box mr="5px" position="relative">
              <Box
                borderRadius="4px"
                float="left"
                maxH="24px"
                maxW="24px"
                height="24px"
                width="24px"
                position="relative"
              >
                <Box
                  borderRadius="50%"
                  border={`1px solid ${navBorder}`}
                  height="100%"
                  width="100%"
                />
                <Box width="100%" position="absolute" bottom="0">
                  <Image
                    src="https://styles.redditmedia.com/t5_4oocjn/styles/profileIcon_snooe4ba26fa-42e3-40e3-9041-c16e6bb3bbe6-headshot.png?width=256&height=256&crop=256:256,smart&s=84d5bed290c0ec6ffcce4cbd5931736282f306bf"
                    display="block"
                  />
                </Box>
              </Box>
              <svg
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: '50%',
                  fill: '#46d160',
                  left: '59%',
                  width: '50%',
                  position: 'absolute',
                  top: '59%',
                }}
              >
                <circle cx="6" cy="6" r="4"></circle>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                ></path>
              </svg>
            </Box>
            <Box>
              <Box
                fontSize="12px"
                fontWeight="500"
                lineHeight="16px"
                color={mainColor}
                whiteSpace="nowrap"
              >
                {profile?.author?.displayName}
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
