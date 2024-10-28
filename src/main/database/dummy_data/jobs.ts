import { v4 as uuidv4 } from 'uuid';

const jobs: Object[] = [
  {
    uid: uuidv4(),
    modelUid: '6013c170572054321c36d3bc141ed7f7',
    startTime: new Date('2023-10-01T10:14:00Z'),
    endTime: new Date('2023-10-01T12:09:00Z'),
    status: 'Completed',
    statusText: null,
    request: {
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
    },
    response: {
      output_type: 'directory',
      path: 'C:\\Users\\LENOVO\\UMass\\IMG-Super-Resolution\\output',
      title: 'High Resolution Images',
    },
    taskUid: '0',
  },
  {
    uid: uuidv4(),
    modelUid: 'c7698391b3d6d45a8b0aa72813c4961f',
    startTime: new Date('2023-10-02T14:19:08Z'),
    endTime: new Date('2023-10-02T14:19:49Z'),
    status: 'Failed',
    statusText: '[{"message":"fetch failed"}]',
    request: {
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
      parameters: {
        block_size: 4096,
        target_probability: 0.99,
      },
    },
    taskUid: '0',
  },
  {
    uid: 'ddd43cfe-fa7e-4b80-a7c6-25ddd5e92dc7',
    modelUid: 'c7698391b3d6d45a8b0aa72813c4961f',
    startTime: new Date('2024-10-09T17:24:23.526Z'),
    endTime: new Date('2024-10-09T17:24:23.634Z'),
    status: 'Completed',
    statusText: null,
    request: {
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
    },
    response: {
      output_type: 'markdown',
      value: '## Results\n\nThe model has successfully completed the task.',
      title: 'Model Output',
    },
    taskUid: '0',
  },
  {
    uid: uuidv4(),
    modelUid: '6d3aa67081b54b272b0946dfad476c52',
    startTime: new Date('2023-10-06T09:03:45Z'),
    endTime: null,
    status: 'Running',
    request: {
      inputs: {
        input_path: {
          path: '/Users/path/to/file.png',
        },
        output_csv: {
          path: '/Users/path/to/file.csv',
        },
        output_img: {
          path: '/Users/path/to/file-out.png',
        },
      },
      parameters: {
        min_perc_prob: 30,
        model_type: 'yolov3',
      },
    },
    response: null,
    taskUid: '0',
  },
];

export default jobs;
