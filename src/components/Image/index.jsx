import React from 'react'
import { Image as Img } from "@chakra-ui/react"



const Image = React.memo(function Image(props) {
    return <Img { ...props } />;
});

export default Image