import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

// Navigators
import Main from './Navigators/Main';

// Screens
import Header from './Shared/Header';
import ProductContainer from './Screens/Products/ProductContainer';

// LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </PaperProvider>

  );
}




