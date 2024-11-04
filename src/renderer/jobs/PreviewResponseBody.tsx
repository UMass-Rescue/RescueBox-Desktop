/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResponseBody } from 'src/shared/generated_models';
import { match } from 'ts-pattern';
import MarkdownView from '../components/response_body/MarkdownView';
import DirectoryView from '../components/response_body/directory_views/DirectoryView';
import BatchDirectoryView from '../components/response_body/directory_views/BatchDirectoryView';
import BatchFileResponseView from '../components/response_body/BatchFileResponseView';

export default function PreviewResponseBody({
  response,
}: {
  response: ResponseBody;
}) {
  return match(response)
    .with({ output_type: 'file' }, (fileResponse) => {
      return <div>File Response</div>;
    })
    .with({ output_type: 'directory' }, (directoryResponse) => {
      return <DirectoryView response={directoryResponse} />;
    })
    .with({ output_type: 'markdown' }, (markdownResponse) => {
      return <MarkdownView response={markdownResponse} />;
    })
    .with({ output_type: 'text' }, (textResponse) => {
      return <div>Text Response</div>;
    })
    .with({ output_type: 'batchfile' }, (batchFileResponse) => {
      return <BatchFileResponseView batchFileResponse={batchFileResponse} />;
    })
    .with({ output_type: 'batchtext' }, (batchTextResponse) => {
      return <div>Batch Text Response</div>;
    })
    .with({ output_type: 'batchdirectory' }, (batchDirectoryResponse) => {
      return (
        <BatchDirectoryView
          directoryResponses={batchDirectoryResponse.directories}
        />
      );
    })
    .otherwise(() => {
      return <div>Unknown Response</div>;
    });
}
