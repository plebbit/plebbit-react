import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import plebbitReactPackageJson from '../../../package.json';
import { Link } from 'react-router-dom';

const BottomSideBar = ({ bg }) => {
  const Bg = useColorModeValue('#F8F9FA', '');
  const bottomData1 = [
    { label: 'Help', link: '' },
    { label: 'Plebbit Coins', link: '' },
    { label: 'Plebbit Premium', link: '' },
    { label: 'Communities', link: '' },
    { label: 'Plebbit', link: '' },
    { label: 'Topics', link: '' },
  ];
  const bottomData2 = [
    { label: 'About', link: '' },
    { label: 'Careers', link: '' },
    { label: 'Press', link: '' },
    { label: 'Advertise', link: '' },
    { label: 'Blog', link: '' },
    { label: 'Content Policy', link: '' },
    { label: 'Privacy Policy', link: '' },
    { label: ' Mod Policy', link: '' },
  ];

  return (
    <Box position="sticky" top="57px">
      <Box marginTop="16px" background={bg || Bg}>
        <Box maxHeight="none">
          <Flex padding="12px 8px">
            <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
              {bottomData1?.map((item, index) => (
                <Link to={item?.link} key={index}>
                  <Box
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    marginTop="3px"
                    marginBottom="3px"
                    display="inline-block"
                    textTransform="capitalize"
                  >
                    {item?.label}
                  </Box>
                </Link>
              ))}
            </Flex>
            <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
              {bottomData2?.map((item, index) => (
                <Link to={item?.link} key={index}>
                  <Box
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    marginTop="3px"
                    marginBottom="3px"
                    display="inline-block"
                    textTransform="capitalize"
                  >
                    {item?.label}
                  </Box>
                </Link>
              ))}
            </Flex>
          </Flex>
          <Flex
            padding="12px"
            fontSize="12px"
            fontWeight="400"
            lineHeight="16px"
            marginTop="3px"
            marginBottom="3px"
            display="inline-block"
          >
            plebbit Inc v{plebbitReactPackageJson.version} © {new Date().getFullYear()} . All rights
            reserved
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomSideBar;
