'use client';
import React, { useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'; // 아이콘 패키지 import
import { SiKakaotalk } from 'react-icons/si'; // 카카오톡 아이콘 대체

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

import TripDetail from '@/components/tripdetail';
import AIPlan from '@/components/ai-plan';

const AIPage = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedPlaces = sessionStorage.getItem('places');
    if (storedPlaces) {
      const parsedPlaces = JSON.parse(storedPlaces);
      setPlaces(parsedPlaces);

      // AI 계획 생성
      generateAIPlan(parsedPlaces);
    }
  }, []);

  const generateAIPlan = async (places: Place[]) => {
    try {
      const response = await fetch('/api/generate-ai-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ places }),
      });

      if (!response.ok) {
        throw new Error('AI 계획 생성 실패');
      }

      const data = await response.json();
      setPlan(data.plan);
      setLoading(false);
    } catch (error) {
      console.error('Error generating AI plan:', error);
      setLoading(false);
    }
  };

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    return `${hour}시 ${minute}분 도착 예정`;
  };

  const sharePlan = (platform: string) => {
    // 공유하기 기능 구현 로직
    console.log(`${platform} 공유하기 클릭됨`);
  };

  return (
    <div className="flex h-screen bg-white">
      {loading ? (
        // 로딩 상태일 때 전체 화면을 덮는 반투명 오버레이
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="text-5xl text-primary font-bold">Loading...</div>
        </div>
        
      ) : (
        <>
          <div className="w-1/3 bg-pink-50 overflow-y-auto p-4 text-black mt-16">
            <AIPlan plan={plan} />

            {/* 공유하기 버튼들 추가 */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">계획 공유하기</h3>
              <div className="flex space-x-4">
                <button onClick={() => sharePlan('KakaoTalk')} className="flex items-center space-x-2 p-2 bg-yellow-400 rounded-md">
                  <SiKakaotalk size={24} />
                  <span>카카오톡</span>
                </button>
                <button onClick={() => sharePlan('Instagram')} className="flex items-center space-x-2 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md">
                  <FaInstagram size={24} />
                  <span>인스타그램</span>
                </button>
                <button onClick={() => sharePlan('Facebook')} className="flex items-center space-x-2 p-2 bg-blue-600 text-white rounded-md">
                  <FaFacebook size={24} />
                  <span>페이스북</span>
                </button>
                <button onClick={() => sharePlan('Twitter')} className="flex items-center space-x-2 p-2 bg-blue-400 text-white rounded-md">
                  <FaTwitter size={24} />
                  <span>트위터</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/3 overflow-y-auto p-4 bg-white mt-14">
            <TripDetail plan={plan} formatTime={formatTime} />
          </div>
        </>
      )}
    </div>
  );
};  

export default AIPage;
