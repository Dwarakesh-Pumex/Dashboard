"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CardContent } from "@mui/material";
import L from "leaflet";


const customIcon = new L.Icon({
  iconUrl: '/loc.png',
  iconSize: [45, 45], 
  iconAnchor: [17, 42], 
  popupAnchor: [0, -40],
});

export default function MapCard() {
  const position = [47.524292, -122.301727]; 

  return (
    <CardContent>

      <div style={{alignItems:"center",height:"400px",width:"340px", borderRadius: "10px", background: "#01141A" }}>
        <MapContainer
          center={position}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", background: "#01141A" }}
        >
          {/* Dark-themed tile layer */}
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

          {/* Marker with Custom Icon */}
          <Marker position={position} icon={customIcon}>
            <Popup>
              <div style={{ color: "white", backgroundColor: "#102127", padding: "5px", borderRadius: "5px" }}>
                <b>Device ID:</b> GAL-NM-6234
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </CardContent>
  );
}
