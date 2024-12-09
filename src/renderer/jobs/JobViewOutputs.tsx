import { useParams } from 'react-router-dom';
import { useJob } from '../lib/hooks';
import PreviewResponseBody from './PreviewResponseBody';

function JobViewOutputs() {
  const { jobId } = useParams();

  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);
  if (!job || !jobId) return <div>no job id</div>;
  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;

  const { response, statusText } = job;
  if (!response) return <div>No response available: {statusText}</div>;

  return (
    <div className="border border-gray-300 rounded-lg m-1 p-6 flex flex-col gap-4 shadow-md bg-white">
      <PreviewResponseBody response={response} />
    </div>
  );
}

export default JobViewOutputs;
