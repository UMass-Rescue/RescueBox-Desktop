import { ModelAppConfig } from 'src/shared/models';
import TemplateInfo from '../template/TemplateInfo';

export default function ObjDetectionModelInfo({
  modelAppConfig,
}: {
  modelAppConfig: ModelAppConfig;
}) {
  return <TemplateInfo modelAppConfig={modelAppConfig} />;
}
