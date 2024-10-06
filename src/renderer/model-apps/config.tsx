import { ModelAppConfig } from 'src/shared/models';
import React from 'react';
import TemplateInfo from './template/TemplateInfo';
import TemplateRun from './template/TemplateRun';
import TemplateOutputs from './template/TemplateOutputs';

export type ModelAppComponents = {
  modelPage: React.FC<{ modelAppConfig: ModelAppConfig }>;
  infoPage: React.FC<{ modelAppConfig: ModelAppConfig }>;
  outputsPage: React.FC<{ modelAppConfig: ModelAppConfig }>;
};

export const componentMap = {
  'isr-model': {
    runPage: TemplateRun, // Replace with ISRModelRun
    infoPage: TemplateInfo, // Replace with ISRModelInfo
    outputsPage: TemplateOutputs, // Replace with ISRModelOutputs
  },
  'sbf-model': {
    runPage: TemplateRun, // Replace with SBFModelRun
    infoPage: TemplateInfo, // Replace with SBFModelInfo
    outputsPage: TemplateOutputs, // Replace with SBFModelOutputs
  },
  'obj-detection-model': {
    runPage: TemplateRun, // Replace with ObjDetectionModelRun
    infoPage: TemplateInfo, // Replace with ObjDetectionModelInfo
    outputsPage: TemplateOutputs, // Replace with ObjDetectionModelOutputs
  },
} as unknown as Record<string, ModelAppComponents>;
