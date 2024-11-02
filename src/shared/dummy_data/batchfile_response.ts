import { BatchFileResponse } from '../generated_models';

const sampleBatchFileResponse: BatchFileResponse = {
  output_type: 'batchfile',
  files: [
    {
      output_type: 'file',
      file_type: 'img',
      path: 'some/path/ok.img',
      title: 'sample1',
      subtitle: 'first sample image',
    },
    {
      output_type: 'file',
      file_type: 'text',
      path: 'some/path/ok.txt',
      title: 'sample2',
      subtitle: 'first sample text',
    },
    {
      output_type: 'file',
      file_type: 'img',
      path: 'some/path/ok2.img',
      title: 'sample3',
      subtitle: 'second sample image',
    },
    {
      output_type: 'file',
      file_type: 'img',
      path: 'some/path/ok2.img',
      title: 'sample',
      subtitle: 'sample image',
    },
    {
      output_type: 'file',
      file_type: 'img',
      path: 'some/path/ok2.img',
      title: 'sample',
      subtitle: 'sample image',
    },
  ],
};

export default sampleBatchFileResponse;
