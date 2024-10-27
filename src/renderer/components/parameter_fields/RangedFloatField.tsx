import {
  ParameterSchema,
  RangedFloatParameterDescriptor,
} from 'src/shared/generated_models';
import Slider from '../ui/slider';

export default function RangedFloatField({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parameterSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange,
}: {
  parameterSchema: ParameterSchema;
  value: number;
  onChange: (value: number) => void;
}) {
  const descriptor = parameterSchema.value as RangedFloatParameterDescriptor;
  return (
    <div>
      <h2 className="font-semibold text-lg">{parameterSchema.label}</h2>
      <div className="grid grid-cols-5 items-center mt-2">
        <Slider
          onValueChange={(vals) => onChange(vals[0])}
          min={descriptor.range.min}
          max={descriptor.range.max}
          step={0.01}
          defaultValue={[descriptor.default]}
          className="col-span-4"
        />
        <span className="col-span-1 ml-5 text-lg text-center bg-gray-200 rounded-full px-2 py-1">
          {(value && value.toFixed(2)) || descriptor.default.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
