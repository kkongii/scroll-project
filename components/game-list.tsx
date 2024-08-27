'use client';
import { useReadContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { GameItem } from './game-item';

const WNW_PRECOMPILE_ADDRESS = '0xd38aa26b0b558c19c61c3944ae87bb65786f425d';
export const GameList = () => {
  const { data: allGames }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGameList'
  });
  console.log(allGames);

  if (!allGames) {
    return <></>;
  }

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3">
      {allGames &&
        allGames.map((game: any) => {
          return <GameItem key={game?.gameId} game={game} />;
        })}
    </div>
  );
};
