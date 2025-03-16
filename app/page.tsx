'use client'

import { useProperties } from "@/hooks/use-properties";
import { CopilotChat } from "@copilotkit/react-ui";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useRef } from "react";

export default function Home() {
  const [isOpenInfoWindow, setIsOpenInfoWindow] = useState(false);
  const { propOnMap } = useProperties();
  const defaultCenter = propOnMap
    ? { lat: propOnMap.Latitude, lng: propOnMap.Longitude }
    : { lat: 40.7128, lng: -74.0060 };

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  // We'll store the Marker reference so the InfoWindow can anchor to it
  const markerRef = useRef<any>(null);

  return (
    <div className="flex flex-row w-full min-h-full">
      {/* Map Area */}
      <div className="flex-1 p-1 min-h-screen">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={propOnMap ? 15 : 1}
          >
            {propOnMap && (
              <Marker
                position={defaultCenter}
                title={`${propOnMap.Rent} AED ${propOnMap.Frequency}`}
                onClick={() => setIsOpenInfoWindow(true)}
                onLoad={(marker) => (markerRef.current = marker)}
              />
            )}

            {isOpenInfoWindow && propOnMap && Object.keys(propOnMap.placeData).length !== 0 && (
              <InfoWindow
                anchor={markerRef.current}
                onCloseClick={() => setIsOpenInfoWindow(false)}
              >
                <div className="max-w-xs bg-white p-4 rounded shadow-lg text-black overflow-hidden font-sans">
                  {propOnMap.placeData.displayName && (
                    <h1 className="text-xl font-bold mb-2">{propOnMap.placeData.displayName}</h1>
                  )}
                  {propOnMap.placeData.formattedAddress && (
                    <p className="text-sm text-gray-700 mb-2">{propOnMap.placeData.formattedAddress}</p>
                  )}
                  <p className="text-sm text-gray-800 mb-2">
                    <strong>Rent:</strong> {propOnMap.Rent} AED {propOnMap.Frequency}
                  </p>
                  {propOnMap.placeData.rating !== undefined && (
                    <p className="text-sm text-gray-800 mb-2">
                      <strong>Rating:</strong> {propOnMap.placeData.rating}
                    </p>
                  )}
                  {propOnMap.placeData.formattedPhoneNumber && (
                    <p className="text-sm text-gray-800 mb-2">
                      <strong>Phone:</strong> {propOnMap.placeData.formattedPhoneNumber}
                    </p>
                  )}
                  {propOnMap.placeData.website && (
                    <p className="text-sm text-gray-800 mb-2">
                      <strong>Website:</strong>{' '}
                      <a
                        href={propOnMap.placeData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {propOnMap.placeData.website}
                      </a>
                    </p>
                  )}
                  {propOnMap.placeData.businessStatus && (
                    <p className="text-sm text-gray-800 mb-2">
                      <strong>Status:</strong> {propOnMap.placeData.businessStatus}
                    </p>
                  )}
                  {propOnMap.placeData.openingHours && propOnMap.placeData.openingHours.weekday_text && (
                    <div className="mb-2">
                      <strong className="text-sm text-gray-800">Opening Hours:</strong>
                      <ul className="list-disc list-inside text-xs text-gray-700 mt-1">
                        {propOnMap.placeData.openingHours.weekday_text.map((day: any, index: number) => (
                          <li key={index}>{day}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {propOnMap.placeData.reviews && (
                    <div className="mb-2">
                      <strong className="text-sm text-gray-800">Reviews:</strong>
                      <ul className="list-disc list-inside text-xs text-gray-700 mt-1">
                        {propOnMap.placeData.reviews.map((review: any, idx: number) => (
                          <li key={idx}>
                            <span className="font-bold">{review.author_name}</span>: {review.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Chat Component */}
      <div className="w-1/4 border-2 mt-2 min-h-screen h-full">
        <CopilotChat
          labels={{
            title: "Your Assistant",
            initial: "Hi! 👋 I am a Real Estate Agent who can help you find properties in Dubai. Ask away!",
          }}
          showResponseButton={true}
          className="min-h-screen max-h-screen"
        />
      </div>
    </div>
  );
}
