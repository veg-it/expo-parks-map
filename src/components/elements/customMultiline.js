import React from 'react'
import {
  StyleSheet,
  TextInput,
} from 'react-native'

const Input = ({onChangeText, value, placeholder}) => {
    return (
        <TextInput
        style={styles.searchInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        multiline
        numberOfLines={10}
      />
    )
}

const styles = StyleSheet.create({
    searchInput: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#F3F4F6',
        color: '#374151',
        borderRadius: 16,
        textAlignVertical: 'top',
        height: 300,
        paddingTop: 20
      },
})

export default Input;