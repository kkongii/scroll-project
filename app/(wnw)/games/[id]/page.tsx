'use client';
import WNW_ABI from '@/abi/IWNW.abi';
import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { Badge } from '@/components/ui/badge';
import { tokenInfos } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';

const WNW_PRECOMPILE_ADDRESS = '0x97733c0658e7940D49AFABe344Acd5D6FEeDc7cc';

export default function GamePage() {
  const [gameTitle, setGameTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [category, setCategory] = useState('');

  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  console.log(key);
  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key]
  });

  useEffect(() => {
    if (game) {
      setGameTitle(game.gameTitle);
      setCategory(game.category);

      const milliseconds = Number(game.startDate);
      const date = new Date(milliseconds);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;
      setEventDate(formattedDate);

      const tokenInfo = tokenInfos.find(
        (item) => item.id === Number(game.gameId)
      );
      setTokenName(tokenInfo?.name ?? 'Token Name');

      const updateTimer = () => {
        const endDate = Number(game.endDate);
        const now = Date.now();
        const timeDiff = endDate - now;

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          const timeString =
            days > 0
              ? `${days}D ${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
              : `${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          setTimeLeft(timeString);
        } else {
          setTimeLeft('Game Ended');
        }
      };

      const timerInterval = setInterval(updateTimer, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [game]);

  return (
    <div className="mt-10 space-y-6 overflow-y-auto">
      <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight text-red-500 lg:text-3xl">
        {gameTitle || 'Loading...'}
      </h1>

      <div className="flex space-x-6">
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          {tokenName}
        </Badge>
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          {!game?.isEnded ? `Ends in ${timeLeft}` : 'End'}
        </Badge>
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          Event Date: {eventDate}
        </Badge>
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          {game?.category || 'Loading...'}
        </Badge>
      </div>

      <div className="flex h-full space-x-8">
        <div className="h-full w-2/3 space-y-20 overflow-y-auto pr-2">
          <GameDetail />
          <GameDetailComment />
        </div>

        <div className="h-full w-1/2">
          <GameDetailVote />
        </div>
      </div>
    </div>
  );
}
