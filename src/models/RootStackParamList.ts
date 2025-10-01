import { Moto } from './Moto';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  App: undefined;
  MotoForm: { moto?: Moto };
  MotoList: undefined;
  Status: undefined; 
};
