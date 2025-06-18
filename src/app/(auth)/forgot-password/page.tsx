"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const forgotSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email format")
    .min(5)
    .max(50),
});

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof forgotSchema>) => {
    setIsLoading(true);
    try {
      const email = values.email.trim().toLowerCase();

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Try again.");
      }

      toast.success("Password reset link sent to your email.");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 w-full space-y-7">
      <h1 className="text-2xl font-semibold text-center">
        Forgot your password?
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md mx-auto"
          noValidate
          aria-label="Forgot Password Form"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    disabled={isLoading}
                    className="w-full"
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="w-full cursor-pointer"
            type="submit"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
      <div className="max-w-md mx-auto text-center">
        <p>
          Remember your password?
          <Link className="font-semibold text-primary ml-1" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
