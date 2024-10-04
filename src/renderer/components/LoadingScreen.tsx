import { cn } from '@shadcn/lib/utils';
import LoadingIcon from './LoadingIcon';

// eslint-disable-next-line react/require-default-props
function LoadingScreen({ className = '' }: { className?: string }) {
  return (
    <div className="h-screen">
      <div className="h-1/3 flex flex-col items-center justify-center gap-2">
        <LoadingIcon className="text-blue-600 size-10" />
        <h1 className={cn('text-2xl font-bold', className)}>Loading...</h1>
      </div>
    </div>
  );
}

export default LoadingScreen;
