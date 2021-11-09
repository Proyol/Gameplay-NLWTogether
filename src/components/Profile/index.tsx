import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from '../Avatar'

import { styles } from './styles'

export const Profile: React.FC = () => {
    return (
        <View style={styles.container}>
            <Avatar url="https://avatars.githubusercontent.com/u/52104910?v=4"/>
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>
                    <Text style={styles.username}>
                        Daniel
                    </Text>
                </View>

                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>
            </View>
        </View>
    )
}