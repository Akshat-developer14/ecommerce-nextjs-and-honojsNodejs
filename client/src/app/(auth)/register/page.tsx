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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/registerSchema";
import * as z from "zod";
import { useState } from "react";

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...data } = values; // Exclude confirmPassword
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Success:", result);
        setSuccessMessage(result.message); // Display success message
      } else {
        setErrorMessage("Error: " + result.message); // Display error message from backend
        console.error("Error:", response.statusText);
      }

    } catch (error) {

      if (error instanceof Error) {
        setErrorMessage("Fetch error: " + error.message); // Display fetch error message
        console.error("Fetch error:", error);
      } else {
        setErrorMessage("An unexpected error occurred");
        console.error("Unexpected error:", error);
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      className="border-stone-500"
                    />
                  </FormControl>
                  <FormDescription className="text-stone-700">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="border-stone-500"
                    />
                  </FormControl>
                  <FormDescription className="text-stone-700">
                    Please enter your first name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="border-stone-500"
                    />
                  </FormControl>
                  <FormDescription className="text-stone-700">
                    Please enter your last name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      className="border-stone-500"
                    />
                  </FormControl>
                  <FormDescription className="text-stone-700">
                    Enter the email on which you want to receive notifications.
                  </FormDescription>
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
                      placeholder="password"
                      type="password"
                      {...field}
                      className="border-stone-500"
                    />
                  </FormControl>
                  <FormDescription className="text-stone-700">
                    Enter a password minimum 8 characters long.
                  </FormDescription>
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
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                      className="border-stone-500"
                    />
                  </FormControl>
                  <FormDescription className="text-stone-700">
                    Confirm your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && (
              <FormMessage className="text-red-500">{errorMessage}</FormMessage>
            )}
            {successMessage && (
              <FormMessage className="text-green-500">
                {successMessage}
              </FormMessage>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
