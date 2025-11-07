import { useEffect } from 'react';
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

const position: LatLngExpression = [39.9612, -82.9988]; // Columbus, OH

const Map = () => {
	useEffect(() => {
		console.log('Map component mounted');
	}, []);

	return (
		<div style={{ height: '100vh', width: '100%', backgroundColor: 'lightblue' }}>
			<h1 style={{ margin: 0, padding: '10px', backgroundColor: 'white' }}>Map Test</h1>
			<MapContainer 
				center={position} 
				zoom={13} 
				style={{ height: 'calc(100vh - 50px)', width: '100%' }}
				scrollWheelZoom={true}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
				/>
				<Marker position={position}>
					<Popup>
						Columbus, Ohio<br />Map is working!
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Map;
