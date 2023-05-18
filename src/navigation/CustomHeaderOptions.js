import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const CustomHeaderOptions = ({ navigation, title }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
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

export default CustomHeaderOptions;