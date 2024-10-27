import { ParameterSchema } from 'src/shared/generated_models';
import { Input } from '../ui/input';

export default function IntField({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parameterSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
      </div>
    </div>
  );
}
