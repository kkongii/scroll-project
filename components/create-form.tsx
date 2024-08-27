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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';
import React from 'react';
import { useWriteContract } from 'wagmi';
import { DatePicker } from '@nextui-org/react';
import { now } from '@internationalized/date';

const formSchema = z.object({
  project_name: z.string().default('').optional(),
  project_token_address: z.string().optional(),
  event_title: z.string().optional(),
  event_description: z.string().default('').optional(),
  event_category: z.string().default('').optional()
});

type FormValues = z.infer<typeof formSchema>;

const WNW_PRECOMPILE_ADDRESS = '0x33162C0C63cb323A355Bd1fAC34f7285858bda38';
export const CreateForm: React.FC = () => {
  const { writeContract } = useWriteContract();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = 'Create Event';
  const action = 'Create';

  const [startDate, setStartDate] = useState(now('Asia/Seoul'));
  const [endDate, setEndDate] = useState(now('Asia/Seoul'));

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(
        startDate.toDate(),
        endDate.toDate().getTime() - new Date().getTime(),
        data
      );
      setLoading(true);
      writeContract({
        abi: WNW_ABI,
        address: WNW_PRECOMPILE_ADDRESS,
        functionName: 'createGame',
        args: [3600, 10, '0x54E8d3c6Bfa55F809d5687AAB4d1Eb00f13394B4', 'yong']
      });
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
          <FormField
            control={form.control}
            name="project_name"
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
            name="project_token_address"
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
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="event_title"
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
            <FormItem>
              <FormLabel>Event Start Date</FormLabel>
              <FormControl>
                <DatePicker
                  className="max-w-[284px]"
                  granularity="minute"
                  value={startDate}
                  onChange={setStartDate}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Event End Date</FormLabel>
              <FormControl>
                <DatePicker
                  className="max-w-[284px]"
                  granularity="minute"
                  value={endDate}
                  onChange={setEndDate}
                />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="event_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
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
            <FormField
              control={form.control}
              name="event_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Category</FormLabel>
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
