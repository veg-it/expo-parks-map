import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import MapScreen from '../screens/MapScreen'
import ParksWithProblems from '../screens/ParksWithProlemsScreen'
import ParksWithoutProlemsScreen from '../screens/ParksWithoutProlemsScreen'
import ContactDeveloperScreen from '../screens/ContactDeveloperScreen'
import GetHelpScreen from '../screens/GetHelpScreen'
import CustomHeaderOptions from './CustomHeaderOptions'

const Drawer = createDrawerNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerActiveBackgroundColor: 'rgba(0,0,0,0.7)',
          drawerActiveTintColor: '#fff'
        }}
      >
        <Drawer.Screen
          name="Мапа Києву"
          component={MapScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeaderOptions title="Мапа Києва" navigation={navigation} />
            ),
          })}
        />
        <Drawer.Screen
          name="Парки з проблемами"
          component={ParksWithProblems}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeaderOptions
                title="Парки з проблемами"
                navigation={navigation}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="Парки без проблем"
          component={ParksWithoutProlemsScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeaderOptions title="Парки без проблем" navigation={navigation} />
            ),
          })}
        />
        <Drawer.Screen
          name="Підтримка"
          component={GetHelpScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeaderOptions title="Підтримка" navigation={navigation} />
            ),
          })}
        />
        <Drawer.Screen
          name="Зв'язатись зрозробником"
          component={ContactDeveloperScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeaderOptions
                title={"Зв'язок з розробником"}
                navigation={navigation}
              />
            ),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
