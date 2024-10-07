import { ModelAppConfig } from 'src/shared/models';
import React from 'react';
import log from 'electron-log/renderer';
import TemplateInfo from './template/TemplateInfo';
import TemplateRun from './template/TemplateRun';
import TemplateJobOutputs from './template/TemplateJobOutputs';
import ObjDetectionModelRun from './obj-detection-model/ObjDetectionModelRun';
import ObjDetectionModelInfo from './obj-detection-model/ObjDetectionModelInfo';
import ObjDetectionModelOutputs from './obj-detection-model/ObjDetectionModelJobOutputs';

type ModelAppComponents = {
  runPage: React.FC<{ modelAppConfig: ModelAppConfig }>;
  infoPage: React.FC<{ modelAppConfig: ModelAppConfig }>;
  jobOutputsPage: React.FC<{ modelAppConfig: ModelAppConfig; jobId: string }>;
};

const componentMap: Record<string, ModelAppComponents> = {
  'isr-model': {
    runPage: TemplateRun, // Replace with ISRModelRun
    infoPage: TemplateInfo, // Replace with ISRModelInfo
    jobOutputsPage: TemplateJobOutputs, // Replace with ISRModelJobOutputs
  },
  'sbf-model': {
    runPage: TemplateRun, // Replace with SBFModelRun
    infoPage: TemplateInfo, // Replace with SBFModelInfo
    jobOutputsPage: TemplateJobOutputs, // Replace with SBFModelJobOutputs
  },
  'obj-detection-model': {
    runPage: ObjDetectionModelRun,
    infoPage: ObjDetectionModelInfo,
    jobOutputsPage: ObjDetectionModelOutputs, // Replace with ObjDetectionModelJobOutputs
  },
  'ten-second-model': {
    runPage: TemplateRun,
    infoPage: TemplateInfo,
    jobOutputsPage: TemplateJobOutputs,
  },
};

const getModelAppComponents = (modelUid: string): ModelAppComponents => {
  if (!componentMap[modelUid]) {
    log.warn(`No component map for model with uid ${modelUid}`);
    log.warn(`Returning a dummy component map for model with uid ${modelUid}`);
    return componentMap['ten-second-model'];
  }

  return componentMap[modelUid];
};

export default getModelAppComponents;
