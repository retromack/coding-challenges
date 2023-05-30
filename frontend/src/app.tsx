import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useFetchData } from "./hooks";

const App = () => {
  const [center, setCenter] = useState({
    lat: 51.505,
    lng: -0.09,
  });

  const { data, loading } = useFetchData(center);

  const EventHandler = () => {
    const map = useMapEvents({
      // https://leafletjs.com/reference.html#map-moveend
      moveend: () => {
        // https://leafletjs.com/reference.html#map-getcenter
        setCenter(map?.getCenter());
      },
    });

    return <Marker position={center} />;
  };

  return (
    <div>
      <h1 className="text-center text-2xl">CODING CHALLENGE</h1>
      <div className="p-5 space-y-5">
        <div className="space-y-2.5">
          <h1>EXERCISE 1</h1>
          <div className="h-96 w-full p-1 border">
            <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ minHeight: "100%", minWidth: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <EventHandler />
            </MapContainer>
          </div>
          <fieldset className="border border-gray-400 p-2 rounded">
            <legend>CENTER COORDINATES</legend>
            <div>LAT: {center.lat.toFixed(2)}</div>
            <div>LNG: {center.lng.toFixed(2)}</div>
          </fieldset>
        </div>

        <div>
          <h1>EXERCISE 2</h1>
          {loading ? (
            <div className="text-center text-gray-500">LOADING WEATHER DATA...</div>
          ) : data ? (
            <div className="grid gap-5 md:grid-cols-2">
              <fieldset className="border border-gray-400 p-2 rounded">
                <legend>CURRENT WEATHER</legend>
                <div>Temperature: {data.current.temp_c}°C</div>
                <div>Humidity: {data.current.humidity}%</div>
                <div>Precipitation: {data.current.precip_mm} mm</div>
              </fieldset>

              <fieldset className="border border-gray-400 p-2 rounded">
                <legend>NEXT DAY FORECAST</legend>
                <div>Temperature: {data.forecast.forecastday[1].day.avgtemp_c}°C</div>
                <div>Humidity: {data.forecast.forecastday[1].day.avghumidity}%</div>
                <div>Precipitation: {data.forecast.forecastday[1].day.totalprecip_mm} mm</div>
              </fieldset>
            </div>
          ) : (
            <div className="text-center text-gray-500">NO WEATHER DATA AVAILABLE!</div>
          )}
        </div>

        <div>
          <h1>EXERCISE 3</h1>
          <div className="space-y-2.5">
            <div>
              <div className="font-bold">How could we support having values that would change rapidly from the backend?</div>
              <p>
                You can use technologies such as <span className="font-semibold"> Websockets</span> or{" "}
                <span className="font-semibold">Server-Sent Events (SSE)</span> to push data from the backend to the
                frontent. The front will subscribe to the updates and the user will get real-time updates.
              </p>
            </div>

            <div>
              <div className="font-bold">How could we prepare the system to be able to use different weather providers?</div>
              <p>
                You can abstract the weather API calls into a service that you can inject into your components. This will
                eneable you to use different weather providers, make it easier to test and maintain your code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
