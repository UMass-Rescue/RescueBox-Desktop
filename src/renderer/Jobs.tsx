import { Link } from 'react-router-dom';
import { Tooltip, TooltipProvider } from '@radix-ui/react-tooltip';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from './components/ui/table';
import { Button } from './components/ui/button';
import { Job } from '../shared/models';
import { useJobs, useMLModels } from './lib/hooks';
import LoadingIcon from './components/LoadingIcon';
import { TooltipContent, TooltipTrigger } from './components/ui/tooltip';
import DeleteIcon from './components/DeleteIcon';
import CancelIcon from './components/CancelIcon';
import CompletedIcon from './components/CompletedIcon';
import FailedIcon from './components/FailedIcon';
import CanceledIcon from './components/CanceledIcon';

function ViewButton({ job }: { job: Job }) {
  return (
    <Link to={`/jobs/${job.uid}/details`} className="">
      <Button
        variant="outline"
        className="px-8 hover:-translate-y-0.5 transition-all rounded-lg"
      >
        View
      </Button>
    </Link>
  );
}

function RedButton({
  job,
  variant,
  handleClick,
}: {
  job: Job;
  variant: 'cancel' | 'delete';
  handleClick: (job: Job) => void;
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="px-4 bg-red-600 mr-2 hover:-translate-y-0.5 transition-all"
            onClick={() => handleClick(job)}
          >
            {variant === 'cancel' ? <CancelIcon /> : <DeleteIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{variant === 'cancel' ? 'Cancel' : 'Delete'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
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
  }

  async function handleCancelJob(job: Job) {
    await window.job.cancelJob({ uid: job.uid });
    await jobsMutate();
  }

  if (jobsError)
    return <div>failed to load jobs. Error: {jobsError.toString()}</div>;
  if (jobsIsLoading) return <div>loading...</div>;
  if (!jobs) return <div>no jobs</div>;

  if (modelsError)
    return <div>failed to load models. Error: {modelsError.toString()}</div>;
  if (modelsIsLoading) return <div>loading...</div>;
  if (!models) return <div>no models</div>;

  jobs.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  return (
    <div>
      <div className="mx-3 my-3">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
          Running Jobs
          {jobsIsLoading && modelsIsLoading && (
            <LoadingIcon className="size-8 text-blue-600" />
          )}
        </h1>
        <div className="shadow-md mt-6">
          <Table className="text-md lg:text-lg">
            <TableHeader className="bg-slate-200">
              <TableRow className="justify-between">
                <TableHead className="pl-4 w-1/3 text-gray-900">
                  Model
                </TableHead>
                <TableHead className="w-1/6 text-gray-900">
                  Start Time
                </TableHead>
                <TableHead className="w-1/6 text-gray-900 pl-4">
                  Status
                </TableHead>
                <TableHead className="w-1/12" />
                <TableHead className="w-1/12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs
                .filter((job) => job.status === 'Running')
                .map((job) => (
                  <TableRow key={job.uid}>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/6">
                      <div className="flex flex-col">
                        <span>{job.startTime.toLocaleDateString()}</span>
                        <span>{job.startTime.toLocaleTimeString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="w-1/6 pl-7">
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <LoadingIcon className="size-6" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Running</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-center py-4 px-4">
                      <ViewButton job={job} />
                    </TableCell>
                    <TableCell className="text-center py-4 px-4">
                      <RedButton
                        job={job}
                        variant="cancel"
                        handleClick={() => handleCancelJob(job)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mx-3 my-6">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
          Completed Jobs
          {jobsIsLoading && modelsIsLoading && (
            <LoadingIcon className="size-8 text-blue-600" />
          )}
        </h1>
        <div className="shadow-md mt-6">
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
                .filter((job) => job.status !== 'Running')
                .map((job) => (
                  <TableRow key={job.uid}>
                    <TableCell className="pl-4 w-1/3">
                      {getModelName(job.modelUid)}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {job.endTime ? (
                        <div className="flex flex-col">
                          <span>{job.endTime.toLocaleDateString()}</span>
                          <span>{job.endTime.toLocaleTimeString()}</span>
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell className="w-1/6 pl-7">
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              {job.status === 'Completed' && <CompletedIcon />}
                              {job.status === 'Failed' && <FailedIcon />}
                              {job.status === 'Canceled' && <CanceledIcon />}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>{job.status}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-center w-1/12 py-4 px-4">
                      <ViewButton job={job} />
                    </TableCell>
                    <TableCell className="text-center w-1/12 py-4 px-4">
                      <RedButton
                        job={job}
                        variant="delete"
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
