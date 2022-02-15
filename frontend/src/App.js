import * as React from "react";
import Map from "react-map-gl";
import { useEffect, useState } from "react";

import ReactMapGL ,{Marker} from "react-map-gl";

export default function App() {
  const [viewPort, setviewPort] = useState({
    latitude: 46,
    longitude: 17,
    zoom: 1,
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
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
       <Marker longitude={2.2945} latitude={48.8584}  offsetLeft = {-20} offsetTop = {-10} anchor="bottom" >
       <div>Here-IS-the-marker</div>  
        </Marker>
    </Map>
  );
}

