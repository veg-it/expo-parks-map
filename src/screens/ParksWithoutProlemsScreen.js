import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { getParksWithoutProblems } from '../api/index'
import { calculateCenter } from '../helpers/index'
import Icon from 'react-native-vector-icons/FontAwesome'

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

  const ParkItem = React.memo(function ParkItem({ park, onPress }) {

    const polygon = park.geometry.coordinates.map((coordsArr) => {
      let coords = {
        latitude: coordsArr[1],
        longitude: coordsArr[0],
      }
      return coords
    })
    const centerCoordinates = calculateCenter(polygon)

    return (
      <View key={park.parkId} style={styles.parkItem}>
        <Icon name="tree" size={32} color="#4CAF50" />
        <Text style={{ flex: 1, paddingLeft: 10 }}>{park.properties.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={[styles.problemIndicator, { backgroundColor: 'green' }]}
          />
          <TouchableOpacity onPress={() => onPress(centerCoordinates)}>
            <Icon name="map-marker" size={32} color="#3f3f3f" />
          </TouchableOpacity>
        </View>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Поиск парка"
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
    paddingHorizontal: 20
  },
  searchInput: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#F3F4F6',
    color: '#374151',
    borderRadius: 16,
  },
  parkItem: {
    marginHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5.41,

    elevation: 1,
  },
  parkIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  problemIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  mapIcon: {
    width: 32,
    height: 32,
  },
})

export default ParksWithoutProlemsScreen
