import { MLModel } from 'src/shared/models';

function getModelName(models: MLModel[], uid: string) {
  return models.find((model) => model.uid === uid)?.name;
}

function getJobById(jobs: any[], jobId: string) {
  return jobs.find((job) => job.uid === jobId);
}

function add(a: number, b: number) {
  return a + b;
}

function partition<T>(array: T[], isValid: (elem: T) => boolean) {
  return array.reduce(
    (acc, elem: T) => {
      const [pass, fail] = acc;
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []] as T[][],
  );
}

export { getModelName, add, getJobById, partition };
