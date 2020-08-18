/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {
  // logEntries starts as an empty array
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  // set map size, starting location, and zoom
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 4,
  });

  const getEntries = async () => {
    // eslint-disable-next-line no-shadow
    const logEntries = await listLogEntries();
    // update state so array can be used in render function
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  const {
    width, height, latitude, longitude, zoom,
  } = viewport;

  return (
    <ReactMapGL
      width={width}
      height={height}
      latitude={latitude}
      longitude={longitude}
      zoom={zoom}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/markboyd14/ckds6ht8h0nh319rz74237mcg"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {
        // place a map marker for each log entry
      logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          {/* set marker props */}
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div
              style={{ outline: 'none' }}
              onClick={() => setShowPopup({
                // ...showPopup,
                [entry._id]: true,
              })}
              role="button"
              tabIndex={0}
              onKeyDown={() => setShowPopup({
                showPopup, [entry._id]: true,
              })}
            >
              <svg
                className="marker yellow"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035    c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719    c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z" />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {
          showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton
              closeOnClick={false}
              // eslint-disable-next-line react/no-this-in-sfc
              onClose={() => setShowPopup({
                // ...showPopup,
                // [entry._id]: false,
              })}
              anchor="top"
            >
              <div className="details-popup">
                <h3>{entry.title}</h3>
                <p>
                  {entry.rating}
                  /10
                </p>
                <p>{entry.comments}</p>
                {entry.image && <img src={entry.image} alt={entry.title} />}
                <small>
                  Visited on:
                  {' '}
                  {new Date(entry.visitDate).toLocaleDateString()}
                </small>

              </div>
            </Popup>
          ) : null
        }
        </React.Fragment>
      ))
    }
      {
      addEntryLocation ? (
        <>
          <Marker

            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <svg
                className="marker red"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                    c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                    c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton
            closeOnClick={false}
              // eslint-disable-next-line react/no-this-in-sfc
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="form-popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />

            </div>
          </Popup>
        </>
      ) : null
    }
    </ReactMapGL>
  );
};

export default App;
