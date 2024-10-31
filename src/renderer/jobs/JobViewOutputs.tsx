import { useParams } from 'react-router-dom';
import PreviewModal from 'src/renderer/components/PreviewModal';
import videoResponse from 'src/shared/dummy_data/file_response_video';
import { useJob } from '../lib/hooks';

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
    <div>
      <div>Job ID: {jobId}</div>
      <PreviewModal response={videoResponse} />
    </div>
  );
}

export default JobViewOutputs;
