import { Link, useParams } from 'react-router-dom';
import { Button } from './components/ui/button';
import { useJob, useMLModel } from './lib/hooks';
import FilePathField from './components/FilePathField';

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

  if (modelIsLoading) return <div>loading model..</div>;
  if (modelError)
    return <div>failed to load model. Error: {modelError.toString()}</div>;
  if (!job) return <div>no model</div>;

  return (
    <div className=" w-full mt-6">
      <h1 className="font-bold text-lg md:text-xl lg:text-3xl mb-4">
        Job Details
      </h1>
      <div className="text-md lg:text-lg w-full">
        <div className="">
          <h1 className="font-bold mb-4">Start</h1>
          <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
            {job.startTime.toUTCString()}
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Inputs</h1>
          {job.inputs.map((input) => (
            <FilePathField
              key={input.path}
              path={input.path}
              label={input.path_type}
            />
          ))}
        </div>
        <div>
          <h1 className="font-bold my-4">Output</h1>
          {job.outputs.map((input) => (
            <FilePathField
              key={input.path}
              path={input.path}
              label={input.path_type}
            />
          ))}
        </div>
        <div>
          <h1 className="font-bold my-4">Model</h1>
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
