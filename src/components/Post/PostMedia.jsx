import React, { useContext } from 'react'
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import {
    Box,
    useColorModeValue,
} from "@chakra-ui/react";
import Image from "../Image";
import { ProfileContext } from '../../store/profileContext';

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
                mediaInfo?.type === "image" && (
                    <Image
                        maxH="320px"
                        margin="0 auto"
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
                    <Box
                        bg="black"
                        maxHeight="320px"
                        width="100%"
                        maxW="100%"
                        color="#fff"
                    >
                        <video
                            autoPlay
                            playsInline
                            preload="auto"
                            controls
                            style={ {
                                objectFit: "contain",
                                width: "100% !important",
                                overflowClipMargin: "content-box",
                                overflow: "clip",
                            } }
                            onError={ (event) =>
                                (event.target.style.display = "none")
                            }
                            muted
                        >
                            <source src={ post?.link } />
                        </video>
                    </Box>
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
    )
}


export default PostMedia