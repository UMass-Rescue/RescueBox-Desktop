import { NavLink, Outlet, useParams } from 'react-router-dom';

import { getJobById, getModelName } from './utils';
import sampleModels from './sample_models.json';
import { cn } from './lib/utils';
import sampleJobs from './sample_jobs.json';

function JobView() {
  const { jobId } = useParams();

  return (
    <div className="mt-3 mx-2 h-screen">
      <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
        {getModelName(sampleModels, getJobById(sampleJobs, jobId!)?.modelUid)}
      </h1>

      <div className="flex flex-row space-x-4">
        <NavLink
          to={`/jobs/${jobId}/details`}
          className={({ isActive }) =>
            isActive
              ? cn(
                  'text-sm md:text-lg lg:text-xl xl:text-2xl',
                  'text-blue-500 underline underline-offset-8 font-semibold',
                )
              : cn(
                  'text-sm md:text-lg lg:text-xl xl:text-2xl',
                  'hover:text-blue-500 font-semibold',
                )
          }
        >
          Details
        </NavLink>
        <NavLink
          to={`/jobs/${jobId}/outputs`}
          className={({ isActive }) =>
            isActive
              ? cn(
                  'text-sm md:text-lg lg:text-xl xl:text-2xl',
                  'text-blue-500 underline underline-offset-8 font-semibold',
                )
              : cn(
                  'text-sm md:text-lg lg:text-xl xl:text-2xl',
                  'hover:text-blue-500 font-semibold',
                )
          }
        >
          Outputs
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default JobView;
