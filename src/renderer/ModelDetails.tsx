import { Link, useParams } from 'react-router-dom';
import { Button } from './components/ui/button';
import { useMLModel } from './lib/hooks';
import GreenRunIcon from './components/GreenRunIcon';

function ModelDetails() {
  const { modelUid } = useParams();

  const modelParameters = [
    'Input size, default is 256x256',
    'upscale factor, default is 2',
  ];
  const modelConstraints = [
    "Only images with the '.jpg' or '.png' extension are supported",
    'The input image must be a square image',
    'The input images must be smaller than 1024x1024',
  ];

  const { data: model, isLoading, error } = useMLModel(modelUid);
  if (isLoading) return <div>loading model..</div>;
  if (error) return <div>failed to load model. Error: {error.toString()}</div>;
  if (!model) return <div>no model</div>;

  return (
    <div className="flex flex-row justify-between m-3">
      <div className="w-2/3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
            {model.name}
          </h1>
          <p className="text-md lg:text-lg">{model.name} DESCRIPTION</p>
        </div>
        <div className="felx flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            {' '}
            Input Type
          </h1>
          <p className="text-md lg:text-lg">INPUTS</p>
        </div>
        <div className="felx flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            {' '}
            Output Type
          </h1>
          <p className="text-md lg:text-lg">OUTPUTS</p>
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
            Constraints
          </h1>
          <ul className="flex flex-col gap-[0.1rem] list-disc ml-4">
            {modelConstraints.map((constraint) => (
              <li className="text-md lg:text-lg">{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sticky top-16 drop-shadow-md m-4 py-4 px-6 rounded-md w-1/3 bg-sky-200 h-full">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Model Version
        </h1>
        <p className="m-2">{model.version}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Developed By
        </h1>
        <p className="m-2">{model.author}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Last Updated
        </h1>
        <p className="m-2">{model.lastUpdated.toUTCString()}</p>
        <div className="mt-10">
          <Link to="/models/outputs">
            <Button className="w-full flex flex-row gap-2 hover:-translate-y-0.5 transition-all py-2 px-6 rounded-lg bg-green-600 hover:bg-green-500">
              Run
              <GreenRunIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ModelDetails;
