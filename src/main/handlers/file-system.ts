import { dialog, shell } from 'electron';

export type OpenDirectoryArgs = {
  path: string;
};

export async function openDirectory(_event: any, arg: OpenDirectoryArgs) {
  shell.openPath(arg.path);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function selectDirectory(_event: any, _arg: any) {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  return result.filePaths[0];
}
