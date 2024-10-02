import { Link } from 'react-router-dom';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@shadcn/components/ui/tooltip';
import sampleModels from './sample_models.json';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { Model } from './Types';
import { Button } from './components/ui/button';
import { GreenCircleIcon, RedCircleIcon } from './components/CircleIcons';
import GreenRunIcon from './components/GreenRunIcon';
import ConnectIcon from './components/ConnectIcon';

function Models() {
  return (
    <div className="m-3">
      <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
        Available Models
      </h1>
      <div className="shadow-md mt-6 max-w-[900px]">
        <Table className="text-md lg:text-lg">
          <TableHeader className="bg-slate-200">
            <TableRow className="justify-between">
              <TableHead className="pl-4 w-3/6 text-gray-900">Model</TableHead>
              <TableHead className="w-1/6 text-gray-900">Status</TableHead>
              <TableHead className="w-1/12" />
              <TableHead className="w-1/12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleModels.map((model: Model) => (
              <TableRow key={model.uid} className="hover:bg-gray-50">
                <TableCell className="pl-4">{model.name}</TableCell>
                <TableCell className="">
                  <div className="pl-4">
                    {model.status === 'Online' ? (
                      <GreenCircleIcon />
                    ) : (
                      <RedCircleIcon />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-left">
                  <Link
                    to={`/models/${model.uid}/details`}
                    className="py-2 px-5 "
                  >
                    <Button
                      variant="outline"
                      className="hover:-translate-y-0.5 transition-all  rounded-lg"
                    >
                      Inspect
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  <TooltipProvider delayDuration={100}>
                    {model.status === 'Online' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to={`/models/${model.uid}/run`}>
                            <Button className="w-full  hover:-translate-y-0.5 transition-all py-2 px-6 rounded-lg bg-green-600 hover:bg-green-500">
                              <GreenRunIcon />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Run</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {model.status === 'Offline' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to="/registration">
                            <Button
                              variant="outline"
                              className=" text-black text-base w-full font-normal hover:-translate-y-0.5 transition-all py-2 px-6 rounded-lg"
                            >
                              <ConnectIcon />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Connect</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Models;
