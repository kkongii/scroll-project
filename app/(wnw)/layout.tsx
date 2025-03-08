import Header from '@/components/layout/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wise and Weird',
  description: 'Wise and Weird - Prediction Market',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {/* 배경색과 최소 높이 설정 */}
      <div className="bg-[#faf3e0] min-h-screen">
        {/* 만약 헤더 높이만큼 공간을 띄워주려면 pt-20 유지 */}
        <main className="pt-20">
          <div className="container relative">{children}</div>
        </main>
      </div>
    </>
  )
}
