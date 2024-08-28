import Header from '@/components/layout/header';
import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Wise and Weird',
  description: 'Wise and Weird - Prediction Market'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Wise And Weird</title>
        <meta
          name="description"
          content="Get precise news and predict the price"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@web3BlueNode" />
        <meta name="twitter:title" content="Wise And Weird" />
        <meta
          name="twitter:description"
          content="Predict price movement and profit from the community powered official events, making precise decisions"
        />
        <meta
          name="twitter:image"
          content="https://bnb-wnw.online/twitter-img.png"
        />
      </Head>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <main className="flex-1 overflow-hidden pt-20">
          <div className="container relative">{children}</div>
        </main>
      </div>
    </>
  );
}
