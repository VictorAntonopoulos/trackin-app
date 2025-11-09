import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import MainStack from "./src/navigation/MainStack";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { View, Text } from "react-native";
import { initI18n } from "./src/i18n";

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [isReady, setIsReady] = useState(false);
  const { theme } = useTheme();

  const onLayoutRootView = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      console.log("✅ Splash escondida");
    } catch (e) {
      console.warn("⚠️ Erro ao esconder splash:", e);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        console.log("⏳ Inicializando app...");
        await initI18n();
        console.log("✅ i18n inicializado!");
      } catch (err) {
        console.error("❌ Erro ao inicializar i18n:", err);
      } finally {
        // ⏱️ fallback de segurança: mesmo se fonts/i18n falhar, splash some
        const timeout = setTimeout(() => {
          console.warn("⚠️ Timeout de inicialização atingido, escondendo splash...");
          onLayoutRootView();
        }, 4000);

        if (fontsLoaded) {
          clearTimeout(timeout);
          onLayoutRootView();
        }
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#121212" : "#F8F9FA",
      }}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
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
