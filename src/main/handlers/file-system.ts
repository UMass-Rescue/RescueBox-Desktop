import { dialog, shell } from 'electron';
import fs from 'fs';

export type OpenDirectoryArgs = {
  path: string;
};

export async function openDirectory(_event: any, arg: OpenDirectoryArgs) {
  if (!fs.existsSync(arg.path)) {
    dialog.showErrorBox(
      "We can't find this folder.",
      "Make sure it hasn't been moved or deleted.",
    );
  } else {
    shell.openPath(arg.path);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function selectDirectory(_event: any, _arg: any) {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  return result.filePaths[0];
}
