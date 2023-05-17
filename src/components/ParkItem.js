import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { calculateCenter } from '../helpers/index'
import Icon from 'react-native-vector-icons/FontAwesome'

function ParkItem({ park, onPress, type }) {
  const getProblemIndicatorColor = (problemScore) => {
    if (type) return 'rgba(0, 200, 0, 1)'
    if (problemScore <= 0) {
      return 'rgba(0, 200, 0, 1)'
    } else if (problemScore >= 1 && problemScore <= 3) {
      return 'rgba(255, 102, 0, 1)'
    } else {
      return 'rgba(200, 0, 0, 1)'
    }
  }

  const polygon = park.geometry.coordinates.map((coordsArr) => {
    let coords = {
      latitude: coordsArr[1],
      longitude: coordsArr[0],
    }
    return coords
  })
  const centerCoordinates = calculateCenter(polygon)
  const problemIndicatorColor = getProblemIndicatorColor(
    park.properties.problem_score
  )

  return (
    <View key={park.parkId} style={styles.parkItem}>
      <Icon name="tree" size={32} color="#4CAF50" />
      <Text style={{ flex: 1, paddingLeft: 10 }}>{park.properties.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={[
            styles.problemIndicator,
            { backgroundColor: problemIndicatorColor },
          ]}
        />
        <TouchableOpacity onPress={() => onPress(centerCoordinates)}>
          <Icon name="map-marker" size={32} color="#3f3f3f" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default React.memo(ParkItem)
