import React, { useContext, useMemo } from 'react';
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Image from "../Image";
import { ProfileContext } from '../../store/profileContext';
import ReactPlayer from 'react-player/lazy'
import youtube_parser from '../../utils/youtubeParser';

const PostMedia = ({ post }) => {
    const mediaInfo = getCommentMediaInfo(post);
    const postBg = useColorModeValue("lightCommunityThemePost", "darkCommunityThemePost");
    const { postStyle } = useContext(ProfileContext);
    const isYoutube = useMemo(() => youtube_parser(post?.link), [post?.link])



    const showPlaceholder = postStyle !== "card";

    if (!post?.content && !post?.removed) {
        if (Boolean(isYoutube)) {
            return (
       
            <iframe 
            style={ {
                width: "100%",
                maxHeight:'512px',
                height:'320px',
                maxWidth:'100%'
            } } 
            src={ `https://www.youtube.com/embed/${isYoutube}?feature=oembed&amp;enablejsapi=1` } allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" width="356" height="200" frameborder="0">

            </iframe> 
            )
        }
        if (mediaInfo?.type === "image") {
            return (
                <Image
                    maxH="512px"
                    margin="0px auto"
                    maxW="100%"
                    overflow="hidden"
                    bg={ postBg }
                    src={ post?.link }
                    onError={ (event) => {
                        event.target.hidden = true;
                    } }
                    noPlaceholder={ !showPlaceholder }
                />
            );
        }

        if (mediaInfo?.type === "video") {
            return (
                <Flex
                    bg="black"
                    height="320px"
                    width="100%"
                    color="#fff"
                    cursor="default"
                    flex={ 1 }
                >
                    <ReactPlayer
                        onError={ (event) => {
                            event.target.hidden = true;
                        } }
                        preload="auto"
                        playsInline
                        url={ post?.link }
                        width="100%"
                        height="320px"
                        controls={ false }
                    />
                </Flex>
            );
        }

        if (mediaInfo?.type === "audio") {
            return (
                <Box maxW="100%" color="#fff" margin="4px 8px">
                    <audio
                        preload="auto"
                        src={ post?.link }
                        onError={ (event) => {
                            event.target.hidden = true;
                        } }
                        controls
                        style={ {
                            width: "100%",
                        } }
                    >
                        <source src={ post?.link } />
                    </audio>
                </Box>
            );
        }
    }

    return null;
}

export default React.memo(PostMedia);
