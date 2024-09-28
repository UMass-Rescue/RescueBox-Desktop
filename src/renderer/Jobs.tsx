import { Link } from 'react-router-dom';
import { Table, TableBody, TableRow, TableCell } from './components/ui/table';
import sampleJobs from './sample_jobs.json';
import sampleModels from './sample_models.json';

function getModelName(uid: string) {
  return sampleModels.find((model) => model.uid === uid)?.name;
}

function Jobs() {
  return (
    <div>
      <div className="m-3">
        <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mb-4">
          Running Jobs
        </h1>
        <Table className="border border-slate-400 rounded-md mt-2">
          <TableBody>
            {sampleJobs
              ?.filter((job) => job.status !== 'Completed')
              .map((job) => (
                <TableRow>
                  <TableCell className="w-1/3">
                    {getModelName(job.modelUid)}
                  </TableCell>
                  <TableCell className="w-1/2">
                    Started on: {job.startTime}
                  </TableCell>
                  <TableCell className="text-center hover:bg-slate-200 border border-black">
                    <Link to="/job-view" className="">
                      View
                    </Link>
                  </TableCell>
                  <TableCell className="text-center border border-black bg-red-50 hover:bg-red-100 hover:cursor-pointer">
                    Cancel
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="m-3">
        <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl mb-4">
          Completed Jobs
        </h1>
        <Table className="border border-slate-400 rounded-md mt-2">
          <TableBody>
            {sampleJobs
              ?.filter((job) => job.status === 'Completed')
              .map((job) => (
                <TableRow>
                  <TableCell className="w-1/3">
                    {getModelName(job.modelUid)}
                  </TableCell>
                  <TableCell className="w-1/2">
                    Completed on: {job.endTime}
                  </TableCell>
                  <TableCell className="text-center hover:bg-slate-200 border border-black">
                    <Link to="/job-view" className="">
                      View
                    </Link>
                  </TableCell>
                  <TableCell className="text-center border border-black bg-red-50 hover:bg-red-100 hover:cursor-pointer">
                    Cancel
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Jobs;
