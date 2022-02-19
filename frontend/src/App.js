import React from "react";
import "./app.css";
import Map from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star } from "@material-ui/icons";
import { Marker, Popup } from "react-map-gl";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";
import { format } from "timeago.js";

export default function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [viewport, setViewport] = React.useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (event) => {
    setNewPlace({
      lng: event.lngLat.lng,
      lat: event.lngLat.lat,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };
    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    setCurrentUser(null);
    myStorage.removeItem("user");
  };

  return (
    <Map
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      style={{ width: "100%", height: "100vh" }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      // mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      mapStyle="mapbox://styles/grimo/ckzttlpwr002x14q6blc0vj4a"
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
                color: currentUser === p.username ? "red" : "slateblue",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
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
                  {Array(p.rating).fill(<Star className="star" />)}
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
        <Popup
          longitude={newPlace.lng}
          latitude={newPlace.lat}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="left"
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                placeholder="Enter a title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <label>Review</label>
              <textarea
                placeholder="Say Something about this place"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">
                Add Pin
              </button>
            </form>
          </div>
        </Popup>
      )}

      {currentUser ? (
        <button className="button logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div className="buttons">
          <button className="button login" onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button
            className="button register"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      )}
      {showRegister && (
        <Register
          setShowRegister={setShowRegister}
          myStorage={myStorage}
          setCurrentUsername={setCurrentUser}
        />
      )}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          myStorage={myStorage}
          setCurrentUsername={setCurrentUser}
        />
      )}
    </Map>
  );
}

//add transition duration to slow down the focused view when we click a certain map location
