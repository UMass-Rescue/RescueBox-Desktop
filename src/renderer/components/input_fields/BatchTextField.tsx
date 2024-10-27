import { useState } from 'react';
import { InputSchema } from 'src/shared/generated_models';
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function BatchTextField({
  inputSchema,
  value,
  onChange,
}: {
  inputSchema: InputSchema;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [fields, setFields] = useState<string[]>(value || []);

  const handleAddField = () => {
    setFields([...fields, '']);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    onChange(newFields);
  };

  const handleChange = (index: number, newValue: string) => {
    const newFields = fields.slice();
    newFields[index] = newValue;
    setFields(newFields);
    onChange(newFields);
  };

  return (
    <div>
      <h2 className="font-semibold text-lg">{inputSchema.label}</h2>
      <div className="mt-2">
        {fields.length === 0 && (
          <div className="flex items-center mb-2">
            <Input
              type="text"
              value=""
              onChange={(e) => handleChange(0, e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAddField} className="ml-2">
              <PlusCircledIcon className="size-5" />
            </Button>
          </div>
        )}
        {fields.map((field, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${index}`}
            className="flex items-center mb-2"
          >
            <Input
              type="text"
              value={field}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-grow"
            />
            {index === fields.length - 1 ? (
              <Button onClick={handleAddField} className="ml-2">
                <PlusCircledIcon className="size-5" />
              </Button>
            ) : (
              <Button onClick={() => handleRemoveField(index)} className="ml-2">
                <MinusCircledIcon className="size-5" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
