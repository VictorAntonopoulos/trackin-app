import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import { useTheme } from '../../context/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const inputStyle = StyleSheet.create({
    container: {
      marginBottom: spacing[4],
    },
    label: {
      fontSize: typography.fontSize.sm,
      fontFamily: typography.fontFamily.medium,
      color: theme === 'dark' ? colors.dark.text : colors.light.text,
      marginBottom: spacing[2],
    },
    input: {
      borderWidth: 1,
      borderColor: error 
        ? colors.error 
        : theme === 'dark' 
          ? colors.gray[600] 
          : colors.gray[300],
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.regular,
      backgroundColor: theme === 'dark' ? colors.dark.surface : colors.light.background,
      color: theme === 'dark' ? colors.dark.text : colors.light.text,
    },
    error: {
      fontSize: typography.fontSize.sm,
      fontFamily: typography.fontFamily.regular,
      color: colors.error,
      marginTop: spacing[1],
    },
  });

  return (
    <View style={[inputStyle.container, containerStyle]}>
      {label && <Text style={inputStyle.label}>{label}</Text>}
      <TextInput
        style={[inputStyle.input, style]}
        placeholderTextColor={theme === 'dark' ? colors.gray[400] : colors.gray[500]}
        {...props}
      />
      {error && <Text style={inputStyle.error}>{error}</Text>}
    </View>
  );
};

