import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapsType {
  coordinates: {
    lat: number;
    lng: number;
  };
  title: string;
  markerId: number;
}

const MapComponent: React.FC<MapsType> = ({ coordinates, title, markerId }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDusDtZyAnRDAOfUUnqb4gObtbz9z74_sg">
      <div className="w-full m-8 rounded-2xl overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={coordinates}
          zoom={14}
        >
          {markerId === 1 ? (
            <Marker position={coordinates} title={title} />
          ) : (
            ""
          )}
          <></>
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default React.memo(MapComponent);
