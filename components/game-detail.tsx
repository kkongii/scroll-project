'use client';
import { useReadContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const WNW_PRECOMPILE_ADDRESS = '0x33162C0C63cb323A355Bd1fAC34f7285858bda38';

export const GameDetail = () => {
  const params = useParams();
  const { id } = params as { id: string };

  // 게임의 description을 저장할 상태를 선언합니다.
  const [description, setDescription] = useState<string>('');

  // getGame 함수로부터 gameId를 이용해 game의 상세 정보를 불러옵니다.
  const {
    data: game,
    isLoading,
    isError
  } = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [BigInt(id)] // id를 BigInt로 변환하여 전달
  });

  useEffect(() => {
    if (game && (game as any).description) {
      setDescription((game as any).description);
    }
  }, [game]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !description) {
    return <div>Error loading game description or game not found.</div>;
  }

  return (
    <Card className="-mb-10 w-full bg-white pb-2.5 text-black">
      <CardContent className="grid gap-4">
        <Accordion type="multiple">
          <AccordionItem value="item-1 border-0">
            <AccordionTrigger className="text-[18px] text-base text-black">
              What we need to know (Event Info)
            </AccordionTrigger>
            <AccordionContent
              className="border-0 bg-[#E5E5E5] p-6 text-[#575757] shadow-inner"
              style={{
                boxShadow:
                  'inset 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
