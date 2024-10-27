import { ParameterSchema } from 'src/shared/generated_models';
import { Input } from '../ui/input';

export default function FloatField({
  parameterSchema,
  value,
  onChange,
}: {
  parameterSchema: ParameterSchema;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <h2 className="font-semibold text-lg">{parameterSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="number"
          value={value || Number(parameterSchema.value.default)}
          step={0.01}
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
      </div>
    </div>
  );
}
