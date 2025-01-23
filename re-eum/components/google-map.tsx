'use client';

import React, { useEffect, useState } from 'react';

interface Place {
  name: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  link: string;
}

export default function GoogleMap({ places }: { places: Place[] }) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const markersRef = React.useRef<google.maps.Marker[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !map && typeof google !== 'undefined') {
      const initializedMap = new google.maps.Map(mapRef.current, {
        center: { lat: 33.3686, lng: 126.5116 },
        zoom: 10,
        mapTypeControl: false, // 지형/위성 모드 전환 기능 제거
      });
      setMap(initializedMap);
    }
  }, [mapRef.current, map]);

  useEffect(() => {
    if (map && places.length > 0) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      places.forEach((place) => {
        const marker = new google.maps.Marker({
          position: { lat: Number(place.latitude), lng: Number(place.longitude) },
          map,
          title: place.name,
        });

        const correctedLink = place.link
          ? place.link.startsWith('https://')
            ? place.link
            : `https://${place.link}`
          : '#';

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="color: black;">
                      <h3 style="font-size: 16px; font-weight: bold;">${place.name}</h3>
                      <p style="font-size: 14px;">${place.description}</p>
                      ${place.link ? `<p><a href="${correctedLink}" target="_blank" style="color: black; text-decoration: underline;">원문 보기</a></p>` : ''}
                    </div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        markersRef.current.push(marker);
      });

      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) =>
        bounds.extend(new google.maps.LatLng(Number(place.latitude), Number(place.longitude)))
      );
      map.fitBounds(bounds);
    }
  }, [map, places]);

  return <div ref={mapRef} className="rounded-r-md shadow-soft-lg" style={{ width: '100%', height: '100%' }} />;
}
