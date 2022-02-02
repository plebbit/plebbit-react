import React, { useContext } from 'react';
import { Link as Lk } from 'react-router-dom';
import { Link, Box, Flex, Text, useColorModeValue, Image, Heading, Icon } from '@chakra-ui/react';
import { dateToNow } from '../../../utils/formatDate';
import VoteComponent, { HorizontalVoteComponent } from './VoteComponent';
import { ProfileContext } from '../../../store/profileContext';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import { FaShare } from 'react-icons/fa';
import { BiBell } from 'react-icons/bi';
import { BsBookmark, BsFlag, BsEyeSlash } from 'react-icons/bs';
import SideBar from './postDetailSideBar';

const PostDetails = ({ post }) => {
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const postBg = useColorModeValue('white', 'black');
  const postDetCover = useColorModeValue('lightLayoutBg', 'black');
  const subPledditTextColor = useColorModeValue('#1c1c1c', 'darkText');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const borderColor = useColorModeValue('#ccc', '#343536');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');

  const { postStyle } = useContext(ProfileContext);

  return (
    <Flex flexDirection="column" width="80%" bg={postDetCover} ju>
      <Box
        bg="#030303"
        h="48px"
        position="sticky"
        top="48px"
        zIndex="70"
        left="0"
        right="0"
        margin="0 auto"
        maxWidth="1280px"
        width="100%"
        transition="top .3s ease"
        tabIndex="-1"
      >
        <Flex
          alignItems="center"
          height="100%"
          padding="0 45px"
          margin="auto"
          maxWidth="1128px"
          width="100%"
          boxSizing="border-box"
        >
          <Flex alignItems="center" flex={1} maxWidth="calc(100% - 324px)" width="100%">
            <HorizontalVoteComponent />
            <Box
              color="#a4a4a4"
              fontSize="14px"
              fontWeight="500"
              whiteSpace="noWrap"
              lineHeight="18px"
              textOverflow="ellipsis"
              ml="2px"
            >
              Swastikas displayed at Canadian protests against vaccination mandates
            </Box>
          </Flex>
          <Lk to="/">
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              width="312px"
              color="#a4a4a4"
              fontSize="12px"
              lineHeight="16px"
              fontWeight="700"
              ml="12px"
            >
              <CloseIcon mr="5px" />
              <Box>Close</Box>
            </Flex>
          </Lk>
        </Flex>
      </Box>

      <Flex
        width="calc(100% - 160px)"
        bg={postDetCover}
        justifyContent="center"
        margin="0 auto"
        maxWidth="1280px"
        position="relative"
        boxSizing="border-box"
        sx={{
          '@media (min-width: 1280px)': {},
          '@media (max-width: 1120px)': {
            padding: '0 12px 0 32px',
            width: '100%',
          },
        }}
      >
        <Box
          _hover={{ textDecor: 'none' }}
          _focus={{ boxShadow: 'none' }}
          maxWidth="740px"
          flex="1"
          margin="32px 12px 32px 32px"
          minHeight="100vh"
          minWidth="0"
          width="100%"
          wordBreak="break-word"

          // sx={{
          //   '@media (min-width: 960px)': {
          //     // width: `${postStyle === 'card' ? '100%' : ''}`,
          //     minWidth: '0',
          //   },
          //   '@media (max-width: 960px)': {
          //     width: '100%',
          //     minWidth: '0',
          //   },
          // }}
        >
          <Box
            bg={bg}
            color={color}
            fill={color}
            borderColor={borderColor}
            borderRadius="4px"
            borderWidth="1px"
            pos="relative"
            marginBottom="10px"
            paddingLeft="40px"
            boxShadow="none"
            transition="color .5s, fill .5s, box-shadow .5s"
            _hover={{
              textDecoration: 'none',
              borderColor: borderColor,
            }}
            _focus={{
              boxShadow: 'none',
            }}
          >
            <VoteComponent post={post} />
            <Box bg={postBg} position="relative" paddingTop="8px">
              <Flex
                alignItems="start"
                flexFlow="row nowrap"
                fontSize="12px"
                fontWeight="400"
                lineHeight="16px"
                margin="0 8px 8px"
                position="relative"
              >
                <Image
                  src="https://place-hold.it/100x100"
                  width="20px"
                  height="20px"
                  marginRight="4px"
                  borderRadius="100%"
                  verticalAlign="middle"
                />
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  flex="1 1 auto"
                  overflow="hidden"
                >
                  <Box display="inline">
                    <Box display="inline-block" flex="0 0 auto">
                      <Link
                        color={subPledditTextColor}
                        fontSize="12px"
                        fontWeight="700"
                        display="inline"
                        lineHeight="20px"
                        textDecoration="none"
                      >
                        p/gaming
                      </Link>
                    </Box>
                    <Text
                      color={separatorColor}
                      as="span"
                      verticalAlign="middle"
                      fontSize="6px"
                      lineHeight="20px"
                      margin="0 4px"
                    >
                      •
                    </Text>
                    <Text as="span" marginRight="3px">
                      Posted By
                    </Text>

                    <Link marginRight="3px">u/Abydin</Link>

                    <Link>{dateToNow(parseInt(1643151600000))}</Link>
                  </Box>
                  <Box>
                    <Icon as={BiBell} width="20px" height="20px" />
                  </Box>
                </Flex>
              </Flex>
              <Box margin="0 8px">
                <Heading
                  color={titleColor}
                  fontSize="18px"
                  fontWeight="500"
                  lineHeight="22px"
                  paddingRight="5px"
                  wordBreak="break-word"
                >
                  They're not my kids, and not my problem.
                </Heading>
              </Box>

              {postStyle === 'card' ? (
                <Box marginTop="8px">
                  <Box
                    color={subPledditTextColor}
                    padding="5px 8px 10px"
                    fontFamily="Noto sans, Arial, sans-serif"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    wordBreak="break-word"
                    overflow="hidden"
                  >
                    About a month ago, I found out both of my children where the results of my soon
                    to be ex-wives affairs. I've had a feeling for awhile now that both them were
                    not mine. 6 years ago when my son was born, I was the happiest I had been in my
                    entire life. I had married my best friend, we had a child together, and
                    everything seemed amazing. That was until he started getting older. After a few
                    years, I started to have doubts that he was actually mine. He did not look like
                    my child. The more he started to grow, the more I realized just how different he
                    looked compared to what I would expect a child of mine to look like. I am not
                    petty or paranoid enough to let that alone drive me. It was my whore of a wife
                    that really set my alarms off. Whenever she went out, she never went where she
                    said she did. She would have huge holes in her schedule she could never explain
                    to me, she would refuse to allow me to interact with anyone from her work place,
                    and a close friend of hers accused her of flirting with her s/o at the time. It
                    did not help that soon after our son was born, her lies started to catch up with
                    her. Still though, I loved her like the fool I was. She told me up and down how
                    much she loved me whenever one of her lies caught up with her. She had convinced
                    me that despite the fact she was a lying and manipulative woman, that she wasn't
                    a lying manipulative whore. Last year, she got pregnant again, and I still held
                    out a small bit of hope that it was mine. But when her daughter was born, it was
                    obvious she was mixed race. I refused to sign the birth certificate, and the
                    paternity test I demanded afterwards proved my suspicions right all along.
                    Neither of them are mine. The day I got those test results were the day I filed
                    for divorce from that whore and walked away from the family I had created. I
                    knew that it would destroy her sons life to see me walk out. Despite my
                    concerns, I was the best dad I could be to him. I loved him with all my heart
                    and put in 110% into being the father he deserved. Now though, when I see him I
                    am filled with disgust. Disgust for my whore of a wife, disgust with myself for
                    not trusting my instincts, and disgust that the last 6 years on my life have
                    been for nothing. I have been told by multiple people now that I am a monster
                    for leaving "my son" like this. My ex has tried on multiple occasions since I
                    moved out to use him to guilt me into getting back with her. She will have him
                    call me at random hours of the night crying and begging for "his daddy" to come
                    back. The day I moved out, she paraded him into the room as I packed my things
                    to show me "how much damage I am doing." In every conversation that he is
                    brought up, both online and off, I am berated and shamed. That despite the fact
                    I am not the boys biological father, I am his dad. What I have sadly now
                    realized is that, to most, my own feelings mean nothing. My parents are my only
                    supporters through all this, with my own siblings calling me a despicable person
                    for abandoning a child like that. My feelings of betrayal and sadness mean
                    nothing, because a child is involved. I know it is not his fault. I know that
                    the man he called his father for his entire life just walked away, But why am I
                    expected to "man up?" Why should I have to pretend everything is fine and I do
                    not feel contempt for this entire situation. Why should I put my own life and
                    feelings aside? I never was the boys father, I loved him like one and honestly
                    still do; but I would come to hate and contempt him if I had to play that role.
                    Hate myself for not standing up and taking my own life back into my own hands.
                    He is not my child, and even though it is not his fault, he is not my problem
                    anymore. Edit: Wow, this post certainly blew up. Guess airing my dirty laundry
                    accomplished something. Anyway, i've seen a few common questions so I'll just
                    answer them here. 1. Her son knows the truth of why I left. I sat down and told
                    him that I am not his father, and that his mother lied to me and cheated on me.
                    i made it clear I am not mad at him, that it is not his fault this is happening,
                    and no matter what I will still think he's an amazing kid. 2. Some are saying
                    that I never loved him, or was always looking for a way out. It's hard to convey
                    emotions in a text post like this, and even harder to allow vitriolic hatred
                    towards your whore of a wife decontextualize the last 6 years of your life. You
                    can believe what you want though. 3. I have a lawyer, and I'm not going to be
                    paying child support or alimony. Last though, for those who say I should stay in
                    her sons life and be his father. That's not realistically possible. I do not
                    hate him, but I have been cheated on, lied too, and used by a vile self-centered
                    whore who has now caught her children up in her lies and deceit. He is a
                    casualty of her actions, and blameless. However, it can never change the fact of
                    the harsh reality we find ourselves in. I don't hate him, I feel so sad when I
                    think about how he feels. But, all I see when I look at him is 6 years of my
                    life I was lied to. 6 years of my life I was used. And 6 long years of built up
                    doubts and frustrations with a woman who used me. There is no putting aside my
                    hatred to try and be in his life, because the life I lived with him was nothing
                    more than a façade cultivated by his mother. This is the harsh reality I find
                    myself dealing with, and I simply cannot in good faith put myself or him through
                    it any more.
                  </Box>
                </Box>
              ) : (
                ''
              )}

              {/* Post Bottom Bar */}
              <Flex flexDirection="row" alignItems="center" paddingRight="10px" overflowY="visible">
                <Flex
                  flexDirection="row"
                  alignItems="stretch"
                  flexGrow={1}
                  padding="0 8px 0 4px"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  overflow="hidden"
                >
                  <Link
                    display="flex"
                    alignItems="center"
                    borderRadius="2px"
                    padding="8px"
                    marginRight="4px"
                    _hover={{
                      textDecor: 'none',
                      outline: 'none',
                      bg: bottomButtonHover,
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                  >
                    <ChatIcon mr="5px" />
                    <Box>6.3k Comments</Box>
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    borderRadius="2px"
                    padding="8px"
                    marginRight="4px"
                    _hover={{
                      textDecor: 'none',
                      outline: 'none',
                      bg: bottomButtonHover,
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                  >
                    <Icon as={FaShare} mr="5px" />
                    <Box>share</Box>
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    borderRadius="2px"
                    padding="8px"
                    marginRight="4px"
                    _hover={{
                      textDecor: 'none',
                      outline: 'none',
                      bg: bottomButtonHover,
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                  >
                    <Icon as={BsBookmark} mr="5px" />
                    <Box>save</Box>
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    borderRadius="2px"
                    padding="8px"
                    marginRight="4px"
                    _hover={{
                      textDecor: 'none',
                      outline: 'none',
                      bg: bottomButtonHover,
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                  >
                    <Icon as={BsEyeSlash} mr="5px" />
                    <Box>Hide</Box>
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    borderRadius="2px"
                    padding="8px"
                    marginRight="4px"
                    _hover={{
                      textDecor: 'none',
                      outline: 'none',
                      bg: bottomButtonHover,
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                  >
                    <Icon as={BsFlag} mr="5px" />
                    <Box>Report</Box>
                  </Link>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
        <SideBar
          margin="32px 32px 32px 0"
          borderRadius="4px"
          padding="0"
          right="0"
          top="0"
          width="312px"
          sx={{
            '@media (max-width: 1120px)': {
              display: 'none',
            },
          }}
        />
      </Flex>
    </Flex>
  );
};

export default PostDetails;
