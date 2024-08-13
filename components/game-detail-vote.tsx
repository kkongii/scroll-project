'use client';

import { Button } from '@/components/ui/button';
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
import { Label, RadialBarChart, PolarRadiusAxis, RadialBar } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from './ui/chart';
import { StarIcon } from '@radix-ui/react-icons';

export function GameDetailVote() {
  const chartData = [{ up: 1260, down: 570 }];

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
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Wise and Weird</CardTitle>
        <CardDescription>
          Can you predict the outcome of the next Wise and Weird event?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center">Total $50k</div>
        <div className="flex items-center">Current Price $50</div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
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
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
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
              fill="var(--color-up)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="down"
              fill="var(--color-down)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="grid gap-2">
          <Input id="amount" placeholder="Betting amount    " />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Up</Label>
            <Button variant="outline" className="bg-lime-700">
              Vote Up
            </Button>
          </div>
          <div className="grid gap-2">
            <Label>Down</Label>
            <Button variant="outline" className="bg-rose-700">
              Vote Down
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
