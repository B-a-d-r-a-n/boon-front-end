"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
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
import {
  LoginInput,
  loginSchema,
  RegisterInput,
  registerSchema,
} from "@/lib/validation/auth";
import { Chrome, Facebook } from "lucide-react";
type Variant = "LOGIN" | "REGISTER";
interface AuthFormProps {
  variant: Variant;
}
export function AuthForm({ variant }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const currentSchema = variant === "LOGIN" ? loginSchema : registerSchema;
  type CurrentInput = LoginInput | RegisterInput;
  const form = useForm<CurrentInput>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const onSubmit = async (data: CurrentInput) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      try {
        await axiosInstance.post("/auth/register", data);
        const signInResult = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        if (signInResult?.ok) {
          toast.success("Account created successfully!");
          router.push("/"); 
          router.refresh();
        } else {
          toast.error(
            "Registration successful, but login failed. Please log in manually."
          );
          router.push("/login");
        }
      } catch (error: unknown) {
        toast.error("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    if (variant === "LOGIN") {
      const result = await signIn("credentials", {
        redirect: false,
        email: (data as LoginInput).email,
        password: (data as LoginInput).password,
      });
      if (result?.error) {
        toast.error(
          "Invalid credentials. Please check your email and password."
        );
      } else if (result?.ok) {
        toast.success("Logged in successfully!");
        router.push("/");
        router.refresh();
      }
      setIsLoading(false);
    }
  };
  const handleSocialLogin = (provider: "google" | "facebook") => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: "/" });
  };
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {variant === "REGISTER" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Hamada Helal"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    disabled={isLoading}
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
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {variant === "REGISTER" && (
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Processing..."
              : variant === "LOGIN"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          <Chrome strokeWidth={1.75} />
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialLogin("facebook")}
          disabled={isLoading}
        >
          <Facebook strokeWidth={1.75} />
        </Button>
      </div>
    </div>
  );
}