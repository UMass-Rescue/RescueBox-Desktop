import { Link, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';

function ModelDetails() {
  const locationState = useLocation().state;
  const { modelUid } = locationState;

  // Fetch this data later
  const modelVersion = '1.0.0';
  const modelAuthor = 'John Doe';
  const modelLastUpdated = '2023-10-26T10:00:00Z';

  return (
    <div className="flex flex-row justify-between">
      <div className="w-2/3">
        <h1>{modelUid}</h1>
      </div>
      <div className="border border-green-700 m-4 py-4 px-6 rounded-xl w-1/3 bg-green-200 h-full">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Model Version
        </h1>
        <p className="m-2">{modelVersion}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Developed By
        </h1>
        <p className="m-2">{modelAuthor}</p>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl m-2">
          Last Updated
        </h1>
        <p className="m-2">{modelLastUpdated}</p>
        {/* <div className="h-1/3" /> */}
        <Link
          className="bg-slate-200 border border-sky-300 my-10"
          to="/models/outputs"
        >
          Run
        </Link>
      </div>
    </div>
  );
}
export default ModelDetails;
