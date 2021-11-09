import React from 'react';
import { View, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type CategoryProps = RectButtonProps & {
    title: string;
    icon: React.FC<SvgProps>;
    checked?: boolean;
}

export const Category: React.FC<CategoryProps> = ({
    title,
    icon: Icon,
    checked = false,
    ...rest
}) => {
    return (
        <RectButton  
            {...rest}
        >
            <LinearGradient 
                style={[styles.container, { opacity: checked ? 1 : 0.5 }]}
                colors={[
                    checked ? 
                        theme.colors.secondary85 : 
                        theme.colors.secondary50, 
                    theme.colors.secondary40 
                ]}
            >
                <View
                    style={[styles.content, { opacity: checked ? 1 : 0.4 }]}
                >
                    <View style={checked ? styles.checked : styles.check} />
                    <Icon 
                        width={48}
                        height={48}
                    />

                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
            </LinearGradient>
        </RectButton>
    )
};
