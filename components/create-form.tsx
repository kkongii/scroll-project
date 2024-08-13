'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import WNW_ABI from '@/abi/IWNW.abi';
import {
  ArrowBigUpDashIcon,
  CalendarIcon,
  RefreshCcwDot,
  Trash
} from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@radix-ui/react-popover';
import React from 'react';
import { Calendar } from './ui/calendar';
import dayjs from 'dayjs';
import { useWriteContract } from 'wagmi';
import { formatDate } from '@/utils/string-functions';
const formSchema = z.object({
  name: z.string().default('').optional(),
  count: z.coerce.number().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  mid: z.string().default('').optional(),
  question: z.string().default('').optional(),
  sight: z.string().default('').optional(),
  keyword: z.string().default('').optional()
});

type FormValues = z.infer<typeof formSchema>;

const WNW_PRECOMPILE_ADDRESS = '0x358686178A7F2A87c9CAeE638d8c3DB0e199b5Ef';
export const CreateForm: React.FC = () => {
  const { writeContract } = useWriteContract();
  const params = useParams();
  const query = useSearchParams();
  const partnerId = query.get('partnerId');
  const type = query.get('type');
  const { id } = params as { id: string };
  const isExist = id !== 'new';
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = 'Create Bet';
  const toastMessage = 'Successfully created bet';
  const action = 'Create';

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    dayjs().add(7, 'day').toDate()
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const formData = {
        ...data,
        startedAt: startDate,
        endedAt: endDate,
        partnerId
      };
      writeContract({
        abi: WNW_ABI,
        address: WNW_PRECOMPILE_ADDRESS,
        functionName: 'createGame',
        args: [3600, 10, '0x36e23acaa237fdd90180fe6b7d2630e53db61924']
      });
      // router.refresh();
      // toast({
      //   variant: 'default',
      //   title: title,
      //   description: toastMessage
      // });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/campaigns/${id}`);
      router.refresh();
      router.push(`/campaign`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const refund = async () => {
    if (confirm('환불 요청을 하시겠습니까?')) {
      try {
        setLoading(true);
        await axios.put(`/api/campaigns/${id}/refund`);
        router.refresh();
        router.push(`/campaign`);
      } catch (error: any) {
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };

  const extend = async () => {
    const count = Number(window.prompt('연장할 날짜를 입력하세요.', ''));
    if (count > 0) {
      try {
        setLoading(true);
        await axios.post(`/api/campaigns/${id}/extend`, { addCount: count });
        router.refresh();
        router.push(`/campaign`);
      } catch (error: any) {
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description="" />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>캠페인 종류</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="캠페인 타입을 선택해주세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="SEARCH" value="SEARCH">
                        검색
                      </SelectItem>
                      <SelectItem key="FAVORITE" value="FAVORITE">
                        저장하기
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>시작일</FormLabel>
              <FormControl>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button id="startDate" variant={'outline'}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          formatDate(startDate)
                        ) : (
                          <span>시작일을 선택해주세요.</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto bg-background p-0"
                      align="end"
                    >
                      <Calendar
                        initialFocus
                        mode="single"
                        defaultMonth={startDate}
                        selected={startDate}
                        onSelect={setStartDate}
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>종료일</FormLabel>
              <FormControl>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button id="endDate" variant={'outline'}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          formatDate(endDate)
                        ) : (
                          <span>종료일을 선택해주세요.</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto bg-background p-0"
                      align="end"
                    >
                      <Calendar
                        initialFocus
                        mode="single"
                        defaultMonth={endDate}
                        selected={endDate}
                        onSelect={setEndDate}
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
            </FormItem>
            {type !== 'slot' && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>플레이스명</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="플레이스명을 입력해주세요."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keyword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>키워드</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="키워드를 입력해주세요."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>플레이스 ID</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="플레이스 ID를 입력해주세요."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        질문(검색하기 캠페인에만 등록해주세요.)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="질문을 선택해주세요." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent></SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        정답(검색하기 캠페인에만 등록해주세요.)
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="명소를 입력해주세요."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1일 유입량</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1일 유입량을 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상태</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="상태를 입력해주세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="READY" value="READY">
                        정상
                      </SelectItem>
                      <SelectItem key="PENDING" value="PENDING">
                        대기
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
