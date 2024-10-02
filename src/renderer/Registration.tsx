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
import sampleModels from './sample_models.json';
import ConnectDialog from './ConnectDialog';
import { Model } from './Types';
import { Button } from './components/ui/button';
import DebugDisconnect from '../../assets/debug-disconnect.svg';
import { GreenCircleIcon, RedCircleIcon } from './components/CircleIcons';

function Registration() {
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
              {sampleModels
                ?.filter((model) => model.status === 'Online')
                .map((model: Model) => (
                  <TableRow key={model.uid} className="py-2 hover:bg-gray-50">
                    <TableCell className="pl-4">{model.name}</TableCell>
                    <TableCell className="">{model.ip}</TableCell>
                    <TableCell className="">{model.port}</TableCell>
                    <TableCell className="">
                      <div className="pl-4">
                        {model.status === 'Online' ? (
                          <GreenCircleIcon />
                        ) : (
                          <RedCircleIcon />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl my-4">
          Disconnected Models
        </h1>
        <div className="shadow-md mt-2">
          <Table className="text-md lg:text-lg">
            <TableHeader className="bg-slate-200">
              <TableRow className="justify-between">
                <TableHead className="w-2/5 pl-4 text-gray-900">
                  Model Name
                </TableHead>
                <TableHead className="w-1/5 text-gray-900">
                  Server Address
                </TableHead>
                <TableHead className="w-1/5 text-gray-900">Port</TableHead>
                <TableHead className="text-gray-900">Connect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleModels
                ?.filter((model) => model.status === 'Offline')
                .map((model: Model) => (
                  <TableRow key={model.uid} className="hover:bg-gray-50">
                    <TableCell className="pl-4">{model.name}</TableCell>
                    <TableCell className="">{model.ip}</TableCell>
                    <TableCell className="">{model.port}</TableCell>
                    <TableCell className="">
                      <ConnectDialog
                        defaultValue={`${model.ip}:${model.port}`}
                      />
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
