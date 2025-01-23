'use client';

import React, { useState, useEffect } from 'react';
import GoogleMap from '@/components/google-map';
import { useRouter } from 'next/navigation';

export default function PlanPage() {
  const [selectedPeople, setSelectedPeople] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState<string | null>(null);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // 페이지 리디렉션을 위한 useRouter 사용

  useEffect(() => {
    const storedPlaces = sessionStorage.getItem('places');
    if (storedPlaces) {
      setPlaces(JSON.parse(storedPlaces));
    }
  }, []);

  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('선택된 값:', {
      selectedPeople,
      selectedStyle,
      selectedPurpose,
      selectedDays,
      selectedHours,
    });

    // 5초 후에 다른 화면으로 리디렉션
    setTimeout(() => {
      setIsLoading(false);
      router.push('/ai'); // '/your-next-page'를 실제 리디렉션할 경로로 바꾸세요
    }, 5000); // 5초 동안 로딩 상태 유지
  };

  return (
    <div className="flex h-screen">
      {/* 좌측: 설문조사 UI */}
      <div className="w-1/3 bg-pink-50 overflow-y-auto mt-16 text-black">
        <form onSubmit={handlePlanSubmit} className="p-6 space-y-6">
          <h2 className="text-2xl font-bold mb-4 text-primary">여행 정보 입력하기</h2>
        
          <div>
            <label className="block text-lg font-medium mb-2">몇 명의 인원으로 여행을 가시나요?</label>
            <div className="space-y-2">
              {['혼자', '2-3인', '3-5인', '5인 이상'].map((option) => (
                <label key={option} className="flex items-center">
                  <input 
                    type="radio" 
                    name="people" 
                    value={option} 
                    checked={selectedPeople === option} 
                    onChange={(e) => setSelectedPeople(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        
          <div>
            <label className="block text-lg font-medium mb-2">어떤 여행을 원하시나요?</label>
            <div className="space-y-2">
              {['조용한 힐링', '액티비티', '맛있는 식사', '다양한 장소'].map((option) => (
                <label key={option} className="flex items-center">
                  <input 
                    type="checkbox" 
                    value={option} 
                    checked={selectedStyle.includes(option)} 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStyle([...selectedStyle, option]);
                      } else {
                        setSelectedStyle(selectedStyle.filter((style) => style !== option));
                      }
                    }}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">여행 목적은 어떻게 되나요?</label>
            <div className="space-y-2">
              {['기본 관광', '커플 여행', '가족 여행', '친구들과 함께'].map((option) => (
                <label key={option} className="flex items-center">
                  <input 
                    type="radio" 
                    name="purpose" 
                    value={option} 
                    checked={selectedPurpose === option} 
                    onChange={(e) => setSelectedPurpose(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">여행 기간은 어떻게 되나요?</label>
            <div className="space-y-2">
              {['당일', '1박', '2박', '3박'].map((option) => (
                <label key={option} className="flex items-center">
                  <input 
                    type="radio" 
                    name="days" 
                    value={option} 
                    checked={selectedDays === option} 
                    onChange={(e) => setSelectedDays(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">하루 평균 여행시간을 잡아주세요.</label>
            <div className="space-y-2">
              {['1시간', '3시간', '8시간', '제한없음'].map((option) => (
                <label key={option} className="flex items-center">
                  <input 
                    type="radio" 
                    name="hours" 
                    value={option} 
                    checked={selectedHours === option} 
                    onChange={(e) => setSelectedHours(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-primary text-white font-semibold rounded-lg mt-6">
            여행계획 생성하기
          </button>
        </form>
      </div>
      
      {/* 우측: 지도 UI */}
      <div className="w-2/3 h-full relative">
        <GoogleMap places={places} />

        {/* 로딩 중일 때 화면 중앙에 "Loading..." 메시지 표시 */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50 w-full h-full">
            <div className="text-5xl font-bold text-primary">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
}
