import { ParameterSchema } from 'src/shared/generated_models';
import { match, NonExhaustiveError } from 'ts-pattern';
import log from 'electron-log/renderer';
import TextField from './parameter_fields/TextField';
import IntField from './parameter_fields/IntField';
import FloatField from './parameter_fields/FloatField';
import EnumField from './parameter_fields/EnumField';
import RangedIntField from './parameter_fields/RangedIntField';
import RangedFloatField from './parameter_fields/RangedFloatField';

function getFieldByParameterSchema(
  parameterSchema: ParameterSchema,
  value: any,
  onChange: (value: any) => void,
  disabled: boolean,
) {
  try {
    return match(parameterSchema.value)
      .with({ parameterType: 'text' }, () => {
        return (
          <TextField
            parameterSchema={parameterSchema}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        );
      })
      .with({ parameterType: 'int' }, () => {
        return (
          <IntField
            parameterSchema={parameterSchema}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        );
      })
      .with({ parameterType: 'float' }, () => {
        return (
          <FloatField
            parameterSchema={parameterSchema}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        );
      })
      .with({ parameterType: 'enum' }, () => {
        return (
          <EnumField
            parameterSchema={parameterSchema}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        );
      })
      .with({ parameterType: 'ranged_int' }, () => {
        return (
          <RangedIntField
            parameterSchema={parameterSchema}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        );
      })
      .with({ parameterType: 'ranged_float' }, () => {
        return (
          <RangedFloatField
            parameterSchema={parameterSchema}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        );
      })
      .exhaustive();
  } catch (e) {
    if (e instanceof NonExhaustiveError) {
      log.error('Received an unexpected parameter schema.', parameterSchema);
      return (
        <div>
          Unsupported parameter type: {parameterSchema.value.parameterType}
        </div>
      );
    }
    throw e;
  }
}

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
  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-base mb-2">
        {parameterSchema.label}
      </h2>
      {parameterSchema.subtitle && (
        <p className="text-xs mt-1">{parameterSchema.subtitle}</p>
      )}
      {getFieldByParameterSchema(parameterSchema, value, onChange, disabled)}
    </div>
  );
}
