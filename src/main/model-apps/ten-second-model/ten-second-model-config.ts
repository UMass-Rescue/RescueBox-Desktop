import { DataType, ModelAppConfig } from 'src/shared/models';
import TenSecondModelService from './ten-second-model-service';

const TenSecondModel: ModelAppConfig = {
  uid: 'ten-second-model',
  name: 'Ten Second Model',
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
      type: DataType.Text,
      description: 'Dummy Description',
    },
  ],
  outputTypes: [
    {
      type: DataType.Audio,
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
