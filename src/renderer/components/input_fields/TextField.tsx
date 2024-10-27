import { InputSchema } from 'src/shared/generated_models';
import { Input } from '../ui/input';

export default function TextField({
  inputSchema,
  value,
  onChange,
}: {
  inputSchema: InputSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="font-semibold text-lg">{inputSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          value={value || ''}
          placeholder={inputSchema.subtitle || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}