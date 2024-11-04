import { InputSchema } from 'src/shared/generated_models';
import { match } from 'ts-pattern';
import DirectoryField from './input_fields/DirectoryField';
import FileField from './input_fields/FileField';
import TextField from './input_fields/TextField';
import TextAreaField from './input_fields/TextAreaField';
import BatchTextField from './input_fields/BatchTextField';
import BatchDirectoryField from './input_fields/BatchDirectoryField';
import BatchFileField from './input_fields/BatchFileField';
import NewFileField from './input_fields/NewFileField';

type InputFieldProps = {
  inputSchema: InputSchema;
  value: any;
  onChange: (value: any) => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
};

export default function InputField({
  inputSchema,
  value,
  onChange,
  disabled = false,
}: InputFieldProps) {
  return match(inputSchema)
    .with({ inputType: 'text' }, () => (
      <TextField
        inputSchema={inputSchema}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .with({ inputType: 'textarea' }, () => (
      <TextAreaField
        inputSchema={inputSchema}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .with({ inputType: 'file' }, () => (
      <FileField
        inputSchema={inputSchema}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .with({ inputType: 'directory' }, () => (
      <DirectoryField
        inputSchema={inputSchema}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .with({ inputType: 'batchtext' }, () => (
      <BatchTextField
        inputSchema={inputSchema}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .with({ inputType: 'batchfile' }, () => (
      <BatchFileField
        inputSchema={inputSchema}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .with({ inputType: 'batchdirectory' }, () => (
      <BatchDirectoryField
        inputSchema={inputSchema}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    ))
    .with(
      {
        inputType: {
          inputType: 'newfile',
        },
      },
      () => (
        <NewFileField
          inputSchema={inputSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      ),
    )
    .otherwise(() => <div>Unsupported input type.</div>);
}
