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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parameterSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <Select value={value} onValueChange={(val) => onChange(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Value" />
        </SelectTrigger>
        <SelectContent>
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
