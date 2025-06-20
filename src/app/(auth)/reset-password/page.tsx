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
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Axios from "@/lib/Axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const passwordValidation = z
  .string({ message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(50, { message: "Password must be less than 50 characters long" })
  .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must include at least one number" })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message: "Must include at least one special character",
  });

export const formSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect if no token found
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Missing reset token. Please request a new reset link.");
      router.replace("/forgot-password");
    }
  }, [searchParams, router]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = searchParams.get("token");
      if (!token) {
        toast.error("Missing or invalid reset token.");
        setIsLoading(false);
        return;
      }

      const password = form.getValues("password");
      const payload = { password };

      await Axios.post(`/api/auth/reset-password?token=${token}`, payload);

      toast.success("Password reset successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [form, router, searchParams]);

  return (
    <div className="p-10 w-full space-y-7">
      <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md mx-auto"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Type a strong password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Retype your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading ? "Processing..." : "Reset Password"}
          </Button>
        </form>
      </Form>
      <div className="max-w-md mx-auto text-center">
        <p>
          Already have an account?
          <Link
            className="font-semibold text-primary hover:underline ml-1"
            href="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
