import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { Guild, GuildDataProps } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'
import { styles } from './styles'

type GuildsProps = {
    handleGuildSelected: (guild: GuildDataProps) => void;
}

export const Guilds: React.FC<GuildsProps> = ({ handleGuildSelected }) => {
    const guilds = [
        {
            id:  '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id:  '2',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id:  '3',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id:  '4',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id:  '5',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id:  '6',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id:  '7',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
    ]

    return (
        <View style={styles.container}>
            <FlatList 
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Guild 
                        data={item}
                        onPress={() => handleGuildSelected(item)}
                    />
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered/>}
                ListHeaderComponent={() => <ListDivider isCentered/>}
                showsVerticalScrollIndicator={false}
                style={styles.guilds}
                contentContainerStyle={{ paddingBottom: 68 }}
            />
        </View>
    )
}
