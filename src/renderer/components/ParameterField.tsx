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
}: {
  parameterSchema: ParameterSchema;
  value: any;
  onChange: (value: any) => void;
}) {
  const { value: paramValue } = parameterSchema;
  switch (paramValue.parameterType) {
    case 'text':
      return (
        <TextField parameterSchema={parameterSchema} onChange={onChange} />
      );
    case 'int':
      return <IntField parameterSchema={parameterSchema} onChange={onChange} />;
    case 'float':
      return (
        <FloatField parameterSchema={parameterSchema} onChange={onChange} />
      );
    case 'enum':
      return (
        <EnumField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
        />
      );
    case 'ranged_int':
      return (
        <RangedIntField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
        />
      );
    case 'ranged_float':
      return (
        <RangedFloatField
          parameterSchema={parameterSchema}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return <div>Unsupported parameter type: {paramValue.parameterType}</div>;
  }
}
