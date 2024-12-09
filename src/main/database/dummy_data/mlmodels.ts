import { createModelId } from 'src/main/models/ml-model';
import { APIRoutes, AppMetadata } from 'src/shared/generated_models';

export const textToSpeechRoutes: APIRoutes = [
  {
    order: 0,
    payload_schema: '/synthesize/payload_schema',
    run_task: '/synthesize',
    sample_payload: '/synthesize/sample_payload',
    short_title: 'Synthesize Text',
    task_schema: '/synthesize/task_schema',
  },
];

export const textToSpeechAppMetadata: AppMetadata = {
  name: 'Text to Speech',
  info: `
# Text to Speech
This model converts text to speech.

## Input Type
- **Text:** The text to be converted to speech.

## Output Type
- **Audio:** The generated speech.

## Parameters
- **Voice:** The voice to be used for speech generation.
- **Speed:** The speed of the generated speech.

## Constraints
- **Languages Supported:** English, Spanish, French, German, Italian, Japanese
`,
  author: 'John Doe',
  version: '1.0.0',
};

export const audioTranscriptionRoutes: APIRoutes = [
  {
    order: 0,
    payload_schema: '/transcribe_single/payload_schema',
    run_task: '/transcribe_single',
    sample_payload: '/transcribe_single/sample_payload',
    short_title: 'Transcribe One Audio File',
    task_schema: '/transcribe_single/task_schema',
  },
  {
    order: 1,
    payload_schema: '/transcribe_batch/payload_schema',
    run_task: '/transcribe_batch',
    sample_payload: '/transcribe_batch/sample_payload',
    short_title: 'Transcribe Multiple Audio Files',
    task_schema: '/transcribe_batch/task_schema',
  },
];

export const audioTranscriptionAppMetadata: AppMetadata = {
  name: 'Audio Transcription',
  info: `
# Audio Transcription
This model transcribes audio files to text.

## Input Type
- **Audio File(s):** One or more audio files to be transcribed.

## Constraints
- **Audio File Type:** MP3, WAV, FLAC
- **Languages Supported:** English, Spanish, French, German, Italian, Japanese
`,
  author: 'Jane Appleseed',
  version: '1.0.0',
};

export const imageClassificationRoutes: APIRoutes = [
  {
    order: 0,
    payload_schema: '/classify_single/payload_schema',
    run_task: '/classify_single',
    sample_payload: '/classify_single/sample_payload',
    short_title: 'Classify a Single Image',
    task_schema: '/classify_single/task_schema',
  },
  {
    order: 1,
    payload_schema: '/classify_batch/payload_schema',
    run_task: '/classify_batch',
    sample_payload: '/classify_batch/sample_payload',
    short_title: 'Classify Multiple Images',
    task_schema: '/classify_batch/task_schema',
  },
];

export const imageClassificationAppMetadata: AppMetadata = {
  name: 'Image Classification',
  info: `
# Image Classification
This model classifies images into predefined categories.

## Input Type
- **Image(s):** One or more images to be classified.

## Output Type
- **Text:** The predicted class label for the image.

## Parameters
- **Model:** The model to be used for classification.

## Constraints
- **Maximum Image Size:** 10 MB
- **Image Format:** JPEG, PNG, JPG
`,
  author: 'John Doe',
  version: '1.0.0',
};

export const imageCaptioningRoutes: APIRoutes = [
  {
    order: 0,
    payload_schema: '/caption_images/payload_schema',
    run_task: '/caption_images',
    sample_payload: '/caption_images/sample_payload',
    short_title: 'Caption a Directory of Images',
    task_schema: '/caption_images/task_schema',
  },
];

export const imageCaptioningAppMetadata: AppMetadata = {
  name: 'Image Captioning',
  info: `
# Image Captioning
This model generates a textual description of an image.

## Input Type
- **Image(s):** One or more images to be captioned.

## Output Type
- **Text:** The generated caption for the image.

## Parameters
- **Model:** The model to be used for captioning.
- **Max Caption Length:** The maximum length of the caption.

## Constraints
- **Maximum Image Size:** 10 MB
- **Image Format:** JPEG, PNG, JPG
`,
  author: 'Alice Smith',
  version: '1.0.0',
};

export const styleTransferRoutes: APIRoutes = [
  {
    order: 0,
    payload_schema: '/transfer/payload_schema',
    run_task: '/transfer',
    sample_payload: '/transfer/sample_payload',
    short_title: 'Transfer Style',
    task_schema: '/transfer/task_schema',
  },
];

export const styleTransferAppMetadata: AppMetadata = {
  name: 'Style Transfer',
  info: `
# Style Transfer
This model applies the style of one image to another image.

## Input Type
- **Content Image:** The image to be stylized.
- **Style Image:** The image whose style will be applied to the content image.

## Output Type
- **Image:** The stylized image.

## Parameters
- **Model:** The model to be used for style transfer.

## Constraints
- **Maximum Image Size:** 10 MB
- **Image Format:** JPEG, PNG, JPG
`,
  author: 'Bob Johnson',
  version: '1.0.0',
};

export const textToVideoRoutes: APIRoutes = [
  {
    order: 0,
    payload_schema: '/text_to_video/payload_schema',
    run_task: '/text_to_video',
    sample_payload: '/text_to_video/sample_payload',
    short_title: 'Text to Video',
    task_schema: '/text_to_video/task_schema',
  },
];

export const textToVideoAppMetadata: AppMetadata = {
  name: 'Text to Video',
  info: `
# Text to Video
This model generates a video from a given text.

## Input Type
- **Text:** The text to be converted to a video.

## Output Type
- **Video:** The generated video.

## Parameters
- **Model:** The model to be used for video generation.
- **Frame Rate:** The number of frames per second in the video.

## Constraints
- **Maximum Text Length:** 1000 characters
- **Frame Rate Range:** 1-60 fps
`,
  author: 'Charlie Brown',
  version: '1.0.0',
};

export const imageObjectDetectionRoutes: APIRoutes = [
  {
    order: 0,
    payload_schema: '/detect_objects/payload_schema',
    run_task: '/detect_objects',
    sample_payload: '/detect_objects/sample_payload',
    short_title: 'Detect Objects',
    task_schema: '/detect_objects/task_schema',
  },
];

export const imageObjectDetectionAppMetadata: AppMetadata = {
  name: 'Image Object Detection',
  info: `
# Image Object Detection
This model identifies and classifies objects in an image.

## Input Type
- **Image:** The image to be analyzed.

## Output Type
- **Image:** The analyzed image with bounding boxes around detected objects.
- **CSV:** A CSV file containing the bounding boxes, labels, probabilities of detected objects.

## Parameters
- **Model Type:** The type of model to use for object detection.
- **Threshold:** The minimum probability required for an object to be detected.

## Constraints
- **Dictionary size:** Detects 80 common objects.
`,
  author: 'David Pauling',
  version: '1.0.0',
};

export const dummyModels: { appMetadata: AppMetadata; routes: APIRoutes }[] = [
  {
    appMetadata: audioTranscriptionAppMetadata,
    routes: audioTranscriptionRoutes,
  },
  { appMetadata: textToSpeechAppMetadata, routes: textToSpeechRoutes },
  {
    appMetadata: imageClassificationAppMetadata,
    routes: imageClassificationRoutes,
  },
  { appMetadata: imageCaptioningAppMetadata, routes: imageCaptioningRoutes },
  { appMetadata: styleTransferAppMetadata, routes: styleTransferRoutes },
  { appMetadata: textToVideoAppMetadata, routes: textToVideoRoutes },
  {
    appMetadata: imageObjectDetectionAppMetadata,
    routes: imageObjectDetectionRoutes,
  },
];

export const audioTranscriptionModelId = createModelId(
  audioTranscriptionAppMetadata,
  audioTranscriptionRoutes,
);
export const textToSpeechModelId = createModelId(
  textToSpeechAppMetadata,
  textToSpeechRoutes,
);
export const imageClassificationModelId = createModelId(
  imageClassificationAppMetadata,
  imageClassificationRoutes,
);
export const imageCaptioningModelId = createModelId(
  imageCaptioningAppMetadata,
  imageCaptioningRoutes,
);
export const styleTransferModelId = createModelId(
  styleTransferAppMetadata,
  styleTransferRoutes,
);
export const textToVideoModelId = createModelId(
  textToVideoAppMetadata,
  textToVideoRoutes,
);
export const imageObjectDetectionModelId = createModelId(
  imageObjectDetectionAppMetadata,
  imageObjectDetectionRoutes,
);
