import { warn } from 'electron-log';
import InferenceService from './inference-service';
import ModelAppConfig from './model-app-config';
import SuperResolutionModel from './isr-model/isr-model-config';
import TenSecondModel from './ten-second-model/ten-second-model-config';
import TenSecondModelService from './ten-second-model/ten-second-model-service';

export const modelAppConfigs: ModelAppConfig[] = [
  SuperResolutionModel,
  TenSecondModel,
];

export function getServiceByModelUid(modelUid: string): InferenceService {
  const modelAppConfig = modelAppConfigs.find(
    (config) => config.uid === modelUid,
  );
  if (!modelAppConfig) {
    warn(`Model with uid ${modelUid} not found in config.ts`);
    warn(
      `Returning a dummy service for model with uid ${modelUid}. This is not recommended.`,
    );
    return new TenSecondModelService();
  }
  return modelAppConfig.service;
}
