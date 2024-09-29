import { Model } from './Types';

function getModelName(models: Model[], uid: string) {
  return models.find((model) => model.uid === uid)?.name;
}

function getJobById(jobs: any[], jobId: string) {
  return jobs.find((job) => job.uid === jobId);
}

function add(a: number, b: number) {
  return a + b;
}

export { getModelName, add, getJobById };