'use client';
import { useReadContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { GameItem } from './game-item';

const WNW_PRECOMPILE_ADDRESS = '0x7c6960cbb510c2e3add2a126a275a85ef2768e81';
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
