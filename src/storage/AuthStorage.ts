// src/storage/AuthStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@trackin:user';

export async function saveUser(user: any) {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export async function loadUser(): Promise<any | null> {
  const user = await AsyncStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
}

export async function removeUser() {
  await AsyncStorage.removeItem(AUTH_KEY);
}
