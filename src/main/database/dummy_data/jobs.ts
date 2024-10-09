// import JobDb from 'src/main/models/job';
import { v4 as uuidv4 } from 'uuid';

const jobs: Object[] = [
  {
    uid: uuidv4(),
    modelUid: 'isr-model',
    startTime: new Date('2023-10-01T10:14:00Z'),
    endTime: new Date('2023-10-01T12:09:00Z'),
    status: 'Completed',
    inputs: [
      {
        path: '/Users/atharvakale/Downloads/known_dataset_images',
        path_key: 'Low Res Images',
      },
    ],
    outputs: [
      {
        path: '/Users/atharvakale/Downloads/known_dataset_images',
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
    modelUid: 'deepfake-detection-model',
    startTime: new Date('2023-10-02T14:19:01Z'),
    endTime: new Date('2023-10-02T14:27:12Z'),
    status: 'Canceled',
    inputs: [
      {
        path: 'F:/USB/fake_images/data',
        path_key: 'Images to be analyzed',
      },
    ],
    outputs: [
      {
        path: 'F:/USB/results/deepfake_images',
        path_key: 'Contraband Images flagged as a deepfake',
      },
      {
        path: 'F:/USB/results/contraband_images',
        path_key: 'Contraband Images flagged as real',
      },
      {
        path: 'F:/USB/results/safe_images',
        path_key: 'Images flagged as safe',
      },
    ],
    parameters: [],
    response: {
      message: 'Job Canceled.',
      code: 500,
    },
  },
  {
    uid: uuidv4(),
    modelUid: 'face-matching-model',
    startTime: new Date('2023-10-02T14:20:01Z'),
    endTime: new Date('2023-10-02T14:26:12Z'),
    status: 'Completed',
    inputs: [
      {
        path: 'F:/USB/images_db/',
        path_key: 'Large dataset of images of faces',
      },
      {
        path: 'F:/USB/target/candidates',
        path_key: 'Candidate faces to match',
      },
    ],
    outputs: [
      {
        path: 'F:/USB/results/matched_faces.csv',
        path_key: 'Results of face matching',
      },
    ],
    parameters: [],
    response: {
      message: 'Job Completed.',
      code: 200,
    },
  },
  {
    uid: 'ddd43cfe-fa7e-4b80-a7c6-25ddd5e92dc7',
    modelUid: 'sbf-model',
    startTime: new Date('2024-10-09T17:24:23.526Z'),
    endTime: new Date('2024-10-09T17:24:23.634Z'),
    status: 'Completed',
    statusText: null,
    inputs: JSON.parse(
      '[{"path":"/Users/atharvakale/Downloads/known_dataset_images_input2","path_key":"Known Dataset"},{"path":"/Users/atharvakale/Downloads/known_dataset_images_output","path_key":"Target Dataset"}]',
    ),
    outputs: JSON.parse(
      '[{"path":"/Users/atharvakale/Downloads/sqlite-hashes-2024-10-09T17:24:19.935Z.db","path_key":"SQL Database"}]',
    ),
    parameters: '[{"blockSizeInKiB":16},{"targetProbability":90}]',
    response: JSON.parse(
      '{"status":"SUCCESS","results":[{"result":{"found":true,"target_file":"/Users/atharvakale/Downloads/known_dataset_images_output/cat11287.jpg","known_dataset_file":"/Users/atharvakale/Downloads/known_dataset_images_input2/cat11287.jpg","block_num_in_known_dataset":0,"block_num_in_target":0},"text":"RESULTS"},{"result":"/Users/atharvakale/Downloads/sqlite-hashes-2024-10-09T17:24:19.935Z.db","text":"Successfully stored hashes"}]}',
    ),
  },
  {
    uid: '44a7462b-bd4b-42f6-9a00-3666468d6531',
    modelUid: 'sbf-model',
    startTime: new Date('2024-10-09T18:44:46.673Z'),
    endTime: new Date('2024-10-09T18:44:46.717Z'),
    status: 'Completed',
    statusText: null,
    inputs: JSON.parse(
      '[{"path":"/Users/atharvakale/Downloads/sample_in","path_key":"Known Dataset"},{"path":"/Users/atharvakale/Downloads/sample_out","path_key":"Target Dataset"}]',
    ),
    outputs: JSON.parse(
      '[{"path":"/Users/atharvakale/Downloads/sqlite-hashes-2024-10-09T18:44:42.717Z.db","path_key":"SQL Database"}]',
    ),
    parameters: JSON.parse('[{"blockSizeInKiB":16},{"targetProbability":90}]'),
    response: JSON.parse(
      '{"status":"SUCCESS","results":[{"result":{"found":false},"text":"RESULTS"},{"result":"/Users/atharvakale/Downloads/sqlite-hashes-2024-10-09T18:44:42.717Z.db","text":"Successfully stored hashes"}]}',
    ),
  },
  {
    uid: uuidv4(),
    modelUid: 'sbf-model',
    startTime: new Date('2024-10-10T18:44:46.673Z'),
    endTime: new Date('2024-10-10T18:44:46.717Z'),
    status: 'Failed',
    statusText: '[{"message":"fetch failed"}]',
    inputs: JSON.parse(
      '[{"path":"/Users/atharvakale/Downloads/sample_in","path_key":"Known Dataset"},{"path":"/Users/atharvakale/Downloads/sample_out","path_key":"Target Dataset"}]',
    ),
    outputs: JSON.parse(
      '[{"path":"/Users/atharvakale/Downloads/sqlite-hashes-2024-10-09T18:44:42.717Z.db","path_key":"SQL Database"}]',
    ),
    parameters: JSON.parse('[{"blockSizeInKiB":16},{"targetProbability":90}]'),
    response: null,
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
  //   outputs: [
  //     {
  //       path: 'C:/Users/Default/Pictures/Input',
  //       path_key: 'Images with Bounding Boxes',
  //     },
  //   ],
  //   parameters: [
  //     {
  //       confidenceThreshold: '0.5',
  //     },
  //   ],
  //   response: {},
  // },
];

export default jobs;
