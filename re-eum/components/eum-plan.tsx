import React from 'react';

export default function EumPlan({ plan }: { plan: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">이음 AI 여행 계획</h2>
      <p className="whitespace-pre-wrap">{plan}</p>
    </div>
  );
}