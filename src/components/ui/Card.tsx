import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing, shadows, borderRadius } from '../../styles/spacing';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  margin?: keyof typeof spacing;
  shadow?: keyof typeof shadows;
  borderRadius?: keyof typeof borderRadius;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 4,
  margin = 0,
  shadow = 'base',
  borderRadius: radius = 'md',
}) => {
  const { theme } = useTheme();
  
  const cardStyle = StyleSheet.create({
    container: {
      backgroundColor: theme === 'dark' ? colors.dark.card : colors.light.card,
      padding: spacing[padding],
      margin: spacing[margin],
      borderRadius: borderRadius[radius],
      ...shadows[shadow],
      ...style,
    },
  });

  return <View style={cardStyle.container}>{children}</View>;
};

