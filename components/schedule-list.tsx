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
import { useEffect, useState } from 'react';
import { Overview } from '@/components/overview';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScheduleItem } from './schedule-item';

const WNW_PRECOMPILE_ADDRESS = '0xd38aa26b0b558c19c61c3944ae87bb65786f425d';
export const ScheduleList = () => {
  const { data: allGames }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGameList'
  });
  if (!allGames) {
    return <></>;
  }

  const tbcGames = allGames.filter(
    (game: any) => game.startDate> Date.now()
  );
  const ongoingGames = allGames.filter(
    (game: any) =>
      game.startDate< Date.now() && game.isEnded !== true
  );
  const closedGames = allGames.filter((game: any) => game.isEnded === true);

  console.log(Date.now());

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allGames?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TBC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tbcGames?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ongoingGames?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{closedGames?.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Project Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar initialFocus mode="single" numberOfMonths={1} />
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>News & Predict</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Tabs defaultValue="ongoing" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                  <TabsTrigger value="tbc">TBC</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                <TabsContent value="tbc" className="space-y-4">
                  {tbcGames &&
                    tbcGames.map((game: any) => {
                      return <ScheduleItem key={game.id} game={game} />;
                    })}
                </TabsContent>
                <TabsContent value="ongoing" className="space-y-4">
                  {ongoingGames &&
                    ongoingGames.map((game: any) => {
                      return <ScheduleItem key={game.id} game={game} />;
                    })}
                </TabsContent>
                <TabsContent value="closed" className="space-y-4">
                  {closedGames &&
                    closedGames.map((game: any) => {
                      return <ScheduleItem key={game.id} game={game} />;
                    })}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};
