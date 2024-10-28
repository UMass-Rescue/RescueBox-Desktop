import { v4 as uuidv4 } from 'uuid';

const jobs: Object[] = [
  {
    uid: uuidv4(),
    modelUid: 'isr-model',
    startTime: new Date('2023-10-01T10:14:00Z'),
    endTime: new Date('2023-10-01T12:09:00Z'),
    status: 'Completed',
    statusText: null,
    inputs: {
      LOW_RES_IMAGES: {
        path: 'C:\\Users\\LENOVO\\UMass\\IMG-Super-Resolution\\input',
      },
      HIGH_RES_IMAGES: {
        path: 'C:\\Users\\LENOVO\\UMass\\IMG-Super-Resolution\\output',
      },
    },
    parameters: {
      weights: 'gans',
      scale: 4.0,
    },
    response: {
      output_type: 'directory',
      path: 'C:\\Users\\LENOVO\\UMass\\IMG-Super-Resolution\\output',
      title: 'High Resolution Images',
    },
    taskUid: 'isr-task',
  },
  {
    uid: uuidv4(),
    modelUid: 'sbf-model',
    startTime: new Date('2023-10-02T14:19:08Z'),
    endTime: new Date('2023-10-02T14:19:49Z'),
    status: 'Failed',
    statusText: '[{"message":"fetch failed"}]',
    inputs: {
      KNOWN_DATASET: {
        path: 'F:/USB/Forensic/Input',
      },
      OUTPUT_SQL_PATH: {
        path: 'F:/USB/Forensic/Output.sqlite',
      },
      TARGET_FOLDER: {
        path: 'F:/USB/Forensic/Target',
      },
    },
    taskUid: 'sbf-task',
  },
  {
    uid: uuidv4(),
    modelUid: 'deepfake-detection-model',
    startTime: new Date('2023-10-02T14:19:01Z'),
    endTime: new Date('2023-10-02T14:27:12Z'),
    status: 'Canceled',
    statusText: 'Job was canceled by the user',
    inputs: {
      DATASET: {
        path: 'F:/USB/fake_images/data',
      },
      OUTPUT_CSV_NAME: {
        text: 'results.csv',
      },
    },
    parameters: {},
    response: null,
    taskUid: 'deepfake-detection-task',
  },
  {
    uid: uuidv4(),
    modelUid: 'face-matching-model',
    startTime: new Date('2023-10-02T14:20:01Z'),
    endTime: new Date('2023-10-02T14:26:12Z'),
    status: 'Completed',
    statusText: null,
    inputs: {
      FACES_TO_MATCH: {
        files: [
          { path: 'F:/USB/faces/face1.jpg' },
          { path: 'F:/USB/faces/face2.jpg' },
          { path: 'F:/USB/faces/face3.jpg' },
        ],
      },
    },
    parameters: {
      db_name: 'faces_db',
      top_k_matches: '5',
    },
    response: {
      output_type: 'file',
      file_type: 'csv',
      path: 'F:/USB/faces/top_5_matches.csv',
      title: 'Matched Faces',
    },
    taskUid: 'face-matching-task',
  },
  {
    uid: 'ddd43cfe-fa7e-4b80-a7c6-25ddd5e92dc7',
    modelUid: 'sbf-model',
    startTime: new Date('2024-10-09T17:24:23.526Z'),
    endTime: new Date('2024-10-09T17:24:23.634Z'),
    status: 'Completed',
    statusText: null,
    inputs: {
      KNOWN_DATASET: {
        path: '/Users/atharvakale/Downloads/known_dataset_images_input2',
      },
      TARGET_DATASET: {
        path: '/Users/atharvakale/Downloads/known_dataset_images_output',
      },
      SQL_DATABASE: {
        path: '/Users/atharvakale/Downloads/sqlite-hashes-2024-10-09T17:24:19.935Z.db',
      },
    },
    parameters: {
      block_size: 16,
      target_probability: 0.9,
    },
    response: {
      output_type: 'markdown',
      value: '## Results\n\nThe model has successfully completed the task.',
      title: 'Model Output',
    },
    taskUid: 'sbf-task',
  },
  // {
  //   uid: uuidv4(),
  //   modelUid: 'obj-detection-model',
  //   startTime: new Date('2023-10-06T09:03:45Z'),
  //   endTime: null,
  //   status: 'Running',
  //   inputs: [
  //     {
  //       path: 'C:/Users/Default/Pictures/Input',
  //       path_key: 'Images to Analyze',
  //     },
  //   ],
  //   parameters: [
  //     {
  //       confidenceThreshold: '0.5',
  //     },
  //   ],
  //   response: [
  //     {
  //       path: 'C:/Users/Default/Pictures/Input',
  //       path_key: 'Images with Bounding Boxes',
  //     },
  //   ],
  // },
];

export default jobs;
