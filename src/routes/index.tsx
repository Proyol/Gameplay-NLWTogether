import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SignIn } from '../screens/SignIn';
import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/auth';

export const Routes: React.FC = () => {
    const { user } = useAuth();

    return(
        <NavigationContainer>
            { user.id ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    )
}