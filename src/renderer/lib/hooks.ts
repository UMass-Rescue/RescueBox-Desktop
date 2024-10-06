import { ModelAppStatus, ModelServer } from 'src/shared/models';
import useSWR from 'swr';

const JOBS_REFRESH_INTERVAL = 200;

export function useModels() {
  const fetcher = () => window.models.getModels();
  const { data, error, isLoading, mutate } = useSWR(
    `models:get-models`,
    fetcher,
  );

  return {
    models: data,
    error,
    isLoading,
    mutate,
  };
}

export function useServerStatuses(servers?: ModelServer[]) {
  const fetcher = () =>
    Promise.all(
      servers!.map((server) =>
        window.registration.getModelAppStatus({
          modelUid: server.modelUid,
        }),
      ),
    ).then((statuses) => {
      const serverStatuses: Record<string, ModelAppStatus> = {};
      for (let i = 0; i < servers!.length; i += 1) {
        serverStatuses[servers![i].modelUid] = statuses[i];
      }
      return serverStatuses;
    });

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    !servers ? null : `register:get-model-app-status`,
    fetcher,
  );

  return {
    serverStatuses: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export function useServerStatus(modelUid?: string) {
  const fetcher = () =>
    window.registration.getModelAppStatus({
      modelUid: modelUid!,
    });

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    !modelUid ? null : `register:get-model-app-status-${modelUid}`,
    fetcher,
  );

  return {
    serverStatus: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export function useServers() {
  const serverFetcher = () => window.registration.getModelServers();
  const { data, error, isLoading, mutate } = useSWR(
    `register:get-model-servers`,
    serverFetcher,
  );

  return {
    servers: data,
    error,
    isLoading,
    mutate,
  };
}

export function useModelInfo(modelUid?: string) {
  const fetcher = () =>
    window.registration.getModelInfo({
      modelUid: modelUid!,
    });

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    !modelUid ? null : `register:get-model-info-${modelUid}`,
    fetcher,
  );

  return {
    modelInfo: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export function useMLModels() {
  const fetcher = () => window.models.getModels();
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `models:get-models`,
    fetcher,
  );

  return {
    models: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export function useMLModel(modelUid?: string) {
  const fetcher = () => window.models.getModelByUid({ modelUid: modelUid! });
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    modelUid ? `models:get-model-by-uid-${modelUid}` : null,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export function useJobs() {
  const fetcher = () => window.job.getJobs();
  const { data, error, isLoading, mutate } = useSWR(`job:get-jobs`, fetcher, {
    refreshInterval: JOBS_REFRESH_INTERVAL,
  });

  return {
    jobs: data,
    error,
    isLoading,
    mutate,
  };
}

export function useJob(jobId?: string) {
  const fetcher = () => window.job.getJobById({ uid: jobId! });
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    jobId ? `job:get-job-by-id-${jobId}` : null,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
