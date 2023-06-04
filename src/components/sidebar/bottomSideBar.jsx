import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import plebbitReactPackageJson from '../../../package.json';
import { bottomData1, bottomData2 } from './linksData';

const BottomSideBar = ({ bg }) => {
  const Bg = useColorModeValue('lightBody', 'darkBody');


  return (
    <Box position="sticky" top="57px">
      <Box marginTop="16px" background={ bg || Bg }>
        <Box maxHeight="none">
          <Flex padding="12px 8px">
            <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
              { bottomData1?.map((item, index) => (
                <a target="_blank" rel="noreferrer" href={ item?.link } key={ index }>
                  <Box
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    marginTop="3px"
                    marginBottom="3px"
                    display="inline-block"
                  >
                    { item?.label }
                  </Box>
                </a>
              )) }
            </Flex>
            <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
              { bottomData2?.map((item, index) => (
                <a target="_blank" rel="noreferrer" href={ item?.link } key={ index }>
                  <Box
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    marginTop="3px"
                    marginBottom="3px"
                    display="inline-block"
                  >
                    { item?.label }
                  </Box>
                </a>
              )) }
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
            Plebbit v{ plebbitReactPackageJson.version }. GPL-2.0
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomSideBar;
