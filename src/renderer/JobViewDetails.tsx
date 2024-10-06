import { Link, useParams } from 'react-router-dom';
import { OpenDirectoryArgs } from '../main/handlers/file-system';
import { Button } from './components/ui/button';
import { useJob, useMLModel } from './lib/hooks';

const handleViewDirectory = (input: boolean) => {
  const path =
    document.getElementById(input ? 'input-path' : 'output-path')
      ?.textContent || '';
  window.fileSystem.openDirectory({ path } as OpenDirectoryArgs);
};

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
            {job.startTime.toLocaleString('en-US', { timeZone: 'EST' })}
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Inputs</h1>
          <div className="flex flex-row border border-slate-400 rounded-lg w-full justify-between p-2">
            <div className="" id="input-path">
              {job.inputs[0].path}
            </div>
            <Button
              className="text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 px-2 rounded-lg"
              onClick={() => handleViewDirectory(true)}
            >
              View
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Output</h1>
          <div className="flex flex-row border border-slate-400 rounded-lg w-full justify-between p-2">
            <div className="" id="output-path">
              {job.outputs[0].path}
            </div>
            <Button
              className="text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 px-2 rounded-lg"
              onClick={() => handleViewDirectory(false)}
            >
              View
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Model</h1>
          <div className="flex flex-row border border-slate-400 rounded-lg w-full justify-between p-2">
            <div className="">{model?.name}</div>
            <Link
              to={`/models/${job.modelUid}/details`}
              className="text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 px-2 rounded-lg"
            >
              Inspect
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobViewDetails;
