export const calculateCenter = (polygon) => {
  let latitude = 0
  let longitude = 0
  const length = polygon.length

  polygon.forEach((point) => {
    latitude += point.latitude
    longitude += point.longitude
  })

  return {
    latitude: latitude / length,
    longitude: longitude / length,
  }
}
  