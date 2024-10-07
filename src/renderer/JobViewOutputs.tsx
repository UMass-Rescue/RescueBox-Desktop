import { useParams } from 'react-router-dom';
import { useJob, useModelAppConfig } from './lib/hooks';
import getModelAppComponents from './model-apps/config';

function JobViewOutputs() {
  const { jobId } = useParams();

  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);

  const {
    data: modelAppConfig,
    error: modelAppConfigError,
    isLoading: modelAppConfigIsLoading,
  } = useModelAppConfig(job!.modelUid);

  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;
  if (!job) return <div>no job</div>;

  if (modelAppConfigIsLoading) return <div>loading model app config..</div>;
  if (modelAppConfigError)
    return (
      <div>
        failed to load model app config. Error: {modelAppConfigError.toString()}
      </div>
    );
  if (!modelAppConfig) return <div>no model app config</div>;

  const JobOutputsPage = getModelAppComponents(
    modelAppConfig.uid,
  ).jobOutputsPage;
  if (!JobOutputsPage) return <div>no job outputs page</div>;

  return <JobOutputsPage modelAppConfig={modelAppConfig} />;
}

export default JobViewOutputs;
