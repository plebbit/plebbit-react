import React, { useContext, useState } from 'react';
import PostContent from './PostContent';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Layout from '../../components/layout';
import { getAddress, getSubName } from '../../utils/getUserName';
import { ProfileContext } from '../../store/profileContext';
import useStateString from '../../hooks/useStateString';


const PostDetail = () => {
    const {
        device,
    } = useContext(ProfileContext);
    const [detail, setDetail] = useState({})
    const [subplebbit, setSubplebbit] = useState({})
    const detBg = useColorModeValue('#bbbdbf', '#030303');



    const stateString = useStateString(detail)


    return (
        <Layout
            name={ {
                label: detail?.title || subplebbit?.title || getSubName(subplebbit) || getAddress(params?.commentCid),
                value: location?.pathname,
            } }
            stateString={ stateString }
        >
            <Box maxWidth="100%" >

                { device !== 'mobile' ? <Box>
                    <Box
                        top="48px"
                        backgroundColor="rgba(28,28,28,.9)"
                        zIndex="50"
                        bottom="0"
                        height="100%"
                        left="0"
                        position="fixed"
                        right="0"
                        width="100%"
                        _after={ {
                            background: detBg,
                            bottom: '0',
                            height: '100%',
                            content: `" "`,
                            left: '0',
                            margin: '0 auto',
                            maxWidth: '1280px',
                            position: 'fixed',
                            right: '0',
                            width: 'calc(100% - 160px)',
                            top: '0',
                        } }
                    >
                        <Box
                            top="48px"
                            bottom="0"
                            height="100%"
                            left="0"
                            position="fixed"
                            right="0"
                            width="100%"
                            zIndex="50"
                            sx={ {
                                backfaceVisibility: 'hidden',
                            } }
                        >
                            <Box
                                height="100%"
                                overflowY="auto"
                                position="relative"
                                width="100%"
                                willChange="transform"
                                sx={ {
                                    contain: 'layout style size',
                                } }
                            >
                                <PostContent setDetail={ setDetail } setSubplebbit={ setSubplebbit } />
                            </Box>
                        </Box>
                    </Box>
                </Box> : <PostContent setDetail={ setDetail } setSubplebbit={ setSubplebbit } /> }

            </Box>
        </Layout>
    );
}

export default PostDetail;
