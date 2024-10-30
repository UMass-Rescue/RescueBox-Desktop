import { ParameterSchema } from 'src/shared/generated_models';
import { Input } from '../ui/input';

export default function TextField({
  parameterSchema,
  onChange,
  disabled,
}: {
  parameterSchema: ParameterSchema;
  onChange: (value: string) => void;
  disabled: boolean
}) {
  return (
    <div>
      <h2 className="font-semibold text-md md:text-lg">{parameterSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          placeholder={parameterSchema.subtitle || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
