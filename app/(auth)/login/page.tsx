"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LoginData, loginValidationSchema } from "@/lib/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Page({ className, ...props }: any) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
        body: JSON.stringify(data),
      } satisfies RequestInit);
      console.log({status: res.status});

      if (!res.ok) {
        // !todo => Handle errors
        return // Prevents the rest of the res from being parsed
      }
      
      const responseData = await res.json();
      console.log(responseData);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      // !todo => Handle errors
    }
  };

  return (
    <section className="bg-black md:bg-inherit flex items-center justify-center min-h-screen">
      <div
        className={`max-w-sm ${cn("flex flex-col gap-6", className)} `}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Eather | Login
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
