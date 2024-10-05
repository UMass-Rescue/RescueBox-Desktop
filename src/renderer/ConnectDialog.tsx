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
  ipAndPort: string;
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
    await registerModel(modelUid, data.ipAndPort);
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
          <div className="grid flex-1 gap-2">
            <Label htmlFor="ipAndPort" className="text-sm font-medium">
              Server Address (IP:Port)
            </Label>
            <Input
              {...register('ipAndPort', {
                required: 'This field is required',
                pattern: {
                  value:
                    /^(localhost|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)):(6553[0-5]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9][0-9]|[1-5](\d){4}|[1-9](\d){0,3})$/,
                  message: 'Invalid IP:Port format',
                },
              })}
              defaultValue={`${defaultValue}`}
            />
          </div>
          <Button size="default" className="px-3 self-end" disabled={!isValid}>
            Connect
          </Button>
        </form>
        {errors.ipAndPort && (
          <span className="text-red-500 text-xs -mt-3">
            Please enter a valid server address.
          </span>
        )}
        <DialogFooter className="sm:justify-start" />
      </DialogContent>
    </Dialog>
  );
}
export default ConnectDialog;
