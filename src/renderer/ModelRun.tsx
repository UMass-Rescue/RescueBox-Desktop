import { useParams } from 'react-router-dom';
import getModelAppComponents from './model-apps/config';
import { useModelAppConfig } from './lib/hooks';
import LoadingScreen from './components/LoadingScreen';

function ModelRun() {
  const { modelUid } = useParams();

  const {
    data: modelAppConfig,
    error: modelAppConfigError,
    isLoading: modelAppConfigIsLoading,
  } = useModelAppConfig(modelUid);

  if (modelAppConfigIsLoading) return <LoadingScreen />;
  if (modelAppConfigError)
    return (
      <div>failed to load model. Error: {modelAppConfigError.toString()}</div>
    );
  if (!modelAppConfig) return <div>no model</div>;

  const RunPage = getModelAppComponents(modelAppConfig.uid).runPage;
  if (!RunPage) return <div>no model run page</div>;

  return <RunPage modelAppConfig={modelAppConfig} />;
}

export default ModelRun;
