import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CadastroScreen from '../screens/CadastroScreen';
import BuscarScreen from '../screens/BuscarScreen';
import StatusScreen from '../screens/StatusScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ScannerScreen from '../screens/ScannerScreen';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    Início: 'home-outline',
    Cadastro: 'add-circle-outline',
    Buscar: 'search-outline',
    Status: 'list-outline',
    Scanner: 'qr-code-outline',
    Perfil: 'person-outline',
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={icons[route.name]} size={size} color={color} />
        ),
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.2,
          elevation: 5,
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: '#777',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Cadastro" component={CadastroScreen} />
      <Tab.Screen name="Buscar" component={BuscarScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Scanner" component={ScannerScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
