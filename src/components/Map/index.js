import React, { useState } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {

  const [latitude, setLatitude] = useState(24.902752)
  const [longitude, setLongitude] = useState(67.1124084)

  const setCoordinates = (event) => {
    setLatitude(event.latLng.lat)
    setLongitude(event.latLng.lng)
  }

  

  // console.log("Latitude", latitude)
  // console.log("Longitude", longitude)

  return (


    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 24.902752, lng: 67.1124084 }}
    >
      {props.isMarkerShown && <Marker draggable={true}  onDragEnd={(event) => setCoordinates(event)} position={{ lat: latitude, lng: longitude }} />}
    </GoogleMap>
  )
}))

export default MyMapComponent


