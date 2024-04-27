import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function CheckboxReactHookFormMultiple({ form }) {
  const { categories } = useSelector((state) => state.categoryState);

  return (
    <FormField
      control={form.control}
      name='checked'
      className='h-30'
      render={() => (
        <FormItem>
          <div className='mb-4'>
            <FormLabel className='text-base flex gap-2 items-center'>
              <FaFilter size={13} />
              Categories
            </FormLabel>
          </div>
          {categories?.map((category) => (
            <FormField
              key={category._id}
              control={form.control}
              name='checked'
              render={({ field }) => {
                return (
                  <FormItem
                    key={category.id}
                    className='flex flex-row items-center space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(category?._id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, category?._id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== category?._id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className='font-normal text-md text-ellipsis overflow-hidden'>
                      {category?.name}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}
