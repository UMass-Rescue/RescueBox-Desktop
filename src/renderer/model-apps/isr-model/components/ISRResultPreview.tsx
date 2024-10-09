import { DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '../../../components/ui/button';

function ISRResultPreview({
  inputPath,
  outputPath,
  onClose,
}: {
  inputPath: string;
  outputPath: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="font-bold text-xl mb-4">ISR Result Preview</h2>
        <div className="flex items-center justify-center space-x-4">
          <img
            src={`file://${inputPath}`}
            alt="Input Preview"
            className="object-contain max-h-96 max-w-full"
          />
          <span className="text-2xl">
            <DoubleArrowRightIcon />
          </span>
          <img
            src={`file://${outputPath}`}
            alt="Output Preview"
            className="object-contain max-h-96 max-w-full"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default ISRResultPreview;
