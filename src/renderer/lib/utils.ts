import { clsx, type ClassValue } from 'clsx';
import {
  BatchDirectoryInput,
  BatchFileInput,
  BatchTextInput,
  DirectoryInput,
  FileInput,
  Input,
  InputType,
  NewFileInputType,
  RequestBody,
  TaskSchema,
  TextInput,
} from 'src/shared/generated_models';
import { ModelServer } from 'src/shared/models';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNewFileInputType = (t: any): t is NewFileInputType =>
  !!t.inputType;

export function createMLServerMap(servers: ModelServer[]) {
  const serverMap: Record<string, ModelServer> = {};
  servers.forEach((server) => {
    serverMap[server.modelUid] = server;
  });
  return serverMap;
}

export function buildRequestBody(
  taskSchema: TaskSchema,
  data: { [key: string]: string | string[] },
): RequestBody {
  const requestBody: RequestBody = {
    inputs: {},
    parameters: {},
  };
  taskSchema.inputs.forEach((input) => {
    const inputData = data[input.key];
    if (isNewFileInputType(input.inputType)) {
      switch (input.inputType.inputType) {
        case 'newfile':
          if (typeof inputData !== 'string') {
            throw new Error(
              `Invalid data type for newfile input: ${inputData}`,
            );
          }
          requestBody.inputs[input.key] = {
            path: inputData,
          } satisfies FileInput;
          break;
        default:
          break;
      }
    } else {
      switch (input.inputType) {
        case 'text':
        case 'textarea':
          if (typeof inputData !== 'string') {
            throw new Error(
              `Invalid data type for textarea input: ${inputData}`,
            );
          }
          requestBody.inputs[input.key] = { text: inputData };
          break;
        case 'file':
        case 'directory':
          if (typeof inputData !== 'string') {
            throw new Error(
              `Invalid data type for directory input: ${inputData}`,
            );
          }
          requestBody.inputs[input.key] = {
            path: inputData,
          } satisfies DirectoryInput;
          break;
        case 'batchtext':
          if (!Array.isArray(inputData)) {
            throw new Error(
              `Invalid data type for batchtext input: ${inputData}`,
            );
          }
          requestBody.inputs[input.key] = {
            texts: inputData.map((text) => ({ text }) satisfies TextInput),
          } satisfies BatchTextInput;
          break;
        case 'batchfile':
          if (!Array.isArray(inputData)) {
            throw new Error(
              `Invalid data type for batchfile input: ${inputData}`,
            );
          }
          requestBody.inputs[input.key] = {
            files: inputData.map(
              (file) => ({ path: file }) satisfies FileInput,
            ),
          } satisfies BatchFileInput;
          break;
        case 'batchdirectory':
          if (!Array.isArray(inputData)) {
            throw new Error(
              `Invalid data type for batchdirectory input: ${inputData}`,
            );
          }
          requestBody.inputs[input.key] = {
            directories: inputData.map(
              (dir) => ({ path: dir }) satisfies DirectoryInput,
            ),
          } satisfies BatchDirectoryInput;
          break;
        default:
          break;
      }
    }
  });
  taskSchema.parameters.forEach((parameter) => {
    requestBody.parameters[parameter.key] = data[parameter.key];
  });
  return requestBody;
}

export function extractValuesFromRequestBodyInput(
  inputType: InputType | NewFileInputType,
  reqInput: Input,
) {
  let value: string | string[];
  if (isNewFileInputType(inputType)) {
    switch (inputType.inputType) {
      case 'newfile':
        // @ts-ignore
        value = reqInput.path;
        break;
      default:
        value = 'invalid';
    }
    return value;
  }

  switch (inputType) {
    case 'file':
      // @ts-ignore
      value = reqInput.path;
      break;
    case 'directory':
      // @ts-ignore
      value = reqInput.path;
      break;
    case 'batchfile':
      // @ts-ignore
      value = (reqInput as BatchFileInput).files.map((file) => file.path);
      break;
    case 'batchdirectory':
      // @ts-ignore
      value = (reqInput as BatchDirectoryInput).directories.map(
        (dir) => dir.path,
      );
      break;
    case 'text':
      // @ts-ignore
      value = reqInput.text;
      break;
    case 'batchtext':
      // @ts-ignore
      value = (reqInput as BatchTextInput).texts.map((text) => text.text);
      break;
    case 'textarea':
      // @ts-ignore
      value = reqInput.text;
      break;
    default:
      value = 'invalid';
  }

  return value;
}

// export function extractValauesFromRequestBodyParameters(parameterType: ParameterType, reqParams: any): string | number {
//   let value: string | number;
//   switch(parameterType) {
//     case 'text':
//       value = reqParams[]
//   }
// }
