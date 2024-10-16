enum InputType {
  file = 'file',
  directory = 'directory',
  text = 'text',
}

type SingleInput = {
  key: string;
  label: string;
  subtitle?: string;
  type: InputType;
};

type float = number;

enum parameterValuesType {
  rangedFloat,
  float,
  TypeEnum,
  text,
}

type parameterValues =
  | { type: parameterValuesType.float }
  | {
      type: parameterValuesType.rangedFloat;
      range: { min: float; max: float };
      default: float;
    }
  | {
      type: parameterValuesType.TypeEnum;
      enum_vals: { label: string; key: string }[];
      default: string;
    }
  | { type: parameterValuesType.text };

type parameters = {
  key: string;
  label: string;
  subtitle?: string;
  value: parameterValues;
};
type Inputs = { inputs: SingleInput[]; parameters: parameters[] };

export type { SingleInput, Inputs, parameterValues, parameters };
