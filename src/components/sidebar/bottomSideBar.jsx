import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import plebbitReactPackageJson from '../../../package.json';

const BottomSideBar = ({ bg }) => {
  const Bg = useColorModeValue('lightBody', 'darkBody');
  const bottomData1 = [
    { label: 'Report a Bug', link: 'https://t.me/plebbit' },
    { label: 'PLEB Token', link: 'https://plebbit.eth.limo' },
    { label: 'Plebbit NFTs', link: 'https://plebbit.eth.limo' },
    { label: 'Desktop & Android App', link: 'https://github.com/plebbit/plebbit-react/releases/latest' },
    { label: 'Whitepaper', link: 'https://github.com/plebbit/whitepaper/discussions/2' },
    { label: 'Github', link: 'https://github.com/plebbit' },
    { label: 'Open Source Code', link: 'https://github.com/plebbit/plebbit-js/blob/master/LICENSE' },
  ];
  const bottomData2 = [
    { label: 'About', link: 'https://medium.com/@plebbit/about-plebbit-3edb35ac48f1' },
    { label: 'We Are Hiring JS Devs', link: 'https://medium.com/@plebbit/plebbit-is-hiring-javascript-developers-cc20980b42ae' },
    { label: 'Twitter', link: 'https://twitter.com/getplebbit' },
    { label: 'Telegram', link: 'https://t.me/plebbit' },
    { label: 'Blog', link: 'https://medium.com/@plebbit' },
    { label: 'Discord', link: 'https://discord.gg/E7ejphwzGW' },
    { label: 'Matrix', link: 'https://matrix.to/#/#plebbit:plebbitchat.org' },
  ];

  return (
    <Box position="sticky" top="57px">
      <Box marginTop="16px" background={bg || Bg}>
        <Box maxHeight="none">
          <Flex padding="12px 8px">
            <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
              {bottomData1?.map((item, index) => (
                <a target="_blank" rel="noreferrer" href={item?.link} key={index}>
                  <Box
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    marginTop="3px"
                    marginBottom="3px"
                    display="inline-block"
                  >
                    {item?.label}
                  </Box>
                </a>
              ))}
            </Flex>
            <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
              {bottomData2?.map((item, index) => (
                <a target="_blank" rel="noreferrer" href={item?.link} key={index}>
                  <Box
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    marginTop="3px"
                    marginBottom="3px"
                    display="inline-block"
                  >
                    {item?.label}
                  </Box>
                </a>
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
            Plebbit v{plebbitReactPackageJson.version} GPL-2.0
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomSideBar;
