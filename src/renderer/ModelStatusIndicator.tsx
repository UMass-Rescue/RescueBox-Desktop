import { ModelAppStatus } from 'src/shared/models';
import { useServerStatus } from './lib/hooks';
import { GreenCircleIcon, RedCircleIcon } from './components/CircleIcons';
import LoadingIcon from './components/LoadingIcon';

function ModelStatusIndicator({ modelUid }: { modelUid: string }) {
  const { serverStatus, isValidating } = useServerStatus(modelUid);

  if (isValidating) {
    return <LoadingIcon />;
  }
  if (serverStatus === ModelAppStatus.Online) {
    return <GreenCircleIcon />;
  }
  return <RedCircleIcon />;
}

export default ModelStatusIndicator;
