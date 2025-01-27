"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/loginSchema";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/authSlice";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { ...data } = values;
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(login(response.data))
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage("Error: " + response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Fetch error: " + error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="p-5 sm:p-16 lg:p-36 bg-stone-100">
      <div className="border-2 rounded-md bg-stone-200 border-stone-500 text-stone-900 p-3 sm:p-10 shadow-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="emailOrUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username or example@email.com"
                      {...field}
                      className="border-stone-500"
                    />
                  </FormControl>
                  <FormDescription className="text-stone-700">
                    Enter your username or email.
                  </FormDescription>
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
                      placeholder="password"
                      type="password"
                      {...field}
                      className="border-stone-500"
                    />
                  </FormControl>
                  <FormDescription className="text-stone-700">
                    Enter your password.
                  </FormDescription>
                </FormItem>
              )}
            />
            {errorMessage && (
              <div className="text-red-500">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-green-500">{successMessage}</div>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
