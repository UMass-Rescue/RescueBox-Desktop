import { dialog, shell } from 'electron';
import fs from 'fs';
import log from 'electron-log/main';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function saveLogs(_event: any, _arg: any) {
  return dialog
    .showSaveDialog({
      title: 'Select the File Path to save',
      defaultPath: `rescuebox-logs-${new Date().toISOString()}.log`,
      buttonLabel: 'Save',
      // Restricting the user to only Text Files.
      filters: [
        {
          name: 'Text Files',
          extensions: ['log'],
        },
      ],
      properties: [],
    })
    .then((file) => {
      // Stating whether dialog operation was cancelled or not.
      log.info(
        file.canceled ? 'Dialog was cancelled' : 'Dialog was not cancelled',
      );
      if (!file.canceled) {
        log.info('File path selected to save logs: ', file.filePath);

        // Creating and Writing to the sample.txt file
        fs.writeFile(
          file.filePath.toString(),
          'This is a Sample File',
          function (err) {
            if (err) throw err;
            console.log('Saved!');
          },
        );
        fs.copyFileSync(log.transports.file.getFile().path, file.filePath);
        log.info('File saved successfully');
      }
      return file.filePath;
    })
    .catch((err) => {
      log.error('Error in saving logs: ', err);
    });
}
