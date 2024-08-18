'use client';
import { useReadContract } from 'wagmi';
import Image from 'next/image';
import WNW_ABI from '@/abi/IWNW.abi';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

const WNW_PRECOMPILE_ADDRESS = '0x358686178A7F2A87c9CAeE638d8c3DB0e199b5Ef';
export const GameList = () => {
  const { data: allGames }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGameList'
  });

  if (!allGames) {
    return <></>;
  }
  

  return (
    <div className="flex space-x-6">
      {allGames &&
        allGames.map((game: any) => {
          return (
            <Link href={`/games/${game.gameId}?key=${game.gameId}`} key={game.gameId}>
              <Card className="mx-auto w-full max-w-sm cursor-pointer hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={30}
                      height={30}
                      className="mb-4 mr-2"
                    />
                    BnB Price Prediction
                  </CardTitle>
                  <hr className="border-t" />
                </CardHeader>
                <CardContent className="grid gap-4">
                  <h1 className="text-lg font-bold">
                    After AMA, predict changes in token price
                  </h1>
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm text-green-700">UP</p>
                        <p className="text-sm text-green-700">{((Number(game.upAmount) / Number(game.prizeAmount)) * 100).toFixed(0)}%</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-rose-700">DOWN</p>
                        <p className="text-sm text-rose-700">{((Number(game.downAmount) / Number(game.prizeAmount)) * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <CardDescription>
                    <div className="flex space-x-5 text-sm text-muted-foreground">
                      <div className="flex items-center">${(Number(game.prizeAmount) / 10**18).toFixed(2)} </div>
                      <div className="flex items-center">20 Comments</div>
                    </div>
                  </CardDescription>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
    </div>
  );
};
