import React, { useState } from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles'

type ListHeaderProps = {
    title: string,
    subtitle: string
}

export const ListHeader: React.FC<ListHeaderProps> = ({
    title,
    subtitle
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>
        </View>
    )
}