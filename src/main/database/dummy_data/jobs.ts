import { v4 as uuidv4 } from 'uuid';
import { Job } from 'src/shared/models';
import { textResponse } from 'src/shared/dummy_data/batchtext_response';
import { batchFileResponse } from 'src/shared/dummy_data/batchfile_response';
import {
  audioResponse,
  batchDirectoryResponse,
  csvResponse,
  imageResponse,
  jsonResponse,
  videoResponse,
} from 'src/shared/dummy_data/file_response';
import {
  audioTranscriptionOneTaskSchema,
  textToSpeechTaskSchema,
  imageClassificationOneTaskSchema,
  imageClassificationManyTaskSchema,
  imageCaptioningTaskSchema,
  styleTransferTaskSchema,
  textToVideoTaskSchema,
  imageObjectDetectionTaskSchema,
} from 'src/shared/dummy_data/task_schemas';
import {
  audioTranscriptionModelId,
  textToSpeechModelId,
  imageClassificationModelId,
  imageCaptioningModelId,
  styleTransferModelId,
  textToVideoModelId,
  imageObjectDetectionModelId,
} from './mlmodels';

const jobs: Job[] = [
  {
    uid: uuidv4(),
    modelUid: audioTranscriptionModelId,
    startTime: new Date('2024-10-01T10:14:00Z'),
    endTime: new Date('2024-10-01T12:09:00Z'),
    // @ts-ignore
    status: 'Completed',
    request: {
      inputs: {
        audio_file: {
          path: 'C:\\Users\\LENOVO\\data\\inputs\\audio\\sustainability-talk.mp3',
        },
      },
      parameters: {},
    },
    response: textResponse,
    taskUid: '0',
    taskSchema: audioTranscriptionOneTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: textToSpeechModelId,
    startTime: new Date('2024-10-01T12:09:00Z'),
    endTime: new Date('2024-10-01T12:09:49Z'),
    // @ts-ignore
    status: 'Completed',
    request: {
      inputs: {
        text: {
          text: "The story of Arthur the Rat. Once upon a time there was a young rat who couldn't make up his mind. Whenever the other rat said to him, if he would like to come out hunting with them, he would answer in a horse face. I don't know.",
        },
      },
      parameters: {
        voice: 'en-US-Wavenet-D',
        speed: 1.0,
      },
    },
    response: audioResponse,
    taskUid: '0',
    taskSchema: textToSpeechTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: imageClassificationModelId,
    startTime: new Date('2024-10-02T14:19:08Z'),
    endTime: new Date('2024-10-02T14:19:49Z'),
    // @ts-ignore
    status: 'Completed',
    request: {
      inputs: {
        image_file: {
          path: 'C:\\Users\\LENOVO\\data\\inputs\\images\\image1.jpg',
        },
      },
      parameters: {
        model: 'resnet',
      },
    },
    response: jsonResponse,
    taskUid: '0',
    taskSchema: imageClassificationOneTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: styleTransferModelId,
    startTime: new Date('2024-10-06T09:03:45Z'),
    endTime: new Date('2024-10-06T09:04:00Z'),
    // @ts-ignore
    status: 'Failed',
    statusText: '[{message: "Failed to fetch"}]',
    request: {
      inputs: {
        content_image: {
          path: 'C:\\Users\\LENOVO\\data\\inputs\\hoovertowernight.jpg',
        },
        style_image: {
          path: 'C:\\Users\\LENOVO\\data\\inputs\\starry_night.jpg',
        },
      },
      parameters: {
        model: 'vgg',
        style_weight: 0.5,
      },
    },
    taskUid: '0',
    taskSchema: styleTransferTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: imageClassificationModelId,
    startTime: new Date('2024-10-02T14:19:08Z'),
    endTime: new Date('2024-10-02T14:19:49Z'),
    // @ts-ignore
    status: 'Completed',
    request: {
      inputs: {
        image_files: {
          files: [
            {
              path: 'C:\\Users\\LENOVO\\data\\inputs\\images\\image1.jpg',
            },
            {
              path: 'C:\\Users\\LENOVO\\data\\inputs\\images\\image2.jpg',
            },
            {
              path: 'C:\\Users\\LENOVO\\data\\inputs\\images\\image3.jpg',
            },
          ],
        },
      },
      parameters: {
        model: 'resnet',
      },
    },
    response: csvResponse,
    taskUid: '1',
    taskSchema: imageClassificationManyTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: imageCaptioningModelId,
    startTime: new Date('2024-10-09T17:24:23.526Z'),
    endTime: new Date('2024-10-09T17:24:23.634Z'),
    // @ts-ignore
    status: 'Completed',
    request: {
      inputs: {
        image_directory: {
          path: 'C:\\Users\\LENOVO\\data\\inputs\\images\\',
        },
      },
      parameters: {
        model: 'vgg',
        max_length: 20,
      },
    },
    response: batchFileResponse,
    taskUid: '0',
    taskSchema: imageCaptioningTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: styleTransferModelId,
    startTime: new Date('2024-10-06T09:03:45Z'),
    endTime: new Date('2024-10-06T09:04:00Z'),
    // @ts-ignore
    status: 'Completed',
    request: {
      inputs: {
        content_image: {
          path: 'C:\\Users\\LENOVO\\data\\inputs\\hoovertowernight.jpg',
        },
        style_image: {
          path: 'C:\\Users\\LENOVO\\data\\inputs\\starry_night.jpg',
        },
      },
      parameters: {
        model: 'vgg',
        style_weight: 0.5,
      },
    },
    response: imageResponse,
    taskUid: '0',
    taskSchema: styleTransferTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: textToVideoModelId,
    startTime: new Date('2024-10-07T13:45:00Z'),
    endTime: new Date('2024-10-07T13:45:00Z'),
    // @ts-ignore
    status: 'Completed',
    request: {
      inputs: {
        prompt: {
          text: 'Cans being produced in a factory',
        },
      },
      parameters: {
        model: 'gpt',
        fps: 30,
      },
    },
    response: videoResponse,
    taskUid: '0',
    taskSchema: textToVideoTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: textToVideoModelId,
    startTime: new Date('2024-10-02T09:10:19Z'),
    endTime: new Date('2024-10-02T09:24:08Z'),
    // @ts-ignore
    status: 'Failed',
    statusText: '[{message: "Failed to fetch"}]',
    request: {
      inputs: {
        prompt: {
          text: 'A cat chasing a mouse',
        },
      },
      parameters: {
        model: 'gpt',
        fps: 30,
      },
    },
    taskUid: '0',
    taskSchema: textToVideoTaskSchema,
  },
  {
    uid: uuidv4(),
    modelUid: imageObjectDetectionModelId,
    startTime: new Date('2024-10-08T16:30:00Z'),
    endTime: new Date('2024-10-08T16:30:00Z'),
    // @ts-ignore
    status: 'Completed',
    request: {
      inputs: {
        input_path: {
          path: 'C:\\Users\\LENOVO\\data\\inputs\\images\\image1.jpg',
        },
        output_img: {
          path: 'C:\\Users\\LENOVO\\data\\outputs\\images\\image1.jpg',
        },
        output_csv: {
          path: 'C:\\Users\\LENOVO\\data\\outputs\\csv\\image1.csv',
        },
      },
      parameters: {
        min_perc_prob: 30,
        model_type: 'retina-net',
      },
    },
    response: batchDirectoryResponse,
    taskUid: '0',
    taskSchema: imageObjectDetectionTaskSchema,
  },
];

export default jobs;
