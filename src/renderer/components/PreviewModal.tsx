import { FileResponse } from 'src/shared/generated_models';
import { Cross1Icon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import VideoPreview from './response_body/previews/VideoPreview';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import MarkdownPreview from './response_body/previews/MarkdownPreview';
import AudioPreview from './response_body/previews/AudioPreview';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PreviewModal({ response }: { response: FileResponse }) {
  const [open, setOpen] = useState(false);

  const filePrefixedPath = `file://${response.path}`;

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Preview</Button>
        </DialogTrigger>
        <DialogContent className="[&>button]:hidden max-w-fit xs:max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              <span className="font-bold text-xl">{`Preview: ${response.title}`}</span>
              <div className="ml-auto flex">
                <Button
                  className="bg-transparent hover:bg-gray-200 shadow-none p-1 mr-3"
                  onClick={() =>
                    window.fileSystem.showFileInExplorer({
                      path: response.path,
                    })
                  }
                  title="Show file in explorer"
                >
                  <OpenInNewWindowIcon className="size-6 text-gray-800" />
                </Button>
                <Button
                  className="bg-transparent hover:bg-gray-200 shadow-none p-1"
                  onClick={() => setOpen(false)}
                  title="Close"
                >
                  <Cross1Icon className="size-6 text-gray-800" />
                </Button>
              </div>
            </DialogTitle>
            {response.subtitle && (
              <span className="block max-h-10 overflow-y-auto text-sm">{`${response.subtitle}`}</span>
            )}
          </DialogHeader>
          <div className="overflow-auto h-full">
            {(() => {
              switch (response.file_type) {
                case 'text':
                  return <div>Text Preview</div>;
                case 'markdown':
                  return <MarkdownPreview filePath={response.path} />;
                case 'json':
                  return <div>JSON Preview</div>;
                case 'csv':
                  return <div>CSV Preview</div>;
                case 'audio':
                  return <AudioPreview filePath={filePrefixedPath} />;
                case 'img':
                  return <div>Image Preview</div>;
                case 'video':
                  return <VideoPreview filePath={filePrefixedPath} />;
                default:
                  return (
                    <div>Unsupported Response Type: {response.file_type}</div>
                  );
              }
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
