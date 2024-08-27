'use client';

import { Label } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { RadialBarChart, PolarRadiusAxis, RadialBar } from 'recharts';
import { useReadContract, useWriteContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const fetchTokenPrice = async (tokenAddress: string): Promise<number | null> => {
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

export function GameDetailVote() {
  const WNW_PRECOMPILE_ADDRESS = '0xFc5F3eC263E4efb55d1d4992066167990Db5edFf';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [betUp, setBetUp] = useState<boolean | null>(null); // Up/Down 선택 상태
  const [amount, setAmount] = useState(''); // Input 필드에 입력된 숫자

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
        const currentPrice = await fetchTokenPrice('0x55d398326f99059ff775485246999027b3197955');
        setCurrentPrice(currentPrice);
      };

      fetchPrices();
    }
  }, [game]);

  const { writeContract } = useWriteContract();

  const handleBet = async () => {
    console.log('gameId : ', game.gameId);
    console.log('betUp : ', betUp);
    console.log('betAmount : ', betAmount);

    writeContract({
      abi: WNW_ABI,
      address: WNW_PRECOMPILE_ADDRESS,
      functionName: 'bet',
      args: [
        game.gameId, betUp
      ],
      value: betAmount
    });
  };

  if (!game) {
    console.log("undefined");
    return <></>;
  }

  const upAmount = game.upAmount ? BigInt(game.upAmount) : BigInt(0);
  const downAmount = game.downAmount ? BigInt(game.downAmount) : BigInt(0);
  const totalPoolAmount = upAmount + downAmount;

  const chartData = [{ up: Number(upAmount) / 10 ** 18, down: Number(downAmount) / 10 ** 18 }];

  const totalVisitors = chartData[0].up + chartData[0].down;
  const chartConfig = {
    up: {
      label: 'Up',
      color: 'hsl(var(--chart-5))'
    },
    down: {
      label: 'Down',
      color: 'hsl(var(--chart-2))'
    }
  };

  return (
    <Card className="grid gap-8 border-none mx-auto w-full max-w-sm text-black">
       {/* <button className='text-white'
          onClick={() => {
            if (currentPrice !== null) {
              writeContract({
                abi: WNW_ABI,
                address: WNW_PRECOMPILE_ADDRESS,
                functionName: 'endGame',
                args: [
                  game.gameId,
                  Math.floor(currentPrice * 10 ** 18)
                ]
              });
            } else {
              console.log("Current price is not available yet");
            }
          }}
        >
          End
      </button> */}
      <CardHeader className="mx-auto w-full max-w-sm max-h-auto bg-white text-black rounded-xl">
        <CardTitle className="text-lg">Pool status</CardTitle>
        <div>Total Pool Amount: {Number(totalPoolAmount) / 10 ** 18} BnB</div>
        <div>Current Price: {currentPrice ? `${currentPrice} USD` : 'Loading...'}</div>
        <div>Started Price: {game.markedPrice ? `${Number(game.markedPrice) / 10 ** 18} USD` : 'Loading...'}</div> {/* markedPrice 사용 */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] mb-[-100px] mt-[-20px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-black text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-black"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="up"
              stackId="a"
              cornerRadius={5}
              fill={betUp === true ? '#00A29A' : '#B0E0E6'}
              className="stroke-transparent stroke-2 cursor-pointer"
              onClick={() => setBetUp(true)}
            />
            <RadialBar
              dataKey="down"
              fill={betUp === false ? '#C73535' : '#FA8072'}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2 cursor-pointer"
              onClick={() => setBetUp(false)}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardHeader>
      <CardContent className="mx-auto w-full max-w-sm max-h-auto bg-white text-black rounded-xl">
        <div className="flex items-center font-bold">My Prediction</div>
        <div className="grid grid-cols-2">
          <div className="grid gap-2 items-center justify-center text-center">
            <Label>Up</Label>
            <img
              src="/ButtonUp.png"
              alt="Vote Up"
              className={`w-200 h-110 object-contain cursor-pointer active:scale-95 active:opacity-75 transition-transform duration-75 ${betUp === true ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setBetUp(true)}
            />
          </div>
          <div className="grid gap-2 items-center justify-center text-center">
            <Label>Down</Label>
            <img
              src="/ButtonDown.png"
              alt="Vote Down"
              className={`w-200 h-100 object-contain cursor-pointer active:scale-95 active:opacity-75 transition-transform duration-75 ${betUp === false ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setBetUp(false)}
            />
          </div>
        </div>
        <div className="flex items-center font-bold">Betting Price</div>
        <div className="flex items-center gap-2">
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="border-b border-[#B6B6B6] px-2 focus:outline-none w-full bg-white text-right text-lg text-gray-500"
          />
          <span className="text-black font-semibold mt-[5px] text-lg">BnB</span>
        </div>
        <button
          className="w-[335px] h-[55px] rounded-xl bg-white text-black font-semibold shadow-md hover:shadow-lg focus:outline-none border border-[#B6B6B6] active:bg-gray-200 active:scale-95 transition-transform duration-75"
          onClick={handleBet}
        >
          Confirm
        </button>
      </CardContent>
    </Card>
  );
}
