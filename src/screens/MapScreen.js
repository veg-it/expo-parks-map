import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';

import CustomBottomSheet from '../components/CustomBottomSheet';
import mapStyle from '../styles/mapStyle';
import { useRoute } from '@react-navigation/native';
import { calculateCenter } from '../helpers/index';
import { initialRegion, kievBounds } from '../data/index';

import { getParks } from '../api/index';

function MapScreen() {
  const bottomSheetRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPark, setSelectedPark] = useState(null);
  const mapRef = useRef(null);
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();

  const fetchParks = useCallback(async () => {
    try {
      const parksData = await getParks();
      setParks(parksData.features);
    } catch (error) {
      console.error('Error fetching parks data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParks();
  }, [fetchParks]);

  const onMapReady = () => {
    if (mapRef.current) {
      const northEast = kievBounds.northEast;
      const southWest = kievBounds.southWest;

      mapRef.current.fitToCoordinates([northEast, southWest], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: false,
      });
    }
  };

  const handleRegionChange = (region) => {
    if (isAnimating) {
      return;
    }

    const { northEast, southWest } = kievBounds;
    if (
      region.latitude > northEast.latitude ||
      region.latitude < southWest.latitude ||
      region.longitude > northEast.longitude ||
      region.longitude < southWest.longitude
    ) {
      const newRegion = { ...region };
      if (region.latitude > northEast.latitude) {
        newRegion.latitude = northEast.latitude;
      } else if (region.latitude < southWest.latitude) {
        newRegion.latitude = southWest.latitude;
      }
      if (region.longitude > northEast.longitude) {
        newRegion.longitude = northEast.longitude;
      } else if (region.longitude < southWest.longitude) {
        newRegion.longitude = southWest.longitude;
      }

      setIsAnimating(true);
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  const handleAnimateComplete = () => {
    setIsAnimating(false);
  };

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
    <View style={[styles.container, { zIndex: 0 }]}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <MapView
            ref={mapRef}
            customMapStyle={mapStyle}
            style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={false}
            followsUserLocation={false}
            provider={PROVIDER_GOOGLE}
            clusterColor="#3f3f3f"
            onMapReady={onMapReady}
            onRegionChange={handleRegionChange}
            onRegionChangeComplete={handleAnimateComplete}
          >
            {parks.flatMap((feature, index) => {
              const polygon = feature.geometry.coordinates.map((coordsArr) => {
                let coords = {
                  latitude: coordsArr[1],
                  longitude: coordsArr[0],
                };
                return coords;
              });

              const t_selectedPark = {};
              t_selectedPark.name = feature.properties.name;
              t_selectedPark.center = calculateCenter(polygon);
              t_selectedPark.status = feature.properties.status;
              t_selectedPark.status_date = feature.properties.status_date;
              t_selectedPark.total_area = feature.properties.total_area;
              t_selectedPark.id = feature.parkId;

              return [
                <Polygon
                  key={`polygon-${index}`}
                  coordinates={polygon}
                  fillColor={
                    feature.properties.problem_score > 3
                      ? 'rgba(200, 0, 0, 0.5)'
                      : feature.properties.problem_score > 0
                      ? 'rgba(255, 102, 0, 0.5)'
                      : 'rgba(0, 200, 0, 0.5)'
                  }
                  strokeColor={
                    feature.properties.problem_score > 3
                      ? 'rgba(200, 0, 0, 0.5)'
                      : feature.properties.problem_score > 0
                      ? 'rgba(255, 102, 0, 0.5)'
                      : 'rgba(0, 200, 0, 0.5)'
                  }
                />,
                <Marker
                  key={`marker-${index}`}
                  coordinate={t_selectedPark.center}
                  pinColor={
                    feature.properties.problem_score > 3
                      ? 'rgba(200, 0, 0, 1)'
                      : feature.properties.problem_score > 0
                      ? 'rgba(255, 102, 0, 1)'
                      : 'rgba(0, 200, 0, 1)'
                  }
                  onPress={() => {
                    setSelectedPark(t_selectedPark);
                    bottomSheetRef.current.open();
                  }}
                />,
              ];
            })}
          </MapView>
          <CustomBottomSheet
            selectedPark={selectedPark}
            bottomSheetRef={bottomSheetRef}
            onDataUpdate={fetchParks}
          />
        </>
      )}
    </View>
  );
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
});

export default MapScreen;
