'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SnappingPage from '@/components/snappingPage';
import { sectionsConfig } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Username must be at least 5 characters.',
  }),
  email: z.string().email(),
  how_did_you_hear: z.string(),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: '',
      email: '',
      how_did_you_hear: '',
      message: '',
    },
  });

  const handleOnSubmit = (data: z.infer<typeof FormSchema>) => {
    try {
      /* Send email to me */
      console.log({ data });
      form.reset();
      toast({
        title: "Message sent. We'll be in touch soon. 🚀",
        duration: 2000,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error sending message. Please try again later.';
      toast({
        title: message,
        duration: 2000,
      });
    }
  };

  return (
    <SnappingPage id={sectionsConfig.contact.id}>
      <div className="flex h-full flex-col items-center pt-12 text-teal-200 md:px-6">
        <h3 className="w-full pb-4 text-center text-3xl text-teal-100">Send me a message</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="w-full space-y-6 px-8 md:w-2/3 md:p-0"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="m-0 p-0">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. John Doe"
                      className="bg-white !text-slate-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="m-0 p-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. john@example.com"
                      className="bg-white !text-slate-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="how_did_you_hear"
              render={({ field }) => (
                <FormItem className="m-0 p-0">
                  <FormLabel>How did you hear about me?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Twitter"
                      className="bg-white !text-slate-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="m-0 p-0">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Hi, I'm interested in your work."
                      className="bg-white !text-slate-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </SnappingPage>
  );
}
