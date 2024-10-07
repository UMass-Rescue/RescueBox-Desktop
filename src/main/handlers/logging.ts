/* eslint-disable @typescript-eslint/no-unused-vars */
import log from 'electron-log/main';

export async function getLogs(_event: any, _arg: any) {
  return log.transports.file.readAllLogs();
}

export async function clearLogs(_event: any, _arg: any) {
  return log.transports.file.getFile().clear();
}
