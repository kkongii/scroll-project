import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Image from 'next/image';

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
      <body
        className={`${inter.className} min-h-screen overflow-x-hidden overflow-y-scroll`}
        style={{
          backgroundImage: 'url("/c.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <NextTopLoader />
        <Providers>
          <Toaster />
          {/* 
            화면 전체를 flex 컨테이너로 만들고,
            min-h-screen을 줘서 배경이 항상 채워지도록 함 
          */}
          <div className="flex min-h-screen w-full">
            <main className="flex flex-1 items-center justify-center gap-4">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
