"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Separator } from "./ui/separator";
import { cuisineList } from "@/app/config/restaurant.config";
import { Checkbox } from "./ui/checkbox";
import RestaurantMenuSection from "./RestaurantMenuSection.component";
import ImageUploader from "./ImageUploader.component";
import { useState } from "react";
import LoadingButton from "./LoadingButton.component";
import { Button } from "./ui/button";
import { addRestaurant } from "@/lib/actions";
import { toast } from "sonner";

const formSchema = z.object({
  restaurantName: z.string().min(4, "Name is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  deliveryPrice: z.coerce.number().min(1, "Price is required"),
  estimatedDeliveryTime: z.coerce.number().min(1, "Delivery time is required"),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(4, "Name is required"),
      price: z.coerce.number().min(1, "Price is required"),
    })
  ),
  imageFile: z.instanceof(File, {
    message: "Image is required",
  }),
});

type RestaurantFormDatType = z.infer<typeof formSchema>;

const ManageRestaurantForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RestaurantFormDatType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      cuisines: [],
      menuItems: [
        {
          name: "",
          price: 0,
        },
      ],
    },
  });

  const onSubmit = async (formDataJson: RestaurantFormDatType) => {
    /* setIsLoading(true); */
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    console.log(formData.entries());

    const { error, data } = await addRestaurant(formData);
    setIsLoading(false);
    if (error) {
      toast.error("Error creating restaurant");
      console.log(data);
    } else {
      toast.success("Restaurant created successfully");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <div className="space-y-2 ">
          <div>
            <h2 className="text-2xl font-bold">Details</h2>
            <FormDescription>
              Please fill out the form below to create a new restaurant
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="restaurantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>City</FormLabel>
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
                <FormItem className="grow">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="deliveryPrice"
            render={({ field }) => (
              <FormItem className="max-w-[45%]">
                <FormLabel>Delivery Price</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" placeholder="1.50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimatedDeliveryTime"
            render={({ field }) => (
              <FormItem className="max-w-[45%]">
                <FormLabel>Estimated Delivery Time</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" placeholder="30" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div className="space-y-2">
          <div>
            <h2 className="text-2xl font-bold">Cuisines</h2>
            <FormDescription>
              Please select the cuisines for this restaurant
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="cuisines"
            render={({ field }) => (
              <FormItem>
                <div className="grid md:grid-cols-5 gap-1">
                  {cuisineList.map((cuisine: string) => (
                    <FormItem
                      key={cuisine}
                      className="flex flex-row items-center space-x-1 space-y-0 mt-2"
                    >
                      <FormControl>
                        <Checkbox
                          className="bg-white"
                          checked={field.value.includes(cuisine)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, cuisine]);
                            } else {
                              field.onChange(
                                field.value.filter((item) => item !== cuisine)
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {cuisine}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <RestaurantMenuSection />
        <Separator />
        <ImageUploader />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
