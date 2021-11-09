import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import {
    Text,
    Image,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export const ButtonAdd: React.FC<RectButtonProps> = ({...rest}) => {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <MaterialCommunityIcons 
                name="plus"
                color={theme.colors.heading}
                size={24}
            />
        </RectButton>
    )
}