import InferenceService from './inference-service';
import SuperResInferenceService from './super-res/super-res-inference-service';

export type ModelAppConfig = {
  uid: string;
  name: string;
  version: string;
  author: string;
  lastUpdated: Date;
  service: InferenceService;
};

export const SuperResolutionImageModel: ModelAppConfig = {
  uid: 'model-super-res',
  name: 'Image Super Resolution',
  version: '1.0.0',
  author: 'John Doe',
  lastUpdated: new Date('2023-10-26T10:00:00Z'),
  service: (() => new SuperResInferenceService())(),
};

export const modelAppConfigs: ModelAppConfig[] = [SuperResolutionImageModel];

export function getServiceByModelUid(modelUid: string): InferenceService {
  const modelAppConfig = modelAppConfigs.find(
    (config) => config.uid === modelUid,
  );
  if (!modelAppConfig) {
    throw new Error(`Model with uid ${modelUid} not found.`);
  }
  return modelAppConfig.service;
}
