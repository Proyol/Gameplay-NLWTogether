import React from 'react'
import { Image, View } from 'react-native'

const { CDN_IMAGE } = process.env;

import { styles } from './styles'
import DiscordSVG from '../../assets/discord.svg'

type GuildIconProps = {
    guildId: string;
    iconId: string | null;
}

export const GuildIcon: React.FC<GuildIconProps> = ({ guildId, iconId }) => {
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

    return (
        <View style={styles.container}>
            {
                iconId
                ? <Image 
                    source={{ uri }}
                    style={styles.image} 
                    resizeMode="cover"
                />
                : <DiscordSVG 
                    width={40}
                    height={40}
                  />
            }
        </View>
    )
}