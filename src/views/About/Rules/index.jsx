import { Box, Button, Flex, Icon, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { HiPencil } from 'react-icons/hi';
import { CgNotes } from 'react-icons/cg';
import { ProfileContext } from '../../../store/profileContext';
import AddRules from './modal/addRules';

const Rules = ({ subPlebbit, handleSubPlebbitedit, allowedSpecial, loading }) => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  //   const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const { device } = useContext(ProfileContext);
  const [mode, setMode] = useState('create');
  const { isOpen: showAdd, onOpen: OpenShowAdd, onClose: closeShowAdd } = useDisclosure(false);
  const [selected, setSelected] = useState('');

  return (
    <Flex flexDir="column">
      <Flex
        alignItems="center"
        background={border1}
        height="48px"
        justifyContent={device !== 'mobile' ? 'flex-end' : 'flex-start'}
        left={device !== 'mobile' ? '280px' : '0'}
        padding={device !== 'mobile' ? '0 24px' : '5px 24px'}
        position="fixed"
        right="0"
        zIndex="3"
      >
        <Button
          colorScheme="blackAlpha"
          position="relative"
          fontSize="14px"
          fontWeight="700"
          lineHeight="17px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width="auto"
          borderRadius="999px"
          padding="4px 16px"
          height={device !== 'mobile' ? '32px' : '24px'}
          onClick={() => {}}
          mt={device === 'mobile' && '6px'}
          disabled={!allowedSpecial}
          color={mainColor}
        >
          Reorder Rules
        </Button>
        <Button
          variant="outline"
          colorScheme="blackAlpha"
          mr="8px"
          position="relative"
          fontSize="14px"
          fontWeight="700"
          lineHeight="17px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width="max-content"
          borderRadius="999px"
          padding="4px 16px"
          height={device !== 'mobile' ? '32px' : '24px'}
          onClick={() => {
            setMode('create');
            OpenShowAdd();
          }}
          mt={device === 'mobile' && '6px'}
          disabled={!allowedSpecial || showAdd}
          color={mainColor}
        >
          Add Rules
        </Button>
      </Flex>

      <Box ml="24px" mr="24px" paddingTop="64px" borderRadius="0 0 4px 4px" overflow="hidden">
        <Flex flexDirection="column" padding="8px 0 16px">
          <Flex
            fontSize="18px"
            fontWeight="500"
            lineHeight="22px"
            color={mainColor}
            marginBottom="16px"
            alignItems="center"
          >
            <Box>Rules </Box>
            <Icon as={AiOutlineInfoCircle} ml="4px" verticalAlign="text-top" />
          </Flex>
          <Box>
            These are rules that visitors must follow to participate. They can be used as reasons to
            report or ban posts, comments, and users. Communities can have a maximum of 15 rules.
          </Box>
        </Flex>

        <Flex
          borderRadius="0 4px 4px 0"
          boxSizing="border-box"
          marginBottom="36px"
          overflow="hidden"
          flexDir="column"
        >
          {subPlebbit?.rules?.map((rule, index) => (
            <Flex
              key={index}
              borderBottom={`1px solid ${border1}`}
              bg={mainBg}
              fontSize="14px"
              fontWeight="400"
              lineHeight="21px"
              padding="15px 20px"
              alignItems="center"
              borderRadius="3px"
            >
              <Box>{+index + 1}</Box>
              <Box ml="16px"> {rule}</Box>
              <Icon
                ml="auto"
                as={HiPencil}
                onClick={() => {
                  setMode('edit');
                  setSelected(rule);
                  OpenShowAdd();
                }}
              />
            </Flex>
          ))}

          {!subPlebbit?.rules && (
            <Flex alignItems="center" bg={mainBg} flexDir="column" padding="90px 0">
              <Icon as={CgNotes} width={8} height={8} color={iconColor} mb="16px" />
              <Box fontSize="18px" fontWeight="500" lineHeight="22px" mb="8px">
                No rules yet
              </Box>
            </Flex>
          )}
        </Flex>
      </Box>
      {showAdd && (
        <AddRules
          isOpen={showAdd}
          onClose={closeShowAdd}
          handleSubPlebbitedit={handleSubPlebbitedit}
          loading={loading}
          rules={subPlebbit?.rules}
          mode={mode}
          data={selected}
        />
      )}
    </Flex>
  );
};

export default Rules;
