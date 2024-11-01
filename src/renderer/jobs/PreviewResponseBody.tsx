/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResponseBody } from 'src/shared/generated_models';
import { match } from 'ts-pattern';
import MarkdownView from '../components/response_body/MarkdownView';

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
      return <div>Directory Response</div>;
    })
    .with({ output_type: 'markdown' }, (markdownResponse) => {
      return <MarkdownView response={markdownResponse} />;
    })
    .with({ output_type: 'text' }, (textResponse) => {
      return <div>Text Response</div>;
    })
    .with({ output_type: 'batchfile' }, (batchFileResponse) => {
      return <div>Batch File Response</div>;
    })
    .with({ output_type: 'batchtext' }, (batchTextResponse) => {
      return <div>Batch Text Response</div>;
    })
    .with({ output_type: 'batchdirectory' }, (batchDirectoryResponse) => {
      return <div>Batch Directory Response</div>;
    })
    .otherwise(() => {
      return <div>Unknown Response</div>;
    });
}
