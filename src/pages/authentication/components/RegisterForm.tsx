import { useToastStore } from "@/zustand/store";
import { api } from "@/utils/api";
import { CircleDashed, Lock } from "lucide-react";
import Typography from "@/components/ui/Typography";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

const formSchema = z
  .object({
    name: z.string().nonempty("Please add your name"),
    email: z.string().nonempty("Email is required").email(),
    password: z
      .string()
      .min(4, "Password too short")
      .max(14, "Passoword too long"),
    passwordConfirmation: z
      .string()
      .min(4, "Password too short")
      .max(14, "Passoword too long"),
  })
  .superRefine(
    ({ password, passwordConfirmation }, ctx) =>
      password !== passwordConfirmation &&
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
      })
  );

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { name, email, password } = values;

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess(data) {
          if (data.user)
            toast.success(`user (${data.user.name}) created successfully`);
          if (data.error) toast.error(data.error.message);
        },
        onSettled() {
          setLoading(false);
        },
      }
    );
  }

  const [loading, setLoading] = useState(false);
  const toast = useToastStore();

  const registerMutation = api.auth.register.useMutation();

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-fit rounded-full bg-primary p-2 text-white">
          <Lock />
        </div>
        <Typography className="text-4xl font-bold">Sign up</Typography>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Jon Doe"
                      type="text"
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
                <FormItem className="w-full max-w-xs">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Example@mail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Used to login</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      min={4}
                      max={14}
                      placeholder="1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              <Typography>Sign Up</Typography>
              {loading ? (
                <CircleDashed className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Lock className="ml-2 h-4 w-4" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
