import { Link, useLocation } from 'react-router-dom';
import { info } from 'console';
import { Button } from './components/ui/button';
// import { Button } from './components/ui/button';

function ModelDetails() {
  const locationState = useLocation().state;
  const { modelUid } = locationState;

  // here for now to remove warning
  info(modelUid);
  // Fetch this data later
  const modelVersion = '1.0.0';
  const modelAuthor = 'John Doe';
  const modelLastUpdated = '2023-10-26T10:00:00Z';
  const modelName = 'Image Super Resolution';
  const modelDescription =
    'This model is used to upscale images to a higher resolution. It takes an input image and outputs a higher resolution image.';
  const modelInputType = 'An image, or a directory of images';
  const modelOutputType =
    'An upscaled image, or a directory of upscaled images';
  const modelParameters = [
    'Input size, default is 256x256',
    'upscale factor, default is 2',
  ];
  const modelConstraints = [
    "Only images with the '.jpg' or '.png' extension are supported",
    'The input image must be a square image',
    'The input images must be smaller than 1024x1024',
  ];

  return (
    <div className="flex flex-row justify-between m-3">
      <div className="w-2/3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
            {modelName}
          </h1>
          <p className="text-md lg:text-lg">{modelDescription}</p>
        </div>
        <div className="felx flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            {' '}
            Input Type
          </h1>
          <p className="text-md lg:text-lg">{modelInputType}</p>
        </div>
        <div className="felx flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            {' '}
            Output Type
          </h1>
          <p className="text-md lg:text-lg">{modelOutputType}</p>
        </div>
        <div className="felx flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            {' '}
            Parameters
          </h1>
          <ul className="flex flex-col gap-[0.1rem] list-disc ml-4">
            {modelParameters.map((parameter) => (
              <li className="text-md lg:text-lg">{parameter}</li>
            ))}
          </ul>
        </div>
        <div className="felx flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            {' '}
            Constraints
          </h1>
          <ul className="flex flex-col gap-[0.1rem] list-disc ml-4">
            {modelConstraints.map((constraint) => (
              <li className="text-md lg:text-lg">{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border border-green-700 m-4 py-4 px-6 rounded-xl w-1/3 bg-green-200 h-full">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Model Version
        </h1>
        <p className="m-2">{modelVersion}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Developed By
        </h1>
        <p className="m-2">{modelAuthor}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Last Updated
        </h1>
        <p className="m-2">{modelLastUpdated}</p>
        {/* <div className="h-1/3" /> */}
        <Button className="bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200  border border-sky-300 my-10 text-black w-full">
          <Link to="/models/outputs">Run</Link>
        </Button>
      </div>
    </div>
  );
}
export default ModelDetails;
