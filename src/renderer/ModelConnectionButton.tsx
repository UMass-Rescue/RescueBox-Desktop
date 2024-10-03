import { ModelAppStatus, ModelServer } from 'src/shared/models';
import { KeyedMutator } from 'swr';
import { useServerStatus } from './lib/hooks';
import { ConnectIcon, DisconnectIcon } from './components/ConnectIcon';
import { Button } from './components/ui/button';
import ConnectDialog from './ConnectDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';

function ModelConnectionButton({
  modelUid,
  serverAddress,
  serverPort,
  mutate,
}: {
  modelUid: string;
  serverAddress: string;
  serverPort: string;
  mutate: KeyedMutator<ModelServer[]>;
}) {
  const {
    serverStatus,
    isValidating,
    mutate: mutateServerStatus,
  } = useServerStatus(modelUid);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const registerModel = async (modelUid: string, ipAndPort: string) => {
    await window.registration.registerModelAppIp({
      modelUid,
      serverAddress: ipAndPort.split(':')[0],
      serverPort: Number(ipAndPort.split(':')[1]),
    });
    await mutate();
    await mutateServerStatus();
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  async function disconnect(modelUid: string) {
    await window.registration.unregisterModelAppIp({ modelUid });
    await mutate();
    await mutateServerStatus();
  }

  if (isValidating) {
    return (
      <Button
        variant="outline"
        disabled
        className="hover:-translate-y-0.5 transition-all py-2 rounded-lg"
      >
        <ConnectIcon />
      </Button>
    );
  }
  if (serverStatus === ModelAppStatus.Unregistered) {
    return (
      <ConnectDialog
        modelUid={modelUid}
        defaultValue={`${serverAddress}:${serverPort}`}
        registerModel={registerModel}
      />
    );
  }
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="bg-red-600" onClick={() => disconnect(modelUid)}>
            <DisconnectIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Disconnect</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ModelConnectionButton;
