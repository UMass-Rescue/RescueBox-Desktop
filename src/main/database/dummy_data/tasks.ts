import { SchemaAPIRoute } from 'src/shared/generated_models';
import {
  audioTranscriptionModelId,
  imageClassificationModelId,
  imageObjectDetectionModelId,
  styleTransferModelId,
  textToVideoModelId,
  imageCaptioningModelId,
  textToSpeechModelId,
} from './mlmodels';

const dummyTaskData: {
  uid: string;
  modelUid: string;
  schemaApiRoute: SchemaAPIRoute;
}[] = [
  {
    uid: '0',
    modelUid: audioTranscriptionModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/transcribe_single/payload_schema',
      run_task: '/transcribe_single',
      sample_payload: '/transcribe_single/sample_payload',
      short_title: 'Transcribe One Audio File',
      task_schema: '/transcribe_single/task_schema',
    },
  },
  {
    uid: '0',
    modelUid: textToSpeechModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/synthesize/payload_schema',
      run_task: '/synthesize',
      sample_payload: '/synthesize/sample_payload',
      short_title: 'Synthesize Text',
      task_schema: '/synthesize/task_schema',
    },
  },
  {
    uid: '1',
    modelUid: audioTranscriptionModelId,
    schemaApiRoute: {
      order: 1,
      payload_schema: '/transcribe_batch/payload_schema',
      run_task: '/transcribe_batch',
      sample_payload: '/transcribe_batch/sample_payload',
      short_title: 'Transcribe Multiple Audio Files',
      task_schema: '/transcribe_batch/task_schema',
    },
  },
  {
    uid: '0',
    modelUid: imageClassificationModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/classify_single/payload_schema',
      run_task: '/classify_single',
      sample_payload: '/classify_single/sample_payload',
      short_title: 'Classify a Single Image',
      task_schema: '/classify_single/task_schema',
    },
  },
  {
    uid: '1',
    modelUid: imageClassificationModelId,
    schemaApiRoute: {
      order: 1,
      payload_schema: '/classify_batch/payload_schema',
      run_task: '/classify_batch',
      sample_payload: '/classify_batch/sample_payload',
      short_title: 'Classify Multiple Images',
      task_schema: '/classify_batch/task_schema',
    },
  },
  {
    uid: '0',
    modelUid: imageCaptioningModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/caption_images/payload_schema',
      run_task: '/caption_images',
      sample_payload: '/caption_images/sample_payload',
      short_title: 'Caption a Directory of Images',
      task_schema: '/caption_images/task_schema',
    },
  },
  {
    uid: '0',
    modelUid: styleTransferModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/transfer/payload_schema',
      run_task: '/transfer',
      sample_payload: '/transfer/sample_payload',
      short_title: 'Transfer Style',
      task_schema: '/transfer/task_schema',
    },
  },
  {
    uid: '0',
    modelUid: textToVideoModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/text_to_video/payload_schema',
      run_task: '/text_to_video',
      sample_payload: '/text_to_video/sample_payload',
      short_title: 'Text to Video',
      task_schema: '/text_to_video/task_schema',
    },
  },
  {
    uid: '0',
    modelUid: imageObjectDetectionModelId,
    schemaApiRoute: {
      order: 0,
      payload_schema: '/detect_objects/payload_schema',
      run_task: '/detect_objects',
      sample_payload: '/detect_objects/sample_payload',
      short_title: 'Detect Objects',
      task_schema: '/detect_objects/task_schema',
    },
  },
];

export default dummyTaskData;
