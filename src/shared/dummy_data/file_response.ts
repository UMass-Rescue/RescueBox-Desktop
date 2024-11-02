import {
  BatchDirectoryResponse,
  DirectoryResponse,
  FileResponse,
} from '../generated_models';

const markdownResponse: FileResponse = {
  output_type: 'file',
  path: 'C:\\Users\\LENOVO\\Downloads\\sample-markdown.txt',
  file_type: 'markdown',
  title: 'Sample Markdown',
  subtitle: 'Some info about sample markdown',
};

const audioResponse: FileResponse = {
  output_type: 'file',
  path: 'C:\\Users\\LENOVO\\Downloads\\file_example_MP3_700KB.mp3',
  file_type: 'audio',
  title: 'Sample Audio',
  subtitle: 'Some info about sample audio',
};

const videoResponse: FileResponse = {
  output_type: 'file',
  path: '/Users/atharvakale/Downloads/registration-flow.mov',
  file_type: 'video',
  title: 'Sample Video',
  subtitle: 'Some info about sample video',
};

const directoryResponse: DirectoryResponse = {
  output_type: 'directory',
  path: '/Users/atharvakale/Downloads',
  title: 'Sample Directory Outputs',
  // subtitle: 'Subtitle: Some info about sample directory',
};

const directoryResponse2: DirectoryResponse = {
  output_type: 'directory',
  path: '/Users/atharvakale/Downloads/rooting-5g',
  title: 'Sample Markdown',
  subtitle: 'Some info about sample markdown',
};

const batchDirectoryResponse: BatchDirectoryResponse = {
  directories: [directoryResponse, directoryResponse2],
  output_type: 'batchdirectory',
};

export {
  markdownResponse,
  audioResponse,
  videoResponse,
  directoryResponse,
  batchDirectoryResponse,
};
