"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton.component";
import { updateUser } from "@/lib/actions";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(4, "Name is required"),
  addressLine1: z.string().min(4, "Address line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

type UserFormDataType = z.infer<typeof formSchema>;

const UserProfileForm = ({ userData }: { userData: UserFormDataType }) => {
  const router = useRouter();
  const form = useForm<UserFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name ?? "",
      addressLine1: userData.addressLine1 ?? "",
      city: userData.city ?? "",
      country: userData.country ?? "",
    },
    mode: "onSubmit",
  });

  const { isDirty } = form.formState;
  const { reset } = form;

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(formData: UserFormDataType) {
    setIsLoading(true);
    const { data, error } = await updateUser(formData);
    setIsLoading(false);
    if (error) {
      toast.error("Could not update user profile");
    } else {
      toast.success("User profile updated successfully");
      reset(data.user, {
        keepValues: true,
        keepDirty: false,
      });
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10 p-2"
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Form</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>

        <FormItem>
          <FormLabel>
            Email<span className="text-red-600">*</span>
          </FormLabel>
          <FormControl>
            <Input disabled className="bg-white" value={userData.email} />
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>
                  Address Line 1<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" disabled={!isDirty}>
            Save
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
