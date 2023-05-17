import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import MapScreen from './src/screens/MapScreen'
import ParksWithProblems from './src/screens/ParksWithProlemsScreen'
import ParksWithoutProlemsScreen from './src/screens/ParksWithoutProlemsScreen'
import CustomDrawerContent from './src/components/CustomDrawerContent'
import ContactDeveloperScreen from './src/screens/ContactDeveloperScreen'
import GetHelpScreen from './src/screens/GetHelpScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import Constants from 'expo-constants'

const CustomHeader = ({ navigation, title }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#3f3f3f',
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => navigation.toggleDrawer()}>
        <Icon color="#fff" name="menu" size={24} />
      </TouchableOpacity>
      <View style={{backgroundColor: 'rgba(255,255,255, 0.7)', padding: 10, borderRadius: 8}}>
        <Text style={{ color: '#3f3f3f', fontSize: 24, fontWeight: '500' }}>
          {title}
        </Text>
      </View>
      <View style={{ padding: 20 }} />
    </View>
  )
}

const Drawer = createDrawerNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerActiveBackgroundColor: 'rgba(0,0,0,0.7)',
          drawerActiveTintColor: '#fff',

          // headerBackgroundContainerStyle: { backgroundColor: 'red' },
          // drawerIcon: () => {
          //   return <Text>A</Text>
          // },
          // drawerLabel: ({color}) => {
          //   return <Text>{color}</Text>
          // }
        }}
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Мапа Києву"
          component={MapScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeader title="Мапа Києва" navigation={navigation} />
            ),
          })}
        />
        <Drawer.Screen
          name="Парки з проблемами"
          component={ParksWithProblems}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeader
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
              <CustomHeader title="Парки без проблем" navigation={navigation} />
            ),
          })}
        />
        <Drawer.Screen
          name="Підтримка"
          component={GetHelpScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeader title="Підтримка" navigation={navigation} />
            ),
          })}
        />
        <Drawer.Screen
          name="Зв'язатись зрозробником"
          component={ContactDeveloperScreen}
          options={({ navigation }) => ({
            headerTransparent: true,
            header: () => (
              <CustomHeader
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
