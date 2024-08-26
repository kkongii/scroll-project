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
import {DateRangePicker} from "@nextui-org/react";
import {parseDateTime} from "@internationalized/date";
import { DateRange } from 'react-day-picker';


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

const WNW_PRECOMPILE_ADDRESS = '0xe31bA092390628Aaf5faFda2F50bFD7d51C9e657';
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
  const title = 'Create Event';
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
        args: [3600, 10, '0x54E8d3c6Bfa55F809d5687AAB4d1Eb00f13394B4', 'yong' ]
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
  console.log(startDate);
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Please put title of issue."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Please put name of project."
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
                      <FormLabel>Project Token Address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Please put your token contract address (BEP-20)"
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
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Please choose category."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
            <FormItem>
              <FormControl>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Popover>
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
              <FormLabel>Due Date</FormLabel> 
              <FormControl>
              <div className="w-full max-w-xl flex flex-col items-start gap-4">
                <DateRangePicker
        defaultValue={{
          start: parseDateTime("2024-08-20T07:45"),
          end: parseDateTime("2024-08-30T19:15"),
        }}
        labelPlacement="outside"
        className="flex items-center space-x-17"
      />
                  {/* <Popover>
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
                  </Popover> */}
                </div>
              </FormControl>
            </FormItem>
            {type !== 'slot' && (
              <>
                
                <FormField
                  control={form.control}
                  name="keyword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Please put description about issues"
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
                  <FormLabel>Contacts</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please put your contacts. ex) Twitter, Telegram, Discord etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
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
            /> */}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
