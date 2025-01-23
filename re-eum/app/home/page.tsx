'use client';

import React, { useState } from 'react';
import NavBar from '@/components/navbar';

export default function MainPage() {
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!link) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/crawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const existingData = sessionStorage.getItem('places');
      let parsedExistingData = [];

      if (existingData) {
        parsedExistingData = JSON.parse(existingData);

        const newPlace = data[0];
        const isDuplicate = parsedExistingData.some(
          (existingPlace: { name: any }) => existingPlace.name === newPlace.name
        );

        if (!isDuplicate) {
          parsedExistingData.push(newPlace);
        }
      } else {
        parsedExistingData = data;
      }

      sessionStorage.setItem('places', JSON.stringify(parsedExistingData));
      window.location.href = '/place';
    } catch (error) {
      console.error('Error:', error);
      alert('크롤링에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
      setLink('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className={`flex-1 p-8 transition-all duration-300 m-14 ${isNavOpen ? 'ml-64' : ''}`}>
        <form onSubmit={handleLinkSubmit} className="mb-8 ml-20 mr-20 bg-white p-10  m-10 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">이음에 저장할 링크를 입력하세요</h2>
          <div className="flex">
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="링크를 입력하세요."
              className="flex-1 p-4 text-black border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="p-4 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors duration-300"
              disabled={loading}
            >
              {loading ? '크롤링 중...' : '링크 제출'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
