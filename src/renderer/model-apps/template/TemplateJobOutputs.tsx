import { ModelAppConfig } from 'src/shared/models';

function TemplateJobOutputs({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modelAppConfig,
  jobId,
}: {
  modelAppConfig: ModelAppConfig;
  jobId: string;
}) {
  return (
    <div className="mt-4">
      <h1>Template Job Outputs</h1>
      <span>Job ID: {jobId}</span>
    </div>
  );
}

export default TemplateJobOutputs;
