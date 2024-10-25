import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/button';
import { useJob, useMLModel } from '../lib/hooks';
import LoadingScreen from '../components/LoadingScreen';
import CompletedIcon from '../components/CompletedIcon';
import FailedIcon from '../components/FailedIcon';
import CanceledIcon from '../components/CanceledIcon';

function JobViewDetails() {
  const { jobId } = useParams();

  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);

  const {
    data: model,
    error: modelError,
    isLoading: modelIsLoading,
  } = useMLModel(job?.modelUid);

  const navigate = useNavigate();

  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;
  if (!job) return <div>no job</div>;

  if (modelIsLoading) return <LoadingScreen />;
  if (modelError)
    return <div>failed to load model. Error: {modelError.toString()}</div>;
  if (!job) return <div>no model</div>;

  const handleRetry = async () => {
    navigate('/jobs');
  };

  return (
    <div className="w-full my-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-bold text-lg md:text-xl lg:text-3xl">
            Job Details
          </h1>
        </div>
        {job.status !== 'Completed' && (
          <Button className="flex flex-row gap-2" onClick={handleRetry}>
            <ReloadIcon className="text-white size-5" />
            Retry
          </Button>
        )}
      </div>
      <div>
        {job.status === 'Completed' && (
          <div className="flex flex-row gap-2 text-lg font-semibold items-center">
            <CompletedIcon />
            Completed
          </div>
        )}
        {job.status === 'Failed' && (
          <div className="flex flex-row gap-2 text-lg font-semibold items-center">
            <FailedIcon />
            Failed
          </div>
        )}
        {job.status === 'Canceled' && (
          <div className="flex flex-row gap-2 text-lg font-semibold items-center">
            <CanceledIcon />
            Canceled
          </div>
        )}
      </div>
      <div className="text-md lg:text-lg w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Start</h1>
          <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
            {job.startTime.toLocaleString('en-US', { timeZone: 'EST' })}
          </div>
        </div>
        {job.status === 'Failed' && job.statusText && (
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Status Text</h1>
            <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
              {job.statusText}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Model</h1>
          <div className="flex flex-row items-center border border-slate-400 rounded-lg w-full justify-between py-1 px-3">
            <div className="">{model?.name}</div>
            <Link
              to={`/models/${job.modelUid}/details`}
              className="text-black text-base font-normal hover:-translate-y-0.5 transition-all rounded-lg"
            >
              <Button>Inspect</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobViewDetails;
