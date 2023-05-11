import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MapScreen from './src/screens/MapScreen';
import ParksWithProblems from './src/screens/ParksWithProlemsScreen';
import ParksWithoutProlemsScreen from './src/screens/ParksWithoutProlemsScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import ContactDeveloperScreen from './src/screens/ContactDeveloperScreen';
import GetHelpScreen from './src/screens/GetHelpScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
        <Drawer.Screen name="Мапа Києву" component={MapScreen} />
        <Drawer.Screen name="Підтримка" component={GetHelpScreen} />
        <Drawer.Screen name="Парки з проблемами" component={ParksWithProblems} />
        <Drawer.Screen name="Парки без проблем" component={ParksWithoutProlemsScreen} />
        <Drawer.Screen name="Зв'язатись з розробником" component={ContactDeveloperScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}