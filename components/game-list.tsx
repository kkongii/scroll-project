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
import { Button } from './ui/button';

const WNW_PRECOMPILE_ADDRESS = '0xe31bA092390628Aaf5faFda2F50bFD7d51C9e657';
export const GameList = () => {
  const { data: allGames }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGameList'
  });
  console.log(allGames)
  if (!allGames) {
    return <></>;
  }

  
  console.log(allGames);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full">
      {allGames &&
        allGames.map((game: any) => {
          return (
            <div key={game.gameId}>
              <Card className="my-4 w-96 max-w-sm cursor-pointer hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={30}
                      height={30}
                      className="mb-4 mr-2"
                    />
                    {game.gameTitle}
                  </CardTitle>
                  <hr className="border-t" />
                </CardHeader>
                <CardContent className="grid gap-4">
                  <h1 className="text-lg font-bold">
                    After AMA, predict changes in token price
                  </h1>
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-end text-xs text-zinc-400">total amount : {(Number(game.prizeAmount) / 10**18).toFixed(2)} BNB </div>
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
                    <div className="flex w-full text-sm text-muted-foreground">
                      <div className="flex items-center">20 Comments</div>
                      <Link href={`/games/${game.gameId}?key=${game.gameId}`} key={game.gameId}>
                      <Button className="bg-amber-400 w-26 h-7 font-semibold text-white">Enter game
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5" style={{ transform: 'scaleX(-1)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg></Button>
                      </Link>
                      </div>
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
          );
        })}
    </div>
  );
};
