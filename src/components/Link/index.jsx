import { Link as Lk } from '@chakra-ui/react'
import React from 'react'
import { Link as ReactLink } from 'react-router-dom';


const Link = (props) => {
    const { children, isExternal, to, isDisabled } = props
    return (
        <Lk
            as={ ReactLink }
            { ...props }
            cursor="pointer"
            _hover={ {
                textDecoration: "none"
            } }
            to={ isDisabled ? '' : to }
        >
            { children }
        </Lk>
    )
}

export default Link