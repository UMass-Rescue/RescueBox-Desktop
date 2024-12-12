import {
  BatchDirectoryResponse,
  DirectoryResponse,
  FileResponse,
} from '../generated_models';

const textResponse: FileResponse = {
  output_type: 'file',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/texts/response_9edi21.txt',
  file_type: 'text',
  title: 'Inference Results',
};

const markdownResponse: FileResponse = {
  output_type: 'file',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/markdown/results.md',
  file_type: 'markdown',
  title: 'Predictions',
};

const imageResponse: FileResponse = {
  output_type: 'file',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/inputs/starry_stanford_bigger.jpg',
  file_type: 'img',
  title: 'Stanford + Starry Night',
};

const jsonResponse: FileResponse = {
  output_type: 'file',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/json/results.json',
  file_type: 'json',
  title: 'Classification Results',
};

const csvResponse: FileResponse = {
  output_type: 'file',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/csv/results.csv',
  file_type: 'csv',
  title: 'Vehicle Classification Results',
};

const audioResponse: FileResponse = {
  output_type: 'file',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/audio/Arthur.mp3',
  file_type: 'audio',
  title: 'Text to Speech -- Arthur.mp3',
};

const videoResponse: FileResponse = {
  output_type: 'file',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/video/5532774-uhd_4096_2160_25fps.mp4',
  file_type: 'video',
  title: 'AI Generated Video',
};

const directoryResponse: DirectoryResponse = {
  output_type: 'directory',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/directories/results_labels',
  title: 'Labels for Detection Results',
};

const directoryResponse2: DirectoryResponse = {
  output_type: 'directory',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/directories/results_images',
  title: 'Images with Bounding Boxes',
};

const directoryResponse3: DirectoryResponse = {
  output_type: 'directory',
  path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/directories/results_original',
  title: 'Original Images',
};

const batchDirectoryResponse: BatchDirectoryResponse = {
  directories: [directoryResponse, directoryResponse2, directoryResponse3],
  output_type: 'batchdirectory',
};

export {
  textResponse,
  directoryResponse,
  batchDirectoryResponse,
  markdownResponse,
  imageResponse,
  jsonResponse,
  csvResponse,
  audioResponse,
  videoResponse,
};
