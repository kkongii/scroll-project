'use client';
import Image from 'next/image';
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
import { tokenInfos } from '@/constants';

export const ScheduleItem = ({ game }: any) => {
  const tokenInfo = tokenInfos.find((item) => item.id === Number(game.gameId));

  return (
    <div key={game.gameId}>
      <Card className="my-4 w-96 w-full cursor-pointer hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex">
            <Image
              src={tokenInfo?.image ?? '/logo.png'}
              alt="Logo"
              width={30}
              height={30}
              layout="intrinsic"
              className="mx-1"
            />
            {tokenInfo?.name ?? 'Token Name'}
          </CardTitle>
          <hr className="border-t" />
        </CardHeader>
        <CardContent className="grid gap-4">
          <h1 className="text-lg font-bold">{game.description}</h1>
        </CardContent>
        <CardFooter>
          <CardDescription>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                Started: ${Number(game.startPrice)}
              </div>
              <Link
                href={`/games/${game.gameId}?key=${game.gameId}`}
                key={game.gameId}
              >
                <Button className="w-26 flex h-7 items-center bg-amber-400 font-semibold text-white">
                  Enter game
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-2 size-5"
                    style={{ transform: 'scaleX(-1)' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
