'use client';

import React from 'react';

interface Place {
  name: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  link: string;
}

export default function PlaceList({ places }: { places: Place[] }) {
  return (
    <div className="h-screen w-1/3 overflow-y-auto bg-background p-4">
      <h1 className="text-2xl text- font-bold mb-4 text-textPrimary">장소 리스트</h1>
      {places.length === 0 ? (
        <p className='text-textPrimary'>No places available.</p>
      ) : (
        places.map((place, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 mb-6 border-l-4 border-primary shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2 text-primary">{place.name}</h2>
            <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">위치:</span> {place.location}</p>
            <p className="text-sm text-gray-600 mb-3"><span className="font-semibold">이음 요약:</span> {place.description}</p>
            <a
              href={place.link}
              target="_blank"
              className="text-primary hover:underline font-medium"
              rel="noopener noreferrer"
            >
              원문 보기
            </a>
          </div>
        ))
      )}
    </div>
  );
}
