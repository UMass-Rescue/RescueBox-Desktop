import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { BatchFileResponse, FileResponse } from 'src/shared/generated_models';
import PreviewFileResponse from '../PreviewFileResponse';

function BatchFileResponseView({
  batchFileResponse,
}: {
  batchFileResponse: BatchFileResponse;
}) {
  const { files } = batchFileResponse;

  const filePathIcons: Record<string, any> = files.reduce(async (acc, file) => {
    // @ts-ignore
    acc[file.path] = await window.fileSystem.getFileIcon({ path: file.path });
    return acc;
  }, {});

  const imageFiles: FileResponse[] = [];
  const csvFiles: FileResponse[] = [];
  const jsonFiles: FileResponse[] = [];
  const textFiles: FileResponse[] = [];
  const audioFiles: FileResponse[] = [];
  const videoFiles: FileResponse[] = [];
  const markdownFiles: FileResponse[] = [];

  files.forEach((file) => {
    switch (file.file_type) {
      case 'img': {
        imageFiles.push(file);
        break;
      }
      case 'csv': {
        csvFiles.push(file);
        break;
      }
      case 'json': {
        jsonFiles.push(file);
        break;
      }
      case 'text': {
        textFiles.push(file);
        break;
      }
      case 'audio': {
        audioFiles.push(file);
        break;
      }
      case 'video': {
        videoFiles.push(file);
        break;
      }
      case 'markdown': {
        markdownFiles.push(file);
        break;
      }
      default: {
        break;
      }
    }
  });
  const getTypeTextfromType = (fileType: string) => {
    switch (fileType) {
      case 'img': {
        return 'Image Files';
      }
      case 'csv': {
        return 'CSV Files';
      }
      case 'json': {
        return 'JSON Files';
      }
      case 'text': {
        return 'Text Files';
      }
      case 'audio': {
        return 'Audio Files';
      }
      case 'video': {
        return 'Video Files';
      }
      case 'markdown': {
        return 'Markdown Files';
      }
      default: {
        throw new Error('File Type Not Supported!');
      }
    }
  };

  const handlePathClick = async (filePath: string) => {
    await window.fileSystem.openPath({ path: filePath });
  };

  const FileTypeCollapsible = [
    imageFiles,
    csvFiles,
    jsonFiles,
    textFiles,
    audioFiles,
    videoFiles,
    markdownFiles,
  ]
    .filter((filePartition) => filePartition.length !== 0)
    .map((filePartition) => (
      <Collapsible className="p-4 border border-slate-200 rounded-lg">
        <CollapsibleTrigger className="font-semibold text-md xl:text-lg flex flex-row justify-between w-full border border-slate-400 rounded-lg hover:bg-slate-100 p-3">
          <span>{getTypeTextfromType(filePartition[0].file_type)}</span>
          <ChevronDownIcon className="size-4 xl:size-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="grid grid-cols-5  w-full gap-2 my-2 ">
          {filePartition.map((file) => (
            <div className="border border-slate-400 rounded-md p-2 h-52 hover:bg-slate-200 flex flex-col">
              <div className="font-bold text-3xl h-5/6 flex items-center justify-center align-middle">
                <img src={filePathIcons[file.path]} alt="FILE" />
              </div>
              <div className="border-t-2 mt-2 border-slate-400 flex flex-row justify-between">
                <button
                  type="button"
                  className="mt-2 text-blue-600 underline"
                  onClick={() => handlePathClick(file.path)}
                >
                  {file.path}
                </button>
                <div className="mt-2 text-sm">
                  <PreviewFileResponse response={file} />
                </div>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    ));
  return (
    <div className="flex flex-col gap-4 bg-inherit">{FileTypeCollapsible}</div>
  );
}

export default BatchFileResponseView;
