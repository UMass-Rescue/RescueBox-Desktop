import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from './components/ui/table';
import { Button } from './components/ui/button';
import RedXIcon from './components/RedIcons';
import GreenCheckIcon from './components/GreenCheck';
import { Job } from '../shared/models';
import { useJobs, useMLModels } from './lib/hooks';
import LoadingIcon from './components/LoadingIcon';

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
  console.log(`Job ${job.uid} has been canceled`);
}

function Jobs() {
  const {
    jobs,
    error: jobsError,
    isLoading: jobsIsLoading,
    mutate: jobsMutate,
  } = useJobs();
  const {
    models,
    error: modelsError,
    isLoading: modelsIsLoading,
  } = useMLModels();

  const getModelName = (uid: string) => {
    return models?.find((model) => model.uid === uid)?.name;
  };

  async function handleDeleteJob(job: Job) {
    await window.job.deleteJobById({ uid: job.uid });
    await jobsMutate();
    console.log(`Job ${job.uid} has been deleted`);
  }

  if (jobsError)
    return <div>failed to load jobs. Error: {jobsError.toString()}</div>;
  if (jobsIsLoading) return <div>loading...</div>;
  if (!jobs) return <div>no jobs</div>;

  if (modelsError)
    return <div>failed to load models. Error: {modelsError.toString()}</div>;
  if (modelsIsLoading) return <div>loading...</div>;
  if (!models) return <div>no models</div>;

  return (
    <div>
      <div className="mx-3 my-3">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
          Running Jobs
          {jobsIsLoading && modelsIsLoading && (
            <LoadingIcon className="size-8 text-blue-600" />
          )}
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
              {jobs
                ?.filter(
                  (job) =>
                    job.status !== 'Completed' && job.status !== 'Failed',
                )
                .map((job) => (
                  <TableRow key={job.uid}>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/3">
                      {job.startTime.toUTCString()}
                    </TableCell>
                    <ViewButtonCell job={job} />
                    <TableCell className="text-center">
                      <RedButtonCell
                        job={job}
                        text="Cancel"
                        handleClick={() => handleCancelJob(job)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mx-3 mt-3">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
          Completed Jobs
          {jobsIsLoading && modelsIsLoading && (
            <LoadingIcon className="size-8 text-blue-600" />
          )}
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
              {jobs
                ?.filter(
                  (job) =>
                    job.status === 'Completed' || job.status === 'Failed',
                )
                .map((job) => (
                  <TableRow key={job.uid}>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {job.endTime ? job.endTime.toUTCString() : 'N/A'}
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
                        handleClick={() => handleDeleteJob(job)}
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
