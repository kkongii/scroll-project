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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <Card className="w-full bg-white text-black -mb-10 pb-2.5">
      <CardHeader className="flex flex-row items-end">
        <CardTitle className="text-[24px] mt-2">‘What we need to know’</CardTitle>
        <span className="text-[20px] ml-2">(Announcement Info)</span>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black text-base text-[18px]">What is AMA(Ask Me Anything)</AccordionTrigger>
            <AccordionContent
              className="text-[#575757] bg-[#E5E5E5] shadow-inner p-6"
              style={{ boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1)' }}
            >
              An AMA (Ask Me Anything) is a live Q&A session where experts or project representatives answer questions from the audience, providing transparency and engaging directly with their community, often used to share updates and build trust.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-black text-base text-[18px]">How the Recent AMA Drove a Surge in BNB Price</AccordionTrigger>
            <AccordionContent
              className="text-[#575757] bg-[#E5E5E5] shadow-inner p-6"
              style={{ boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1)' }}
            >
              The latest AMA with Binance’s leadership revealed key updates, including new partnerships and tech upgrades, boosting investor confidence. This transparency and strategic outlook drove a noticeable increase in BNB demand, highlighting the AMA’s significant impact on market sentiment.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
