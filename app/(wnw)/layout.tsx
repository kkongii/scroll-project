import Header from '@/components/layout/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wise and Weird',
  description: 'Wise and Weird - Prediction Market',
  twitter: {
    card: 'summary',
    site: '@web3BlueNode',
    title: 'Wise and Weird',
    description:
      'Predict price movement and profit from the community powered official events, making precise decisions',
    images: 'https://bnb-wnw.online/twitter-img.png'
  }
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <main className="flex-1 overflow-hidden pt-20">
          <div className="container relative">{children}</div>
        </main>
      </div>
    </>
  );
}
