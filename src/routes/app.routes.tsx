import React, { Fragment } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';
import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes: React.FC = () => {
    return (
        <Navigator
            screenOptions={{
                header: () => <></>,
                cardStyle: {
                    backgroundColor: theme.colors.secondary100
                },
            }}
        >
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
            <Screen 
                name="AppointmentCreate"
                component={AppointmentCreate}
            />
        </Navigator>
    )
}