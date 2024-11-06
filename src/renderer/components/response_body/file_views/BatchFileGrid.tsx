import { Button } from '@shadcn/button';
import { MoreHorizontal } from 'lucide-react';
import { FileResponse } from 'src/shared/generated_models';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shadcn/dropdown-menu';
import { useState } from 'react';
import PreviewFileResponse from '../../PreviewFileResponse';

export type FilesByType = {
  type: 'img' | 'text' | 'csv' | 'json' | 'audio' | 'video' | 'markdown';
  title: string;
  files: FileResponse[];
  icon: string;
};

export default function BatchFileGrid({
  data,
  searchTerm,
}: {
  data: FilesByType;
  searchTerm: string;
}) {
  const [selectedFile, setSelectedFile] = useState<FileResponse | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      {showPreview && selectedFile && (
        <PreviewFileResponse
          response={selectedFile}
          open={showPreview}
          setOpen={setShowPreview}
        />
      )}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.files
            .filter((f) =>
              f.title !== undefined
                ? f.title.toLowerCase().includes(searchTerm.toLowerCase())
                : f.path.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((file) => (
              <div
                key={file.path}
                className="relative group border border-gray-400 rounded-lg"
              >
                <div className="absolute top-1 right-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-6 w-6 p-0 rounded-full bg-accent hover:bg-gray-200 cursor-default"
                      >
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          window.fileSystem.showFileInExplorer({
                            path: file.path,
                          })
                        }
                      >
                        View in Explorer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () =>
                          navigator.clipboard.writeText(file.path)
                        }
                      >
                        Copy Path
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  className="flex flex-col items-center rounded-t-lg"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedFile(file);
                    setShowPreview(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedFile(file);
                      setShowPreview(true);
                    }
                  }}
                >
                  <img
                    src={data.type === 'img' ? file.path : data.icon}
                    alt="icon"
                    className={
                      data.type === 'img'
                        ? 'w-full h-28 mb-2 rounded-t-md'
                        : 'w-12 h-12 mt-6 mb-2'
                    }
                  />
                  <span className="font-semibold mb-2">{file.title}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
