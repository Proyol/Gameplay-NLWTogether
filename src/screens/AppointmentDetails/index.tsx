import React, { useEffect, useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native';
import { Fontisto } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/core';
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import BannerImg from '../../assets/banner.png'
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberDataProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ApointmentDataProps } from '../../components/Appointment';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { Load } from '../../components/Load';

type RouteParams = {
    guildSelected: ApointmentDataProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberDataProps[];
    presence_count: number;
}

export const AppointmentDetails = () => {
    const route = useRoute();
    const { guildSelected } = route.params as RouteParams;

    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    async function fetchGuildWidget(){
        try{
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);

            setWidget(response.data);
        } catch(error: any) {
            Alert.alert('Verifique as confirgurações do servidor. Será que a opção de widget está habilitado?')
        } finally {
            setLoading(false);
        }
    }

    async function handleShareInvitation(){
        const message = Platform.OS === 'ios' ?
            `Junte-se a ${guildSelected.guild.name}` :
            widget.instant_invite;

        await Share.share({
            message,
            url: widget.instant_invite
        })
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget()
    }, [])

    return (
        <Background>
            <Header 
                title="Detalhes"
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton
                        onPress={handleShareInvitation}
                    >
                        <Fontisto 
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {guildSelected.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading
                ? <Load />
                : <>
                    <ListHeader 
                        title="Jogadores"
                        subtitle={`Total ${widget.presence_count}`}
                    />
                    <FlatList 
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Member 
                                data={item}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered/>}
                        style={styles.members}
                    />
                </>
            }

            {
                guildSelected.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon 
                        onPress={handleOpenGuild}
                        title="Entrar na partida"
                    />
                </View>
            }
        </Background>
    )
}
