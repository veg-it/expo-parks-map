import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import CustomButton from '../components/elements/customButton'

function GetHelpScreen({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    Alert.alert('Form Submitted', 'Thank you for contacting the developer!', [
      { text: 'OK', onPress: () => navigation.navigate('Мапа Києву') },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Для зв'язку з підтримкою сайту ви можете скористатись електронною поштою
        та надіслати своє повідомлення на адресу: {'\n'}
        {'\n'}
        <Text style={{ fontWeight: '700' }}>suppotrt@gmail.com</Text>
        {'\n'}

      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Ваше ім'я"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Ваша електронна пошта"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        placeholder="Ваше повідомлення"
        multiline
      />
      <CustomButton onPress={handleSubmit} title={'Відправити'} />
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
    padding: 20,
    
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
})

export default GetHelpScreen
