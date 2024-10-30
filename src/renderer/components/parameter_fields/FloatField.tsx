import { ParameterSchema } from 'src/shared/generated_models';
import { Input } from '../ui/input';

export default function FloatField({
  parameterSchema,
  onChange,
  disabled,
}: {
  parameterSchema: ParameterSchema;
  onChange: (value: number) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-md">{parameterSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="number"
          step={0.01}
          defaultValue={Number(parameterSchema.value.default)}
          onChange={(e) => onChange(e.target.valueAsNumber)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
