/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { mutate } from 'swr';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { useMLModel, useServer } from '../lib/hooks';
import LoadingIcon from '../components/icons/LoadingIcon';
import Modal from './Modal';

type ConnectInputs = {
  ip: string;
  port: string;
};

function ModelAppConnect() {
  // Params from URL
  const { modelUid } = useParams();
  if (!modelUid) throw new Error('modelUid is required');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ConnectInputs>({ mode: 'onChange' });

  const {
    data: model,
    error: modelError,
    isLoading: modelIsLoading,
  } = useMLModel(modelUid);

  const {
    data: server,
    error: serverError,
    isLoading: serverIsLoading,
  } = useServer(modelUid, {
    shouldRetryOnError: false,
  });

  if (serverError) {
    return <p>Error: {serverError.message}</p>;
  }
  if (serverIsLoading) return <LoadingIcon />;
  if (!server) return <p>No server</p>;

  const registerModel = async (
    modelUid: string,
    ipAddress: string,
    port: string,
  ) => {
    await window.registration.registerModelAppIp({
      modelUid,
      serverAddress: ipAddress,
      serverPort: Number(port),
    });
    navigate('/registration');
    await mutate(() => true, undefined);
  };

  const onSubmit: SubmitHandler<ConnectInputs> = async (data) => {
    await registerModel(modelUid, data.ip, data.port);
  };

  if (modelIsLoading) return <LoadingIcon />;
  if (modelError) return <p>Error: {modelError.message}</p>;

  const onClose = () => {
    navigate('/registration');
  };

  return (
    <Modal title="Register Model Application" onClose={onClose}>
      <div className="flex flex-col gap-y-3">
        <h2 className="font-semibold flex flex-col space-y-2">
          <p>{model!.name}</p>
          <p className="text-sm font-normal">Version {model!.version}</p>
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center space-x-2"
        >
          <div className="grid grid-container grid-cols-3 gap-2">
            <Label htmlFor="ip" className="text-sm font-medium col-span-2">
              Server IP Address
            </Label>
            <Label htmlFor="port" className="text-sm font-medium col-span-1">
              Port
            </Label>
            <Input
              {...register('ip', {
                required: 'This field is required',
                pattern: {
                  value:
                    /^localhost|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                  message: 'Invalid IP format',
                },
              })}
              defaultValue={server.serverAddress || ''}
              className="col-span-2"
            />
            <Input
              {...register('port', {
                required: 'This field is required',
                pattern: {
                  value:
                    /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
                  message: 'Invalid Port format',
                },
              })}
              defaultValue={server.serverPort || ''}
              className="col-span-1"
            />
          </div>
          <Button size="default" className="px-3 self-end" disabled={!isValid}>
            Connect
          </Button>
        </form>
        {errors.ip && (
          <span className="text-red-500 text-xs -mt-3">
            Please enter a valid server address.
          </span>
        )}
        {errors.port && (
          <span className="text-red-500 text-xs -mt-3">
            Please enter a valid port number.
          </span>
        )}
      </div>
    </Modal>
  );
}
export default ModelAppConnect;
