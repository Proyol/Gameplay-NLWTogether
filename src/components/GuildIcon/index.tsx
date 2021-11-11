import React from 'react'
import { RectButtonProps, RectButton } from 'react-native-gesture-handler'
import { Image } from 'react-native'

import { styles } from './styles'
import DiscordImg from '../../assets/discord.png'

export const GuildIcon: React.FC = () => {
    return (
        <Image 
            source={DiscordImg}
            style={styles.image} 
            resizeMode="cover"
        />
    )
}