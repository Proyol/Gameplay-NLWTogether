import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler'
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from  '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { SmallInput } from '../../components/SmallInput';
import { GuildIcon } from '../../components/GuildIcon';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildDataProps } from '../../components/Guild';
import { COLLETION_APPOINTMENTS } from '../../config/database';

export const AppointmentCreate = () => {
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildDataProps>({} as GuildDataProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [minute, setMinute] = useState('');
    const [hour, setHour] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleOpenGuildsModal() {
        setOpenGuildsModal(true);
    }

    function handleCloseModal() {
        setOpenGuildsModal(false);
    }

    function handleGuildSelect(guildSelected: GuildDataProps){
        setGuild(guildSelected);
        setOpenGuildsModal(false);
    }

    function handleCategorySelect(categoryId: string){
        setCategory(categoryId);
    }

    async function handleSave(){
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        }

        const storage = await AsyncStorage.getItem(COLLETION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLETION_APPOINTMENTS, 
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate('Home')
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <Background>
                    <Header 
                        title="Agendar partida"
                    />
                    
                    <Text style={[
                        styles.label,
                        { marginLeft: 24, marginTop: 36, marginBottom: 18 }
                    ]}>
                        Categoria
                    </Text>

                    <CategorySelect 
                        hasCheckbox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuildsModal}>
                            <View style={styles.select}>
                                {
                                    guild.icon 
                                    ? <GuildIcon 
                                        guildId={guild.id}
                                        iconId={guild.icon}
                                    />
                                    : <View style={styles.image}/>
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather 
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Hora e minuto
                                </Text>
                                
                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.caracteresLimit}>
                                Máximo 100 caracteres
                            </Text>
                        </View>

                        <TextArea 
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />

                        <View style={styles.footer}>
                            <Button
                                title="Agendar"
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                </Background>
            </ScrollView>

            <ModalView 
                visible={openGuildsModal}
                closeModal={handleCloseModal}
            >
                <Guilds 
                    handleGuildSelected={handleGuildSelect}
                />
            </ModalView>
        </KeyboardAvoidingView>
    )
}
