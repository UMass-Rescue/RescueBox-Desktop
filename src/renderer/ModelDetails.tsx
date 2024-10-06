import { Link, useParams } from 'react-router-dom';
import { Button } from './components/ui/button';
import { useMLModel, useModelInfo } from './lib/hooks';
import GreenRunIcon from './components/GreenRunIcon';

function ModelDetails() {
  const { modelUid } = useParams();

  const {
    data: model,
    isLoading: modelIsLoading,
    error: errorModel,
  } = useMLModel(modelUid);

  const {
    modelInfo,
    isLoading: modelInfoIsLoading,
    error: errorModelInfo,
  } = useModelInfo(modelUid);

  if (modelIsLoading) return <div>loading model..</div>;
  if (errorModel)
    return <div>failed to load model. Error: {errorModel.toString()}</div>;
  if (!model) return <div>no model</div>;

  if (modelInfoIsLoading) return <div>loading model info..</div>;
  if (errorModelInfo)
    return (
      <div>failed to load model info. Error: {errorModelInfo.toString()}</div>
    );
  if (!modelInfo) return <div>no model info</div>;

  return (
    <div className="flex flex-row justify-between m-3">
      <div className="w-2/3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
            {model.name}
          </h1>
          <p className="text-md lg:text-lg">{modelInfo.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            Input Type
          </h1>
          <ul className="text-md lg:text-lg list-disc ml-4">
            {modelInfo.inputTypes.map(
              (inputType: { type: string; description: string }) => {
                return (
                  <li key={inputType.type}>
                    <strong>{inputType.type}:</strong> {inputType.description}
                  </li>
                );
              },
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            Output Type
          </h1>
          <ul className="text-md lg:text-lg list-disc ml-4">
            {modelInfo.outputTypes.map(
              (outputType: { type: string; description: string }) => {
                return (
                  <li key={outputType.type}>
                    <strong>{outputType.type}:</strong> {outputType.description}
                  </li>
                );
              },
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            Parameters
          </h1>
          <ul className="text-md lg:text-lg list-disc ml-4">
            {modelInfo.parameters.map(
              (param: { name: string; type: string; description: string }) => {
                return (
                  <li key={param.type}>
                    <strong>{param.name}:</strong> {param.description}
                  </li>
                );
              },
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            Constraints
          </h1>
          <ul className="text-md lg:text-lg list-disc ml-4">
            {modelInfo.constraints.map(
              (constraint: { name: string; description: string }) => {
                return (
                  <li key={constraint.name}>
                    <strong>{constraint.name}:</strong> {constraint.description}
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </div>
      <div className="sticky top-16 drop-shadow-md m-4 py-4 px-6 rounded-md w-1/3 bg-sky-200 h-full">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Model Version
        </h1>
        <p className="m-2">{modelInfo.version}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Developed By
        </h1>
        <p className="m-2">{modelInfo.author}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Last Updated
        </h1>
        <p className="m-2">
          {modelInfo.lastUpdated.toLocaleString('en-US', { timeZone: 'EST' })}
        </p>
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
