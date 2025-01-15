/* eslint-disable jsx-a11y/label-has-associated-control */
import { ParameterSchema } from 'src/shared/generated_models';
import { Checkbox } from '@shadcn/checkbox';

export default function BooleanField({
  parameterSchema,
  value,
  onChange,
  disabled,
}: {
  parameterSchema: ParameterSchema;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
}) {
  const defaultChecked = disabled
    ? value
    : Boolean(parameterSchema.value.default);
  return (
    <div className="flex items-center mt-2">
      <div className="items-top flex space-x-2">
        <Checkbox
          id={parameterSchema.key}
          defaultChecked={defaultChecked}
          onCheckedChange={(state) => onChange(state as boolean)}
          disabled={disabled}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={parameterSchema.key}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {parameterSchema.label}
          </label>
          <p className="text-sm text-muted-foreground">
            {parameterSchema.subtitle || ''}
          </p>
        </div>
      </div>
    </div>
  );
}
