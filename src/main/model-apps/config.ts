import InferenceService from './inference-service';
import SuperResInferenceService from './super-res/super-res-inference-service';
import TenSecondModelService from './ten-second-model/ten-second-model-service';

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
  service: new SuperResInferenceService(),
};

export const TenSecondModel: ModelAppConfig = {
  uid: 'dummy-1',
  name: 'Ten Second Model',
  version: '0.8.5',
  author: 'Jane Smith',
  lastUpdated: new Date('2023-11-15T14:30:00Z'),
  service: new TenSecondModelService(), // Replace with your actual service
};

export const TenSecondModel2: ModelAppConfig = {
  uid: 'dummy-2',
  name: 'Ten Second Model',
  version: '0.8.5',
  author: 'Jane Smith',
  lastUpdated: new Date('2023-11-15T14:30:00Z'),
  service: new TenSecondModelService(), // Replace with your actual service
};

export const TenSecondModel3: ModelAppConfig = {
  uid: 'dummy-3',
  name: 'Ten Second Model',
  version: '0.8.5',
  author: 'Jane Smith',
  lastUpdated: new Date('2023-11-15T14:30:00Z'),
  service: new TenSecondModelService(), // Replace with your actual service
};

export const modelAppConfigs: ModelAppConfig[] = [
  SuperResolutionImageModel,
  TenSecondModel,
  TenSecondModel2,
  TenSecondModel3,
];

export function getServiceByModelUid(modelUid: string): InferenceService {
  const modelAppConfig = modelAppConfigs.find(
    (config) => config.uid === modelUid,
  );
  if (!modelAppConfig) {
    throw new Error(`Model with uid ${modelUid} not found.`);
  }
  return modelAppConfig.service;
}
