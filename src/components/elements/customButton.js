import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const customButton = ({onPress, title}) => {
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center'
    }}>
      <TouchableOpacity style={styles.submitButton} onPress={onPress}>
        <Text style={styles.submitButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#3f3f3f',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
export default customButton
