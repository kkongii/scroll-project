import Header from '@/components/layout/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Scroll',
  description: 'Future Scroll - Prediction Market'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* 배경색과 최소 높이 설정 */}
      <div className="min-h-screen w-3/4 bg-transparent">
        {/* 만약 헤더 높이만큼 공간을 띄워주려면 pt-20 유지 */}
        <main className="pt-20">
          <div className="container relative">{children}</div>
        </main>
      </div>
    </>
  );
}
