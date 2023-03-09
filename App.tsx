import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native'

import { Groups } from '@screens/Groups';
import { Loading } from '@components/Loading';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: theme.COLORS.GRAY_600
      }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        {
          fontsLoaded
            ? <Groups />
            : <Loading />
        }
      </SafeAreaView>
    </ThemeProvider>
  );
}
