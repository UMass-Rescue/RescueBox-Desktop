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
import { Button } from './components/ui/button';

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
                  <TableRow key={job.uid}>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(sampleModels, job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/3">
                      {format(new Date(job.startTime), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button className="px-8 text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 rounded-lg">
                        <Link to={`/jobs/${job.uid}/details`} state={{ job }}>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button className="px-8 text-black text-base font-normal bg-red-200 hover:-translate-y-0.5 hover:bg-red-100 transition-all py-2 rounded-lg">
                        Cancel
                      </Button>
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
                  <TableRow key={job.uid}>
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
                      <Button className="px-8 text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 rounded-lg">
                        <Link to={`/jobs/${job.uid}/details`} state={{ job }}>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="text-center w-1/12">
                      <Button className="px-8 text-black text-base font-normal bg-red-200 hover:-translate-y-0.5 hover:bg-red-100 transition-all py-2 rounded-lg">
                        Delete
                      </Button>
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
