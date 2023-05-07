import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

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
      {/* <Text style={styles.title}>Зв'язатись з розробником можна відправив повідомлення на електронною адресою:{'\n'}admin@gmail.com</Text>
      <Text style={styles.title}>Також ви можете використатати форму нижче</Text>     */}
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
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Відправити</Text>
      </TouchableOpacity>
      {/* <Button onPress={() => navigation.navigate('MapScreen')} title="Back" /> */}
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
  submitButton: {
    backgroundColor: '#007BFF',
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

export default GetHelpScreen
