import React from 'react';

interface TripDetailProps {
  plan: {
    name: string;
    description: string;
    time: string;
  }[];
  formatTime: (timeString: string) => string; // 이 부분을 추가
}


const TripDetail: React.FC<TripDetailProps> = ({ plan }) => {
  return (
    <div className="p-4 bg-white h-full rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">여행 상세 계획표</h2>
      <div className="timeline">
        {plan.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <p className="text-pink-500 font-semibold">{item.time}</p>
              <h3 className="text-gray-800 font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripDetail;
