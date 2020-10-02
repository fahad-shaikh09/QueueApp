import React, { useState } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import { useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const classes = useStyles();

  const [latitude, setLatitude] = useState(24.902752)
  const [longitude, setLongitude] = useState(67.1124084)
  const [places, setPlaces] = useState([])
  const [selected,setSelected] = useState("")
  // console.log("selected place: ", selected)


props.getAddress(selected)

  const setCoordinates = (event) => {
    setLatitude(event.latLng.lat)
    setLongitude(event.latLng.lng)

    // console.log("new Latitude", latitude)
    // console.log("new Longitude", longitude)


    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=UVNMGGR0VNLCW3QUQISSG0TQGEOW4RREFVXZMIDT0VUHSHCR&client_secret=4JS1TJ0RLIO111SIXKTWN1MDM4G4V41GYOYGZCB4YGXF12RA
&v=20180323&ll=${latitude},${longitude}`)
      .then(res => res.json())
      // .then(res => console.log("response from API", res.response.groups[0].items.map((item, ind) =>
      .then(res => setPlaces(res.response.groups[0].items)
      )
  }


  return (
    <div>
      <div>
        <h1>Drag marker in map to load Locations in menu</h1>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Select Location from below menu!
        </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {/* <MenuItem value={10}>Ten</MenuItem> */}
            {places.map((place, index) => {
              return <option key={index} value={place} onClick={()=>{setSelected(place.venue.name)}}>
                {place.venue.name}
                </option>
            })}
          </Select>
          <FormHelperText>Drag marker to select area</FormHelperText>
        </FormControl>
      </div>

      {/* ///////////////////////////////////////////////////////////////////////////////// */}
      <br></br>
      <br></br>
      {/* <h1>Drag marker to select Places</h1>
      <select>
        {places.map((place, index) => {
          return <option key={index} value={place}>{place.venue.name}</option>
        })}
      </select> */}
      <br></br>
      <br></br>
      <div>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: 24.902752, lng: 67.1124084 }}
        >
          {props.isMarkerShown && <Marker draggable={true} onDragEnd={(event) => setCoordinates(event)} position={{ lat: latitude, lng: longitude }} />}
        </GoogleMap>
      </div>
    </div>
  )
}))

export default MyMapComponent


