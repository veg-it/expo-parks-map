import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { getParksWithoutProblems } from '../api/index'

import CustomTextInput from '../components/elements/customInput'
import ParkItem from '../components/ParkItem'

function ParksWithoutProlemsScreen({ navigation }) {
  const [parksWithProblems, setparksWithProblems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchParks() {
      const response = await getParksWithoutProblems()
      setparksWithProblems(response.features)
    }

    fetchParks()
  }, [])

  const filteredParks = parksWithProblems.filter((park) => {
    return park.properties.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  })


  return (
    <View style={styles.container}>
      <CustomTextInput
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder={"Поиск парка"}
      />
      <FlatList
        data={filteredParks}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: park }) => {
          return (
            <ParkItem
              park={park}
              onPress={(centerCoordinates) =>
                navigation.navigate('Мапа Києву', { centerCoordinates, park })
              }
              type={1}
            />
          )
        }}
        keyExtractor={(item) => item.parkId.toString()}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 110,
    paddingHorizontal: 20,
  },
})

export default ParksWithoutProlemsScreen
