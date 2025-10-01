import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: borderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    };

    const sizeStyles = {
      sm: { paddingHorizontal: spacing[3], paddingVertical: spacing[2] },
      md: { paddingHorizontal: spacing[4], paddingVertical: spacing[3] },
      lg: { paddingHorizontal: spacing[6], paddingVertical: spacing[4] },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled ? colors.gray[300] : colors.primary[500],
      },
      secondary: {
        backgroundColor: disabled ? colors.gray[300] : colors.secondary[500],
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? colors.gray[300] : colors.primary[500],
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.6 : 1,
    };
  };

  const getTextStyle = () => {
    const sizeStyles = {
      sm: { fontSize: typography.fontSize.sm },
      md: { fontSize: typography.fontSize.base },
      lg: { fontSize: typography.fontSize.lg },
    };

    const variantStyles = {
      primary: { color: colors.light.background },
      secondary: { color: colors.light.background },
      outline: { color: disabled ? colors.gray[400] : colors.primary[500] },
      ghost: { color: disabled ? colors.gray[400] : (theme === 'dark' ? colors.dark.text : colors.light.text) },
    };

    return {
      fontFamily: typography.fontFamily.semibold,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' ? colors.light.background : colors.primary[500]}
          style={{ marginRight: spacing[2] }}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

