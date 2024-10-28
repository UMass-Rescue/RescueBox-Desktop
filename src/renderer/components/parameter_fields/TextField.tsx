import { ParameterSchema } from 'src/shared/generated_models';
import { Input } from '../ui/input';

export default function TextField({
  parameterSchema,
  value,
  onChange,
}: {
  parameterSchema: ParameterSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="font-semibold text-lg">{parameterSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          value={value}
          placeholder={parameterSchema.subtitle || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
