'use client';

import { Label } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { RadialBarChart, PolarRadiusAxis, RadialBar } from 'recharts';
import { useReadContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { useRouter, useSearchParams } from 'next/navigation';



export function GameDetailVote() {
  const WNW_PRECOMPILE_ADDRESS = '0x358686178A7F2A87c9CAeE638d8c3DB0e199b5Ef';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  console.log(key)
    const { data: game }: any = useReadContract({
      address: WNW_PRECOMPILE_ADDRESS,
      abi: WNW_ABI,
      functionName: 'getGame',
      args: [key]
    });


  
  if (!game) {
    console.log("undefined")
    return <></>;
  }
  
  
  const upAmount = game.upAmount ? BigInt(game.upAmount) : 0n;
  const downAmount = game.downAmount ? BigInt(game.downAmount) : 0n;
  const chartData = [{ up:  Number(upAmount) / 10 ** 18, down:  Number(downAmount) / 10 ** 18 }];

  const totalVisitors = chartData[0].up + chartData[0].down;
  const chartConfig = {
    up: {
      label: 'Up',
      color: 'hsl(var(--chart-5))'
    },
    down: {
      label: 'Down',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  return (
    <Card className="mx-auto w-full max-w-sm max-h-auto bg-white text-black">
      <CardHeader>
        <CardTitle className="text-lg">Current Info</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className="flex items-center">Total $50k</div>
        <div className="flex items-center">Current Price $50</div> */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] mb-[-100px] mt-[-20px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180} 
            endAngle={0}      
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-black text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx} 
                          y={(viewBox.cy || 0) + 4}
                          className="fill-black"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="up"
              stackId="a"
              cornerRadius={5}
              fill="#00A29A" 
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="down"
              fill="#C73535" 
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="flex items-center font-bold">My Prediction</div>
        <div className="grid grid-cols-2">
          <div className="grid gap-2 items-center justify-center text-center">
            <Label>Up</Label>
              <img
                src="/ButtonUp.png"
                alt="Vote Up"
                className="w-200 h-110 object-contain cursor-pointer active:scale-95 active:opacity-75 transition-transform duration-75"
              />
          </div>
          <div className="grid gap-2 items-center justify-center text-center">
            <Label>Down</Label>
            <img
              src="/ButtonDown.png"
              alt="Vote Down"
                className="w-200 h-100 object-contain cursor-pointer active:scale-95 active:opacity-75 transition-transform duration-75"
              />
          </div>
        </div>
        <div className="flex items-center font-bold">Betting Price</div>
        <div className="flex items-center gap-2">
          <input
            id="amount"
            placeholder="0"
            className="border-b border-[#B6B6B6] px-2 focus:outline-none w-full bg-white text-right text-lg text-gray-500"
          />
          <span className="text-black font-semibold mt-[5px] text-lg">BnB</span>
        </div>
        <button className="w-[335px] h-[55px] rounded-lg bg-white text-black font-semibold shadow-md hover:shadow-lg focus:outline-none border border-[#B6B6B6] active:bg-gray-200 active:scale-95 transition-transform duration-75">
          Confirm
        </button>
      </CardContent>
    </Card>
  );
}
