'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleNavBar = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      
      <div className="p-5 bg-primary text-primary flex items-center shadow-lg">
        <button
          onClick={toggleNavBar}
          className="text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <FaBars size={24} />
        </button>
        <div className="text-white font-bold text-xl ml-4">이음</div>
      </div>
      
      <div className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-transform duration-300 z-40 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 bg-primary flex items-center shadow-lg">
          <button
            onClick={toggleNavBar}
            className="text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <FaBars size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-4 p-6">
          <Link href="/home" className="text-primary hover:text-primary-dark">
            홈
          </Link>
          <Link href="/place" className="text-primary hover:text-primary-dark">
            장소 리스트
          </Link>
          <Link href="/plan" className="text-primary hover:text-primary-dark">
            여행 계획
          </Link>
          <Link href="/dashboard" className="text-primary hover:text-primary-dark">
            사장님 페이지
          </Link>
        </nav>
      
      </div>
    
    </div>
  );
}
