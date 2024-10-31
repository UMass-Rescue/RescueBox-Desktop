import { InputSchema } from 'src/shared/generated_models';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function FileField({
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
  const handleSelectFile = async () => {
    await window.fileSystem.selectFile().then((path) => {
      onChange(path);
      return path;
    });
  };

  const handleShowFileInExplorer = async () => {
    await window.fileSystem.showFileInExplorer({ path: value });
  };

  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-md">{inputSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          className="flex-1 mr-2"
          value={value || 'No File Selected'}
          readOnly
        />
        <Button
          type="button"
          onClick={disabled ? handleShowFileInExplorer : handleSelectFile}
        >
          Browse
        </Button>
      </div>
    </div>
  );
}
