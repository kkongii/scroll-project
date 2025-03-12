import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wise and Weird',
  description: 'Wise and Weird - Prediction Market'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        1) body에 배경색 지정: bg-[#faf3e0]
        2) flex 레이아웃 유지
      */}
      <body className={`${inter.className} overflow-x-hidden overflow-y-scroll bg-[#faf3e0]`}>
        <NextTopLoader />
        <Providers>
          <Toaster />
          {/* 3) 3열 레이아웃: 왼쪽 이미지 | 가운데 children | 오른쪽 이미지 */}
          <div className="md:flex w-full min-h-screen">
            {/* 왼쪽 이미지 영역 */}
            <div className="hidden md:flex w-1/6 items-center justify-center">
              <img
                src="/zkevm2.png"
                alt="Left Decoration"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* 메인 콘텐츠 (children) */}
            <main className="flex-1">
              {children}
            </main>

            {/* 오른쪽 이미지 영역 */}
            <div className="hidden md:flex w-1/6 items-center justify-center">
              <img
                src="/robot.png"
                alt="Right Decoration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}