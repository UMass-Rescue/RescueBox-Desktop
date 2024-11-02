import { useParams } from 'react-router-dom';
import PreviewModal from 'src/renderer/components/PreviewModal';
import { markdownResponse } from 'src/shared/dummy_data/file_response';
import markdownResponseBody from 'src/shared/dummy_data/markdown_response';
import { useJob } from '../lib/hooks';
import PreviewResponseBody from './PreviewResponseBody';

function JobViewOutputs() {
  const { jobId } = useParams();

  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);
  if (!job || !jobId) return <div>no job id</div>;
  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;

  const { response } = job;
  if (!response) return <div>No response available</div>;

  return (
    <div className="border border-gray-300 rounded-lg mt-5 p-4 shadow-md bg-white">
      <PreviewResponseBody response={markdownResponseBody} />
      <PreviewModal response={markdownResponse} />
    </div>
  );
}

export default JobViewOutputs;
