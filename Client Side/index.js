import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import App from './App';

LogBox.ignoreLogs([
    "Require cycle: node_modules/victory",
  ]);
registerRootComponent(App);
