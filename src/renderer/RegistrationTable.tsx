import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/components/ui/table';
import { MLModel } from 'src/shared/models';
import { useMLModels, useServers } from './lib/hooks';
import { createMLServerMap } from './lib/utils';
import ModelStatusIndicator from './ModelStatusIndicator';
import ModelConnectionButton from './ModelConnectionButton';

export default function RegistrationTable({
  registered,
}: {
  registered: boolean;
}) {
  // ML Models Hook
  const {
    models,
    error: modelError,
    isLoading: modelIsLoading,
  } = useMLModels();

  // Servers Hook
  const {
    servers,
    error,
    isLoading: serverIsLoading,
    mutate: mutateServers,
  } = useServers();

  if (modelError)
    return <div>failed to load models. Error: {modelError.toString()}</div>;
  if (modelIsLoading) return <div>loading models..</div>;
  if (!models) return <div>no models</div>;

  if (error) return <div>failed to load {error.toString()}</div>;
  if (serverIsLoading) return <div>loading servers..</div>;
  if (!servers) return <div>no servers</div>;

  const serverMap = { ...createMLServerMap(servers) };

  return (
    <div>
      <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
        {registered ? 'Registered Models' : 'Unregistered Models'}
      </h1>
      <div className="shadow-md mt-2">
        <Table className="text-md lg:text-lg">
          <TableHeader className="bg-slate-200">
            <TableRow className="justify-between">
              <TableHead className="pl-4 w-2/5 text-gray-900">Model</TableHead>
              <TableHead className="w-1/5 text-gray-900">
                Server Address
              </TableHead>
              <TableHead className="w-1/5 text-gray-900">Port</TableHead>
              <TableHead className="text-gray-900">Status</TableHead>
              <TableHead className="text-gray-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models
              ?.filter((model: MLModel) =>
                registered ? serverMap[model.uid] : !serverMap[model.uid],
              )
              .map((model: MLModel) => (
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
                      <ModelStatusIndicator modelUid={model.uid} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <ModelConnectionButton
                      mutate={mutateServers}
                      modelUid={model.uid}
                      serverAddress={
                        serverMap[model.uid]
                          ? serverMap[model.uid].serverAddress
                          : ''
                      }
                      serverPort={
                        serverMap[model.uid]
                          ? serverMap[model.uid].serverPort.toString()
                          : ''
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
