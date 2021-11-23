import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'

import { Guild, GuildDataProps } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'
import { Load } from '../../components/Load'
import { api } from '../../services/api'
import { styles } from './styles'

type GuildsProps = {
    handleGuildSelected: (guild: GuildDataProps) => void;
}

export const Guilds: React.FC<GuildsProps> = ({ handleGuildSelected }) => {
    const [guilds, setGuilds] = useState<GuildDataProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds(){
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, [])

    return (
        <View style={styles.container}>
            {
                loading
                ? <Load />
                : <FlatList 
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
            }
        </View>
    )
}
