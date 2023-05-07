import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'

function NotificationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Notifications</Text>
      <Button onPress={() => navigation.navigate('Map')} title="Back" />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default NotificationsScreen
