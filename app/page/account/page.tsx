"use client";
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const formSave = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const formUpdate = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // State: multiple records
  const [records, setRecords] = useState<FormValues[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Save
  const onSave: SubmitHandler<FormValues> = (data) => {
    setRecords([...records, data]);
    formSave.reset();
  };

  // Update
  const onEdit: SubmitHandler<FormValues> = (data) => {
    if (editingIndex === null) return;

    const updated = [...records];
    updated[editingIndex] = data;
    setRecords(updated);

    setEditingIndex(null);
    formUpdate.reset();
  };

  const onDelete = (index: number) => {
    const updated = [...records];
    updated.splice(index, 1); // remove the record
    setRecords(updated);

    // if the deleted row is being edited, reset the update form
    if (editingIndex === index) {
      setEditingIndex(null);
      formUpdate.reset();
    }
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    formUpdate.reset(records[index]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 space-y-6">
      <div className="flex gap-10 w-full max-w-4xl">
        {/* FORM 1: SAVE */}
        <Form {...formSave}>
          <form
            onSubmit={formSave.handleSubmit(onSave)}
            className="flex-1 space-y-4 border p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold text-center">Save Form</h2>

            <FormField
              control={formSave.control}
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

            <FormField
              control={formSave.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
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

            <FormField
              control={formSave.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
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
              Save
            </Button>
          </form>
        </Form>

        {/* FORM 2: UPDATE */}
        <Form {...formUpdate}>
          <form
            onSubmit={formUpdate.handleSubmit(onEdit)}
            className="flex-1 space-y-4 border p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold text-center">Update Form</h2>

            <FormField
              control={formUpdate.control}
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

            <FormField
              control={formUpdate.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
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

            <FormField
              control={formUpdate.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
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

            <Button
              type="submit"
              className="w-full"
              disabled={editingIndex === null}
            >
              Update
            </Button>
          </form>
        </Form>
      </div>

      {/* TABLE DISPLAY */}
      {records.length > 0 && (
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.username}</TableCell>
                    <TableCell>{record.email}</TableCell>
                    <TableCell>{record.password}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" onClick={() => handleEditClick(index)}>
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
