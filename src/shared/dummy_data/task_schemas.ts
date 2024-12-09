import {
  audioTranscriptionModelId,
  imageCaptioningModelId,
  imageClassificationModelId,
  imageObjectDetectionModelId,
  styleTransferModelId,
  textToSpeechModelId,
  textToVideoModelId,
} from 'src/main/database/dummy_data/mlmodels';
import { TaskSchema } from '../generated_models';
// import taskSchema1 from './task_schema1';
// import taskSchema2 from './task_schema2';
// import taskSchema3 from './task_schema3';
// import taskSchema4 from './task_schema4';

// const taskSchemas: TaskSchema[] = [
//   taskSchema1,
//   taskSchema2,
//   taskSchema3,
//   taskSchema4,
// ] satisfies TaskSchema[];

export const audioTranscriptionOneTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'file',
      key: 'audio_file',
      label: 'Audio File',
      subtitle: 'The audio file to be transcribed',
    },
  ],
  parameters: [],
};

export const audioTranscriptionManyTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'batchfile',
      key: 'audio_files',
      label: 'Audio Files',
      subtitle: 'The audio files to be transcribed',
    },
  ],
  parameters: [],
};

export const textToSpeechTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'text',
      key: 'text',
      label: 'Text',
      subtitle: 'The text to be synthesized',
    },
  ],
  parameters: [
    {
      key: 'voice',
      label: 'Voice',
      subtitle: 'The voice to be used for speech generation',
      value: {
        default: 'en-US-Wavenet-D',
        enumVals: [
          {
            key: 'en-US-Wavenet-D',
            label: 'English US Wavenet D',
          },
          {
            key: 'es-ES-Wavenet-A',
            label: 'Spanish ES Wavenet A',
          },
          {
            key: 'fr-FR-Wavenet-A',
            label: 'French FR Wavenet A',
          },
          {
            key: 'it-IT-Wavenet-A',
            label: 'Italian IT Wavenet A',
          },
          {
            key: 'ja-JP-Wavenet-A',
            label: 'Japanese JP Wavenet A',
          },
          {
            key: 'ja-JP-Wavenet-B',
            label: 'Japanese JP Wavenet B',
          },
        ],
        parameterType: 'enum',
      },
    },
    {
      key: 'speed',
      label: 'Speed',
      subtitle: 'The speed of the generated speech',
      value: {
        default: 1.0,
        parameterType: 'ranged_float',
        range: {
          max: 2.0,
          min: 0.5,
        },
      },
    },
  ],
};

export const imageClassificationOneTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'file',
      key: 'image_file',
      label: 'Image File',
      subtitle: 'The image file to be classified',
    },
  ],
  parameters: [
    {
      key: 'model',
      label: 'Model',
      subtitle: 'The model to be used for classification',
      value: {
        default: 'resnet',
        enumVals: [
          {
            key: 'resnet',
            label: 'ResNet',
          },
          {
            key: 'vgg',
            label: 'VGG',
          },
        ],
        parameterType: 'enum',
      },
    },
  ],
};

export const imageClassificationManyTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'batchfile',
      key: 'image_files',
      label: 'Image Files',
      subtitle: 'The image files to be classified',
    },
  ],
  parameters: [
    {
      key: 'model',
      label: 'Model',
      subtitle: 'The model to be used for classification',
      value: {
        default: 'resnet',
        enumVals: [
          {
            key: 'resnet',
            label: 'ResNet',
          },
          {
            key: 'vgg',
            label: 'VGG',
          },
        ],
        parameterType: 'enum',
      },
    },
  ],
};

export const imageCaptioningTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'directory',
      key: 'image_directory',
      label: 'Image Directory',
      subtitle: 'The directory containing images to be captioned',
    },
  ],
  parameters: [
    {
      key: 'model',
      label: 'Model',
      subtitle: 'The model to be used for captioning',
      value: {
        default: 'resnet',
        enumVals: [
          {
            key: 'resnet',
            label: 'ResNet',
          },
          {
            key: 'vgg',
            label: 'VGG',
          },
        ],
        parameterType: 'enum',
      },
    },
    {
      key: 'max_length',
      label: 'Max Caption Length',
      subtitle: 'The maximum length of the caption',
      value: {
        default: 20,
        parameterType: 'ranged_int',
        range: {
          max: 50,
          min: 5,
        },
      },
    },
  ],
};

export const styleTransferTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'file',
      key: 'content_image',
      label: 'Content Image',
      subtitle: 'The image to be stylized',
    },
    {
      inputType: 'file',
      key: 'style_image',
      label: 'Style Image',
      subtitle: 'The image to be used for stylization',
    },
  ],
  parameters: [
    {
      key: 'model',
      label: 'Model',
      subtitle: 'The model to be used for style transfer',
      value: {
        default: 'vgg',
        enumVals: [
          {
            key: 'vgg',
            label: 'VGG',
          },
          {
            key: 'resnet',
            label: 'ResNet',
          },
        ],
        parameterType: 'enum',
      },
    },
    {
      key: 'style_weight',
      label: 'Style Weight',
      subtitle: 'The weight of the style loss',
      value: {
        default: 0.5,
        parameterType: 'ranged_float',
        range: {
          max: 1.0,
          min: 0.0,
        },
      },
    },
  ],
};

export const textToVideoTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'text',
      key: 'prompt',
      label: 'Text to Generate Video From',
      subtitle: 'The text to be converted to a video',
    },
  ],
  parameters: [
    {
      key: 'model',
      label: 'Model',
      subtitle: 'The model to be used for video generation',
      value: {
        default: 'gpt',
        enumVals: [
          {
            key: 'gpt',
            label: 'GPT',
          },
          {
            key: 'transformer',
            label: 'Transformer',
          },
        ],
        parameterType: 'enum',
      },
    },
    {
      key: 'fps',
      label: 'Frames Per Second',
      subtitle: 'The number of frames per second in the video',
      value: {
        default: 30,
        parameterType: 'ranged_int',
        range: {
          max: 60,
          min: 1,
        },
      },
    },
  ],
};

export const imageObjectDetectionTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'directory',
      key: 'input_path',
      label: 'Path to Directory of Images',
      subtitle: 'Directory containing images to be analyzed',
    },
  ],
  parameters: [
    {
      key: 'min_perc_prob',
      label: 'Minimum Percentage Probability',
      subtitle: '',
      value: {
        default: 30,
        parameterType: 'ranged_int',
        range: {
          max: 100,
          min: 0,
        },
      },
    },
    {
      key: 'model_type',
      label: 'Model Type',
      subtitle: '',
      value: {
        default: 'retina-net',
        enumVals: [
          {
            key: 'yolov3',
            label: 'Yolov3',
          },
          {
            key: 'tiny-yolov3',
            label: 'Tiny Yolov3',
          },
          {
            key: 'retina-net',
            label: 'Retina Net',
          },
        ],
        parameterType: 'enum',
      },
    },
  ],
};

const taskSchemas = [
  {
    modelUid: audioTranscriptionModelId,
    taskSchemas: [
      audioTranscriptionOneTaskSchema,
      audioTranscriptionManyTaskSchema,
    ],
  },
  {
    modelUid: textToSpeechModelId,
    taskSchemas: [textToSpeechTaskSchema],
  },
  {
    modelUid: imageClassificationModelId,
    taskSchemas: [
      imageClassificationOneTaskSchema,
      imageClassificationManyTaskSchema,
    ],
  },
  {
    modelUid: imageCaptioningModelId,
    taskSchemas: [imageCaptioningTaskSchema],
  },
  { modelUid: styleTransferModelId, taskSchemas: [styleTransferTaskSchema] },
  { modelUid: textToVideoModelId, taskSchemas: [textToVideoTaskSchema] },
  {
    modelUid: imageObjectDetectionModelId,
    taskSchemas: [imageObjectDetectionTaskSchema],
  },
];
export default taskSchemas;
