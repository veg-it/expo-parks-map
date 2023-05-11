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
import { getParksWithProblems } from '../api/index'
import { calculateCenter } from '../helpers/index'
import Icon from 'react-native-vector-icons/FontAwesome'

function ParksWithProblems({ navigation }) {
  const [parksWithProblems, setparksWithProblems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchParks() {
      const response = await getParksWithProblems()
      setparksWithProblems(response.features)
    }

    fetchParks()
  }, [])

  const filteredParks = parksWithProblems.filter((park) => {
    return park.properties.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  })

  const getProblemIndicatorColor = (problemScore) => {
    if (problemScore <= 0) {
      return 'green'
    } else if (problemScore >= 1 && problemScore <= 2) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  const ParkItem = React.memo(function ParkItem({ park, onPress }) {
    const centerCoordinates = calculateCenter(park.geometry.coordinates)
    const problemIndicatorColor = getProblemIndicatorColor(
      park.properties.problem_score
    )

    return (
      <View key={park.parkId} style={styles.parkItem}>
        <Icon name="tree" size={32} color="#4CAF50" />
        <Text style={{ flex: 1, paddingLeft: 10 }}>{park.properties.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={[styles.problemIndicator, { backgroundColor: problemIndicatorColor }]}
          />
          <TouchableOpacity onPress={() => onPress(centerCoordinates)}>
            <Icon name="map-marker" size={32} color="#F44336" />
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
        renderItem={({ item: park }) => {
          return (
            <ParkItem
              park={park}
              onPress={(centerCoordinates) =>
                navigation.navigate('Мапа Києву', { centerCoordinates })
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
  },
  searchInput: {
    margin: 10,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  parkItem: {
    marginHorizontal: 10,
    padding: 20,
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

export default ParksWithProblems
