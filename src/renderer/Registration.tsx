import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/components/ui/table';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@shadcn/components/ui/tooltip';
import { MLModel, ModelAppStatus } from 'src/shared/models';
import ConnectDialog from './ConnectDialog';
import { Button } from './components/ui/button';
import DebugDisconnect from '../../assets/debug-disconnect.svg';
import { GreenCircleIcon, RedCircleIcon } from './components/CircleIcons';
import { useMLModels, useServers, useServerStatuses } from './lib/hooks';
import { createMLServerMap } from './lib/utils';

function Registration() {
  // ML Models Hook
  const {
    models,
    error: modelError,
    isLoading: modelIsLoading,
  } = useMLModels();

  // Servers Hook
  const { servers, error, isLoading, mutate: mutateServers } = useServers();

  // Server Statuses Hook
  const {
    serverStatuses,
    error: statusError,
    isLoading: statusIsLoading,
    mutate: mutateStatus,
  } = useServerStatuses(servers);

  const registerModel = async (modelUid: string, ipAndPort: string) => {
    await window.registration.registerModelAppIp({
      modelUid,
      serverAddress: ipAndPort.split(':')[0],
      serverPort: Number(ipAndPort.split(':')[1]),
    });

    // Calling mutate results tells the useServers hook to refetch the server data
    // await is needed to ensure that the next mutate call doesn't run before the previous one finishes
    // which might result in SQL lock errors or data races
    await mutateServers();

    // Calling mutateStatus results tells the useServerStatuses hook to refetch the server status data
    await mutateStatus();
  };

  if (modelError)
    return <div>failed to load models. Error: {modelError.toString()}</div>;
  if (modelIsLoading) return <div>loading...</div>;
  if (!models) return <div>no models</div>;

  if (error) return <div>failed to load {error.toString()}</div>;
  if (isLoading) return <div>loading...</div>;
  if (!servers) return <div>no servers</div>;

  if (statusError)
    return <div>failed to load status. Error: {statusError.toString()}</div>;
  if (statusIsLoading) return <div>loading...</div>;
  if (!serverStatuses) return <div>no server statuses</div>;

  const serverMap = createMLServerMap(servers);

  return (
    <div className="m-3">
      <div>
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
          Registered Models
        </h1>
        <div className="shadow-md mt-2">
          <Table className="text-md lg:text-lg">
            <TableHeader className="bg-slate-200">
              <TableRow className="justify-between">
                <TableHead className="pl-4 w-2/5 text-gray-900">
                  Model
                </TableHead>
                <TableHead className="w-1/5 text-gray-900">
                  Server Address
                </TableHead>
                <TableHead className="w-1/5 text-gray-900">Port</TableHead>
                <TableHead className="text-gray-900">Status</TableHead>
                <TableHead className="text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models?.map((model: MLModel) => (
                <TableRow key={model.uid} className="py-2 hover:bg-gray-50">
                  <TableCell className="pl-4">{model.name}</TableCell>
                  <TableCell className="">
                    {serverMap[model.uid]
                      ? serverMap[model.uid].serverAddress
                      : ''}
                  </TableCell>
                  <TableCell className="">
                    {serverMap[model.uid]
                      ? serverMap[model.uid].serverPort
                      : ''}
                  </TableCell>
                  <TableCell className="">
                    <div className="pl-4">
                      {serverStatuses[model.uid] === ModelAppStatus.Online ? (
                        <GreenCircleIcon />
                      ) : (
                        <RedCircleIcon />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      if (
                        !(model.uid in serverStatuses) ||
                        serverStatuses[model.uid] ===
                          ModelAppStatus.Unregistered
                      ) {
                        const server = serverMap[model.uid];
                        const [address, port] = server
                          ? [server.serverAddress, server.serverPort]
                          : ['', ''];
                        return (
                          <ConnectDialog
                            modelUid={model.uid}
                            defaultValue={`${address}:${port}`}
                            registerModel={registerModel}
                          />
                        );
                      }
                      return (
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button className="bg-red-600">
                                <img
                                  alt="disconnect"
                                  src={DebugDisconnect}
                                  className="size-6"
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Disconnect</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Registration;
