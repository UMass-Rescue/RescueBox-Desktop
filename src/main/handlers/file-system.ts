import { dialog, shell } from 'electron';
import fs from 'fs';
import log from 'electron-log/main';
import path from 'path';

export type PathArgs = {
  path: string;
};

export async function openPath(_event: any, arg: PathArgs) {
  log.info('Opening directory', arg.path);
  if (!fs.existsSync(arg.path)) {
    log.error('Directory does not exist');
    dialog.showErrorBox(
      "We can't find this folder.",
      "Make sure it hasn't been moved or deleted.",
    );
  } else {
    shell.openPath(arg.path).catch((err) => {
      log.error('Error opening directory', err);
      dialog.showErrorBox('Error opening directory', err.message);
    });
  }
}

export async function showFileInExplorer(_event: any, arg: PathArgs) {
  const filePath = path.resolve(arg.path);
  if (!fs.existsSync(filePath)) {
    log.error('File does not exist');
    dialog.showErrorBox(
      "We can't find this file.",
      "Make sure it hasn't been moved or deleted.",
    );
  } else {
    log.info('Showing file in explorer', filePath);
    shell.showItemInFolder(filePath);
  }
}

export async function deleteFile(_event: any, arg: PathArgs) {
  const filePath = path.resolve(arg.path);
  if (!fs.existsSync(filePath)) {
    log.error('File does not exist');
    dialog.showErrorBox(
      "We can't find this file.",
      "Make sure it hasn't been moved or deleted.",
    );
  } else {
    log.info('Deleting file', filePath);
    await shell.trashItem(filePath).catch((err) => {
      log.error('Error deleting file', err);
      dialog.showErrorBox('Error deleting file', err.message);
    });
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
export async function selectDirectories(_event: any, _arg: any) {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'multiSelections'],
  });

  return result.filePaths;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function selectFile(_event: any, _arg: any) {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
  });

  return result.filePaths[0];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function selectFiles(_event: any, _arg: any) {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
  });

  return result.filePaths;
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

        fs.copyFileSync(log.transports.file.getFile().path, file.filePath);
        log.info('File saved successfully');
      }
      return file.filePath;
    })
    .catch((err) => {
      log.error('Error in saving logs: ', err);
    });
}

export async function getFilesFromDir(_event: any, arg: PathArgs) {
  return fs.readdirSync(arg.path);
}
