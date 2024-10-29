import { clsx, type ClassValue } from 'clsx';
import { RequestBody, TaskSchema } from 'src/shared/generated_models';
import { ModelServer } from 'src/shared/models';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createMLServerMap(servers: ModelServer[]) {
  const serverMap: Record<string, ModelServer> = {};
  servers.forEach((server) => {
    serverMap[server.modelUid] = server;
  });
  return serverMap;
}

export function buildRequestBody(
  taskSchema: TaskSchema,
  data: { [key: string]: any },
): RequestBody {
  const requestBody: RequestBody = {
    inputs: {},
    parameters: {},
  };
  taskSchema.inputs.forEach((input) => {
    switch (input.inputType) {
      case 'text':
      case 'textarea':
        requestBody.inputs[input.key] = { text: data[input.key] };
        break;
      case 'file':
      case 'directory':
        requestBody.inputs[input.key] = { path: data[input.key] };
        break;
      case 'batchtext':
        requestBody.inputs[input.key] = { texts: data[input.key] };
        break;
      case 'batchfile':
        requestBody.inputs[input.key] = { files: data[input.key] };
        break;
      case 'batchdirectory':
        requestBody.inputs[input.key] = { directories: data[input.key] };
        break;
      default:
        break;
    }
  });
  taskSchema.parameters.forEach((parameter) => {
    requestBody.inputs[parameter.key] = data[parameter.key];
  });
  return requestBody;
}
