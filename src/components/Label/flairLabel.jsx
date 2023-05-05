import { Tag } from '@chakra-ui/react'
import React from 'react'

const FlairLabel = (props) => {
    const { flair, text, bg, color } = props
    return (
        <Tag
            borderRadius="20px"
            fontWeight='500'
            p="2px 8px"
            fontSize="12px"
            lineHeight="16px"
            overflow="hidden"
            textOverflow='ellipsis'
            verticalAlign="top"
            whiteSpace="pre"
            wordBreak="normal"
            boxSizing='border-box'
            mr="5px"
            { ...props }
            cursor="pointer"
            minH='undefined'
            height="16px"
            bg={ flair?.backgroundColor || bg }
            color={ flair?.textColor || color }
        >
            { flair?.text || text }
        </Tag>
    )
}

export default FlairLabel