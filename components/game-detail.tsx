'use client';
import { useReadContract } from 'wagmi';

import WNW_ABI from '@/abi/IWNW.abi';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const WNW_PRECOMPILE_ADDRESS = '0x358686178A7F2A87c9CAeE638d8c3DB0e199b5Ef';
export const GameDetail = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const { data: allGames }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGameList'
  });

  const [game, setGame] = useState<any>();

  useEffect(() => {
    if (allGames) {
      const findGame = allGames.find((game: any) => {
        return game.gameId === BigInt(id);
      });
      setGame(findGame);
    }
  }, [allGames]);

  if (!allGames) {
    return <></>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>BnB Price Prediction</CardTitle>
        <CardDescription>
          This market will resolve to “Yes” if Kamala Harris wins the 2024 US
          Presidential Election. Otherwise, this market will resolve to “No.”
          The resolution source for this market is the Associated Press, Fox
          News, and NBC. This market will resolve once all three sources call
          the race for the same candidate. If all three sources haven’t called
          the race for the same candidate by the inauguration date (January 20,
          2025) this market will resolve based on who is inaugurated. Note: An
          update may be made to this market to allow for early expiration if the
          candidate is definitively no longer in contention for the presidency.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground">Yes : It's </p>
            <p className="text-sm text-muted-foreground">No : HOHOHO</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>
          After AMA, predict changes in token price
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
