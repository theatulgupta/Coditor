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
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email format")
    .min(5)
    .max(50),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid credentials");
      } else {
        toast.success("Logged in successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 w-full space-y-7">
      <h1 className="text-2xl font-semibold text-center">
        Login to Your Account
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="w-full"
                    type="email"
                    placeholder="example@email.com"
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="w-full"
                    type="password"
                    placeholder="Your secure password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-right text-sm">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </p>

          <Button
            disabled={isLoading}
            className="w-full cursor-pointer"
            type="submit"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="max-w-md mx-auto text-center">
        <p>
          Don&apos;t have an account?
          <Link
            className="font-semibold text-primary drop-shadow-2xl"
            href="/signup"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
