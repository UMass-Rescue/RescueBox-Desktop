import { ParameterSchema } from 'src/shared/generated_models';
import TextField from './parameter_fields/TextField';
import IntField from './parameter_fields/IntField';
import FloatField from './parameter_fields/FloatField';
import EnumField from './parameter_fields/EnumField';
import RangedIntField from './parameter_fields/RangedIntField';
import RangedFloatField from './parameter_fields/RangedFloatField';

export default function ParameterField({
  parameterSchema,
  value,
  onChange,
  disabled = false,
}: {
  parameterSchema: ParameterSchema;
  value: any;
  onChange: (value: any) => void;
  // eslint-disable-next-line
  disabled?: boolean;
}) {
  const { value: paramValue } = parameterSchema;
  switch (paramValue.parameterType) {
    case 'text':
      return (
        <TextField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'int':
      return (
        <IntField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'float':
      return (
        <FloatField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'enum':
      return (
        <EnumField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'ranged_int':
      return (
        <RangedIntField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    case 'ranged_float':
      return (
        <RangedFloatField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    default:
      return <div>Unsupported parameter type: {paramValue.parameterType}</div>;
  }
}
