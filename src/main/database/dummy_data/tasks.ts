import { SchemaAPIRoute, TaskSchema } from 'src/shared/generated_models';
import { imgObjModelId, isrModelId, sbfModelId } from './mlmodels';

const isrTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'batchfile',
      key: 'input_images',
      label: 'Input Images',
      subtitle: 'Images to be upscaled',
    },
    {
      inputType: 'directory',
      key: 'output_directory',
      label: 'Output Directory',
      subtitle: 'Directory to save the upscaled images',
    },
  ],
  parameters: [
    {
      key: 'weights',
      label: 'Model Weights',
      subtitle: '',
      value: {
        default: 'gans',
        enumVals: [
          {
            key: 'gans',
            label: 'GANS',
          },
          {
            key: 'psnr-large',
            label: 'PSNR Large',
          },
          {
            key: 'psnr-small',
            label: 'PSNR Small',
          },
          {
            key: 'noise-cancel',
            label: 'Noise Cancel',
          },
        ],
        parameterType: 'enum',
      },
    },
    {
      key: 'scale',
      label: 'Scale Factor',
      subtitle: '',
      value: {
        default: 4.0,
        parameterType: 'ranged_float',
        range: {
          max: 4.0,
          min: 1.0,
        },
      },
    },
  ],
};

const sbfTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'directory',
      key: 'target_directory',
      label: 'Target Directory',
      subtitle:
        'The directory containing files/folders of the content to analyze',
    },
    {
      inputType: 'directory',
      key: 'known_content_directory',
      label: 'Known Content Directory',
      subtitle: 'The directory containing the files/folders of known content',
    },
    {
      inputType: 'file',
      key: 'output_sql_path',
      label: 'Output SQL Path',
      subtitle: 'The path to save the SQLite table for known_content',
    },
  ],
  parameters: [
    {
      key: 'block_size',
      label: 'Block Size',
      subtitle: 'The block size in bytes to be used. Defaults to 4096.',
      value: {
        default: 4096,
        parameterType: 'ranged_int',
        range: {
          max: 1024,
          min: 1,
        },
      },
    },
    {
      key: 'target_probability',
      label: 'Target Probability',
      subtitle:
        'The target probability to achieve. Higher means more of the target drive will be scanned. Defaults to 0.95',
      value: {
        default: 0.95,
        parameterType: 'ranged_float',
        range: {
          max: 1.0,
          min: 0.0,
        },
      },
    },
  ],
};

const imgObjDetectTaskSchema: TaskSchema = {
  inputs: [
    {
      inputType: 'file',
      key: 'input_path',
      label: 'Input Image',
      subtitle: '',
    },
    {
      inputType: 'file',
      key: 'output_img',
      label: 'Output Image',
      subtitle: '',
    },
    {
      inputType: 'file',
      key: 'output_csv',
      label: 'Output CSV',
      subtitle: '',
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

const dummyTaskData: {
  uid: string;
  modelUid: string;
  schemaApiRoute: SchemaAPIRoute;
  taskSchema: TaskSchema;
}[] = [
  {
    uid: '0',
    modelUid: isrModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/gen_hash_random/payload_schema',
      run_task: '/gen_hash_random',
      sample_payload: '/gen_hash_random/sample_payload',
      short_title: 'Hash random blocks of a target directory',
      task_schema: '/gen_hash_random/task_schema',
    },
    taskSchema: isrTaskSchema,
  },
  {
    uid: '0',
    modelUid: sbfModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/gen_hash_random/payload_schema',
      run_task: '/gen_hash_random',
      sample_payload: '/gen_hash_random/sample_payload',
      short_title: 'Hash random blocks of a target directory',
      task_schema: '/gen_hash_random/task_schema',
    },
    taskSchema: sbfTaskSchema,
  },
  {
    uid: '0',
    modelUid: imgObjModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/detect/payload_schema',
      run_task: '/detect',
      sample_payload: '/detect/sample_payload',
      short_title: 'Detect Objects',
      task_schema: '/detect/task_schema',
    },
    taskSchema: imgObjDetectTaskSchema,
  },
];

export default dummyTaskData;
