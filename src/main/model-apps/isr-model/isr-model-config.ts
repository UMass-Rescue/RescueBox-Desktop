import { DataType, ModelAppConfig } from 'src/shared/models';
import ISRModelService from './isr-model-service';

const SuperResolutionModel: ModelAppConfig = {
  uid: 'isr-model',
  name: 'Image Super Resolution',
  version: '1.0.0',
  author: 'Shriram Giridhara',
  lastUpdated: new Date('2024-09-23T12:00:00Z'),
  description: 'This model upscales images to a higher resolution.',
  parameters: [
    {
      name: 'Scale',
      type: 'Number',
      description: 'The factor by which to upscale the image.',
    },
  ],
  inputTypes: [
    {
      type: DataType.Image,
      description: 'The images to be upscaled.',
    },
  ],
  outputTypes: [
    {
      type: DataType.Image,
      description: 'The upscaled images.',
    },
  ],
  constraints: [
    {
      name: 'Scale Range',
      description: 'The scale factor must be an integer between 1 and 4.',
    },
  ],
  service: new ISRModelService(),
};

export default SuperResolutionModel;
