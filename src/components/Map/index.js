import React, { useState } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import { useSelector } from "react-redux"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {

  const [latitude, setLatitude] = useState(24.902752)
  const [longitude, setLongitude] = useState(67.1124084)
  const [places, setPlaces] = useState([])

  const setCoordinates = (event) => {
    setLatitude(event.latLng.lat)
    setLongitude(event.latLng.lng)


    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=UVNMGGR0VNLCW3QUQISSG0TQGEOW4RREFVXZMIDT0VUHSHCR&client_secret=4JS1TJ0RLIO111SIXKTWN1MDM4G4V41GYOYGZCB4YGXF12RA
&v=20180323&ll=${latitude},${longitude}`)
      .then(res => res.json())
      // .then(res => console.log("response from API", res.response.groups[0].items.map((item, ind) =>
      .then(res => setPlaces(res.response.groups[0].items)
      )
  }


  return (
    <div>
      <br></br>
      <br></br>
      <h1>Drag marker to select Places</h1>
      <select>
        {places.map((place, index) => {
          return <option key={index} value={place}>{place.venue.name}</option>
        })}
      </select>
      <br></br>
      <br></br>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 24.902752, lng: 67.1124084 }}
      >
        {props.isMarkerShown && <Marker draggable={true} onDragEnd={(event) => setCoordinates(event)} position={{ lat: latitude, lng: longitude }} />}
      </GoogleMap>

    </div>
  )
}))

export default MyMapComponent


