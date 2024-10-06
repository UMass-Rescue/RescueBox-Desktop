import { ModelAppConfig } from 'src/shared/models';
import ISRModelService from './isr-model-service';

const SuperResolutionModel: ModelAppConfig = {
  uid: 'isr-model',
  name: 'Image Super Resolution',
  version: '1.0.0',
  author: 'John Doe',
  lastUpdated: new Date('2023-10-01T12:00:00Z'),
  description: 'This model upscales images to a higher resolution.',
  parameters: [
    {
      name: 'Scale',
      type: 'Number',
      description:
        'The factor by which to upscale the image (between 1 and 4).',
    },
  ],
  inputTypes: [
    {
      type: 'Image(s)',
      description: 'The images to be upscaled.',
    },
  ],
  outputTypes: [
    {
      type: 'Image(s)',
      description: 'The upscaled images.',
    },
  ],
  constraints: [
    {
      name: 'Minimum Scale',
      description: 'The minimum scale factor is 1.',
    },
    {
      name: 'Maximum Scale',
      description: 'The maximum scale factor is 4.',
    },
  ],
  service: new ISRModelService(),
};

export default SuperResolutionModel;
