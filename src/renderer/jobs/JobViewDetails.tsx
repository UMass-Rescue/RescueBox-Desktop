import { Link, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from '@shadcn/dialog';
import InputField from 'src/renderer/components/InputField';
import { extractValuesFromRequestBodyInput } from 'src/renderer/lib/utils';
import ParameterField from 'src/renderer/components/ParameterField';
import { Button } from '../components/ui/button';
import { useJob, useMLModel, useTask } from '../lib/hooks';
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

  const {
    data: task,
    error: taskError,
    isLoading: taskIsLoading,
  } = useTask(job?.taskUid, model?.uid);

  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;
  if (!job) return <div>no job</div>;

  if (modelIsLoading) return <LoadingScreen />;
  if (modelError)
    return <div>failed to load model. Error: {modelError.toString()}</div>;
  if (!model) return <div>no model</div>;

  if (taskIsLoading) return <LoadingScreen />;
  if (taskError)
    return <div>failed to load task. Error: {taskError.toString()}</div>;
  if (!task) return <div>no task</div>;

  return (
    <div className="w-full h-full my-6">
      <h1 className="text-3xl font-bold py-2">{task?.shortTitle}</h1>
      <div className="flex flex-col">
        {/* First Column in the grid for job metadata */}
        <div title="Job metadata" className="flex flex-col gap-2">
          <StatusComponent status={job.status} />
          {job.status === 'Failed' && job.statusText && (
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm xl:text-md">Status Text</h1>
              <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
                {job.statusText}
              </div>
            </div>
          )}
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm xl:text-md">Start Time</h1>
              <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
                {job.startTime.toLocaleString('en-US', { timeZone: 'EST' })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm xl:text-md">End Time</h1>
              <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
                {job.endTime
                  ? job.endTime.toLocaleString('en-US', { timeZone: 'EST' })
                  : 'Pending'}
              </div>
            </div>
          </div>
        </div>
        {/* Model + Task inputs & Params */}
        <div title="Task metadata" className="flex flex-col gap-2 mt-2">
          <h1 className="font-bold text-sm xl:text-md">Model</h1>
          <div className="flex flex-row items-center border border-slate-400 rounded-lg w-full justify-between px-3">
            <div className="">{model?.name}</div>
            <Link
              to={`/models/${job.modelUid}/details`}
              className="text-black text-base font-normal hover:-translate-y-0.5 transition-all rounded-lg m-1"
            >
              <Button>Inspect</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {job.taskSchema.inputs.map((inputSchema) => (
              <InputField
                value={extractValuesFromRequestBodyInput(
                  inputSchema.inputType,
                  job.request.inputs[inputSchema.key],
                )}
                inputSchema={inputSchema}
                onChange={() => undefined}
                disabled
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {job.taskSchema.parameters.map((paramSchema) => (
              <ParameterField
                value={job.request.parameters[paramSchema.key]}
                parameterSchema={paramSchema}
                onChange={() => undefined}
                disabled
              />
            ))}
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
