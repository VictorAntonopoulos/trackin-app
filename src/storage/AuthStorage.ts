import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@trackin:user';

export async function saveUser(email: string) {
  await AsyncStorage.setItem(AUTH_KEY, email);
}

export async function loadUser(): Promise<string | null> {
  return await AsyncStorage.getItem(AUTH_KEY);
}

export async function removeUser() {
  await AsyncStorage.removeItem(AUTH_KEY);
}
