const jobs = [
  {
    uid: 'job1',
    modelUid: 'model1',
    startTime: new Date('2023-10-01T10:00:00Z'),
    endTime: new Date('2023-10-01T12:00:00Z'),
    status: 'Completed',
    inputs: [
      {
        path: '/input/path1',
        path_type: 'temp',
      },
    ],
    outputs: [
      {
        path: '/output/path1',
        path_type: 'temp',
      },
    ],
    parameters: [
      {
        param1: 'value1',
      },
      {
        param2: 'value2',
      },
    ],
    response: {
      message: 'Job completed successfully',
      code: 200,
    },
  },
  {
    uid: 'job2',
    modelUid: 'model2',
    startTime: new Date('2023-10-02T14:00:00Z'),
    endTime: new Date('2023-10-02T16:00:00Z'),
    status: 'Failed',
    inputs: [
      {
        path: '/input/path2',
        path_type: 'temp',
      },
    ],
    outputs: [
      {
        path: '/output/path2',
        path_type: 'temp',
      },
    ],
    parameters: [
      {
        param1: 'value3',
      },
      {
        param2: 'value4',
      },
    ],
    response: {
      message: 'Job failed due to an error',
      code: 500,
    },
  },
  {
    uid: 'job3',
    modelUid: 'model1',
    startTime: new Date('2023-10-03T09:00:00Z'),
    endTime: null,
    status: 'Running',
    inputs: [
      {
        path: '/input/path3',
        path_type: 'temp',
      },
    ],
    outputs: [
      {
        path: '/output/path3',
        path_type: 'temp',
      },
    ],
    parameters: [
      {
        param1: 'value5',
      },
      {
        param2: 'value6',
      },
    ],
    response: {},
  },
];

export default jobs;
