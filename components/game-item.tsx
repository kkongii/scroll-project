'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { tokenInfos } from '@/constants';

const fetchTokenPrice = async (
  tokenAddress: string
): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=usd`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch token price');
    }

    const data = await response.json();
    console.log('API Response:', data);

    const priceInUsd = data[tokenAddress.toLowerCase()]?.usd;

    if (!priceInUsd) {
      throw new Error('Price not found for the given token');
    }

    return priceInUsd;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
};

export const GameItem = ({ game }: any) => {
  const [startPrice, setStartPrice] = useState<number | null>(null);
  // useEffect(() => {
  //   if (!game) {
  //     return;
  //   }

  //   const fetchPrices = async () => {
  //     const startPrice = await fetchTokenPrice(game.tokenAddress);
  //     setStartPrice(startPrice);
  //   };

  //   fetchPrices();
  // }, [game]);
  const tokenInfo = tokenInfos.find((item) => item.id === Number(game.gameId));

  console.log(tokenInfo);

  return (
    <div key={game.gameId}>
      <Card className="my-4 w-96 max-w-sm cursor-pointer hover:shadow-lg">
        <CardHeader>
          <CardTitle className="mb-4 flex">
            <Image
              src={tokenInfo?.image ?? '/logo.png'}
              alt="Logo"
              width={30}
              height={30}
              className="mr-4"
            />
            {tokenInfo?.name ?? 'Token Name'}
          </CardTitle>
          <hr className="border-t" />
        </CardHeader>
        <CardContent className="grid gap-4">
          <h1 className="text-lg font-bold">
            {game.gameTitle ?? 'Game Title'}
          </h1>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-end text-xs text-zinc-400">
                total amount :{' '}
                {(Number(game.prizeAmount) / 10 ** 18).toFixed(2)} BNB{' '}
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-green-700">UP</p>
                <p className="text-sm text-green-700">
                  {(
                    (Number(game.upAmount) / Number(game.prizeAmount)) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-rose-700">DOWN</p>
                <p className="text-sm text-rose-700">
                  {(
                    (Number(game.downAmount) / Number(game.prizeAmount)) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <CardDescription>
            <div className="flex justify-between text-sm text-muted-foreground">
              {/* <div className="flex items-center">
                Started: ${startPrice ? `${startPrice}` : 'Loading...'}
              </div> */}
              <Link
                href={`/games/${game.gameId}?key=${game.gameId}`}
                key={game.gameId}
              >
                <Button className="w-26 flex h-10 items-center bg-amber-400 font-semibold text-white">
                  Enter game
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-2 size-5"
                    style={{ transform: 'scaleX(-1)' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
