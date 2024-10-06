import { DataType, ModelAppConfig } from 'src/shared/models';
import SBFModelService from './sbf-model-service';

const SmallBlockForensicsModel: ModelAppConfig = {
  uid: 'sbf-model',
  name: 'Small Block Forensics',
  version: '1.0.0',
  author: 'Atharva Kale',
  lastUpdated: new Date('2024-09-23T15:30:00Z'),
  description:
    'This model determines the existence of any subset of some small dataset in a large target dataset.',
  parameters: [
    {
      name: 'Block Size',
      type: 'Number',
      description:
        'The size of the blocks to be hashed and compared between the small and large datasets.',
    },
  ],
  inputTypes: [
    {
      type: DataType.Image,
      description: 'The small dataset to be searched for in the large dataset.',
    },
  ],
  outputTypes: [
    {
      type: DataType.Text,
      description:
        'True or False for each element in the small dataset, indicating whether it exists in the large dataset.',
    },
  ],
  constraints: [
    {
      name: 'Block Size Range',
      description:
        'The block size must be positive and less than the size of the small dataset.',
    },
    {
      name: 'Target Probability',
      description: 'This value should be between 0 and 1 (inclusive).',
    },
  ],
  service: new SBFModelService(),
};

export default SmallBlockForensicsModel;
