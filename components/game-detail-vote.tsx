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
  const url = 'https://bnb-wnw.online/';
  const text = `ADF referral share ${url}`;
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const shareTwitter = () => {
    const via = 'Wise and Weird';
    const hashtags = 'Prediction,Price,BNB,BSC';
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&via=${via}&hashtags=${hashtags}`;
    window.open(shareUrl, '_blank');
  };

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key]
  });

  const betAmount = BigInt(Math.floor(Number(amount) * 10 ** 18));

  useEffect(() => {
    if (game) {
      const startPrice = Number(game.startPrice);

      const initialPriceChange = (Math.random() * 3 - 1) * 0.01;
      const initialPrice = Math.max(startPrice * (1 + initialPriceChange), 0);
      setCurrentPrice(initialPrice);

      const intervalId = setInterval(() => {
        const priceChange = (Math.random() * 3 - 1) * 0.01;
        const newPrice = Math.max(startPrice * (1 + priceChange), 0);
        setCurrentPrice(newPrice);
      }, 5000);

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
                ? `${Number(game.startPrice).toFixed(2)}`
                : 'Loading...'}
            </div>
            <div className=" text-end text-xs">
              <div>Total Pool Amount:</div>
              <div>{Number(totalPoolAmount) / 10 ** 18} BNB</div>
            </div>
          </div>
        </div>
        {totalPoolAmount === BigInt(0) ? (
          <div className="text-center text-gray-500">Be the first party!</div>
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
        <div className="flex flex-row justify-between">
          <div>
            <div className="flex items-center text-2xl font-bold">Predict</div>
            <div className="text-sm font-bold">Ended Price would be...</div>
          </div>
          <div>
            <button onClick={shareTwitter}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_451_295)">
                  <path
                    d="M15 13.4C14.3667 13.4 13.8 13.65 13.3667 14.0416L7.425 10.5833C7.46667 10.3916 7.5 10.2 7.5 9.99996C7.5 9.79996 7.46667 9.60829 7.425 9.41663L13.3 5.99163C13.75 6.40829 14.3417 6.66663 15 6.66663C16.3833 6.66663 17.5 5.54996 17.5 4.16663C17.5 2.78329 16.3833 1.66663 15 1.66663C13.6167 1.66663 12.5 2.78329 12.5 4.16663C12.5 4.36663 12.5333 4.55829 12.575 4.74996L6.7 8.17496C6.25 7.75829 5.65833 7.49996 5 7.49996C3.61667 7.49996 2.5 8.61663 2.5 9.99996C2.5 11.3833 3.61667 12.5 5 12.5C5.65833 12.5 6.25 12.2416 6.7 11.825L12.6333 15.2916C12.5917 15.4666 12.5667 15.65 12.5667 15.8333C12.5667 17.175 13.6583 18.2666 15 18.2666C16.3417 18.2666 17.4333 17.175 17.4333 15.8333C17.4333 14.4916 16.3417 13.4 15 13.4ZM15 3.33329C15.4583 3.33329 15.8333 3.70829 15.8333 4.16663C15.8333 4.62496 15.4583 4.99996 15 4.99996C14.5417 4.99996 14.1667 4.62496 14.1667 4.16663C14.1667 3.70829 14.5417 3.33329 15 3.33329ZM5 10.8333C4.54167 10.8333 4.16667 10.4583 4.16667 9.99996C4.16667 9.54163 4.54167 9.16663 5 9.16663C5.45833 9.16663 5.83333 9.54163 5.83333 9.99996C5.83333 10.4583 5.45833 10.8333 5 10.8333ZM15 16.6833C14.5417 16.6833 14.1667 16.3083 14.1667 15.85C14.1667 15.3916 14.5417 15.0166 15 15.0166C15.4583 15.0166 15.8333 15.3916 15.8333 15.85C15.8333 16.3083 15.4583 16.6833 15 16.6833Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_451_295">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
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
          onClick={handleBet}
          disabled={clicked}
        >
          {game.isEnded ? 'Game Ended' : clicked ? 'Not ended' : 'Confirm'}
        </button>
      </CardContent>
      <button
        className="text-bold rounded bg-white"
        onClick={() => {
          if (currentPrice !== null) {
            console.log(game.gameId, currentPrice.toFixed(0));
            writeContract({
              abi: WNW_ABI,
              address: WNW_PRECOMPILE_ADDRESS,
              functionName: 'endGame',
              args: [game.gameId, currentPrice.toFixed(0)]
            });
          } else {
            console.log('Current price is not available yet');
          }
        }}
      >
        End game
      </button>
    </Card>
  );
}
