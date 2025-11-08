import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

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

// Routing component
interface RoutingMachineProps {
  start: LatLngExpression;
  end: LatLngExpression;
}

const RoutingMachine = ({ start, end }: RoutingMachineProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start as [number, number]),
        L.latLng(end as [number, number])
      ],
      routeWhileDragging: true,
      showAlternatives: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#6366f1', weight: 4, opacity: 0.7 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      show: true,
      fitSelectedRoutes: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
};

const Map = () => {
  const [selectedColleges, setSelectedColleges] = useState<number[]>([]);
  
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

  const centerPosition: LatLngExpression = [40.5, -78.0]; // Center of the three locations

  const handleCollegeSelect = (collegeId: number) => {
    setSelectedColleges(prev => {
      if (prev.includes(collegeId)) {
        return prev.filter(id => id !== collegeId);
      }
      if (prev.length >= 2) {
        return [prev[1], collegeId];
      }
      return [...prev, collegeId];
    });
  };

  const getRoutePoints = () => {
    if (selectedColleges.length !== 2) return null;
    const college1 = colleges.find(c => c.id === selectedColleges[0]);
    const college2 = colleges.find(c => c.id === selectedColleges[1]);
    if (!college1 || !college2) return null;
    return {
      start: locationCoordinates[college1.location],
      end: locationCoordinates[college2.location]
    };
  };

  const routePoints = getRoutePoints();

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '10px', 
        zIndex: 1000, 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        maxWidth: '250px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Select 2 Colleges for Route</h3>
        {colleges.map(college => (
          <div key={college.id} style={{ marginBottom: '5px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '12px' }}>
              <input
                type="checkbox"
                checked={selectedColleges.includes(college.id)}
                onChange={() => handleCollegeSelect(college.id)}
                style={{ marginRight: '8px' }}
              />
              {college.collegeName}
            </label>
          </div>
        ))}
        {selectedColleges.length === 2 && (
          <button 
            onClick={() => setSelectedColleges([])}
            style={{ 
              marginTop: '10px', 
              padding: '5px 10px', 
              backgroundColor: '#ef4444', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              width: '100%'
            }}
          >
            Clear Route
          </button>
        )}
      </div>
      <MapContainer 
        center={centerPosition} 
        zoom={5} 
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
        {routePoints && (
          <RoutingMachine start={routePoints.start} end={routePoints.end} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
