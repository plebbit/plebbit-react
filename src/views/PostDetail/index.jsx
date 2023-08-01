import React, { useState } from 'react';
import PostContent from './PostContent';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Layout from '../../components/layout';
import { getAddress, getSubName } from '../../utils/getUserName';
import useStateString from '../../hooks/useStateString';
import useStore from '../../store/useStore';
import { useParams } from 'react-router-dom';


const PostDetail = () => {
    const {
        device,
    } = useStore(state => state)
    const [detail, setDetail] = useState({})
    const [subplebbit, setSubplebbit] = useState({})
    const detBg = useColorModeValue('#bbbdbf', '#030303');
    const params = useParams();


    const stateString = useStateString(detail)

    return (
        <Layout
            name={ {
                label: detail?.title || detail?.shortCid || subplebbit?.title || subplebbit && getSubName(subplebbit) || getAddress(params?.commentCid),
                value: location?.pathname,
            } }
            stateString={ stateString }
        >
            <Box maxWidth="100%" >

                { device !== 'mobile' ?
                    <Box>
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
                                background: subplebbit?.suggested?.backgroundUrl ? `url(${subplebbit?.suggested?.backgroundUrl}) repeat center top` : detBg,
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
