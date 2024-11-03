import { Button } from '@shadcn/button';
import { Input } from '@shadcn/input';
import { InputSchema, NewFileInputType } from 'src/shared/generated_models';

export default function NewFileField({
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
  const handleShowFileInExplorer = async () => {
    await window.fileSystem.showFileInExplorer({
      path: value,
    });
  };

  const handleSelectFileSave = async () => {
    const newFileInput = inputSchema.inputType as NewFileInputType;
    const defaultName = newFileInput.defaultName || 'untitled';
    const { defaultExtension, allowedExtensions } = newFileInput;

    await window.fileSystem
      .selectFileSave({ defaultName, defaultExtension, allowedExtensions })
      .then((path) => {
        onChange(path);
        return path;
      });
  };

  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-md">{inputSchema.label}</h2>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          className="flex-1 mr-2"
          value={value || 'No Path Selected'}
          readOnly
        />
        <Button
          type="button"
          onClick={disabled ? handleShowFileInExplorer : handleSelectFileSave}
        >
          Browse
        </Button>
      </div>
    </div>
  );
}
