import React from 'react';

interface PlanItem {
  name: string;
  description: string;
  time: string;
}

interface AIRecommendationPlanProps {
  plan: PlanItem[];
}

const AIRecommendationPlan: React.FC<AIRecommendationPlanProps> = ({ plan }) => {
  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">이음 AI가 추천하는 여행 계획</h2>
      {plan.map((item, index) => (
        <div key={index} className="bg-pink-100 p-4 mb-4 rounded shadow">
          <h3 className="text-lg font-bold">{index + 1}. {item.name}</h3>
          <p className="text-gray-700">{item.description}</p>
          <p className="text-sm text-gray-500 mt-2">{item.time}</p>
        </div>
      ))}
    </div>
  );
};

export default AIRecommendationPlan;
