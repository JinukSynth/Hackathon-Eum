import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Script from 'next/script';
import NavBar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Crawled Places Map',
  description: 'Displays places crawled from the server on Google Maps.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Maps API Script */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBBj03tu4cY2g1OBEMJg23UjNEHu50OwYA&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        {/* 모든 페이지에 적용되는 NavBar */}
        <NavBar />

        {/* 컨텐츠 영역 */}
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}
