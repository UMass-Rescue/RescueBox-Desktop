import { Button } from '@shadcn/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import LoadingIcon from '@shadcn/components/icons/LoadingIcon';
import CompletedIcon from '../../components/icons/CompletedIcon';
import FailedIcon from '../../components/icons/FailedIcon';
import CanceledIcon from '../../components/icons/CanceledIcon';

export default function StatusComponent({ status }: { status: String }) {
  const navigate = useNavigate();

  const handleRetry = async () => {
    navigate('/jobs');
  };

  return (
    <div className="flex flex-row justify-between ">
      {status === 'Completed' && (
        <div className="flex flex-row gap-2 text-lg font-semibold items-center">
          <CompletedIcon />
          Completed
        </div>
      )}
      {status === 'Failed' && (
        <div className="flex flex-row gap-2 text-lg font-semibold items-center">
          <FailedIcon />
          Failed
        </div>
      )}
      {status === 'Canceled' && (
        <div className="flex flex-row gap-2 text-lg font-semibold items-center">
          <CanceledIcon />
          Canceled
        </div>
      )}
      {status === 'Running' && (
        <div className="flex flex-row gap-2 text-lg font-semibold items-center">
          <LoadingIcon />
        </div>
      )}
      <div className="flex flex-row gap-2 text-lg font-semibold items-center">
        {status !== 'Completed' && (
          <Button className="flex flex-row gap-2" onClick={handleRetry}>
            <ReloadIcon className="text-white size-5" />
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}