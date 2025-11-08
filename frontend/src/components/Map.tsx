import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface College {
  id: number;
  collegeName: string;
  location: string;
  cost: number;
  acceptanceRate: number;
  clepAccept: number;
  amountOfStudentClepScores: number;
}

// Map location names to coordinates
const locationCoordinates: { [key: string]: LatLngExpression } = {
  'Ithaca': [42.4440, -76.5019],
  'Ohio': [40.4173, -82.9071], // Columbus, OH
  'Maryland': [38.9897, -76.9378], // College Park, MD
};

// Create custom colored markers for each location
const createColoredIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const locationColors: { [key: string]: string } = {
  'Ithaca': 'red',
  'Ohio': 'blue',
  'Maryland': 'green',
};

const Map = () => {
  // Hardcoded colleges data - matches CollegeContainer
  const colleges: College[] = [
    {
      id: 1,
      collegeName: "Cornell University",
      location: "Ithaca",
      cost: 100000,
      acceptanceRate: 10,
      clepAccept: 10,
      amountOfStudentClepScores: 20,
    },
    {
      id: 2,
      collegeName: "Ohio State University",
      location: "Ohio",
      cost: 50000,
      acceptanceRate: 5,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
    },
    {
      id: 3,
      collegeName: "University of Maryland",
      location: "Maryland",
      cost: 50000,
      acceptanceRate: 10,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
    },
  ];

  const centerPosition: LatLngExpression = [40.0, -80.0]; // Center of the three locations

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer 
        center={centerPosition} 
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {colleges.map((college) => {
          const position = locationCoordinates[college.location];
          const color = locationColors[college.location] || 'blue';
          if (!position) return null;
          
          return (
            <Marker key={college.id} position={position} icon={createColoredIcon(color)}>
              <Popup>
                <strong>{college.collegeName}</strong><br />
                Location: {college.location}<br />
                Cost: ${college.cost.toLocaleString()}<br />
                Acceptance Rate: {college.acceptanceRate}%<br />
                CLEP Accept: {college.clepAccept}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
