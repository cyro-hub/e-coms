import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { priceFilterList } from "./priceList";
import { FaMoneyBillAlt } from "react-icons/fa";

export default function CheckboxReactHookFormMultiple({ form }) {
  return (
    <FormField
      control={form.control}
      name="radio"
      render={({ field }) => (
        <FormItem className="space-y-3 mb-10">
          <FormLabel className="text-base flex gap-2 items-center">
            <FaMoneyBillAlt size={13} />
            Price range...
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1">
              {priceFilterList.map((filter) => (
                <FormItem
                  key={filter.id}
                  className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={filter.range} />
                  </FormControl>
                  <FormLabel className="font-normal">{filter.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}
