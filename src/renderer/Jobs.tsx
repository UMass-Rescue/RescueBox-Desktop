import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from './components/ui/table';
import sampleJobs from './sample_jobs.json';
import sampleModels from './sample_models.json';
import { getModelName } from './utils';

// function getModelName(uid: string) {
//   return sampleModels.find((model) => model.uid === uid)?.name;
// }

function Jobs() {
  return (
    <div>
      <div className="mx-3 my-3">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
          Running Jobs
        </h1>
        <div className="shadow-md mt-2">
          <Table className="text-md lg:text-lg">
            <TableHeader className="bg-slate-200">
              <TableRow className="justify-between">
                <TableHead className="pl-4 w-1/3 text-gray-900">
                  Model
                </TableHead>
                <TableHead className="w-1/3 text-gray-900">
                  Start Time
                </TableHead>
                <TableHead className="w-1/12" />
                <TableHead className="w-1/12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleJobs
                ?.filter((job) => job.status !== 'Completed')
                .map((job) => (
                  <TableRow>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(sampleModels, job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/3">
                      {format(new Date(job.startTime), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        to={`/jobs/${job.uid}/details`}
                        className="border border-slate-300 p-1 px-8 rounded-lg hover:bg-slate-200"
                        state={{ job }}
                      >
                        View
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="border border-slate-300 p-1 px-8 rounded-lg bg-red-100 hover:bg-red-200 hover:cursor-pointer">
                        Cancel
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mx-3 mt-3">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-2">
          Completed Jobs
        </h1>
        <div className="shadow-md mt-2">
          <Table className="text-md lg:text-lg">
            <TableHeader className="bg-slate-200">
              <TableRow className="justify-between">
                <TableHead className="pl-4 w-1/3 text-gray-900">
                  Model
                </TableHead>
                <TableHead className="w-1/6 text-gray-900">
                  Start Time
                </TableHead>
                <TableHead className="w-1/6 text-gray-900">End Time</TableHead>
                <TableHead className="w-1/12" />
                <TableHead className="w-1/12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleJobs
                ?.filter((job) => job.status === 'Completed')
                .map((job) => (
                  <TableRow>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(sampleModels, job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {format(new Date(job.startTime), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {job.endTime
                        ? format(new Date(job.endTime), 'dd/MM/yyyy HH:mm')
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center w-1/12">
                      <Link
                        to="/job-view"
                        className="border border-slate-300 p-1 px-8 rounded-lg hover:bg-slate-200"
                        state={{ job }}
                      >
                        View
                      </Link>
                    </TableCell>
                    <TableCell className="text-center w-1/12">
                      <span className="border border-slate-300 p-1 px-8 rounded-lg bg-red-100 hover:bg-red-200 hover:cursor-pointer">
                        Cancel
                      </span>
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

export default Jobs;
