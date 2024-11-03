import { InputSchema } from 'src/shared/generated_models';
import { Textarea } from '../ui/textarea';

export default function TextAreaField({
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
        <Textarea
          value={value || ''}
          placeholder={inputSchema.subtitle || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
