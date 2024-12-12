import { BatchFileResponse, FileResponse } from '../generated_models';

const fileResponse: FileResponse = {
  output_type: 'file',
  file_type: 'img',
  path: 'C:/Users/LENOVO/UMass/IMG-Super-Resolution/input/baboon.png',
  title: 'sample3',
  subtitle: 'second sample image',
};

const batchFileResponse: BatchFileResponse = {
  output_type: 'batchfile',
  files: [
    {
      output_type: 'file',
      file_type: 'img',
      path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/david-villasana-Pf9KhOIylaM-unsplash.jpg',
      title: 'Car Outside a House',
      subtitle:
        '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/david-villasana-Pf9KhOIylaM-unsplash.jpg',
    },
    {
      output_type: 'file',
      file_type: 'img',
      path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/karsten-winegeart-dN8vU0QiuRQ-unsplash.jpg',
      title: 'Girl under Waterfall',
      subtitle:
        '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/karsten-winegeart-dN8vU0QiuRQ-unsplash.jpg',
    },
    {
      output_type: 'file',
      file_type: 'img',
      path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/karsten-winegeart-yOwrFVY6JBE-unsplash.jpg',
      title: 'Range Rover Defender',
      subtitle:
        '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/karsten-winegeart-yOwrFVY6JBE-unsplash.jpg',
    },
    {
      output_type: 'file',
      file_type: 'img',
      path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/victor-rosario-c5KYD-x0EYM-unsplash.jpg',
      title: 'Girl Kayaking in River',
      subtitle:
        '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/victor-rosario-c5KYD-x0EYM-unsplash.jpg',
    },
    {
      output_type: 'file',
      file_type: 'img',
      path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/wes-tindel-Bj1HXYdsD-A-unsplash.jpg',
      title: 'Ferrari in Garage',
      subtitle:
        '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/wes-tindel-Bj1HXYdsD-A-unsplash.jpg',
    },
    {
      output_type: 'file',
      file_type: 'img',
      path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/zhen-yao-hOF-J1kEqno-unsplash.jpg',
      title: 'Fenced House',
      subtitle:
        '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/images/zhen-yao-hOF-J1kEqno-unsplash.jpg',
    },
    {
      output_type: 'file',
      file_type: 'csv',
      path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/csv/image_results.csv',
      title: 'Captioning Results',
      subtitle: 'Captioning Results in CSV format',
    },
    {
      output_type: 'file',
      file_type: 'markdown',
      path: '/Users/atharvakale/workspace/programming/RescueBox-Desktop/data/outputs/files/markdown/image_results.md',
      title: 'Captioning Results',
      subtitle: 'Captioning Results in Markdown format',
    },
  ],
};

export { fileResponse, batchFileResponse };
