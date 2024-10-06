/* eslint-disable react/jsx-props-no-spreading */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/components/ui/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from './components/ui/tooltip';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { ConnectIcon } from './components/ConnectIcon';
import { useMLModel } from './lib/hooks';
import LoadingIcon from './components/LoadingIcon';

type ConnectInputs = {
  ip: string;
  port: string;
};

function ConnectDialog({
  defaultValue,
  modelUid,
  registerModel,
}: {
  defaultValue: string;
  modelUid: string;
  registerModel: (modelUid: string, ipAndPort: string) => any;
}) {
  // Form Hook
  const [defaultIp, defaultPort] = defaultValue.split(':');

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

  const onSubmit: SubmitHandler<ConnectInputs> = async (data) => {
    await registerModel(modelUid, data.ip.concat(':', data.port));
  };

  if (modelIsLoading) return <LoadingIcon />;
  if (modelError) return <p>Error: {modelError.message}</p>;

  return (
    <Dialog>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild className="py-1 rounded-lg text-base">
              <Button
                variant="outline"
                className="hover:-translate-y-0.5 transition-all py-2 rounded-lg"
              >
                <ConnectIcon />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Connect</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Model</DialogTitle>
          <DialogDescription>
            {model!.name} - Version {model!.version}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center space-x-2"
        >
          <div className="grid grid-container grid-cols-3 gap-2">
            <Label
              htmlFor="ip"
              className="text-sm font-medium col-span-2 text-center"
            >
              Server IP Address
            </Label>
            <Label
              htmlFor="port"
              className="text-sm font-medium col-span-1 text-center"
            >
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
              defaultValue={`${defaultIp}`}
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
              defaultValue={`${defaultPort}`}
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
        <DialogFooter className="sm:justify-start" />
      </DialogContent>
    </Dialog>
  );
}
export default ConnectDialog;
