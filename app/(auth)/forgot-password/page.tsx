"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type ForgotPasswordInput = {
  email: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<{ email: string }> = async (data: any) => {
    // ! todo => sanitize data

    // Make fetch to forgot password endpoint
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
    });

    const responseData =  await res.json();

    // Do something if there are errors
    if(responseData.error) {}

    // If not move to the next popup or page to reset
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center ">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Eather | Forgot Password
          </CardTitle>
          <CardDescription>
            Enter email associated with Eather account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-12">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="text" {...register("email", { required: true })} />
              </div>
              <Button className="w-full">Send OTP</Button>
            </div>
            <div className=" mt-4 text-center text-sm">
              <span className="text-sm mr-2">Remember password?</span>
              <Link className="hover:underline" href="/login">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
