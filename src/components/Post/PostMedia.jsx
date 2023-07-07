import React, { useContext } from 'react';
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Image from "../Image";
import { ProfileContext } from '../../store/profileContext';
import ReactPlayer from 'react-player';

const PostMedia = ({ post }) => {
    const mediaInfo = getCommentMediaInfo(post);
    const postBg = useColorModeValue("lightCommunityThemePost", "darkCommunityThemePost");
    const { postStyle } = useContext(ProfileContext);

    const showPlaceholder = postStyle !== "card";

    if (!post?.content && !post?.removed) {
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

export default PostMedia;
