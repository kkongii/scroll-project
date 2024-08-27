'use client';

import { Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';
import { useReadContract, useWriteContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

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

const fetchTokenInfo = async (tokenAddress: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${tokenAddress}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch token info');
    }

    const data = await response.json();
    console.log('Token Info:', data);

    const tokenInfo = {
      name: data.name,
      image: data.image.thumb
    };

    return tokenInfo;
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
};

export function GameDetailVote() {
  const WNW_PRECOMPILE_ADDRESS = '0x33162C0C63cb323A355Bd1fAC34f7285858bda38';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [betUp, setBetUp] = useState<boolean | null>(null); // Up/Down 선택 상태
  const [amount, setAmount] = useState(''); // Input 필드에 입력된 숫자
  const [tokenInfo, setTokenInfo] = useState<{
    name: string;
    image: string;
  } | null>(null);

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key]
  });

  const betAmount = BigInt(Math.floor(Number(amount) * 10 ** 18));

  useEffect(() => {
    if (game) {
      console.log('Game data:', game);
      const fetchPrices = async () => {
        const currentPrice = await fetchTokenPrice(
          '0x55d398326f99059ff775485246999027b3197955'
        );
        setCurrentPrice(currentPrice);
      };

      fetchPrices();
    }
  }, [game]);

  useEffect(() => {
    const getTokenInfo = async () => {
      const tokenInfo = await fetchTokenInfo(
        '0x55d398326f99059ff775485246999027b3197955'
      );
      setTokenInfo(tokenInfo);
    };

    getTokenInfo();
  }, []);

  const { writeContract } = useWriteContract();

  const handleBet = async () => {
    console.log('gameId : ', game.gameId);
    console.log('betUp : ', betUp);
    console.log('betAmount : ', betAmount);

    writeContract({
      abi: WNW_ABI,
      address: WNW_PRECOMPILE_ADDRESS,
      functionName: 'bet',
      args: [game.gameId, betUp],
      value: betAmount
    });
  };

  if (!game) {
    console.log('undefined');
    return <></>;
  }

  const upAmount = game.upAmount ? BigInt(game.upAmount) : BigInt(0);
  const downAmount = game.downAmount ? BigInt(game.downAmount) : BigInt(0);
  const totalPoolAmount = upAmount + downAmount;

  const chartConfig: ChartConfig = {
    up: {
      label: 'Up',
      color: '#00A29A'
    },
    down: {
      label: 'Down',
      color: '#C73535'
    }
  };

  const chartData = [
    {
      name: 'Votes',
      up: Number(upAmount) / 10 ** 18,
      down: Number(downAmount) / 10 ** 18
    }
  ];

  const endDate = Number(game.endDate) * 1000;
  const timeRemaining = endDate - Date.now();
  const oneDayInMs = 24 * 60 * 60 * 1000;

  const renderStatusButtons = () => {
    const buttons = [];

    if (game.isEnded) {
      buttons.push(
        <div
          key="end"
          className="flex h-[22px] items-center justify-center rounded-full bg-[#575757] px-4 text-[10px] font-normal text-white"
        >
          End
        </div>
      );
    } else {
      buttons.push(
        <div
          key="live"
          className="flex h-[22px] items-center justify-center rounded-full bg-[#00A29A] px-4 text-[10px] font-normal text-white"
        >
          Live
        </div>
      );

      if (timeRemaining < oneDayInMs) {
        buttons.push(
          <div
            key="end-soon"
            className="flex h-[22px] items-center justify-center rounded-full bg-[#C73535] px-4 text-[10px] font-normal text-white"
          >
            End Soon
          </div>
        );
      }
    }

    return buttons;
  };

  return (
    <Card className="mx-auto grid w-full max-w-sm gap-8 border-none text-black">
      <CardHeader className="max-h-auto mx-auto w-full max-w-sm rounded-xl bg-white p-6 text-black">
        <CardTitle className="flex gap-2">
          <div className="text-lg">Pool status</div>
          <div className="flex items-center space-x-2">
            {renderStatusButtons()}
          </div>
        </CardTitle>
        <div className="space-between flex">
          <div className="mb-2 flex flex-col gap-2">
            <div>token Info</div>
            <div className="text-3xl font-bold">
              $ {currentPrice ? `${currentPrice.toFixed(2)}` : 'Loading...'}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold">
              Started: ${' '}
              {game.startPrice
                ? `${Number(game.startPrice).toFixed(2)}`
                : 'Loading...'}
            </div>
          </div>
        </div>
        <div>Total Pool Amount: {Number(totalPoolAmount) / 10 ** 18} BnB</div>
        {totalPoolAmount === BigInt(0) ? (
          <div className="text-center text-gray-500">
            No votes yet, be the first to vote!
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={36}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip cursor={false} />
                <Bar
                  dataKey="up"
                  stackId="a"
                  fill={chartConfig.up.color}
                  barSize={20}
                  radius={[10, 0, 0, 10]}
                />
                <Bar
                  dataKey="down"
                  stackId="a"
                  fill={chartConfig.down.color}
                  barSize={20}
                  radius={[0, 10, 10, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            {totalPoolAmount > 0 && (
              <div className="mt-2 flex justify-between text-lg">
                <div className="flex items-baseline gap-1">
                  <span className="self-baseline text-[14px] font-bold text-black">
                    Up
                  </span>
                  <span className="text-[28px] font-bold">
                    {(
                      (Number(upAmount) / Number(totalPoolAmount)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="self-baseline text-[14px] font-bold text-black">
                    Down
                  </span>
                  <span className="text-[28px] font-bold">
                    {(
                      (Number(downAmount) / Number(totalPoolAmount)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </CardHeader>

      <CardContent className="max-h-auto mx-auto flex w-full max-w-sm flex-col gap-5 rounded-xl bg-white p-6 text-black">
        <div className="flex items-center font-bold">My Prediction</div>
        <div className="grid grid-cols-2">
          <div className="grid items-center justify-center gap-2 text-center">
            <Label>Up</Label>
            <img
              src="/ButtonUp.png"
              alt="Vote Up"
              className={`w-200 h-110 cursor-pointer object-contain transition-transform duration-75 active:scale-95 active:opacity-75 ${
                betUp === true ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => setBetUp(true)}
            />
          </div>
          <div className="grid items-center justify-center gap-2 text-center">
            <Label>Down</Label>
            <img
              src="/ButtonDown.png"
              alt="Vote Down"
              className={`w-200 h-100 cursor-pointer object-contain transition-transform duration-75 active:scale-95 active:opacity-75 ${
                betUp === false ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => setBetUp(false)}
            />
          </div>
        </div>
        <div className="flex items-center font-bold">Bet Amount</div>
        <div className="flex items-center gap-2">
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full border-b border-[#B6B6B6] bg-white px-2 text-right text-lg focus:outline-none"
          />
          <span className="mt-[5px] text-xl font-bold text-black">BNB</span>
        </div>
        <button
          className="h-[55px] w-[335px] rounded-2xl bg-[#E9B603] font-semibold text-white shadow-md transition-transform duration-75 hover:shadow-lg focus:outline-none active:scale-95 active:bg-gray-200"
          onClick={handleBet}
        >
          Confirm
        </button>
      </CardContent>
    </Card>
  );
}
