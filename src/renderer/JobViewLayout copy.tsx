import { NavLink, Outlet, useParams } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@radix-ui/react-navigation-menu';
import { getJobById, getModelName } from './utils';
import sampleModels from './sample_models.json';
import { cn } from './lib/utils';
// import { navigationMenuTriggerStyle } from './components/ui/navigation-menu';
import sampleJobs from './sample_jobs.json';

function JobView() {
  const { jobId } = useParams();

  return (
    <div className="mt-3 mx-2 h-screen">
      <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mb-4">
        {getModelName(sampleModels, getJobById(sampleJobs, jobId!)?.modelUid)}
      </h1>

      <NavigationMenu className="mt-4">
        <NavigationMenuList className="gap-3 flex flex-row">
          <NavigationMenuItem
            asChild
            className={cn(
              'pb-2 hover:text-blue-500 font-semibold hover:underline underline-offset-8 focus:underline',
            )}
          >
            {/* <Link to="/registration" className={navigationMenuTriggerStyle()}> */}
            <NavLink
              to={`/jobs/${jobId}/details`}
              className={({ isActive }) =>
                isActive
                  ? cn(
                      'text-sm md:text-lg lg:text-xl xl:text-2xl',
                      'text-blue-500 underline',
                    )
                  : cn(
                      'text-sm md:text-lg lg:text-xl xl:text-2xl',
                      'hover:text-blue-500',
                    )
              }
            >
              Details
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem
            asChild
            className={cn(
              'pb-2 hover:text-blue-500 font-semibold hover:underline underline-offset-8 focus:underline',
            )}
          >
            {/* <Link to="/registration" className={navigationMenuTriggerStyle()}> */}
            <NavLink
              to={`/jobs/${jobId}/outputs`}
              className={({ isActive }) =>
                isActive
                  ? cn(
                      'text-sm md:text-lg lg:text-xl xl:text-2xl',
                      'text-blue-500 underline',
                    )
                  : cn(
                      'text-sm md:text-lg lg:text-xl xl:text-2xl',
                      'hover:text-blue-500',
                    )
              }
            >
              Outputs
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Outlet />
    </div>
  );
}

export default JobView;
