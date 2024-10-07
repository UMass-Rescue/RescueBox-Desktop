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
      name: 'Model Type',
      type: 'String',
      description: 'The type of model to use for object detection.',
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
  constraints: [],
  service: new ObjDetectionModelService(),
};

export default ObjectDetectionModel;
