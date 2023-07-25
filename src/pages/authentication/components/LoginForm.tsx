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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z
    .string()
    .min(4, "Password too short")
    .max(14, "Passoword too long"),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    setLoading(true);

    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
      .then((res) => {
        console.log(res);

        if (res?.error) {
          toast({
            description: res.error,
            variant: "destructive",
          });
        }

        if (res?.ok && !res?.error) {
          toast({
            description: "Welcome",
            duration: 2000,
          });
        }
      })
      .finally(() => setLoading(false));
  }

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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
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
                      type="password"
                      disabled={loading}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              <Typography>Sign In</Typography>
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
