import { InputSchema } from 'src/shared/generated_models';
import DirectoryField from './input_fields/DirectoryField';
import FileField from './input_fields/FileField';
import TextField from './input_fields/TextField';
import TextAreaField from './input_fields/TextAreaField';
import BatchTextField from './input_fields/BatchTextField';
import BatchDirectoryField from './input_fields/BatchDirectoryField';
import BatchFileField from './input_fields/BatchFileField';

export default function InputField({
  inputSchema,
  value,
  onChange,
  disabled = false,
}: {
  inputSchema: InputSchema;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}) {
  switch (inputSchema.inputType) {
    case 'text':
      return <TextField inputSchema={inputSchema} onChange={onChange} disabled={disabled} />;
    case 'textarea':
      return (
        <TextAreaField
          inputSchema={inputSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'file':
      return (
        <FileField
          inputSchema={inputSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'directory':
      return (
        <DirectoryField
          inputSchema={inputSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
      {/*
    TODO: Implement disabled functionality for batch inputs as well
    */}
    case 'batchtext':
      return (
        <BatchTextField
          inputSchema={inputSchema}
          value={value}
          onChange={onChange}
        />
      );
    case 'batchfile':
      return (
        <BatchFileField
          inputSchema={inputSchema}
          value={value}
          onChange={onChange}
        />
      );
    case 'batchdirectory':
      return (
        <BatchDirectoryField
          inputSchema={inputSchema}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return <div>Unsupported input type.</div>;
  }
}
