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
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Image from 'next/image';
import { tokenInfos } from '@/constants';

export function GameDetailVote() {
  const WNW_PRECOMPILE_ADDRESS = '0xd38aa26b0b558c19c61c3944ae87bb65786f425d';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [betUp, setBetUp] = useState<boolean | null>(null); // Up/Down 선택 상태
  const [amount, setAmount] = useState(''); // Input 필드에 입력된 숫자
  const [clicked, setClicked] = useState(false);
  // const [tokenInfo, setTokenInfo] = useState<{
  //   name: string;
  //   image: string;
  // } | null>(null);

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key]
  });

  const betAmount = BigInt(Math.floor(Number(amount) * 10 ** 18));

  useEffect(() => {
    if (game) {
      const startPrice = Number(game.startPrice)/10 ** 18;

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

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 상태 로드
    const storedState = localStorage.getItem(`buttonClicked_${key}`);
    if (storedState === 'true') {
      setClicked(true);
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
      args: [game.gameId, betUp],
      value: betAmount
    });
    setClicked(true);
    localStorage.setItem(`buttonClicked_${key}`, 'true');
  };
  const handleClaim = () => {
    // Claim 버튼 클릭 시 실행할 로직
    // ...
    console.log('Claim function executed');
  };

  if (!game) {
    console.log('undefined');
    return <></>;
  }
  const tokenInfo = tokenInfos.find((item) => item.id === Number(game.gameId));

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
        <div className="flex justify-between">
          <div className="flex-colgap-2 mb-2 flex">
            <div className="flex-col">
              <div
                className="relative flex flex-row gap-1"
                style={{ width: '20px' }}
              >
                <Image
                  src={tokenInfo?.image ?? '/logo.png'}
                  alt="Logo"
                  width={30}
                  height={30}
                  layout="intrinsic"
                />
                <span className=" text-sm font-bold text-black">
                  {tokenInfo?.name ?? 'Token Name'}
                </span>
              </div>
              <div className="text-3xl font-bold">
                $ {currentPrice ? `${currentPrice.toFixed(2)}` : 'Loading...'}
              </div>

              <div className="flex items-center">
                {currentPrice !== null && game.startPrice !== null ? (
                  <div className="flex items-center">
                    {Number(currentPrice) > Number(game.startPrice) ? (
                      <div className="flex items-center text-green-600">
                        <FaArrowUp className="mr-1" />
                        {Number(
                          ((currentPrice - Number(game.startPrice)) /
                            Number(game.startPrice)) *
                            100
                        ).toFixed(2)}
                        %
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <FaArrowDown className="mr-1" />
                        {Number(
                          ((Number(game.startPrice) - currentPrice) /
                            Number(game.startPrice)) *
                            100
                        ).toFixed(2)}
                        %
                      </div>
                    )}
                  </div>
                ) : (
                  <div>Price data not available</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-bold">
              Started: ${' '}
              {game.startPrice
                ? `${(Number(game.startPrice)/10**18).toFixed(2)}`
                : 'Loading...'}
            </div>
            <div className=" text-end text-xs">
              <div>Total Pool Amount:</div>
              <div>{Number(totalPoolAmount) / 10 ** 18} BNB</div>
            </div>
          </div>
        </div>
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
        <div className=" justify-between">
          <div className="flex items-center text-2xl font-bold">Predict</div>
          <div>
            <div className="text-sm font-bold">Ended Price would be...</div>
          </div>
        </div>

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
        <div className="flex flex-row justify-between">
          <div className="flex items-center font-bold">Bet Amount</div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full border-b border-[#B6B6B6] bg-white px-2 text-right text-lg focus:outline-none"
          />

          <Image
            src="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970"
            alt="Logo"
            width={25}
            height={25}
            className="mr-0"
          />
          <span className=" text-xl font-bold text-black">BNB</span>
        </div>
        <button
          className={`h-[55px] w-[335px] rounded-2xl font-semibold text-white shadow-md transition-transform duration-75 focus:outline-none ${
            clicked && !game.isEnded
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-[#E9B603] hover:shadow-lg active:scale-95 active:bg-gray-200'
          }`}
          onClick={game.isEnded ? handleClaim : handleBet}
          disabled={clicked && !game.isEnded}
        >
          {game.isEnded ? 'Claim' : clicked ? 'Not ended' : 'Confirm'}
        </button>
      </CardContent>
      <button className='text-bold bg-white rounded'
          onClick={() => {
            if (currentPrice !== null) {
              writeContract({
                abi: WNW_ABI,
                address: WNW_PRECOMPILE_ADDRESS,
                functionName: 'endGame',
                args: [
                  game.gameId,
                  currentPrice* 10**18
                ]
              });
            } else {
              console.log("Current price is not available yet");
            }
          }}
        >
          End game
        </button>
    </Card>
  );
}
