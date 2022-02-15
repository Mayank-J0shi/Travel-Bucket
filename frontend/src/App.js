import * as React from "react";
import "./app.css";
import Map from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star } from "@material-ui/icons";
import ReactMapGL ,{Marker,Popup} from "react-map-gl";

export default function App() {
  const [viewPort, setviewPort] = useState({
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });
  const [currStyle, setCurrStyle] = useState({ width: "100vw", height: "100vh" });
  // return  (
  //   <div>
  //     <ReactMapGL
  //       {...viewPort}
  //       mapboxAccessToken ="pk.eyJ1IjoiZ3JpbW8iLCJhIjoiY2t6b2FiZm51MzZtcTJ1b2NyaDJudTlycSJ9.Mk6nUp9NF1xRyWUeuQHV0g"
  //       onViewportChange={nextViewport=>setviewPort(nextViewport)}
  //     />
  //   </div>
  // )
  return (
    <Map
      initialViewState={viewPort}
      style={currStyle}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
    >
       <Marker longitude={2.2945} latitude={48.8584} anchor="bottom" >
        <Room style={{ fontSize: viewPort.zoom*7 ,color :"red" }}/>
        </Marker>
        <Popup longitude={2.2945} latitude={48.8584}
        anchor="left"
        >

        <div className="card">
          <label>Place</label>
          <h4 className="place">Eiffell Tower</h4>
          <label>Review</label>
          <p>Beautiful Place</p>
          <label>Rating</label>
          <div className="starts">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <label>Information</label>
          <span className="username" >Created by <b>Mayank</b></span>
          <span className="date" >1 hour ago</span>

        </div>
      </Popup>
    </Map>
  );
}

