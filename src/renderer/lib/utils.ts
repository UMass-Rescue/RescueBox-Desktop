import { clsx, type ClassValue } from 'clsx';
import { MLModel, ModelServer } from 'src/shared/models';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createMLModelMap(models: MLModel[]) {
  const modelMap: Record<string, MLModel> = {};
  models.forEach((model) => {
    modelMap[model.uid] = model;
  });
  return modelMap;
}

export function createMLServerMap(servers: ModelServer[]) {
  const serverMap: Record<string, ModelServer> = {};
  servers.forEach((server) => {
    serverMap[server.modelUid] = server;
  });
  return serverMap;
}
