import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import Navigation from './src/navigation';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fonts } from './src/theme/fonts';
import { ActivityIndicator } from 'react-native';

export default function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const [fontsLoaded] = useFonts({
    [fonts.regular]:
      'https://fonts.cdnfonts.com/s/15011/CircularStd-Medium.woff',
    [fonts.bold]: 'https://fonts.cdnfonts.com/s/15011/CircularStd-Bold.woff',
  });
  if (!fontsLoaded)
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: 'center', flex: 1 }}
      />
    );
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}
