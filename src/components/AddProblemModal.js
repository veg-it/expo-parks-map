import React from 'react'
import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Constants from 'expo-constants'

import Multiline from './elements/customMultiline'
import CustomButton from './elements/customButton'

const AddProblemModal = ({ onClose, onSubmit, problem }) => {
  const [problemSaved, setProblemSaved] = useState()
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: 40,
        }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            backgroundColor: '#3f3f3f',
            padding: 10,
            borderRadius: 8,
          }}>
          <Icon name="arrow-back" color={'#fff'} size={32} />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: '#374151',
          fontSize: 16,
          marginBottom: 20
        }}>
        {problem ? 'Повідомити про проблему з парком:' : 'Повідомити про рішення'}
      </Text>

      <Multiline
        onChangeText={setProblemSaved}
        value={problemSaved}
        placeholder={'Напишіть короткий опис проблеми'}
      />
      <CustomButton onPress={() => onSubmit(problemSaved)} title={'Надіслати'}/>
    </View>
  )
}

export default AddProblemModal
