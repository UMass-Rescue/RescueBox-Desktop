import { clsx, type ClassValue } from 'clsx';
import { InputSchema } from 'src/shared/generated_models';
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

export function getInputKey(inputSchema: InputSchema): string {
  switch (inputSchema.inputType) {
    case 'text':
    case 'textarea':
      return `${inputSchema.key}.text`;
    case 'file':
    case 'directory':
      return `${inputSchema.key}.path`;
    case 'batchtext':
      return `${inputSchema.key}.texts`;
    case 'batchfile':
      return `${inputSchema.key}.files`;
    case 'batchdirectory':
      return `${inputSchema.key}.directories`;
    default:
      return 'invalid';
  }
}
