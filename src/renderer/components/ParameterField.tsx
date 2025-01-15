import { ParameterSchema } from 'src/shared/generated_models';
import { match, NonExhaustiveError } from 'ts-pattern';
import log from 'electron-log/renderer';
import { ReactNode } from 'react';
import TextField from './parameter_fields/TextField';
import IntField from './parameter_fields/IntField';
import FloatField from './parameter_fields/FloatField';
import EnumField from './parameter_fields/EnumField';
import RangedIntField from './parameter_fields/RangedIntField';
import RangedFloatField from './parameter_fields/RangedFloatField';

function LabelAndSubtitle({
  children,
  label,
  subtitle,
}: {
  children: ReactNode;
  label: string;
  subtitle: string | null;
}) {
  return (
    <div>
      <h2 className="font-semibold text-sm xl:text-base mb-2">{label}</h2>
      {subtitle && <p className="text-xs mt-1">{subtitle}</p>}
      {children}
    </div>
  );
}

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
          <LabelAndSubtitle
            label={parameterSchema.label}
            subtitle={parameterSchema.subtitle}
          >
            <TextField
              parameterSchema={parameterSchema}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          </LabelAndSubtitle>
        );
      })
      .with({ parameterType: 'int' }, () => {
        return (
          <LabelAndSubtitle
            label={parameterSchema.label}
            subtitle={parameterSchema.subtitle}
          >
            <IntField
              parameterSchema={parameterSchema}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          </LabelAndSubtitle>
        );
      })
      .with({ parameterType: 'float' }, () => {
        return (
          <LabelAndSubtitle
            label={parameterSchema.label}
            subtitle={parameterSchema.subtitle}
          >
            <FloatField
              parameterSchema={parameterSchema}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          </LabelAndSubtitle>
        );
      })
      .with({ parameterType: 'enum' }, () => {
        return (
          <LabelAndSubtitle
            label={parameterSchema.label}
            subtitle={parameterSchema.subtitle}
          >
            <EnumField
              parameterSchema={parameterSchema}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          </LabelAndSubtitle>
        );
      })
      .with({ parameterType: 'ranged_int' }, () => {
        return (
          <LabelAndSubtitle
            label={parameterSchema.label}
            subtitle={parameterSchema.subtitle}
          >
            <RangedIntField
              parameterSchema={parameterSchema}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          </LabelAndSubtitle>
        );
      })
      .with({ parameterType: 'ranged_float' }, () => {
        return (
          <LabelAndSubtitle
            label={parameterSchema.label}
            subtitle={parameterSchema.subtitle}
          >
            <RangedFloatField
              parameterSchema={parameterSchema}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          </LabelAndSubtitle>
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
  return getFieldByParameterSchema(parameterSchema, value, onChange, disabled);
}
