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
import RedXIcon from './components/RedIcons';
import GreenCheckIcon from './components/GreenCheck';
import { Job } from './Types';

// function getModelName(uid: string) {
//   return sampleModels.find((model) => model.uid === uid)?.name;
// }
function ViewButtonCell({ job }: { job: Job }) {
  return (
    <TableCell className="text-center">
      <Link to={`/jobs/${job.uid}/details`} className="">
        <Button
          variant="outline"
          className="px-8 hover:-translate-y-0.5 transition-all  rounded-lg"
        >
          View
        </Button>
      </Link>
    </TableCell>
  );
}

function RedButtonCell({
  job,
  text,
  handleClick,
}: {
  job: Job;
  text: string;
  handleClick: (job: Job) => void;
}) {
  return (
    <TableCell className="text-center">
      <Button
        variant="outline"
        className="px-8 hover:-translate-y-0.5 transition-all rounded-lg bg-red-200 hover:bg-red-100"
        onClick={() => handleClick(job)}
      >
        {text}
      </Button>
    </TableCell>
  );
}

function handleCancelJob(job: Job) {
  console.log('Cancel job', job);
}
function handleDeleteJob(job: Job) {
  console.log('Delete job', job);
}

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
                ?.filter(
                  (job) =>
                    job.status !== 'Completed' && job.status !== 'Failed',
                )
                .map((job) => (
                  <TableRow key={job.uid}>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(sampleModels, job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/3">
                      {format(new Date(job.startTime), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-center">
                      <ViewButtonCell job={job} />
                    </TableCell>
                    <TableCell className="text-center">
                      <RedButtonCell
                        job={job}
                        text="Cancel"
                        handleClick={handleCancelJob}
                      />
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
                <TableHead className="w-1/6 text-gray-900">End Time</TableHead>
                <TableHead className="w-1/6 text-gray-900 pl-4">
                  Status
                </TableHead>
                <TableHead className="w-1/12" />
                <TableHead className="w-1/12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleJobs
                ?.filter(
                  (job) =>
                    job.status === 'Completed' || job.status === 'Failed',
                )
                .map((job) => (
                  <TableRow key={job.uid}>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(sampleModels, job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {job.endTime
                        ? format(new Date(job.endTime), 'dd/MM/yyyy HH:mm')
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="w-1/6 pl-6">
                      {job.status === 'Failed' ? (
                        <RedXIcon />
                      ) : (
                        <GreenCheckIcon />
                      )}
                    </TableCell>
                    <TableCell className="text-center w-1/12">
                      <ViewButtonCell job={job} />
                    </TableCell>
                    <TableCell className="text-center w-1/12">
                      <RedButtonCell
                        job={job}
                        text="Delete"
                        handleClick={handleDeleteJob}
                      />
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
