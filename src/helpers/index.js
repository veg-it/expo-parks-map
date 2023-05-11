export const calculateCenter = (polygon) => {
    let latitude = 0
    let longitude = 0
    const length = polygon.length

    polygon.forEach((point) => {
      latitude += point[0]
      longitude += point[1]
    })

    return {
      latitude: latitude / length,
      longitude: longitude / length,
    }
  }