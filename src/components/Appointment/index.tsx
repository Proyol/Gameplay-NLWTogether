import React from 'react'
import { RectButtonProps, RectButton } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'

import { styles } from './styles'
import { GuildIcon } from '../GuildIcon'
import { categories } from '../../utils/categories'
import PlayerSVG from  '../../assets/player.svg'
import CalendarSVG from  '../../assets/calendar.svg'
import { theme } from '../../global/styles/theme'

export type GuildProps = {
    id: string,
    name: string,
    icon: null
    owner: boolean;
}

export type ApointmentDataProps = {
    id: string,
    guild: GuildProps,
    category: string,
    date: string,
    description: string
}

type AppointmentProps = RectButtonProps & {
    data: ApointmentDataProps
}

export const Appointment: React.FC<AppointmentProps> = ({ data, ...rest }) => {
    const [category] = categories.filter(item => item.id === data.category)
    const { owner } = data.guild;
    
    return (
        <RectButton
            {...rest}
        >
            <View style={styles.container}>
                <GuildIcon />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {data.guild.name}
                        </Text>

                        <Text style={styles.category}>
                            {category.title}
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <View>
                                <CalendarSVG />
                            </View>

                            <Text style={styles.date}>
                                {data.date}
                            </Text>
                        </View>

                        <View style={styles.playersInfo}>
                            <PlayerSVG 
                                fill={owner ? theme.colors.primary : theme.colors.on}
                                />

                            <Text
                                style={[
                                    styles.player,
                                    {color: owner ? theme.colors.primary : theme.colors.on}
                                ]}
                                >
                                {owner ? 'Anfitrião' : 'Visitante'}
                            </Text>
                        </View>
                    </View>

                </View> 
            </View>
        </RectButton>
    )
}