import React from 'react'
import { Image as Img } from "@chakra-ui/react"
// import placeHolder from "../../assets/images/fallback.png"



const Image = (props) => {


    const { noPlaceholder, ...rest } = props
    return <Img { ...rest } fallbackSrc={ !noPlaceholder ? undefined : undefined } />;
};

export default (Image)