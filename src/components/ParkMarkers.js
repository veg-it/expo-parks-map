import React from 'react';
import { Image } from 'react-native';
import { Marker, Polygon } from 'react-native-maps';

const ParkMarkers = ({ parks, onSelect }) => {
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

  const markersAndPolygons = parks.flatMap((feature, index) => {
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

    return (
      // <Polygon
      //   key={`polygon-${index}`}
      //   coordinates={polygon}
      //   fillColor="rgba(200, 0, 0, 0.5)"
      //   strokeColor="rgba(0, 200, 0, 0.5)"
      // />,
      <Marker
        key={`marker-${index}`}
        coordinate={t_selectedPark.center}
        onPress={() => onSelect(t_selectedPark)}
      />
    );
  });

  return markersAndPolygons;
};

export default ParkMarkers;
