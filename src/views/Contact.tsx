'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FadeIn from '@/components/FadeIn';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
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
import { Textarea } from '@/components/ui/textarea';
import { sectionsConfig } from '@/constants';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  email: z.string().email(),
  how_did_you_hear: z.string(),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
  // Honeypot: hidden from real users; bots that fill it get a fake success.
  company: z.string().optional(),
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
      company: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleOnSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error ?? 'Error sending message. Please try again later.');
      }

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
    <SnappingPage id={sectionsConfig.contact.id} snapAlign="start">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-10">
        <FadeIn>
          <SectionHeading kicker="Contact" title="Send me a message" />
        </FadeIn>
        <FadeIn delay={0.15}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="m-0 p-0">
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
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
                      <Input type="email" placeholder="e.g. john@example.com" {...field} />
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
                      <Input placeholder="e.g. LinkedIn" {...field} />
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
                      <Textarea placeholder="e.g. Hi, I'm interested in your work." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                {...form.register('company')}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </Form>
        </FadeIn>
      </div>

      <Footer />
    </SnappingPage>
  );
}
