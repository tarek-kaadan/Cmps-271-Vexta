import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const countryCoordinates: Record<string, [number, number]> = {
  Africa: [1.6508, 10.2679],
  Iran: [32.4279, 53.688],
  Philippines: [13.41, 122.56],
  India: [20.5937, 78.9629],
  Iraq: [33.2232, 43.6793],
  Switzerland: [46.8182, 8.2275],
  China: [35.8617, 104.1954],
  Brazil: [-14.235, -51.9253],
  Afghanistan: [33.9391, 67.71],
  "Latin America": [-9.19, -75.0152],
  "Sri Lanka": [7.8731, 80.7718],
  "South Korea": [35.9078, 127.7669],
  Morocco: [31.7917, -7.0926],
  Kazakhstan: [48.0196, 66.9237],
  Malaysia: [4.2105, 101.9758],
  Greece: [39.0742, 21.8243],
  "United Kingdom": [55.3781, -3.436],
  Uganda: [1.3733, 32.2903],
  Egypt: [26.8206, 30.8025],
  Thailand: [15.87, 100.9925],
  "New Zealand": [-40.9006, 174.886],
  USA: [37.0902, -95.7129],
  Sweden: [60.1282, 18.6435],
  Russia: [61.524, 105.3188],
  France: [46.6034, 1.8883],
};

export default function Map() {
  const navigate = useNavigate();

  const handleCountryClick = (country: string) => {
    navigate(`/country/${encodeURIComponent(country)}`);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.entries(countryCoordinates).map(([country, coords]) => (
          <Marker
            key={country}
            position={coords}
            eventHandlers={{
              click: () => handleCountryClick(country),
            }}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [25, 25],
              iconAnchor: [12, 25],
            })}
          >
            <Popup>{country}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
