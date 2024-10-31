import { InputSchema } from 'src/shared/generated_models';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function BatchDirectoryField({
  onChange,
  value,
  inputSchema,
  disabled = false,
}: {
  onChange: (paths: string[]) => void;
  value: string;
  inputSchema: InputSchema;
  disabled: boolean;
}) {
  const handleSelectDirectories = async () => {
    await window.fileSystem.selectDirectories().then((paths) => {
      onChange(paths);
      return paths;
    });
  };

  const handleOpenDirectories = async () => {
    await window.fileSystem.openPath({ path: value });
  };

  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-md">{inputSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          className="flex-1 mr-2"
          value={value || 'No Directories Selected'}
          readOnly
        />
        <Button
          type="button"
          onClick={!disabled ? handleSelectDirectories : handleOpenDirectories}
        >
          Browse
        </Button>
      </div>
    </div>
  );
}
