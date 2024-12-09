import {
  audioTranscriptionModelId,
  imageClassificationModelId,
  imageCaptioningModelId,
  styleTransferModelId,
  textToVideoModelId,
  imageObjectDetectionModelId,
  textToSpeechModelId,
} from './mlmodels';

const servers = [
  {
    modelUid: audioTranscriptionModelId,
    serverAddress: '127.0.0.1',
    serverPort: 5007,
    isUserConnected: true,
  },
  {
    modelUid: textToSpeechModelId,
    serverAddress: '127.0.0.1',
    serverPort: 5001,
    isUserConnected: true,
  },
  {
    modelUid: imageClassificationModelId,
    serverAddress: '127.0.0.1',
    serverPort: 5002,
    isUserConnected: true,
  },
  {
    modelUid: imageCaptioningModelId,
    serverAddress: '127.0.0.1',
    serverPort: 5003,
    isUserConnected: true,
  },
  {
    modelUid: styleTransferModelId,
    serverAddress: '127.0.0.1',
    serverPort: 5004,
    isUserConnected: true,
  },
  {
    modelUid: textToVideoModelId,
    serverAddress: '127.0.0.1',
    serverPort: 5005,
    isUserConnected: true,
  },
  {
    modelUid: imageObjectDetectionModelId,
    serverAddress: '127.0.0.1',
    serverPort: 5006,
    isUserConnected: true,
  },
];

export default servers;
