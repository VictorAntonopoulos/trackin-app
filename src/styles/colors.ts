import { ColorValue } from 'react-native';

// Paleta de cores moderna para o Track In
export const colors = {
  // Cores primárias
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Cor principal
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Cores secundárias (laranja/vermelho para contraste)
  secondary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Cor secundária
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  
  // Tons de cinza
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Cores de status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Tema escuro
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    card: '#334155',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
  },
  
  // Tema claro
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
  },
};

export const gradients = {
  primary: [colors.primary[500], colors.primary[600]] as [ColorValue, ColorValue],
  secondary: [colors.secondary[500], colors.secondary[600]] as [ColorValue, ColorValue],
  dark: [colors.dark.surface, colors.dark.background] as [ColorValue, ColorValue],
  light: [colors.light.background, colors.light.surface] as [ColorValue, ColorValue],
};

