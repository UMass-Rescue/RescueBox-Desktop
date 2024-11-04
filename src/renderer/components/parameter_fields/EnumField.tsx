/* eslint-disable no-param-reassign */
import {
  EnumParameterDescriptor,
  ParameterSchema,
} from 'src/shared/generated_models';
import { Input } from '@shadcn/input';
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
  disabled,
}: {
  parameterSchema: ParameterSchema;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  const descriptor = parameterSchema.value as EnumParameterDescriptor;
  if (descriptor.enumVals.length === 0) {
    return (
      <div>
        <h2 className="font-semibold text-sm xl:text-base">
          {parameterSchema.label}
        </h2>
        <div className="flex items-center mt-2">
          <Input
            type="text"
            placeholder={parameterSchema.subtitle || ''}
            defaultValue={String(
              descriptor.messageWhenEmpty || 'No values available',
            )}
            onChange={(e) => onChange(e.target.value)}
            disabled
            className="border border-gray-300"
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-base mb-2">
        {parameterSchema.label}
      </h2>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full border border-gray-300 disabled:opacity-100 disabled:cursor-text">
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
