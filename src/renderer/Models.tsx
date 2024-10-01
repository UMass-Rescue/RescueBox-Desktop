import { Link } from 'react-router-dom';
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
                    className="text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 px-2 rounded-lg"
                  >
                    Inspect
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  <Button
                    className={`text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 px-6 rounded-lg ${
                      model.status !== 'Online'
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }`}
                  >
                    <Link to={`/models/${model.uid}/run`}>Run</Link>
                  </Button>
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
