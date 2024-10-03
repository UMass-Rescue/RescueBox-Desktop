/* eslint-disable react/jsx-props-no-spreading */
import {
  Dialog,
  DialogClose,
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
import ConnectIcon from './components/ConnectIcon';

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
  registerModel: (modelUid: string, ipAndPort: string) => void;
}) {
  // Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnectInputs>();
  const onSubmit: SubmitHandler<ConnectInputs> = (data) => {
    registerModel(modelUid, data.ipAndPort);
  };

  return (
    <Dialog>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild className="py-1 rounded-lg text-base">
              <Button
                variant="outline"
                className=" text-black text-base w-full font-normal hover:-translate-y-0.5 transition-all py-2 px-6 rounded-lg"
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
            Model: Image Super Resolution
            <br />
            Description: Super Resolution model for images
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center space-x-2"
        >
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              {...register('ipAndPort', { required: true })}
              defaultValue={`${defaultValue}`}
            />
            {errors.ipAndPort && <span>This field is required</span>}
          </div>
          <DialogClose asChild>
            <Button type="submit" size="sm" className="px-3">
              Connect
            </Button>
          </DialogClose>
        </form>
        <DialogFooter className="sm:justify-start" />
      </DialogContent>
    </Dialog>
  );
}
export default ConnectDialog;
