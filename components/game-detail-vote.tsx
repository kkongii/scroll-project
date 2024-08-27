'use client';

import { Label } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';
import { useReadContract, useWriteContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function GameDetailVote() {
  const WNW_PRECOMPILE_ADDRESS = '0x33162C0C63cb323A355Bd1fAC34f7285858bda38';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [betUp, setBetUp] = useState<boolean | null>(null); // Up/Down 선택 상태
  const [amount, setAmount] = useState(''); // Input 필드에 입력된 숫자
  const [tokenInfo, setTokenInfo] = useState<{ name: string, image: string } | null>(null);

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key]
  });

  const betAmount = BigInt(Math.floor(Number(amount) * 10 ** 18));

  useEffect(() => {
    if (game) {
      const startPrice = Number(game.startPrice) / 10 ** 18;
  
      const initialPriceChange = (Math.random() * 2 - 1) * 0.01; 
      const initialPrice = Math.max(startPrice * (1 + initialPriceChange), 0);
      setCurrentPrice(initialPrice);
  
      const intervalId = setInterval(() => {
        const priceChange = (Math.random() * 2 - 1) * 0.01;
        const newPrice = Math.max(startPrice * (1 + priceChange), 0);
        setCurrentPrice(newPrice);
      }, 20000);
  
      return () => clearInterval(intervalId);
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

  const chartConfig: ChartConfig = {
    up: {
      label: 'Up',
      color: '#00A29A',
    },
    down: {
      label: 'Down',
      color: '#C73535',
    },
  };


  const chartData = [
    { name: 'Votes', up: Number(upAmount) / 10 ** 18, down: Number(downAmount) / 10 ** 18 }
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
          className="bg-[#575757] text-white text-[10px] h-[22px] px-4 rounded-full flex justify-center items-center font-normal"
        >
          End
        </div>
      );
    } else {
      buttons.push(
        <div
          key="live"
          className="bg-[#00A29A] text-white text-[10px] h-[22px] px-4 rounded-full flex justify-center items-center font-normal"
        >
          Live
        </div>
      );

      if (timeRemaining < oneDayInMs) {
        buttons.push(
          <div
            key="end-soon"
            className="bg-[#C73535] text-white text-[10px] h-[22px] px-4 rounded-full flex justify-center items-center font-normal"
          >
            End Soon
          </div>
        );
      }
    }


    return buttons;
  };

  return (
    <Card className="grid gap-8 border-none mx-auto w-full max-w-sm text-black">
      <CardHeader className="mx-auto w-full max-w-sm max-h-auto bg-white text-black rounded-xl p-6">
        <CardTitle className="flex gap-2">
          <div className='text-lg'>Pool status</div>
          <div className="flex space-x-2 items-center">
            {renderStatusButtons()}
          </div>
        </CardTitle>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2 mb-2'>
            <div>
              {tokenInfo?.image && <img src={tokenInfo.image} alt={`${tokenInfo?.name} logo`} className="w-6 h-6" />}
              <div>{tokenInfo?.name}</div>
            </div>
            <div className='text-3xl font-bold'>$ {currentPrice ? `${currentPrice.toFixed(2)}` : 'Loading...'}</div>
          </div>
          <div className='flex flex-col'>
            <div className='font-bold'>Started: $ {game.startPrice ? `${(Number(game.startPrice) / 10 ** 18).toFixed(2)}` : 'Loading...'}</div>
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
              <div className="flex justify-between text-lg mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-black text-[14px] font-bold self-baseline">Up</span>
                  <span className="font-bold text-[28px]">{((Number(upAmount) / Number(totalPoolAmount)) * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-black text-[14px] font-bold self-baseline">Down</span>
                  <span className="font-bold text-[28px]">{((Number(downAmount) / Number(totalPoolAmount)) * 100).toFixed(0)}%</span>
                </div>
              </div>
            )}
          </>
        )}
      </CardHeader>

      <CardContent className="mx-auto w-full max-w-sm max-h-auto bg-white text-black rounded-xl p-6 gap-5 flex flex-col">
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
        <div className="flex items-center font-bold">Bet Amount</div>
        <div className="flex items-center gap-2">
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="border-b border-[#B6B6B6] px-2 focus:outline-none w-full bg-white text-right text-lg"
          />
          <span className="text-black mt-[5px] text-xl font-bold">BNB</span>
        </div>
        <button
          className="w-[335px] h-[55px] rounded-2xl bg-[#E9B603] text-white font-semibold shadow-md hover:shadow-lg focus:outline-none active:bg-gray-200 active:scale-95 transition-transform duration-75"
          onClick={handleBet}
        >
          Confirm
        </button>
      </CardContent>
    </Card>
  );
}
