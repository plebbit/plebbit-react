import { Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const StateString = ({ stateString, textSx }) => {
    const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');

    return (
        <>
            { stateString && stateString !== 'Succeeded' && <>

                <Text
                    color={ separatorColor }
                    as="span"
                    verticalAlign="middle"
                    fontSize="6px"
                    lineHeight="20px"
                    margin="0 4px"
                >
                    •
                </Text>
                <Text
                    color={ separatorColor }
                    as="span"
                    verticalAlign="middle"
                    fontSize="12px"
                    lineHeight="16px"
                    className='loading-ellipsis'
                    sx={ textSx }
                >
                    { stateString }
                </Text>
            </> }
        </>
    )
}

export default StateString