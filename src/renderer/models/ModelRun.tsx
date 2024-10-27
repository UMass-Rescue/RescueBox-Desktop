/* eslint-disable react/jsx-props-no-spreading */
import LoadingScreen from '@shadcn/components/LoadingScreen';
import { useApiRoutes } from '@shadcn/lib/hooks';
import { cn } from '@shadcn/lib/utils';
import { NavLink, Outlet, useParams } from 'react-router-dom';

function ModelRun() {
  const { modelUid } = useParams();

  const {
    data: apiRoutes,
    error: apiRoutesError,
    isLoading: apiRoutesIsLoading,
  } = useApiRoutes(modelUid);

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
    return <div>Error loading api routes</div>;
  }

  return (
    <div>
      <div className="tabs mt-3 mx-2">
        <div className="flex flex-row space-x-4">
          {apiRoutes
            .filter((apiRoute) => 'order' in apiRoute)
            .sort((a, b) => a.order - b.order)
            .map((apiRoute) => (
              <NavLink
                key={apiRoute.order}
                to={`/models/${modelUid}/run${apiRoute.run_task}`}
                className={({ isActive }) =>
                  isActive
                    ? cn(
                        'text-md md:text-md lg:text-md xl:text-md',
                        'text-blue-500 underline underline-offset-8 font-semibold',
                      )
                    : cn(
                        'text-md md:text-md lg:text-md xl:text-md',
                        'hover:text-blue-500 font-semibold',
                      )
                }
              >
                {apiRoute.short_title}
              </NavLink>
            ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ModelRun;
