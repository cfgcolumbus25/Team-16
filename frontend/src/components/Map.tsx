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

// Map focus component to change view
interface MapFocusProps {
  center: LatLngExpression;
  zoom: number;
}

const MapFocus = ({ center, zoom }: MapFocusProps) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

// Component to handle map resize
const MapResizer = ({ isFullscreen }: { isFullscreen: boolean }) => {
  const map = useMap();
  
  useEffect(() => {
    // Small delay to ensure DOM has updated
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map, isFullscreen]);
  
  return null;
};

// State center coordinates and zoom levels
const stateCenters: { [key: string]: { center: LatLngExpression, zoom: number } } = {
  'All': { center: [40.5, -78.0], zoom: 5 },
  'New York': { center: [42.4440, -76.5019], zoom: 8 },
  'Ohio': { center: [40.4173, -82.9071], zoom: 7 },
  'Maryland': { center: [38.9897, -76.9378], zoom: 8 },
};

const Map = () => {
  const [selectedColleges, setSelectedColleges] = useState<number[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LatLngExpression | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [focusedState, setFocusedState] = useState<string>('All');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Get user's current location
  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
          setUseCurrentLocation(true);
          setLocationError(null);
        },
        (error) => {
          setLocationError('Unable to get location: ' + error.message);
          setUseCurrentLocation(false);
        }
      );
    } else {
      setLocationError('Geolocation not supported');
    }
  };
  
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

  // Map locations to states
  const locationToState: { [key: string]: string } = {
    'Ithaca': 'New York',
    'Ohio': 'Ohio',
    'Maryland': 'Maryland',
  };

  // Filter colleges based on focused state
  const filteredColleges = focusedState === 'All' 
    ? colleges 
    : colleges.filter(college => locationToState[college.location] === focusedState);

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
    if (useCurrentLocation && currentLocation && selectedColleges.length === 1) {
      const college = colleges.find(c => c.id === selectedColleges[0]);
      if (!college) return null;
      return {
        start: currentLocation,
        end: locationCoordinates[college.location]
      };
    }
    
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
  const currentStateView = stateCenters[focusedState] || stateCenters['All'];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div style={{ 
      height: isFullscreen ? '100vh' : '100vh', 
      width: isFullscreen ? '100vw' : '100%', 
      position: isFullscreen ? 'fixed' : 'relative',
      top: isFullscreen ? 0 : 'auto',
      left: isFullscreen ? 0 : 'auto',
      zIndex: isFullscreen ? 9999 : 'auto',
      backgroundColor: 'white'
    }}>
      {/* Fullscreen Button - Top Right */}
      <button
        onClick={toggleFullscreen}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1001,
          backgroundColor: 'white',
          border: '2px solid rgba(0,0,0,0.2)',
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '18px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? '✕' : '⛶'}
      </button>

      {/* College Selection Panel - Top Left */}
      <div style={{ 
        position: 'absolute', 
        top: '80px', 
        left: '10px', 
        zIndex: 1000, 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        maxWidth: '250px'
      }}>
        {/* State Filter */}
        <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            Focus on State:
          </label>
          <select 
            value={focusedState}
            onChange={(e) => setFocusedState(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <option value="All">All States</option>
            <option value="New York">New York</option>
            <option value="Ohio">Ohio</option>
            <option value="Maryland">Maryland</option>
          </select>
        </div>
        {/* Current Location Toggle */}
        <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '13px', marginBottom: '5px' }}>
            <input
              type="checkbox"
              checked={useCurrentLocation}
              onChange={(e) => {
                setUseCurrentLocation(e.target.checked);
                if (e.target.checked) {
                  getCurrentLocation();
                  setSelectedColleges([]);
                } else {
                  setCurrentLocation(null);
                }
              }}
              style={{ marginRight: '8px' }}
            />
            <strong>📍 Use My Current Location</strong>
          </label>
          {useCurrentLocation && !currentLocation && !locationError && (
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '5px 0 0 0' }}>Getting location...</p>
          )}
          {locationError && (
            <p style={{ fontSize: '11px', color: '#ef4444', margin: '5px 0 0 0' }}>{locationError}</p>
          )}
          {useCurrentLocation && currentLocation && (
            <p style={{ fontSize: '11px', color: '#10b981', margin: '5px 0 0 0' }}>✓ Location acquired</p>
          )}
        </div>

        {/* College Selection */}
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          {useCurrentLocation ? 'Select 1 College for Route' : 'Select 2 Colleges for Route'}
        </h3>

        {filteredColleges.map(college => (
          <div key={college.id} style={{ marginBottom: '5px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '12px' }}>
              <input
                type="checkbox"
                checked={selectedColleges.includes(college.id)}
                onChange={() => handleCollegeSelect(college.id)}
                disabled={useCurrentLocation && selectedColleges.length >= 1 && !selectedColleges.includes(college.id)}
                style={{ marginRight: '8px' }}
              />
              {college.collegeName}
            </label>
          </div>
        ))}
        {((selectedColleges.length === 2 && !useCurrentLocation) || 
          (selectedColleges.length === 1 && useCurrentLocation)) && (
          <button 
            onClick={() => {
              setSelectedColleges([]);
              setUseCurrentLocation(false);
              setCurrentLocation(null);
            }}
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
        <MapFocus center={currentStateView.center} zoom={currentStateView.zoom} />
        <MapResizer isFullscreen={isFullscreen} />
        {currentLocation && useCurrentLocation && (
          <Marker position={currentLocation} icon={createColoredIcon('violet')}>
            <Popup>
              <strong>Your Current Location</strong>
            </Popup>
          </Marker>
        )}
        {filteredColleges.map((college) => {
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
