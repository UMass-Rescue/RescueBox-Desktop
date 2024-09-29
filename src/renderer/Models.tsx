import { Link } from 'react-router-dom';
import sampleModels from './sample_models.json';
import { Table, TableBody, TableCell, TableRow } from './components/ui/table';
import { Model } from './Types';

function Models() {
  return (
    <div className="m-3">
      <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
        Available Models
      </h1>
      <Table className="mt-2 text-md lg:text-lg">
        <TableBody>
          {sampleModels.map((model: Model) => (
            <TableRow>
              <TableCell className="w-[70%]">{model.name}</TableCell>
              <TableCell className="text-right">
                <Link
                  to={`/models/${model.uid}/details`}
                  className="bg-inherit text-black border border-black font-semibold hover:bg-slate-300 p-2 rounded-lg"
                >
                  Inspect
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  to="/model-run"
                  className="bg-inherit text-black border border-black font-semibold hover:bg-slate-300 p-2 rounded-lg"
                >
                  Run
                </Link>
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
