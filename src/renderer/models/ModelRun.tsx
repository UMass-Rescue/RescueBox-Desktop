import LoadingScreen from '@shadcn/components/LoadingScreen';
import { useApiRoutes, useMLModel } from '@shadcn/lib/hooks';
import { cn } from '@shadcn/lib/utils';
import { NavLink, Outlet, useParams } from 'react-router-dom';

function ModelRun() {
  const { modelUid } = useParams();

  const {
    data: apiRoutes,
    error: apiRoutesError,
    isLoading: apiRoutesIsLoading,
  } = useApiRoutes(modelUid);

  const {
    data: model,
    error: modelError,
    isLoading: modelIsLoading,
  } = useMLModel(modelUid);

  if (!modelUid) {
    return <div>Error: Model UID not found</div>;
  }

  if (!apiRoutes) {
    return <LoadingScreen />;
  }
  if (apiRoutesIsLoading) {
    return <LoadingScreen />;
  }
  if (apiRoutesError) {
    return <div>Error loading API routes</div>;
  }

  if (modelIsLoading) {
    return <LoadingScreen />;
  }
  if (modelError) {
    return <div>Error loading model: {modelError.message}</div>;
  }
  if (!model) {
    return <div>No model found</div>;
  }

  return (
    <div className="flex h-full">
      <div className="w-1/4 p-4 mb-2 sticky top-24 self-start">
        <h1 className="text-2xl font-bold mb-4">{model.name}</h1>
        <div className="flex flex-col space-y-1">
          {apiRoutes
            .sort((a, b) => a.order - b.order)
            .map((apiRoute) => (
              <NavLink
                key={apiRoute.order}
                to={`/models/${modelUid}/run/${apiRoute.order}`}
                replace
                className={({ isActive }) =>
                  isActive
                    ? cn(
                        'text-md md:text-md lg:text-md xl:text-md',
                        'bg-gray-200 p-2 font-semibold rounded',
                      )
                    : cn(
                        'text-md md:text-md lg:text-md xl:text-md',
                        'hover:bg-gray-200 p-2 rounded',
                        'p-2 rounded',
                      )
                }
              >
                {apiRoute.short_title}
              </NavLink>
            ))}
        </div>
      </div>
      <div className="border-l border-gray-300 mb-2" />
      <div className="flex-grow p-4 overflow-y-auto">
        <Outlet context={apiRoutes} />
      </div>
    </div>
  );
}

export default ModelRun;
