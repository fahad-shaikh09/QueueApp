import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 24.902752, lng: 67.1124084 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 24.902752, lng: 67.1124084 }} />}
  </GoogleMap>
))

export default MyMapComponent


