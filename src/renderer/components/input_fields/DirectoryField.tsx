import { InputSchema } from 'src/shared/generated_models';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function DirectoryField({
  onChange,
  value,
  inputSchema,
  disabled,
}: {
  onChange: (filePath: string) => void;
  value: string;
  inputSchema: InputSchema;
  disabled: boolean;
}) {
  const handleSelectDirectory = async () => {
    await window.fileSystem.selectDirectory().then((newPath) => {
      onChange(newPath);
      return newPath;
    });
  };

  const handleOpenDirectory = async () => {
    await window.fileSystem.openPath({ path: value });
  };

  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-base">
        {inputSchema.label}
      </h2>
      {inputSchema.subtitle && (
        <p className="text-xs mt-1">{inputSchema.subtitle}</p>
      )}
      <div className="flex items-center mt-2">
        <Input
          type="text"
          className="flex-1 mr-2 border border-gray-300"
          value={value || 'No Directory Selected'}
          readOnly
        />
        <Button
          type="button"
          onClick={disabled ? handleOpenDirectory : handleSelectDirectory}
        >
          Browse
        </Button>
      </div>
    </div>
  );
}
