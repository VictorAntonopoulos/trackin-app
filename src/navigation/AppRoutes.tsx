import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from '../screens/HomeScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CadastroPatioScreen from '../screens/CadastroPatioScreen'; // 🔑 import novo
import BuscarScreen from '../screens/BuscarScreen';
import StatusScreen from '../screens/StatusScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ScannerScreen from '../screens/ScannerScreen';
import { useTheme } from '../context/ThemeContext';
import { colors, gradients } from '../styles/colors';
import { spacing } from '../styles/spacing';

const Tab = createBottomTabNavigator();

const TabIcon = ({ iconPath, focused }: { iconPath: any; focused: boolean }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      {focused ? (
        <LinearGradient colors={gradients.primary} style={styles.iconGradient}>
          <Image source={iconPath} style={[styles.icon, styles.iconActive]} />
        </LinearGradient>
      ) : (
        <Image source={iconPath} style={styles.icon} />
      )}
    </View>
  );
};

export default function AppRoutes() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor:
            theme === 'dark' ? colors.dark.surface : colors.light.background,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: colors.gray[900],
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          paddingBottom: spacing[2],
          paddingTop: spacing[2],
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.gray[400],
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconPath={require('../../assets/icons/home-icon.png')}
              focused={focused}
            />
          ),
        }}
      />

    
      <Tab.Screen
        name="Cadastro Pátio"
        component={CadastroPatioScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconPath={require('../../assets/icons/addp-icon.png')} // crie/adapte esse ícone
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconPath={require('../../assets/icons/add-icon.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={BuscarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconPath={require('../../assets/icons/search-icon.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconPath={require('../../assets/icons/status-icon.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconPath={require('../../assets/icons/scanner-icon.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconPath={require('../../assets/icons/profile-icon.png')}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  iconContainerActive: {
    transform: [{ scale: 1.1 }],
  },
  iconGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.gray[400],
  },
  iconActive: {
    tintColor: colors.light.background,
  },
});
