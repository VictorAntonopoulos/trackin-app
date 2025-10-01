import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import MainStack from './src/navigation/MainStack';
import { ThemeProvider, useTheme } from './src/context/ThemeContext'; // Importar ThemeProvider e useTheme
import { View } from 'react-native'; // Importar View para envolver o conteúdo

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [isReady, setIsReady] = useState(false);
  const { theme } = useTheme(); // Usar o tema do contexto

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!isReady) return null; // ainda carregando fontes

  return (
    <View style={{ flex: 1, backgroundColor: theme === 'dark' ? '#121212' : '#F8F9FA' }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <MainStack />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}


