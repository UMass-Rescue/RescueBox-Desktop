import { Link } from 'react-router-dom';
import sampleModels from 'src/renderer/sample_models.json';
import { Table, TableBody, TableCell, TableRow } from './components/ui/table';
import { Model } from './Types';

function Models() {
  return (
    <div className="m-3">
      <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mb-4">
        Available Models
      </h1>
      <Table className="border border-slate-400 rounded-md mt-2">
        <TableBody>
          {sampleModels.map((model: Model) => (
            <TableRow className="">
              <TableCell className="w-1/2">{model.name}</TableCell>
              <TableCell className="text-right">
                <Link to="/model-details">Inspect</Link>
              </TableCell>
              <TableCell className="text-right">
                <Link to="/model-run">Run</Link>
              </TableCell>
              <TableCell className="text-right">{model.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Models;
