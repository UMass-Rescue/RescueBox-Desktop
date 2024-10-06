import { DataType, ModelAppConfig } from 'src/shared/models';
import ObjDetectionModelService from './obj-detection-model-service';

const ObjectDetectionModel: ModelAppConfig = {
  uid: 'obj-detection-model',
  name: 'Image Object Detection',
  version: '1.0.0',
  author: 'Shreyan Mallik',
  lastUpdated: new Date('2024-09-23T09:45:00Z'),
  description: 'This model identifies and classifies objects in an image.',
  parameters: [
    {
      name: 'Confidence Threshold',
      type: 'Number',
      description:
        'The minimum confidence score required for an object to be detected (between 0 and 1).',
    },
  ],
  inputTypes: [
    {
      type: DataType.Image,
      description: 'The images to be analyzed.',
    },
  ],
  outputTypes: [
    {
      type: DataType.Image,
      description: 'The images with objects detected and classified.',
    },
  ],
  constraints: [
    {
      name: 'Confidence Threshold Range',
      description: 'The confidence threshold must be between 0 and 1.',
    },
  ],
  service: new ObjDetectionModelService(),
};

export default ObjectDetectionModel;
