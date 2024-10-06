import { ModelAppConfig } from 'src/shared/models';
import TenSecondModelService from './ten-second-model-service';

const TenSecondModel: ModelAppConfig = {
  uid: 'ten-second-model',
  name: 'Image Object Detection',
  version: '0.8.5',
  author: 'Dummy Author',
  lastUpdated: new Date('2023-11-15T14:30:00Z'),
  description: 'Dummy Description',
  parameters: [
    {
      name: 'Dummy Parameter',
      type: 'Dummy Type',
      description: 'Dummy Description',
    },
  ],
  inputTypes: [
    {
      type: 'Dummy Input Type',
      description: 'Dummy Description',
    },
  ],
  outputTypes: [
    {
      type: 'Dummy Output Type',
      description: 'Dummy Description',
    },
  ],
  constraints: [
    {
      name: 'Dummy Constraint',
      description: 'Dummy Description',
    },
  ],
  service: new TenSecondModelService(),
};

export default TenSecondModel;
