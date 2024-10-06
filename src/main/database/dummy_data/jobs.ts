import { v4 as uuidv4 } from 'uuid';

const jobs = [
  {
    uid: uuidv4(),
    modelUid: 'isr-model',
    startTime: new Date('2023-10-01T10:14:00Z'),
    endTime: new Date('2023-10-01T12:09:00Z'),
    status: 'Completed',
    inputs: [
      {
        path: 'C:/Users/LENOVO/Pictures/Input',
        path_key: 'Low Res Images',
      },
    ],
    outputs: [
      {
        path: 'C:/Users/LENOVO/Pictures/Output',
        path_key: 'High Res Images',
      },
    ],
    parameters: [
      {
        scale: 4,
      },
    ],
    response: {
      message: 'Job completed successfully.',
      code: 200,
    },
  },
  {
    uid: uuidv4(),
    modelUid: 'sbf-model',
    startTime: new Date('2023-10-02T14:19:08Z'),
    endTime: new Date('2023-10-02T14:19:49Z'),
    status: 'Failed',
    inputs: [
      {
        path: 'F:/USB/Forensic/Input',
        path_key: 'Known Dataset',
      },
      {
        path: 'F:/USB/Forensic/Target',
        path_key: 'Target Dataset',
      },
    ],
    outputs: [
      {
        path: 'F:/USB/Forensic/Output',
        path_key: 'Results',
      },
    ],
    parameters: [
      {
        blockSize: '4096',
      },
      {
        targetProbability: '0.99',
      },
    ],
    response: {
      message: 'Job failed due to an error: Path not found.',
      code: 500,
    },
  },
  {
    uid: uuidv4(),
    modelUid: 'sbf-model',
    startTime: new Date('2023-10-02T14:19:01Z'),
    endTime: new Date('2023-10-02T14:27:12Z'),
    status: 'Running',
    inputs: [
      {
        path: 'F:/USB/Forensic/Data',
        path_key: 'Known Dataset',
      },
      {
        path: 'F:/USB/Forensic/Target',
        path_key: 'Target Dataset',
      },
    ],
    outputs: [
      {
        path: 'F:/USB/Forensic/Output',
        path_key: 'Results',
      },
    ],
    parameters: [
      {
        blockSize: '4096',
        targetProbability: '0.99',
      },
    ],
    response: {
      message: 'Job completed successfully.',
      code: 500,
    },
  },
  {
    uid: uuidv4(),
    modelUid: 'obj-detection-model',
    startTime: new Date('2023-10-06T09:03:45Z'),
    endTime: null,
    status: 'Running',
    inputs: [
      {
        path: 'C:/Users/Default/Pictures/Input',
        path_key: 'Images to Analyze',
      },
    ],
    outputs: [
      {
        path: 'C:/Users/Default/Pictures/Input',
        path_key: 'Images with Bounding Boxes',
      },
    ],
    parameters: [
      {
        confidenceThreshold: '0.5',
      },
    ],
    response: {},
  },
];

export default jobs;
