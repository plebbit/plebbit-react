import React, { useContext } from 'react'
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import {
    Box, Flex,
    useColorModeValue,
} from "@chakra-ui/react";
import Image from "../Image";
import { ProfileContext } from '../../store/profileContext';
import ReactPlayer from 'react-player';

const PostMedia = ({ post, detail }) => {
    const mediaInfo = getCommentMediaInfo(post);
    const postBg = useColorModeValue(
        "lightCommunityThemePost",
        "darkCommunityThemePost"
    );
    const { postStyle } =
        useContext(ProfileContext);

    const showPlaceholder = postStyle !== "card"

    return (
        <>
            {
                !post?.content && !post?.removed &&
                <>


                    {
                        mediaInfo?.type === "image" && (
                            <Image
                                maxH="512px"
                                margin="0px auto"
                                maxW="100%"
                                overflow="hidden"
                                bg={ postBg }
                                src={ post?.link }
                                onError={ (event) =>
                                    (event.target.style.display = "none")
                                }
                                noPlaceholder={ !showPlaceholder }
                            />
                        )
                    }

                    {
                        mediaInfo?.type === "video" && (
                            <Flex
                                bg="black"
                                height="320px"
                                width="100%"
                                color="#fff"
                                cursor="default"
                                flex={ 1 }
                            >

                                <ReactPlayer onError={ (event) =>
                                    (event.target.style.display = "none")
                                } preload playsInline url={ post?.link } width="100%" height="320px" controls playing={ false } />

                            </Flex>
                        )
                    }

                    {
                        mediaInfo?.type === "audio" && (
                            <Box maxW="100%" color="#fff" margin="4px 8px">
                                <audio
                                    preload="auto"
                                    src={ post?.link }
                                    onError={ (event) =>
                                        (event.target.style.display = "none")
                                    }
                                    controls
                                    style={ {
                                        width: "100%",
                                    } }
                                >
                                    <source src={ post?.link } />
                                </audio>
                            </Box>
                        )
                    }
                </>
            }

        </>
    )
}


export default PostMedia