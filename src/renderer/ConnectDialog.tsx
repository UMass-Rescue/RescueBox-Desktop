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

function ConnectDialog() {
  return (
    <Dialog>
      <DialogTrigger className="hover:bg-green-300 py-1 px-1 rounded-lg">
        Connect
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Model</DialogTitle>
          <DialogDescription>
            <h1>Model: Image Super Resolution</h1>
            <span>Description: Super Resolution model for images</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue="0.0.0.0" readOnly />
          </div>
          <DialogClose asChild>
            <Button type="submit" size="sm" className="px-3">
              Submit
            </Button>
          </DialogClose>
        </div>
        <DialogFooter className="sm:justify-start" />
      </DialogContent>
    </Dialog>
  );
}
export default ConnectDialog;
