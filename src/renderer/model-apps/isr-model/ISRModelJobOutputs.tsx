import { ModelAppConfig } from 'src/shared/models';
import { useDirFiles, useJob } from '@shadcn/lib/hooks';
import FilePathField from '@shadcn/components/FilePathField';
import { Button } from '@shadcn/components/ui/button';
import { GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shadcn/components/ui/tooltip';
import DeleteIcon from '@shadcn/components/DeleteIcon';
import { useState } from 'react';
import { Input } from '@shadcn/components/ui/input';
import ISRResultPreview from '@shadcn/model-apps/isr-model/components/ISRResultPreview';
import ListView from '@shadcn/model-apps/isr-model/components/ListView';
import GridView from '@shadcn/model-apps/isr-model/components/GridView';

function ISRModelJobOutputs({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    mutate: mutateFiles,
  } = useDirFiles(job?.outputs[0].path);

  const [searchTerm, setSearchTerm] = useState('');
  const [previewFile, setPreviewFile] = useState('');
  const [isListView, setIsListView] = useState(true);

  if (jobIsLoading) return <div>Loading job...</div>;
  if (jobError) return <div>Error loading job: {jobError.toString()}</div>;
  if (!job) return <div>No job</div>;

  if (filesIsLoading) return <div>Loading files...</div>;
  if (filesError)
    return <div>Error loading files: {filesError.toString()}</div>;
  if (!files) return <div>No files</div>;

  const { path: outputDir, path_key: outputDirKey } = job.outputs[0];
  const inputDir = job.inputs[0].path;

  const handleOpenFile = async (path: string) => {
    await window.fileSystem.openPath({ path });
  };
  const handleDeleteFile = async (path: string) => {
    await window.fileSystem.deleteFile({ path });
    mutateFiles();
  };

  return (
    <div className="py-4 flex flex-col gap-4">
      <div>
        <h1 className="font-bold my-4 text-lg lg:text-xl">Output Directory:</h1>
        <FilePathField path={outputDir} label={outputDirKey} />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg lg:text-xl">Directory Contents:</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-md overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsListView(true)}
                    className={`h-10 w-15 rounded-none ${!isListView ? 'bg-gray-300' : ''}`}
                  >
                    <ListBulletIcon className="text-white size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>List View</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsListView(false)}
                    className={`h-10 w-15 rounded-none ${isListView ? 'bg-gray-300' : ''}`}
                  >
                    <GridIcon className="text-white size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Grid View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            placeholder="Search files..."
            className="border border-gray-300 rounded-md px-2 py-1 w-80 h-10"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={() =>
              files.forEach((file) => handleDeleteFile(`${outputDir}/${file}`))
            }
            className="h-10"
          >
            <DeleteIcon className="size-5 mr-2" />
            Trash All
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-md bg-gray-900 p-5 rounded-md overflow-y-scroll max-h-[calc(100vh-375px)]">
        {isListView ? (
          <ListView
            files={files}
            searchTerm={searchTerm}
            outputDir={outputDir}
            setPreviewFile={setPreviewFile}
            handleOpenFile={handleOpenFile}
            handleDeleteFile={handleDeleteFile}
          />
        ) : (
          <GridView
            files={files}
            searchTerm={searchTerm}
            outputDir={outputDir}
            setPreviewFile={setPreviewFile}
            handleOpenFile={handleOpenFile}
            handleDeleteFile={handleDeleteFile}
          />
        )}
        {previewFile !== '' && (
          <ISRResultPreview
            inputPath={`${inputDir}/${previewFile}`}
            outputPath={`${outputDir}/${previewFile}`}
            onClose={() => setPreviewFile('')}
          />
        )}
      </div>
    </div>
  );
}

export default ISRModelJobOutputs;
