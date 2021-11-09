import React from 'react'
import { View, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles'
import { theme } from '../../global/styles/theme';

type AvatarProps = {
    url: string
}

export const Avatar: React.FC<AvatarProps> = ({ url }) => {
    return (
        <LinearGradient 
            style={styles.container}
            colors={[
                theme.colors.secondary50,
                theme.colors.secondary70
            ]}
        >
            <Image 
                style={styles.avatar}
                source={{ uri: url }}
            />
        </LinearGradient>
    )
}