import { NavLink, Outlet, useParams } from 'react-router-dom';

import { cn } from '../lib/utils';
import { useJob } from '../lib/hooks';

function JobView() {
  const { jobId } = useParams();

  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);

  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;
  if (!job) return <div>no job</div>;

  return (
    <div className="mt-3 mx-2 ">
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
