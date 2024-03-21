import { View, Text } from 'react-native'
import { useEffect } from 'react';
import {Stack} from 'expo-router'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Colors from '../utils/Colors';

export default function HomeLayout() {
  const [loaded, error] = useFonts({
    'inter': require('./../assets/fonts/Inter-Regular.ttf'),
    'inter-sb': require('./../assets/fonts/Inter-SemiBold.ttf'),
    'inter-b': require('./../assets/fonts/Inter-Bold.ttf'),
  });
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Stack
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name='add-new-category' options={{presentation:'modal',headerShown:true,title:'Add New Category',
      headerTitleStyle:{fontFamily:'inter-sb',}}}/>
       <Stack.Screen name='add-new-category-item' options={{presentation:'modal',headerShown:true,title:'Add New Category Item',
      headerTitleStyle:{fontFamily:'inter-sb',}}}/>
    </Stack>
  )
}