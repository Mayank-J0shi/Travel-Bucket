import React from "react";
import "./app.css";
import Map from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star } from "@material-ui/icons";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import { format } from "timeago.js";

export default function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });
  const [currStyle, setCurrStyle] = useState({
    width: "100vw",
    height: "100vh",
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const handleAddClick = (event) => {
    console.log(event);
    console.log(event.lngLat);
    console.log(event.lngLat.lat);
    // console.log(lng,lat);
    setNewPlace({
      lng:event.lngLat.lng,
      lat:event.lngLat.lat
    });
  };
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
      initialViewState={viewport}
      style={currStyle}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      onDblClick={handleAddClick}
    >
      {pins.map((p) => (
        <>
          <Marker
            longitude={p.long}
            latitude={p.lat}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
            anchor="bottom"
          >
            <Room
              style={{
                fontSize: viewport.zoom * 5,
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup longitude={p.long} latitude={p.lat} anchor="left">
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p>{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
      {newPlace && (
        <Popup longitude={newPlace.lng} latitude={newPlace.lat} anchor="left">
        Hello
        </Popup>
      )}
    </Map>
  );
}
/////////checking