import { EyeOpenIcon, FileIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { Button } from '@shadcn/components/ui/button';

function GridView({
  files,
  searchTerm,
  outputDir,
  setPreviewFile,
  handleOpenFile,
  handleDeleteFile,
}: {
  files: string[];
  searchTerm: string;
  outputDir: string;
  setPreviewFile: (file: string) => void;
  handleOpenFile: (file: string) => void;
  handleDeleteFile: (file: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files
        .filter(
          (file) =>
            ['.png', '.jpg', '.jpeg'].some((ext) => file.endsWith(ext)) &&
            file.includes(searchTerm),
        )
        .map((file) => (
          <div
            key={file}
            className="relative bg-gray-800 rounded-md overflow-hidden p-2"
          >
            <div className="flex flex-col items-center">
              <img
                src={`file://${outputDir}/${file}`}
                alt={file}
                className="object-cover w-20 h-20 mb-2"
              />
              <pre className="text-gray-50 text-center truncate w-full">
                {(() => {
                  const parts = file.split(new RegExp(`(${searchTerm})`, 'gi'));
                  return (
                    <span>
                      {' '}
                      {parts.map((part, i) => (
                        <span
                          // eslint-disable-next-line react/no-array-index-key
                          key={i}
                          style={
                            part.toLowerCase() === searchTerm.toLowerCase()
                              ? { fontWeight: 'bold' }
                              : {}
                          }
                        >
                          {part}
                        </span>
                      ))}{' '}
                    </span>
                  );
                })()}
              </pre>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-gray-950"
                        onClick={() => setPreviewFile(file)}
                      >
                        <EyeOpenIcon className="text-white size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Preview</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-gray-950"
                        onClick={() => handleOpenFile(`${outputDir}/${file}`)}
                      >
                        <FileIcon className="text-white size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Open File</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-gray-950"
                        onClick={() => handleDeleteFile(`${outputDir}/${file}`)}
                      >
                        <TrashIcon className="text-white size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Delete File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default GridView;
