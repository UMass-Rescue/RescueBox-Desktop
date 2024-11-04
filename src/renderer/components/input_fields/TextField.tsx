import { InputSchema } from 'src/shared/generated_models';
import { Input } from '../ui/input';

export default function TextField({
  inputSchema,
  value,
  onChange,
  disabled,
}: {
  inputSchema: InputSchema;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-base">
        {inputSchema.label}
      </h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          placeholder={inputSchema.subtitle || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="border border-gray-300 disabled:opacity-100 disabled:cursor-text"
          defaultValue={disabled ? value : ''}
        />
      </div>
    </div>
  );
}
