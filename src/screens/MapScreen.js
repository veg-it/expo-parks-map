import React, { useRef, useState } from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, UrlTile } from 'react-native-maps';

import CustomBottomSheet from '../components/CustomBottomSheet'
import mapStyle from '../styles/mapStyle'
import parksData from '../data/parksData'

function MapScreen() {
  const bottomSheetRef = useRef()
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedPark, setSelectedPark] = useState(null)
  const mapRef = useRef(null)

  const calculateCenter = (polygon) => {
    let latitude = 0
    let longitude = 0
    const length = polygon.length

    polygon.forEach((point) => {
      latitude += point.latitude
      longitude += point.longitude
    })

    return { latitude: latitude / length, longitude: longitude / length }
  }

  const kievBounds = parksData.kievBounds

  const handleRegionChange = (region) => {
    if (isAnimating) {
      return
    }

    const { northEast, southWest } = kievBounds
    const newRegion = { ...region }
    if (region.latitude > northEast.latitude) {
      newRegion.latitude = northEast.latitude
    } else if (region.latitude < southWest.latitude) {
      newRegion.latitude = southWest.latitude
    }
    if (region.longitude > northEast.longitude) {
      newRegion.longitude = northEast.longitude
    } else if (region.longitude < southWest.longitude) {
      newRegion.longitude = southWest.longitude
    }

    setIsAnimating(true)
    mapRef.current.animateToRegion(newRegion, 1000)
  }

  const handleAnimateComplete = () => {
    setIsAnimating(false)
  }

  return (
    <View style={styles.container}>
      <MapView
        // ref={mapRef}
        customMapStyle={mapStyle}
        style={styles.map}
        initialRegion={parksData.initialRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        followsUserLocation={false}
        // onRegionChange={handleRegionChange}
        // onRegionChangeComplete={handleAnimateComplete}
        minZoomLevel={3}
        maxZoomLevel={18}>
        <UrlTile 
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zIndex={1}
        />
        {parksData.kievParks.features.map((feature, index) => {
          const polygon = feature.geometry.coordinates.map((coordsArr) => {
            let coords = {
              latitude: coordsArr[1],
              longitude: coordsArr[0],
            }
            return coords
          })

          const t_selectedPark = {}
          t_selectedPark.name = feature.properties.name
          t_selectedPark.center = calculateCenter(polygon)
          t_selectedPark.status = feature.properties.status
          t_selectedPark.status_date = feature.properties.status_date
          t_selectedPark.total_area = feature.properties.total_area

          return (
            <React.Fragment key={`park-${index}`}>
              <MapView.Polygon
                key={`polygon-${index}`}
                coordinates={polygon}
                fillColor="rgba(200, 0, 0, 0.5)"
                strokeColor="rgba(0, 200, 0, 0.5)"
              />
              <Marker
                key={`marker-${index}`}
                coordinate={t_selectedPark.center}
                onPress={() => {
                  setSelectedPark(t_selectedPark)
                  bottomSheetRef.current.open()
                }}>
                <Image
                  source={require('../../assets/images/tree.png')}
                  style={{ width: 32, height: 32 }}
                />
              </Marker>
            </React.Fragment>
          )
        })}
      </MapView>
      <CustomBottomSheet
        selectedPark={selectedPark}
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default MapScreen
