import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow } from './components/ui/table';

function Models() {
  return (
    <div className="m-3">
      <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mb-4">
        Available Models
      </h1>
      <Table className="border border-slate-400 rounded-md mt-2">
        <TableBody>
          <TableRow className="">
            <TableCell className="w-1/2">Image Object Detection</TableCell>
            <TableCell className="text-right">
              <Link to="/model-details">Inspect</Link>
            </TableCell>
            <TableCell className="text-right">
              <Link to="/model-run">Run</Link>
            </TableCell>
            <TableCell className="text-right"> Status </TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="w-1/2">Image Super Resolution</TableCell>
            <TableCell className="text-right">
              <Link to="/model-details">Inspect</Link>
            </TableCell>
            <TableCell className="text-right">
              <Link to="/model-run">Run</Link>
            </TableCell>
            <TableCell className="text-right"> Status </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Models;
