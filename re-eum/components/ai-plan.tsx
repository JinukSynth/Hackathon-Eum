import React from 'react';

interface Place {
    name: string;
    latitude: number;
    longitude: number;
    description: string;
    location: string;
  }
  
  interface PlanItem {
    name: string;
    description: string;
    time: string;
  }

const AIPlan = ({ plan }: { plan: PlanItem[] }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">이음 AI가 추천하는 여행 계획</h2>
      {plan.map((item, index) => (
        <div key={index} className="mb-4 p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-700">{item.description}</p>
          <p className="text-xs text-gray-500">{item.time}</p>
        </div>
      ))}
    </div>
  );
};

export default AIPlan;
