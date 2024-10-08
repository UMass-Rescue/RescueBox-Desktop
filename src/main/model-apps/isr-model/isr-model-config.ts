import { DataType, ModelAppConfig } from 'src/shared/models';
import ISRModelService from './isr-model-service';

const ISRModel: ModelAppConfig = {
  uid: 'isr-model',
  name: 'Image Super Resolution',
  version: '1.0.0',
  author: 'Shriram Giridhara',
  lastUpdated: new Date('2024-09-23T12:00:00Z'),
  description: 'This model upscales images to a higher resolution.',
  parameters: [
    {
      name: 'Scaling Factor',
      type: 'Number',
      description: 'The factor by which to upscale the image.',
    },
    {
      name: 'Model Weights',
      type: 'Weights',
      description: 'The weights of the model to be used for upscaling.',
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
      name: 'Image File Types',
      description: 'The input images must be in PNG, JPG, or JPEG format.',
    },
  ],
  service: new ISRModelService(),
};

export default ISRModel;
