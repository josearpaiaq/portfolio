"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SnappingPage from "@/components/snappingPage";
import { sectionsConfig } from "@/constants";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleOnSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log({ data });
    toast({
      title: "Message sent. We'll be in touch soon. 🚀",
    });
  };

  return (
    <SnappingPage id={sectionsConfig.contact.id}>
      <div className="flex flex-col justify-center items-center gap-4 h-full px-6 text-teal-200 pt-12">
        <h3 className="text-3xl text-center w-full text-teal-100 py-6">
          Send me a message
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
