import React, { useState, useCallback, useEffect } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, FlatList, Text } from 'react-native'

import { styles } from './styles'
import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { ApointmentDataProps, Appointment } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'
import { Background } from '../../components/Background';
import { COLLETION_APPOINTMENTS } from '../../config/database'
import { Load } from '../../components/Load'

export const Home: React.FC = () => {
    const navigation = useNavigation()

    const [category, setCategory] = useState('');
    const [appointments, setAppointments] = useState<ApointmentDataProps[]>([]);
    const [loading, setLoading] = useState(true);

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: ApointmentDataProps){
        navigation.navigate('AppointmentDetails', { guildSelected });
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments(){
        const response = await AsyncStorage.getItem(COLLETION_APPOINTMENTS);

        const storage: ApointmentDataProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage); 
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]))

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd 
                    onPress={handleAppointmentCreate}
                />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
                hasCheckbox={false}
            />

            

            {
                loading
                ? <Load />
                : <>
                    <ListHeader 
                        title="Partidas Agendadas"
                        subtitle={`Total ${appointments.length}`}
                    />
                    
                    <FlatList 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Appointment 
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        )}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={ListDivider}
                        contentContainerStyle={{ paddingBottom: 69 }}
                    />
                </>
            }
                
        </Background>
    )
}