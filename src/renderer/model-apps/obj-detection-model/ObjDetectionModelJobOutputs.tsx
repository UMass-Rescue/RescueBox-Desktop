import { ModelAppConfig } from 'src/shared/models';
import { useDirFiles, useJob } from '@shadcn/lib/hooks';
import { Textarea } from '@shadcn/components/ui/textarea';
import FilePathField from '@shadcn/components/FilePathField';

export default function ObjDetectionModelOutputs({
  modelAppConfig,
  jobId,
}: {
  modelAppConfig: ModelAppConfig;
  jobId: string;
}) {
  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);
  const {
    data: files,
    error: filesError,
    isLoading: filesIsLoading,
  } = useDirFiles(job?.outputs[0].path);

  // Handle error cases
  if (!jobId) return <div>no job id</div>;
  if (jobIsLoading) return <div>loading job..</div>;
  if (jobError)
    return <div>failed to load job. Error: {jobError.toString()}</div>;
  if (!job) return <div>no job</div>;

  if (filesIsLoading) return <div>loading files..</div>;
  if (filesError)
    return <div>failed to load files. Error: {filesError.toString()}</div>;
  if (!files) return <div>no files</div>;

  return (
    <div className="py-4 flex flex-col gap-4">
      <div>
        <h1 className="font-bold my-4 text-lg lg:text-xl">Output Directory:</h1>
        {job.outputs.map((output) => (
          <FilePathField path={output.path} label={output.path_key} />
        ))}
      </div>
      <h1 className="font-bold text-lg lg:text-xl">Directory Contents:</h1>
      <div className="flex flex-col gap-2 text-md bg-gray-900 p-5 rounded-md max-h-96 overflow-y-scroll">
        <pre className="text-gray-50">{files.join('\n')}</pre>
      </div>
    </div>
  );
}
