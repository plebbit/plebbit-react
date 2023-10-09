import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Switch,
  Tag,
  Td,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ColorPicker from '../ColorPicker';
import { v4 as uuidv4 } from 'uuid';
import FlairLabel from '../Label/flairLabel';

const FlairList = ({ data, mode, setShowAdd, type, handleSubPlebbitedit, flairs }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const [showEdit, setShowEdit] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [flair, setFlair] = useState({
    id: mode === 'create' ? uuidv4() : data?.id,
    backgroundColor: mode === 'create' ? '#DADADA' : data?.backgroundColor,
    textColor: mode === 'create' ? '#fff' : data?.textColor,
    ...data,
  });

  useEffect(() => {
    setFlair({
      id: mode === 'create' ? uuidv4() : data?.id,
      backgroundColor: mode === 'create' ? '#DADADA' : data?.backgroundColor,
      textColor: mode === 'create' ? '#fff' : data?.textColor,
      ...data,
    });

    return () => {
      setFlair({});
    };
  }, []);

  return (
    <>
      <Tr
        fontSize="12px"
        fontWeight="400"
        lineHeight="16px"
        bg={mainBg}
        borderBottom={`1px solid ${border1}`}
        boxSizing="border-box"
        color={iconColor}
        height="48px"
        padding="16px 42px 16px 24px"
      >
        <Td>
          <FlairLabel flair={flair} />
        </Td>
        <Td>Editable, Allows text and up to 10 emojis</Td>
        <Td display="flex" justifyContent="flex-end" alignItems="center">
          <Box
            padding="4px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            onClick={() => (mode === 'create' ? '' : setShowEdit(!showEdit))}
            cursor="pointer"
            fontWeight="bold"
            _hover={{
              background: metaColor,
              borderRadius: '3px',
            }}
          >
            EDIT
          </Box>
          <Icon
            ml="auto"
            onClick={() =>
              mode === 'create'
                ? setShowAdd(false)
                : handleSubPlebbitedit({
                    flairs: {
                      post: flairs?.post ? flairs?.post : [],
                      author: flairs?.author ? flairs?.author : [],
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      [type]: [...flairs[type]?.filter((x) => x?.id !== flair?.id)],
                    },
                  })
            }
            as={RiDeleteBin6Line}
            verticalAlign="text-top"
          />
        </Td>
      </Tr>
      {(showEdit || mode === 'create') && (
        <>
          <Tr width="100%" bg={border1}>
            <Td flexDir="column">
              <Box
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                letterSpacing=".5px"
                color={metaColor}
              >
                FLAIR APPEARANCE
              </Box>
              <Flex flexDir="column" marginTop="16px">
                <Box mb="8px" fontSize="14px" fontWeight="500" lineHeight="18px">
                  Flair text
                </Box>
                <Input
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="21px"
                  bg={mainBg}
                  border={`1px solid ${border1}`}
                  borderColor={border1}
                  borderRadius="4px"
                  padding="8px 30px 8px 8px"
                  onChange={(e) => setFlair({ ...flair, text: e.target.value })}
                  value={flair?.text}
                  maxLength={15}
                />
                <Box color={metaColor} mt="4px" fontSize="12px" fontWeight="400" lineHeight="16px">
                  {flair?.text?.length} characters remaining
                </Box>
              </Flex>
              <Flex flexDir="column" marginTop="16px">
                <Box mb="8px" fontSize="14px" fontWeight="500" lineHeight="18px">
                  CSS class
                </Box>
                <Input
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="21px"
                  bg={mainBg}
                  border={`1px solid ${border1}`}
                  borderColor={border1}
                  placeholder="none"
                  borderRadius="4px"
                  padding="8px 30px 8px 8px"
                />
                <Box color={metaColor} mt="4px" fontSize="12px" fontWeight="400" lineHeight="16px">
                  optional
                </Box>
              </Flex>
              <Flex flexDir="column" marginTop="16px">
                <Flex
                  justifyContent="space-between"
                  mb="8px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                >
                  <Box>Add flair background</Box>
                  <Switch
                    isChecked={showBg}
                    onChange={() => {
                      showBg && setFlair({ ...flair, backgroundColor: '#DADADA' });
                      setShowBg(!showBg);
                    }}
                  />
                </Flex>
              </Flex>
              {showBg && (
                <>
                  <Flex flexDir="column" marginTop="16px">
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      mb="8px"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                    >
                      <Box>Flair background color</Box>
                      <ColorPicker
                        color={flair?.backgroundColor}
                        onChange={(val) => setFlair({ ...flair, backgroundColor: val?.hex })}
                      />
                    </Flex>
                  </Flex>
                  <Flex flexDir="column" marginTop="16px">
                    <Flex
                      justifyContent="space-between"
                      mb="8px"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      alignItems="center"
                    >
                      <Box>Flair text color</Box>
                      <Tag
                        width="24px"
                        height="24px"
                        borderRadius="2px"
                        onClick={() =>
                          setFlair({
                            ...flair,
                            textColor: flair?.textColor === '#fff' ? '#000' : '#fff',
                          })
                        }
                        color={flair?.textColor}
                        background="#Dadada"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        cursor="pointer"
                      >
                        Aa
                      </Tag>
                    </Flex>
                  </Flex>
                </>
              )}
            </Td>
            <Td flexDir="column">
              <Box
                fontSize="10px"
                fontWeight="700"
                lineHeight="12px"
                letterSpacing=".5px"
                color={metaColor}
              >
                FLAIR SETTINGS
              </Box>
              <Flex flexDir="column" marginTop="16px">
                <Flex
                  justifyContent="space-between"
                  mb="8px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                >
                  <Flex alignItems="center">
                    <Box>Mod only</Box>
                    <Icon color={iconColor} as={AiOutlineInfoCircle} size={5} ml="4px" />
                  </Flex>
                  <Switch />
                </Flex>
              </Flex>
              <Flex flexDir="column" marginTop="16px">
                <Flex
                  justifyContent="space-between"
                  mb="8px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                >
                  <Flex alignItems="center">
                    <Box>Allow user edits</Box>
                    <Icon color={iconColor} as={AiOutlineInfoCircle} size={5} ml="4px" />
                  </Flex>
                  <Switch />
                </Flex>
              </Flex>
            </Td>
            <Td />
          </Tr>
          <Tr width="100%" bg={border1}>
            <Td />
            <Td />
            <Td flexDir="column">
              <Button
                onClick={() => (mode === 'create' ? setShowAdd(false) : setShowEdit(false))}
                borderRadius="999px"
                mr="8px"
                variant="outline"
                colorScheme="red"
                h="32px"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  mode === 'create'
                    ? handleSubPlebbitedit({
                        flairs: {
                          post: flairs?.post ? flairs?.post : [],
                          author: flairs?.author ? flairs?.author : [],
                          [type]:
                            type === 'post'
                              ? flairs?.post
                                ? // eslint-disable-next-line no-unsafe-optional-chaining
                                  [...flairs?.post, flair]
                                : [flair]
                              : flairs?.author // eslint-disable-next-line no-unsafe-optional-chaining
                              ? [...flairs?.author, flair]
                              : [flair],
                        },
                      })
                    : handleSubPlebbitedit({
                        flairs: {
                          post: flairs?.post ? flairs?.post : [],
                          author: flairs?.author ? flairs?.author : [],
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          [type]: [...flairs[type]?.filter((x) => x?.id !== flair?.id), flair],
                        },
                      });

                  setShowAdd(false);
                  setShowEdit(false);
                }}
                h="32px"
                borderRadius="999px"
                colorScheme="blackAlpha"
              >
                Save
              </Button>
            </Td>
          </Tr>
        </>
      )}
    </>
  );
};

export default FlairList;
