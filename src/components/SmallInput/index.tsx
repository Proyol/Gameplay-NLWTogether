import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { theme } from '../../global/styles/theme'

import { Avatar } from '../Avatar'
import { styles } from './styles'

export const SmallInput: React.FC<TextInputProps> = ({...rest}) => {
    return (
        <TextInput 
            style={styles.container}
            keyboardType="numeric"
            {...rest}
        />
    )
}