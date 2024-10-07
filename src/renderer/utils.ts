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

/**
 * Partitions an array into two arrays, one with elements that pass a test and one with elements that fail the test.
 * @param array an array to partition of type T
 * @param isValid a predicate function that takes an element of type T and returns a boolean
 * @returns [pass, fail] where pass is an array of elements that passed the test and fail is an array of elements that failed the test
 */
function partition<T>(array: T[], isValid: (elem: T) => boolean): [T[], T[]] {
  return array.reduce(
    (acc, elem: T) => {
      const [pass, fail] = acc;
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []] as [T[], T[]],
  );
}

export { getModelName, add, getJobById, partition };
