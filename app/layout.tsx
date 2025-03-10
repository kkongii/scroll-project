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
      <body
        className={`${inter.className} overflow-x-hidden overflow-y-scroll min-h-screen`}
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
          <div className="flex w-full min-h-screen">
            <main className="flex-1 flex items-center justify-center gap-4">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
