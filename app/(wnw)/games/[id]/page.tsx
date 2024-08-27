'use client';

import { useState, useEffect } from 'react';
import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { Badge } from '@/components/ui/badge';
import { useReadContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const [gameTitle, setGameTitle] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const WNW_PRECOMPILE_ADDRESS = '0x33162C0C63cb323A355Bd1fAC34f7285858bda38';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key],
  });

  useEffect(() => {
    if (game) {
      setGameTitle(game.gameTitle);

      const updateTimer = () => {
        const endDate = Number(game.endDate) * 1000;
        const now = Date.now();
        const timeDiff = endDate - now;

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          const timeString = days > 0 
            ? `${days}D ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

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
    <div className="mt-10 space-y-6 p-4 md:p-8 max-h-screen overflow-y-auto">
      <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
        {gameTitle || 'Loading...'}
      </h1>

      <div className="flex space-x-6">
        <Badge className="text-xs bg-[#575757] text-F7F8F8 rounded-3xl p-1.5 px-5">{timeLeft}</Badge>
        <Badge className="text-xs bg-[#575757] text-F7F8F8 rounded-3xl p-1.5 px-5">{game?.category || 'Loading...'}</Badge>
        <Badge className="text-xs bg-[#575757] text-F7F8F8 rounded-3xl p-1.5 px-5">BNB</Badge>
      </div>

      <div className="flex space-x-8 h-full">
        <div className="w-2/3 space-y-20 h-full overflow-y-auto pr-2">
          <GameDetail />
          <GameDetailComment />
        </div>

        <div className="w-1/3 space-y-4 h-full overflow-y-auto pl-2">
          <GameDetailVote />
        </div>
      </div>
    </div>
  );
}
