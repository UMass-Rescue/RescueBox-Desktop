import { Link, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from '@shadcn/components/ui/dialog';
import { Button } from '../components/ui/button';
import { useJob, useMLModel } from '../lib/hooks';
import LoadingScreen from '../components/LoadingScreen';
import StatusComponent from './sub-components/StatusComponent';

function JobViewDetails() {
  const { jobId } = useParams();

  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);

  const {
    data: model,
    error: modelError,
    isLoading: modelIsLoading,
  } = useMLModel(job?.modelUid);

  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;
  if (!job) return <div>no job</div>;

  if (modelIsLoading) return <LoadingScreen />;
  if (modelError)
    return <div>failed to load model. Error: {modelError.toString()}</div>;
  if (!job) return <div>no model</div>;

  return (
    <div className="w-full h-full my-6">
      <div className="grid grid-cols-2 grid-flow-row gap-4">
        {/* First Column in the grid for job metadata */}
        <div
          title="Job metadata"
          className="border border-slate-300 rounded-md p-4 min-h-full flex flex-col gap-2"
        >
          <StatusComponent status={job.status} />
          {job.status === 'Failed' && job.statusText && (
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Status Text</h1>
              <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
                {job.statusText}
              </div>
            </div>
          )}
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Start Time</h1>
              <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
                {job.startTime.toLocaleString('en-US', { timeZone: 'EST' })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">End Time</h1>
              <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
                {job.endTime.toLocaleString('en-US', { timeZone: 'EST' })}
              </div>
            </div>
          </div>
        </div>
        {/* Second Column in the grid for task metadata */}
        <div
          title="Task metadata"
          className="border border-slate-300 rounded-md p-4 min-h-full flex flex-col gap-2"
        >
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
          <h1 className="font-bold">Task Route</h1>
          <div className="flex flex-row items-center border border-slate-400 rounded-lg w-full justify-between py-1 px-3">
            <p>{job.taskRoute}</p>
          </div>
          <h1 className="font-bold">Task Inputs</h1>
          <div className="border border-slate-400 rounded-lg w-full py-2 px-3 bg-gray-800 text-blue-50">
            {JSON.stringify(job.request.inputs)}
          </div>
          <h1 className="font-bold">Task Params</h1>
          <div className="border border-slate-400 rounded-lg w-full py-2 px-3 bg-gray-800 text-blue-50">
            {JSON.stringify(job.request.parameters)}
          </div>

          <Dialog>
            <DialogTrigger asChild className="py-1 rounded-lg text-base">
              <Button
                variant="outline"
                className="hover:-translate-y-0.5 transition-all py-2 rounded-lg"
              >
                View Raw JSON Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Task Request Body</DialogTitle>
              </DialogHeader>
              <div className="border border-slate-400 overflow-x-scroll rounded-lg py-2 px-3 bg-gray-800 text-blue-50">
                {JSON.stringify(job.request)}
              </div>
              <DialogFooter className="sm:justify-start" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default JobViewDetails;
