import { Link, useParams } from 'react-router-dom';
import { Button } from './components/ui/button';
import { useModelAppConfig } from './lib/hooks';
import GreenRunIcon from './components/GreenRunIcon';
import getModelAppComponents from './model-apps/config';

function ModelDetails() {
  const { modelUid } = useParams();

  const {
    data: modelAppConfig,
    error: modelAppConfigError,
    isLoading: modelAppConfigIsLoading,
  } = useModelAppConfig(modelUid);

  if (modelAppConfigIsLoading) return <div>loading model..</div>;
  if (modelAppConfigError)
    return (
      <div>failed to load model. Error: {modelAppConfigError.toString()}</div>
    );
  if (!modelAppConfig) return <div>no model</div>;

  const ModelInfo = getModelAppComponents(modelAppConfig.uid).infoPage;
  if (!ModelInfo) return <div>no model info page</div>;

  return (
    <div className="flex flex-row justify-between m-3">
      <div className="w-2/3">
        <ModelInfo modelAppConfig={modelAppConfig} />
      </div>
      <div className="sticky top-16 drop-shadow-md m-4 py-4 px-6 rounded-md w-1/3 bg-sky-200 h-full">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Model Version
        </h1>
        <p className="m-2">{modelAppConfig.version}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Developed By
        </h1>
        <p className="m-2">{modelAppConfig.author}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Last Updated
        </h1>
        <p className="m-2">
          {modelAppConfig.lastUpdated.toLocaleString('en-US', {
            timeZone: 'EST',
          })}
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
