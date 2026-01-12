"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Submitted data state (single record for simplicity)
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  // Editing state → null = creating, object = editing
  const [editingData, setEditingData] = useState<FormValues | null>(null);

  // Submit handler (Register or Update)
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (editingData) {
      // Update record
      setSubmittedData(data);
      setEditingData(null);
      form.reset();
    } else {
      // Register new record
      setSubmittedData(data);
      form.reset();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 space-y-6">
      {/* FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 border p-6 rounded-lg shadow"
        >
          <h1 className="text-2xl font-bold text-center">
            {editingData ? "Update Record" : "Save"}
          </h1>

          {/* USERNAME */}
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {editingData ? "Update" : "Save"}
          </Button>
        </form>
      </Form>

      {/* DISPLAY SUBMITTED DATA */}
      {submittedData && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Submitted Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>{submittedData.username}</TableCell>
                  <TableCell rowSpan={3}>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingData(submittedData);
                        form.reset(submittedData);
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{submittedData.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Password</TableCell>
                  <TableCell>{submittedData.password}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
