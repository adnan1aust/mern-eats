import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
const ImageUploader = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add am image that will be displayed on your restaurant listing in the
          search result.
        </FormDescription>
        <div className="flex flex-col gap-8 w-[30%]">
          <FormField
            control={control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="file"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
