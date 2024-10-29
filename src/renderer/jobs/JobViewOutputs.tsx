import { useParams } from 'react-router-dom';
import PreviewModal from '@shadcn/components/PreviewModal';
import { FileResponse } from 'src/shared/generated_models';
import { useJob } from '../lib/hooks';

function JobViewOutputs() {
  const { jobId } = useParams();

  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);
  if (!job || !jobId) return <div>no job id</div>;
  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;

  // const { response } = job;
  // if (!response) return <div>No response available</div>;

  const response: FileResponse = {
    output_type: 'file',
    path: 'C:\\Users\\LENOVO\\Videos\\Captures\\super-res-demo.mp4',
    file_type: 'video',
    title: 'Super Resolution Demo',
    subtitle: 'Demo Video for ISR Model',
  };

  return (
    <div>
      <div>Job ID: {jobId}</div>
      <PreviewModal response={response} />
    </div>
  );
}

export default JobViewOutputs;
