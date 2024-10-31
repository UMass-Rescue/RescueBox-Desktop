import RegisterModelButton from '@shadcn/components/RegisterModelButton';
import { useMLModels, useServers, useServerStatuses } from '../lib/hooks';
import LoadingIcon from '../components/icons/LoadingIcon';
import LoadingScreen from '../components/LoadingScreen';
import ModelsTable from './ModelsTable';

function Models() {
  // ML Models Hook
  const {
    models,
    error: modelsError,
    isValidating: modelsIsValidating,
  } = useMLModels();

  // Servers Hook
  const { servers, error, isValidating: serversIsValidating } = useServers();

  // Server Statuses Hook
  const {
    serverStatuses,
    error: statusError,
    isValidating: statusIsValidating,
  } = useServerStatuses(servers);

  if (modelsError)
    return <div>failed to load models. Error: {modelsError.toString()}</div>;
  if (modelsIsValidating) return <LoadingScreen />;
  if (!models) return <div>no models</div>;

  if (error) return <div>failed to load {error.toString()}</div>;
  if (serversIsValidating) return <LoadingScreen />;
  if (!servers) return <div>no servers</div>;

  if (statusError)
    return <div>failed to load status. Error: {statusError.toString()}</div>;
  if (!serverStatuses) return <LoadingScreen />;

  const onModels = models.filter(
    (model) => serverStatuses[model.uid] === 'Online',
  );

  const offModels = models.filter(
    (model) => serverStatuses[model.uid] !== 'Online',
  );

  return (
    <div className="m-3">
      <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4 flex flex-row gap-8 items-center">
        Available Models
        {statusIsValidating && <LoadingIcon className="size-8 text-blue-600" />}
      </h1>
      {onModels.length === 0 && <RegisterModelButton />}
      {onModels.length > 0 && (
        <ModelsTable models={onModels} serverStatuses={serverStatuses} />
      )}
      <br className="my-5" />
      <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4 flex flex-row gap-8 items-center">
        Unavailable Models
        {statusIsValidating && <LoadingIcon className="size-8 text-blue-600" />}
      </h1>
      {offModels.length > 0 && (
        <ModelsTable models={offModels} serverStatuses={serverStatuses} />
      )}
    </div>
  );
}

export default Models;
