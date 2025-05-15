// src/navigation/MainStack.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import Onboarding1 from '../screens/Onboarding/Onboarding1Screen';
import Onboarding2 from '../screens/Onboarding/Onboarding2Screen';
import Onboarding3 from '../screens/Onboarding/Onboarding3Screen';
import LoginScreen from '../screens/LoginScreen';
import AppRoutes from './AppRoutes';
import CadastroScreen from '../screens/CadastroScreen';
import BuscarScreen from '../screens/BuscarScreen';

// 🆕 Etapas do registro com nomes padronizados
import RegisterStep1 from '../screens/Register/Step1CreateAccountScreen';
import RegisterStep2 from '../screens/Register/Step2LocationScreen';
import RegisterStep3 from '../screens/Register/Step3InfoScreen';
import RegisterStep4 from '../screens/Register/Step4PasswordScreen';
import RegisterStep5 from '../screens/Register/Step5SuccessScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="App" component={AppRoutes} />
        <Stack.Screen name="MotoForm" component={CadastroScreen} />
        <Stack.Screen name="MotoList" component={BuscarScreen} />

        {/* Fluxo de registro moderno em 5 passos */}
        <Stack.Screen name="RegisterStep1" component={RegisterStep1} />
        <Stack.Screen name="RegisterStep2" component={RegisterStep2} />
        <Stack.Screen name="RegisterStep3" component={RegisterStep3} />
        <Stack.Screen name="RegisterStep4" component={RegisterStep4} />
        <Stack.Screen name="RegisterStep5" component={RegisterStep5} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
