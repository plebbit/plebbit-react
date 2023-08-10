import { Tag } from '@chakra-ui/react'
import React from 'react'

const Label = (props) => {
    const { text } = props
    return (
        <Tag
            borderRadius="2px"
            fontWeight='500'
            p="0px 4px"
            fontSize="10px"
            lineHeight="12px"
            overflow="hidden"
            textOverflow='ellipsis'
            verticalAlign="text-bottom"
            whiteSpace="pre"
            wordBreak="normal"
            boxSizing='border-box'
            mr="5px"
            { ...props }
            cursor="pointer"
            minH='undefined'
            height="16px"
            m='0 4px'
        >
            { text }
        </Tag>
    )
}

export default Label