import { warn } from 'electron-log/main';
import { ModelAppConfig } from 'src/shared/models';
import InferenceService from './inference-service';
import ISRModel from './isr-model/isr-model-config';
import TenSecondModel from './ten-second-model/ten-second-model-config';
import TenSecondModelService from './ten-second-model/ten-second-model-service';
import ObjectDetectionModel from './obj-detection-model/obj-detection-model-config';
import SmallBlockForensicsModel from './sbf-model/sbf-model-config';
import InferenceTask from './inference-task';

export const modelAppConfigs: ModelAppConfig[] = [
  ISRModel,
  SmallBlockForensicsModel,
  ObjectDetectionModel,
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

export function getInferenceTaskByModelUid(modelUid: string) {
  return new InferenceTask(getServiceByModelUid(modelUid));
}
