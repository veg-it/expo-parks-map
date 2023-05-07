const parks = require('./parks.json')

const filteredParks = parks.features.filter(
  (feature) => feature.properties.city === 'Киев'
)

const kievParks = { features: filteredParks }

const initialRegion = {
  latitude: 50.4501,
  longitude: 30.5234,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
}

const kievBounds = {
  northEast: {
    latitude: 50.6050,
    longitude: 30.8254,
  },
  southWest: {
    latitude: 50.2139,
    longitude: 30.2394,
  },
};
export default { kievParks, initialRegion, kievBounds }
