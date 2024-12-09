import { BatchTextResponse, TextResponse } from '../generated_models';

const textResponse: TextResponse = {
  output_type: 'text',
  value: `
Good morning, everyone. Today, I want to talk about the importance of sustainability in our everyday lives. As we continue to face challenges like climate change and resource depletion, it's more crucial than ever to adopt practices that reduce our environmental impact.

One simple step is to minimize waste. For example, carrying a reusable water bottle or grocery bag can significantly cut down on plastic usage. Similarly, opting for public transportation or carpooling can reduce carbon emissions.

Another aspect is energy conservation. Turning off lights when leaving a room, unplugging devices not in use, and switching to energy-efficient appliances can make a big difference over time.

Finally, let’s not forget the power of awareness. By educating ourselves and those around us, we can create a ripple effect that leads to widespread positive change. Together, these small actions can add up to a substantial impact on preserving our planet for future generations. Thank you.
`,
  title: 'Transcript for sustainability-talk.mp3',
};

const batchTextResponse: BatchTextResponse = {
  output_type: 'batchtext',
  texts: [
    {
      output_type: 'text',
      value: 'Dog',
      title: 'image-01.jpg',
      subtitle: 'Confidence: 0.99',
    },
    {
      output_type: 'text',
      value: 'Cat',
      title: 'image-02.jpg',
      subtitle: 'Confidence: 0.98',
    },
    {
      output_type: 'text',
      value: 'Bird',
      title: 'image-03.jpg',
      subtitle: 'Confidence: 0.97',
    },
    {
      output_type: 'text',
      value: 'Fish',
      title: 'image-04.jpg',
      subtitle: 'Confidence: 0.96',
    },
    {
      output_type: 'text',
      value: 'Elephant',
      title: 'image-05.jpg',
      subtitle: 'Confidence: 0.95',
    },
    {
      output_type: 'text',
      value: 'Lion',
      title: 'image-06.jpg',
      subtitle: 'Confidence: 0.94',
    },
    {
      output_type: 'text',
      value: 'Tiger',
      title: 'image-07.jpg',
      subtitle: 'Confidence: 0.93',
    },
    {
      output_type: 'text',
      value: 'Bear',
      title: 'image-08.jpg',
      subtitle: 'Confidence: 0.92',
    },
    {
      output_type: 'text',
      value: 'Panda',
      title: 'image-09.jpg',
      subtitle: 'Confidence: 0.91',
    },
  ],
};

export { textResponse, batchTextResponse };
