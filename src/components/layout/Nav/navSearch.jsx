import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import getIsOnline from '../../../utils/getIsOnline';
import Avatar from '../../Avatar';
import Link from '../../Link';

const NavSearch = () => {
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const bg = useColorModeValue('lightBody', 'darkBody');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const [searchVal, setSearchVal] = useState('');

  const data = useSubplebbit(searchVal ? { subplebbitAddress: searchVal } : undefined);

  return (
    <Flex
      flexGrow={ 1 }
      marginX="16px"
      width="auto"
      height="auto"
      border="1px solid transparent"
      borderRadius="4px"
      alignItems="center"
      flexDirection="column"
      position="relative"
    >
      <InputGroup
        boxShadow="none"
        height="36px"
        bg={ inputBg }
        borderWidth="1px"
        borderColor={ navBorder }
        alignItems="center"
        boxSizing="border-box"
      >
        <InputLeftElement>
          <Icon as={ RiSearchLine } color={ iconColor } w="20px" h="20px" />
        </InputLeftElement>
        <Input
          placeholder="Search plebbit"
          value={ searchVal }
          onChange={ (e) => setSearchVal(e.target.value) }
        />
      </InputGroup>
      { searchVal && (
        <Flex
          padding="20px"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="5px"
          borderColor={ navBorder }
          top="45px"
          width="100%"
          position="absolute"
          background={ bg }
        >
          <Link to={ `/p/${searchVal}` }>

            <Flex
              flexDirection="row"
              alignItems="center"
              width="100%"
              cursor="pointer"
            >
              <Avatar
                avatar={ data?.avatar }
                width={ 24 }
                height={ 24 }
                sx={ {
                  marginRight: '8px',
                } }
                badge={ data !== undefined ? true : false }
                isOnline={ getIsOnline(data?.updateAt) }
              />
              <Flex flexDir="column" overflow="hidden">
                { data?.title && (
                  <Box flex={ 1 } overflow="hidden" fontSize="14px" fontWeight="500" lineHeight="18px">
                    { data?.title }
                  </Box>
                ) }

                <Box
                  wordBreak="break-all"
                  color={ metaColor }
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="16px"
                  noOfLines={ 1 }
                  isTruncated
                >
                  { searchVal }
                </Box>
              </Flex>
            </Flex>
          </Link>
        </Flex>
      ) }
    </Flex>
  );
};

export default NavSearch;
