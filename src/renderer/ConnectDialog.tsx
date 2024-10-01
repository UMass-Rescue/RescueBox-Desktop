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
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';

function ConnectDialog({ defaultValue }: { defaultValue: string }) {
  return (
    <Dialog>
      <DialogTrigger className="bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-1 px-2 rounded-lg text-base">
        Connect
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Model</DialogTitle>
          <DialogDescription>
            Model: Image Super Resolution
            <br />
            Description: Super Resolution model for images
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={`${defaultValue}`} />
          </div>
          <DialogClose asChild>
            <Button type="submit" size="sm" className="px-3">
              Connect
            </Button>
          </DialogClose>
        </div>
        <DialogFooter className="sm:justify-start" />
      </DialogContent>
    </Dialog>
  );
}
export default ConnectDialog;
