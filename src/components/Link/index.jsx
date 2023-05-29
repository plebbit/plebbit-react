import { Link as Lk } from '@chakra-ui/react'
import React from 'react'
import { Link as ReactLink } from 'react-router-dom';


const Link = (props) => {
    const { children, isExternal } = props
    return (
        <Lk
            as={ !isExternal && ReactLink }
            { ...props }
            cursor="pointer"
            _hover={ {
                textDecoration: "none"
            } }
        >
            { children }
        </Lk>
    )
}

export default Link