import { InputSchema } from 'src/shared/generated_models';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function BatchDirectoryField({
  onChange,
  value,
  inputSchema,
}: {
  onChange: (paths: string[]) => void;
  value: string;
  inputSchema: InputSchema;
}) {
  const handleSelectDirectories = async () => {
    await window.fileSystem.selectDirectories().then((paths) => {
      onChange(paths);
      return paths;
    });
  };

  return (
    <div>
      <h2 className="font-semibold text-lg">{inputSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          className="flex-1 mr-2"
          value={value}
          placeholder="No directories selected"
          readOnly
        />
        <Button type="button" onClick={handleSelectDirectories}>
          Browse
        </Button>
      </div>
    </div>
  );
}