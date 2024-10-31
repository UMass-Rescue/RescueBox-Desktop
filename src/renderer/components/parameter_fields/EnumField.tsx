import {
  EnumParameterDescriptor,
  ParameterSchema,
} from 'src/shared/generated_models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function EnumField({
  parameterSchema,
  value,
  onChange,
}: {
  parameterSchema: ParameterSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  const descriptor = parameterSchema.value as EnumParameterDescriptor;
  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">{parameterSchema.label}</h2>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Value" />
        </SelectTrigger>
        <SelectContent className="w-full">
          {descriptor.enumVals.map((enumVal) => {
            return (
              <SelectItem key={enumVal.key} value={enumVal.key!}>
                {enumVal.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
