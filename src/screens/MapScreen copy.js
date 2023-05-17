import React, { useRef, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  PixelRatio,
  Text
} from 'react-native'
import { Marker, UrlTile } from 'react-native-maps'
import MapView from "react-native-map-clustering";

import CustomBottomSheet from '../components/CustomBottomSheet'
import ParkMarkers from '../components/ParkMarkers'
import mapStyle from '../styles/mapStyle'
import { useRoute } from '@react-navigation/native';

import {
  getParks
} from '../api/index'

const latLngToPixel = (lat, lng, zoomLevel) => {
  const pixelRatio = PixelRatio.get()
  const tileSize = 256 * pixelRatio
  const scale = tileSize * (1 << zoomLevel)
  const siny = Math.sin((lat * Math.PI) / 180)
  const x = (tileSize * (0.5 + lng / 360)) / pixelRatio
  const y =
    (tileSize * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))) /
    pixelRatio
  return { x, y }
}

const calculateMapPadding = (bounds) => {
  const sw = latLngToPixel(
    bounds.southWest.latitude,
    bounds.southWest.longitude
  )
  const ne = latLngToPixel(
    bounds.northEast.latitude,
    bounds.northEast.longitude
  )
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  return {
    top: Math.max(0, (screenHeight - (ne.y - sw.y)) / 2),
    bottom: Math.max(0, (screenHeight - (sw.y - ne.y)) / 2),
    left: Math.max(0, (screenWidth - (sw.x - ne.x)) / 2),
    right: Math.max(0, (screenWidth - (ne.x - sw.x)) / 2),
  }
}

function MapScreen() {
  const bottomSheetRef = useRef()
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedPark, setSelectedPark] = useState(null)
  const mapRef = useRef(null)
  const [parks, setParks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [mapPadding, setMapPadding] = useState(null)
  const route = useRoute();

  const initialRegion = {
    latitude: 50.450001,
    longitude: 30.523333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const kievBounds = {
    northEast: {
      latitude: 50.590707,
      longitude: 30.798828,
    },
    southWest: {
      latitude: 50.309104,
      longitude: 30.247925,
    },
  }

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const parksData = await getParks()
        setMapPadding(calculateMapPadding(kievBounds))
        setParks(parksData.features)
      } catch (error) {
        console.error('Error fetching parks data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchParks()
  }, [])


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

  useEffect(() => {
    if (route.params?.centerCoordinates) {
      const { latitude, longitude } = route.params.centerCoordinates;
      mapRef.current.animateToRegion(
        {
          ...initialRegion,
          latitude,
          longitude,
        },
        1000
      );
    }
  }, [route.params?.centerCoordinates]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <MapView
            ref={mapRef}
            customMapStyle={mapStyle}
            style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={false}
            followsUserLocation={false}
            // onRegionChange={handleRegionChange}
            // onRegionChangeComplete={handleAnimateComplete}
            // minZoomLevel={3}
            // maxZoomLevel={18}
            mapPadding={mapPadding}>
            <UrlTile
              urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              zIndex={1}
            />
            <ParkMarkers
              parks={parks}
              onSelect={(selectedPark) => {
                setSelectedPark(selectedPark)
                bottomSheetRef.current.open()
              }}
            />
          </MapView>
          <CustomBottomSheet
            selectedPark={selectedPark}
            bottomSheetRef={bottomSheetRef}
          />
        </>
      )}
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
