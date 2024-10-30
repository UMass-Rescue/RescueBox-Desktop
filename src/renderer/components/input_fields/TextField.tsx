import { InputSchema } from 'src/shared/generated_models';
import { Input } from '../ui/input';

export default function TextField({
  inputSchema,
  onChange,
  disabled,
}: {
  inputSchema: InputSchema;
  onChange: (value: string) => void;
  disabled: boolean
}) {
  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-md">{inputSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          placeholder={inputSchema.subtitle || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
