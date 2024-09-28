import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/components/ui/table';
import ConnectDialog from './ConnectDialog';

function Registration() {
  return (
    <div className="m-3">
      <div>
        <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mb-4">
          Registered Models
        </h1>
        <Table className="border border-slate-400 rounded-md mt-2">
          <TableHeader className="bg-slate-100">
            <TableRow className="justify-between">
              <TableHead className="">Model Name</TableHead>
              <TableHead className="">Server Address</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Image Object Detection</TableCell>
              <TableCell> 192.168.1.1:5000</TableCell>
              <TableCell className="text-right">Online</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mt-4">
          Disconnected Models
        </h1>
        <Table className="border border-slate-400 rounded-md mt-2">
          <TableHeader className="bg-slate-100">
            <TableRow className="justify-between">
              <TableHead className="">Model Name</TableHead>
              <TableHead className="">Server Address</TableHead>
              <TableHead className="text-right"> Register </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Image Super Resolution</TableCell>
              <TableCell> 192.168.1.1:5000</TableCell>
              <TableCell className="text-right">
                {' '}
                <ConnectDialog />{' '}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Registration;
