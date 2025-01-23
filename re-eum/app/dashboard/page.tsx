'use client';

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Chart.js 컴포넌트 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  // 릴스 데이터 배열
  const reelData = [
    {
      url: 'https://www.instagram.com/p/C-_ww4myW_2/?utm_source=ig_web_copy_link',
      thumbnail: '/real1.png',
      views: 1234,
      likes: 567,
      visits: 789,
    },
    {
      url: 'https://www.instagram.com/p/C-1Nm9cT2GL/?utm_source=ig_web_copy_link',
      thumbnail: '/real2.png',
      views: 2345,
      likes: 678,
      visits: 890,
    },
    {
      url: 'https://www.instagram.com/p/C-yzMRvyGk_/?utm_source=ig_web_copy_link',
      thumbnail: '/real3.png',
      views: 3456,
      likes: 789,
      visits: 901,
    },
  ];

  // 조회수 대비 방문자 수 데이터
  const barChartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '조회수',
        data: [1234, 2345, 3456, 4567, 5678, 6789, 7890, 8901, 9012, 10123, 11134, 12145],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // 파란색
      },
      {
        label: '방문자 수',
        data: [120, 200, 300, 400, 350, 500, 650, 700, 600, 800, 750, 900],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // 빨간색
      },
    ],
  };

  // 고객 정보 분석 데이터 (Bar 차트)
  const customerData = {
    labels: ['성별', '나이대', '거주지역', '이동수단'],
    datasets: [
      {
        label: '비율 (%)',
        data: [45, 25, 20, 10], // 성별: 45, 나이대: 25, 거주지역: 20, 이동수단: 10
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // 빨간색
          'rgba(54, 162, 235, 0.6)', // 파란색
          'rgba(255, 206, 86, 0.6)', // 노란색
          'rgba(75, 192, 192, 0.6)', // 녹색
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // 빨간색
          'rgba(54, 162, 235, 1)', // 파란색
          'rgba(255, 206, 86, 1)', // 노란색
          'rgba(75, 192, 192, 1)', // 녹색
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '월별 매출 (만원)',
        data: [100, 150, 250, 300, 280, 450, 550, 600, 520, 650, 700, 850],
        borderColor: 'rgba(153, 102, 255, 0.6)', // 보라색
        fill: false,
        pointBackgroundColor: 'rgba(153, 102, 255, 1)', // 점 색상
      },
    ],
  };

  // 차트 옵션 설정
// 차트 옵션 설정
const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '비율 (%)',
      },
    },
    x: {
      title: {
        display: true,
        text: '분석 항목',
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context: { label: string; raw: any; }) {
          const label = context.label || '';
          const value = context.raw;

          if (label === '성별') {
            const 남성비율 = 30; // 예시 비율 (실제 데이터로 교체 필요)
            const 여성비율 = 70; // 예시 비율 (실제 데이터로 교체 필요)
            return `남성: ${남성비율}%, 여성: ${여성비율}%`;
          } else if (label === '나이대') {
            const 나이대20대 = 40; // 예시 비율 (실제 데이터로 교체 필요)
            const 나이대30대 = 35; // 예시 비율 (실제 데이터로 교체 필요)
            const 나이대40대이상 = 25; // 예시 비율 (실제 데이터로 교체 필요)
            return `20대: ${나이대20대}%, 30대: ${나이대30대}%, 40대 이상: ${나이대40대이상}%`;
          } else if (label === '거주지역') {
            const 서울 = 50; // 예시 비율 (실제 데이터로 교체 필요)
            const 경기 = 30; // 예시 비율 (실제 데이터로 교체 필요)
            const 기타지역 = 20; // 예시 비율 (실제 데이터로 교체 필요)
            return `서울: ${서울}%, 경기: ${경기}%, 기타: ${기타지역}%`;
          } else if (label === '이동수단') {
            const 자동차 = 60; // 예시 비율 (실제 데이터로 교체 필요)
            const 대중교통 = 30; // 예시 비율 (실제 데이터로 교체 필요)
            const 자전거 = 10; // 예시 비율 (실제 데이터로 교체 필요)
            return `자동차: ${자동차}%, 대중교통: ${대중교통}%, 자전거: ${자전거}%`;
          }

          return `${label}: ${value}%`;
        }
      }
    }
  }
};

  const reviews = [
    { text: "매장이 깔끔하고 서비스가 훌륭합니다!", rating: 5 },
    { text: "음식 맛은 좋았지만 대기 시간이 길었어요.", rating: 3 },
    { text: "정말 최고의 경험이었습니다. 재방문 의사 100%!", rating: 5 },
    { text: "가격 대비 성능이 조금 아쉽습니다.", rating: 4 },
    { text: "친절한 서비스와 맛있는 음식!", rating: 5 },
    { text: "조금 더 청결하면 좋겠어요.", rating: 3 },
    { text: "가족과 함께 즐기기 좋은 곳입니다.", rating: 4 },
    { text: "조금 비싸지만 그만한 가치가 있습니다.", rating: 4 },
    { text: "음식이 늦게 나왔지만, 맛은 정말 좋았어요.", rating: 4 },
    { text: "재방문 의사 없어요.", rating: 2 },
  ];

  return (
    <div className="w-full h-full bg-gray-100 p-8 mt-14 text-black">
      <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8">소상공인 Dashboard</h1>

        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">인스타그램 릴스</h2>
            <div className="flex flex-col space-y-4">
              {reelData.map((reel, index) => (
                <a
                  key={index}
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <img
                    src={reel.thumbnail}
                    alt={`릴스 ${index + 1}`}
                    className="w-24 h-24 object-cover mb-2 rounded-lg shadow-sm gap-5"
                  />
                  <div className="text-center text-sm">
                    <span className="block font-bold">릴스 {index + 1}</span>
                    <span className="text-gray-600 font-semibold">조회수: {reel.views}</span>
                    <span className="text-gray-600 font-semibold"> 좋아요: {reel.likes}</span>
                    <span className="text-gray-600 font-semibold"> 방문 수: {reel.visits}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">조회수 대비 방문자 수</h2>
              <div className="h-64">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">고객 정보 분석</h2>
              <div className="h-64">
                <Bar data={customerData} options={chartOptions} />
              </div>
            </div>

            <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">월별 예약자 분석</h2>
              <div className="h-64">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">최근 리뷰</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <p className="text-lg font-semibold text-gray-800">"{review.text}"</p>
                <p className="text-sm text-gray-500">평점: {review.rating}점</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mt-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">통계 및 추가 정보</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">매출 성장률</h3>
              <p className="text-gray-700">지난 해 대비 <span className="text-green-500 font-semibold">15% 상승</span></p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">신규 고객 비율</h3>
              <p className="text-gray-700">신규 고객: <span className="text-blue-500 font-semibold">30%</span>, 기존 고객: <span className="text-blue-500 font-semibold">70%</span></p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">고객 만족도</h3>
              <p className="text-gray-700">만족도: <span className="text-yellow-500 font-semibold">4.5/5</span></p>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default DashboardPage;
