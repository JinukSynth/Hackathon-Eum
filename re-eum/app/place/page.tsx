'use client';

import GoogleMap from '@/components/google-map';
import PlaceList from '@/components/place-list';
import React, { useEffect, useState } from 'react';

interface Place {
  name: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  link: string;
}

const loadPlacesFromSessionStorage = (): Place[] => {
  if (typeof window !== "undefined") {
    const storedData = sessionStorage.getItem('places');
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return [];
};

const savePlacesToSessionStorage = (places: Place[]) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem('places', JSON.stringify(places));
  }
};

export default function PlacePage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isListVisible, setIsListVisible] = useState(true);

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Place[] = await response.json();
      setPlaces(data);
      savePlacesToSessionStorage(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const storedPlaces = loadPlacesFromSessionStorage();
    if (storedPlaces.length > 0) {
      setPlaces(storedPlaces);
    } else {
      fetchData();
    }
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex mt-16">
      {isListVisible && <PlaceList places={places} />}
      <div className={`relative h-screen ${isListVisible ? 'w-2/3' : 'w-full'}`}>
        <GoogleMap places={places} />
        <button
          onClick={toggleListVisibility}
          className="absolute top-2 left-2 z-10 bg-primary text-buttonText rounded-lg px-8 py-3 shadow-soft"
        >
          {isListVisible ? '리스트 숨기기' : '리스트 보기'}
        </button>
      </div>
    </div>
  );
}
