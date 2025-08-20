import React, { useEffect, useRef } from "react";

const MapWithLocation = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Load Google Maps script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

		console.log(script)

    script.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            const userLocation = { lat: latitude, lng: longitude };

            // Initialize map
            const map = new window.google.maps.Map(mapRef.current, {
              center: userLocation,
              zoom: 17, // street-level zoom
            });

            // Add marker
            new window.google.maps.Marker({
              position: userLocation,
              map: map,
              title: "You are here!",
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h2>My Current Location (via Google Maps API)</h2>
      <div
        ref={mapRef}
        style={{ width: "600px", height: "450px", borderRadius: "10px" }}
      />
    </div>
  );
};

export default MapWithLocation;
