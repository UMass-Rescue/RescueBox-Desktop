import { DataType, ModelAppConfig } from 'src/shared/models';
import SBFModelService from './sbf-model-service';

const SmallBlockForensicsConfig: ModelAppConfig = {
  uid: 'sbf-model',
  name: 'Small Block Forensics',
  version: '0.1.0',
  author: 'Atharva Kale',
  lastUpdated: new Date('2024-10-09T15:30:00Z'),
  description: `In small block forensics (SBF), the goal is to determine the existence of any content from a dataset of known content in a target drive.

This model is an approximation of the SBF technique that takes two directories as input (target directory, known content directory), and uses the small block randomized technique to find the existence of some file from the known content directory within the target directory.`,
  parameters: [
    {
      name: 'Block Size',
      type: 'Number (in KiB)',
      description:
        'The size of the blocks to be hashed and compared between the known and target datasets.',
    },
    {
      name: 'Target Probability',
      type: 'Float (from 0 to 1)',
      description:
        'The probability to achieve of whether the target dataset contains any file from the known dataset.',
    },
  ],
  inputTypes: [
    {
      type: DataType.Directory,
      description: 'The known dataset directory.',
    },
    {
      type: DataType.Directory,
      description: 'The target dataset directory.',
    },
    {
      type: DataType.Path,
      description: 'The path to the SQLite file to store the hashes.',
    },
  ],
  outputTypes: [
    {
      type: DataType.Text,
      description:
        'An indication of whether the target dataset contains any file from the known dataset, and which file matched',
    },
  ],
  constraints: [
    {
      name: 'Target dataset must be a directory',
      description:
        'The target dataset must be a directory, and not a file or a symbolic link.',
    },
    {
      name: 'Known dataset must be a directory',
      description:
        'The known dataset must be a directory, and not a file or a symbolic link.',
    },
  ],
  service: new SBFModelService(),
};

export default SmallBlockForensicsConfig;
