import { ModelAppConfig } from 'src/shared/models';
import { useJob } from '@shadcn/lib/hooks';
import { Button } from '@shadcn/components/ui/button';
import LoadingScreen from '@shadcn/components/LoadingScreen';

interface Result {
  result:
    | {
        found: boolean;
        target_file?: string;
        known_dataset_file?: string;
        block_num_in_known_dataset?: number;
        block_num_in_target?: number;
      }
    | string;
  text: string;
}

interface JsonResponse {
  status: string;
  results: Result[];
}

export default function SBFModelJobOutputs({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modelAppConfig,
  jobId,
}: {
  modelAppConfig: ModelAppConfig;
  jobId: string;
}) {
  const { data: job, error: jobError, isLoading: jobIsLoading } = useJob(jobId);

  if (jobIsLoading) return <LoadingScreen />;
  if (jobError)
    return (
      <div className="mt-4 text-lg font-semibold">
        Error loading job: {jobError.toString()}
      </div>
    );
  if (!job) return <div className="mt-4 text-lg font-semibold">No job</div>;

  if (job.status === 'Failed')
    return <div className="mt-4 text-lg font-semibold">Job Failed</div>;
  if (job.status === 'Canceled')
    return <div className="mt-4 text-lg font-semibold">Job Canceled</div>;
  if (job.status === 'Running')
    return (
      <div className="mt-4 text-lg font-semibold">Job is still Running</div>
    );
  const response = job.response as JsonResponse;
  if (!response)
    return <div className="mt-4 text-lg font-semibold">FATAL: No response</div>;

  const handleOpenFile = async (path: string) => {
    await window.fileSystem.openPath({ path });
  };

  return (
    <div className="mt-4 bg-gray-900 p-5 rounded-md overflow-y-scroll max-h-[calc(100vh-375px)] text-white">
      <h2 className="text-xl text-orange-400 font-bold mb-4">Results:</h2>
      {response.results.map((resultObj) => {
        if (typeof resultObj.result === 'string') {
          return (
            <div key={resultObj.text} className="mb-4 mx-4">
              <pre className="text-gray-100">{resultObj.text}</pre>
              <pre className="text-gray-100">{resultObj.result}</pre>
            </div>
          );
        }

        const {
          found,
          target_file: targetFile,
          known_dataset_file: knownDatasetFile,
          block_num_in_known_dataset: blockNumInKnownDataset,
          block_num_in_target: blockNumInTarget,
        } = resultObj.result;
        return (
          <div
            key={found ? 'yes' : 'no'}
            className="mb-4 mx-4 text-gray-100 flex flex-col gap-1"
          >
            <pre>Match: {found ? 'Yes' : 'No'}</pre>
            <pre>Target Probability: 0.95</pre>
            <pre>Block Size: 4</pre>
            {targetFile && (
              <pre>
                Matched Target File:{' '}
                <Button
                  variant="link"
                  className="text-inherit p-0 h-full text-base"
                  onClick={() => handleOpenFile(targetFile)}
                >
                  {targetFile}
                </Button>
              </pre>
            )}
            {knownDatasetFile && (
              <pre>
                Match Known Dataset File:{' '}
                <Button
                  variant="link"
                  className="text-inherit p-0 h-full text-base"
                  onClick={() => handleOpenFile(knownDatasetFile)}
                >
                  {knownDatasetFile}
                </Button>
              </pre>
            )}
            {blockNumInKnownDataset !== undefined && (
              <pre>
                Block Num in Known Dataset File: {blockNumInKnownDataset}
              </pre>
            )}
            {blockNumInTarget !== undefined && (
              <pre>Block Num in Target File: {blockNumInTarget}</pre>
            )}
          </div>
        );
      })}
    </div>
  );
}
