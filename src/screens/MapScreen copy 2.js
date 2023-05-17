import React, { useRef, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  PixelRatio,
  Text,
} from 'react-native'

import MapView from 'react-native-map-clustering'
import { Marker, Polygon } from 'react-native-maps'

import CustomBottomSheet from '../components/CustomBottomSheet'
import ParkMarkers from '../components/ParkMarkers'
import mapStyle from '../styles/mapStyle'
import { useRoute } from '@react-navigation/native'

import { getParks } from '../api/index'

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

function MapScreen({ navigation }) {
  const bottomSheetRef = useRef()
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedPark, setSelectedPark] = useState(null)
  const mapRef = useRef(null)
  const [parks, setParks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [mapPadding, setMapPadding] = useState(null)
  const route = useRoute()
  const [change, setChange] = useState(null)
  const [changeC, setChangeC] = useState(null)

  const initialRegion = {
    latitude: 50.450001,
    longitude: 30.523333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
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

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <MapView
      // ref={mapRef}
      // style={styles.map}
      initialRegion={initialRegion}
      // showsUserLocation={false}
      // followsUserLocation={false}
      // provider={PROVIDER_GOOGLE}
      // onRegionChange={handleMapSwipe}
      // onRegionChange={handleRegionChange}
      // onRegionChangeComplete={handleAnimateComplete}
      // minZoomLevel={3}
      // maxZoomLevel={18}
      style={{ flex: 1 }}>
      <Marker coordinate={{ latitude: 52.4, longitude: 18.7 }} />
      <Marker coordinate={{ latitude: 52.1, longitude: 18.4 }} />
      <Marker coordinate={{ latitude: 52.6, longitude: 18.3 }} />
      <Marker coordinate={{ latitude: 51.6, longitude: 18.0 }} />
      <Marker coordinate={{ latitude: 53.1, longitude: 18.8 }} />
      <Marker coordinate={{ latitude: 52.9, longitude: 19.4 }} />
      <Marker coordinate={{ latitude: 52.2, longitude: 21 }} />
      <Marker coordinate={{ latitude: 52.4, longitude: 21 }} />
      <Marker coordinate={{ latitude: 51.8, longitude: 20 }} />

      {/* <ParkMarkers
        parks={parks}
        onSelect={(selectedPark) => {
          setSelectedPark(selectedPark)
          bottomSheetRef.current.open()
        }}
      /> */}
      

      {parks.flatMap((feature, index) => {
        
        const polygon = feature.geometry.coordinates.map((coordsArr) => {
          let coords = {
            latitude: coordsArr[1],
            longitude: coordsArr[0],
          }
          return coords
        })
        const calculateCenter = (polygon) => {
          let latitude = 0;
          let longitude = 0;
          const length = polygon.length;
      
          polygon.forEach((point) => {
            latitude += point.latitude;
            longitude += point.longitude;
          });
      
          return { latitude: latitude / length, longitude: longitude / length };
        };
        
        console.log(calculateCenter(polygon))

        const t_selectedPark = {}
        t_selectedPark.name = feature.properties.name
        t_selectedPark.center = calculateCenter(polygon)
        console.log(t_selectedPark.center)
        t_selectedPark.status = feature.properties.status
        t_selectedPark.status_date = feature.properties.status_date
        t_selectedPark.total_area = feature.properties.total_area
        t_selectedPark.id = feature.parkId

        return [
          <Polygon
            key={`polygon-${index}`}
            coordinates={polygon}
            fillColor="rgba(200, 0, 0, 0.5)"
            strokeColor="rgba(0, 200, 0, 0.5)"
          />,
          <Marker
            key={`marker-${index}`}
            coordinate={t_selectedPark.center}
            onPress={() => onSelect(t_selectedPark)}
          />
        ];
      })}
    </MapView>
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
