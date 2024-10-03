import { ModelAppStatus, ModelServer } from 'src/shared/models';
import useSWR from 'swr';

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

export function useServerStatus(server?: ModelServer) {
  const fetcher = () =>
    window.registration.getModelAppStatus({
      modelUid: server!.modelUid,
    });

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    !server ? null : `register:get-model-app-status-${server.modelUid}`,
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

export function useMLModels() {
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
