import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/components/ui/table';
import sampleModels from './sample_models.json';
import ConnectDialog from './ConnectDialog';
import Model from './Types';

function Registration() {
  return (
    <div className="m-3">
      <div>
        <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mb-4">
          Registered Models
        </h1>
        <Table className=" mt-2">
          <TableHeader className="bg-slate-100">
            <TableRow className="justify-between">
              <TableHead className="">Model Name</TableHead>
              <TableHead className="">Server Address</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleModels
              ?.filter((model) => model.status === 'Online')
              .map((model: Model) => (
                <TableRow>
                  <TableCell>{model.name}</TableCell>
                  <TableCell>{model.ip}</TableCell>
                  <TableCell className="text-right">{model.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mt-4">
          Disconnected Models
        </h1>
        <Table className=" mt-2">
          <TableHeader className="bg-slate-100">
            <TableRow className="justify-between">
              <TableHead className="">Model Name</TableHead>
              <TableHead className="">Server Address</TableHead>
              <TableHead className="text-right"> Register </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleModels
              ?.filter((model) => model.status === 'Offline')
              .map((model: Model) => (
                <TableRow>
                  <TableCell>{model.name}</TableCell>
                  <TableCell>{model.ip}</TableCell>
                  <TableCell className="text-right">
                    {' '}
                    <ConnectDialog />{' '}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Registration;
